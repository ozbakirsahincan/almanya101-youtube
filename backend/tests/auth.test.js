import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import request from 'supertest';
import express from 'express';
import jwt from 'jsonwebtoken';
import { jest } from '@jest/globals';

process.env.JWT_SECRET = 'test_jwt_secret_key_12345678';
process.env.JWT_EXPIRE = '1h';
process.env.NODE_ENV = 'test';

import User from '../models/User.js';
import { generateToken, verifyToken } from '../utils/token.js';
import { protect, authorize } from '../middleware/auth.js';
import { errorHandler } from '../middleware/errorHandler.js';
import authRoutes from '../routes/auth.js';

let mongoServer;
let app;

const createTestApp = () => {
  const testApp = express();
  testApp.use(express.json());
  testApp.use('/api/auth', authRoutes);
  testApp.use(errorHandler);
  return testApp;
};

describe('Token Utilities', () => {
  test('should generate a valid JWT token', () => {
    const userId = '507f1f77bcf86cd799439011';
    const token = generateToken(userId);
    
    expect(token).toBeDefined();
    expect(typeof token).toBe('string');
    expect(token.split('.').length).toBe(3);
  });

  test('should verify a valid token and return decoded payload', () => {
    const userId = '507f1f77bcf86cd799439011';
    const token = generateToken(userId);
    const decoded = verifyToken(token);
    
    expect(decoded).toBeDefined();
    expect(decoded.id).toBe(userId);
    expect(decoded.iat).toBeDefined();
    expect(decoded.exp).toBeDefined();
  });

  test('should throw error for invalid token', () => {
    const invalidToken = 'invalid.token.here';
    
    expect(() => verifyToken(invalidToken)).toThrow();
  });

  test('should throw error for expired token', () => {
    const userId = '507f1f77bcf86cd799439011';
    const expiredToken = jwt.sign(
      { id: userId },
      process.env.JWT_SECRET,
      { expiresIn: '-1h' }
    );
    
    expect(() => verifyToken(expiredToken)).toThrow();
  });
});

describe('Error Handler Middleware', () => {
  let mockReq, mockRes, mockNext;

  beforeEach(() => {
    mockReq = {};
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    mockNext = jest.fn();
  });

  test('should handle generic errors with 500 status', () => {
    const error = new Error('Test error');
    
    errorHandler(error, mockReq, mockRes, mockNext);
    
    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledWith({
      success: false,
      message: 'Test error',
    });
  });

  test('should handle Mongoose CastError with 404 status', () => {
    const error = new Error('Cast error');
    error.name = 'CastError';
    
    errorHandler(error, mockReq, mockRes, mockNext);
    
    expect(mockRes.status).toHaveBeenCalledWith(404);
    expect(mockRes.json).toHaveBeenCalledWith({
      success: false,
      message: 'Resource not found',
    });
  });

  test('should handle Mongoose duplicate key error with 409 status', () => {
    const error = new Error('Duplicate key');
    error.code = 11000;
    
    errorHandler(error, mockReq, mockRes, mockNext);
    
    expect(mockRes.status).toHaveBeenCalledWith(409);
    expect(mockRes.json).toHaveBeenCalledWith({
      success: false,
      message: 'Duplicate field value entered',
    });
  });

  test('should handle JWT errors with 401 status', () => {
    const error = new Error('JWT error');
    error.name = 'JsonWebTokenError';
    
    errorHandler(error, mockReq, mockRes, mockNext);
    
    expect(mockRes.status).toHaveBeenCalledWith(401);
    expect(mockRes.json).toHaveBeenCalledWith({
      success: false,
      message: 'Invalid token',
    });
  });

  test('should handle TokenExpiredError with 401 status', () => {
    const error = new Error('Token expired');
    error.name = 'TokenExpiredError';
    
    errorHandler(error, mockReq, mockRes, mockNext);
    
    expect(mockRes.status).toHaveBeenCalledWith(401);
    expect(mockRes.json).toHaveBeenCalledWith({
      success: false,
      message: 'Token expired',
    });
  });
});

describe('Auth Middleware', () => {
  let mockReq, mockRes, mockNext;

  beforeEach(() => {
    mockReq = {
      headers: {},
    };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    mockNext = jest.fn();
  });

  test('should return 401 if no token provided', async () => {
    await protect(mockReq, mockRes, mockNext);
    
    expect(mockRes.status).toHaveBeenCalledWith(401);
    expect(mockRes.json).toHaveBeenCalledWith({
      success: false,
      message: 'Not authorized to access this route',
    });
  });

  test('should return 401 for invalid token', async () => {
    mockReq.headers.authorization = 'Bearer invalid_token';
    
    await protect(mockReq, mockRes, mockNext);
    
    expect(mockRes.status).toHaveBeenCalledWith(401);
    expect(mockRes.json).toHaveBeenCalledWith({
      success: false,
      message: 'Not authorized to access this route',
    });
  });
});

describe('Authorize Middleware', () => {
  let mockReq, mockRes, mockNext;

  beforeEach(() => {
    mockReq = { user: { role: 'user' } };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    mockNext = jest.fn();
  });

  test('should call next if user has required role', () => {
    const middleware = authorize('user', 'admin');
    
    middleware(mockReq, mockRes, mockNext);
    
    expect(mockNext).toHaveBeenCalled();
  });

  test('should return 403 if user lacks required role', () => {
    const middleware = authorize('admin');
    
    middleware(mockReq, mockRes, mockNext);
    
    expect(mockRes.status).toHaveBeenCalledWith(403);
    expect(mockRes.json).toHaveBeenCalledWith({
      success: false,
      message: expect.stringContaining('not authorized'),
    });
  });
});

describe('Auth Routes (Integration)', () => {
  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri);
    app = createTestApp();
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  beforeEach(async () => {
    await User.deleteMany({});
  });

  describe('POST /api/auth/register', () => {
    test('should register a new user successfully', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({
          name: 'Test User',
          email: 'test@example.com',
          password: 'password123!',
          confirmPassword: 'password123!',
        });

      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.message).toBe('User registered successfully');
      expect(res.body.token).toBeDefined();
      expect(res.body.user.email).toBe('test@example.com');
      expect(res.body.user.name).toBe('Test User');
    });

    test('should return 400 if required fields missing', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({
          email: 'test@example.com',
          password: 'password123!',
        });

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toContain('required');
    });

    test('should return 400 if passwords do not match', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({
          name: 'Test User',
          email: 'test@example.com',
          password: 'password123!',
          confirmPassword: 'different123!',
        });

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toBe('Passwords do not match');
    });

    test('should return 400 if password is too short', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({
          name: 'Test User',
          email: 'test@example.com',
          password: '12345',
          confirmPassword: '12345',
        });

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toContain('6 characters');
    });

    test('should return 409 if email already exists', async () => {
      await request(app)
        .post('/api/auth/register')
        .send({
          name: 'Test User',
          email: 'test@example.com',
          password: 'password123!',
          confirmPassword: 'password123!',
        });

      const res = await request(app)
        .post('/api/auth/register')
        .send({
          name: 'Another User',
          email: 'test@example.com',
          password: 'password456!',
          confirmPassword: 'password456!',
        });

      expect(res.status).toBe(409);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toBe('Email already registered');
    });
  });

  describe('POST /api/auth/login', () => {
    beforeEach(async () => {
      await request(app)
        .post('/api/auth/register')
        .send({
          name: 'Test User',
          email: 'login@example.com',
          password: 'password123!',
          confirmPassword: 'password123!',
        });
    });

    test('should login successfully with correct credentials', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'login@example.com',
          password: 'password123!',
        });

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.message).toBe('Login successful');
      expect(res.body.token).toBeDefined();
      expect(res.body.user.email).toBe('login@example.com');
    });

    test('should return 401 for non-existent user', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'nonexistent@example.com',
          password: 'password123!',
        });

      expect(res.status).toBe(401);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toBe('Invalid credentials');
    });

    test('should return 401 for wrong password', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'login@example.com',
          password: 'wrongpassword!',
        });

      expect(res.status).toBe(401);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toBe('Invalid credentials');
    });

    test('should return 400 for missing fields', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'login@example.com',
        });

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toContain('provide email and password');
    });
  });

  describe('GET /api/auth/me', () => {
    let token;

    beforeEach(async () => {
      const registerRes = await request(app)
        .post('/api/auth/register')
        .send({
          name: 'Test User',
          email: 'me@example.com',
          password: 'password123!',
          confirmPassword: 'password123!',
        });
      token = registerRes.body.token;
    });

    test('should return user data with valid token', async () => {
      const res = await request(app)
        .get('/api/auth/me')
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.user.email).toBe('me@example.com');
    });

    test('should return 401 without token', async () => {
      const res = await request(app)
        .get('/api/auth/me');

      expect(res.status).toBe(401);
      expect(res.body.success).toBe(false);
    });

    test('should return 401 with invalid token', async () => {
      const res = await request(app)
        .get('/api/auth/me')
        .set('Authorization', 'Bearer invalid_token');

      expect(res.status).toBe(401);
      expect(res.body.success).toBe(false);
    });
  });

  describe('POST /api/auth/logout', () => {
    let token;

    beforeEach(async () => {
      const registerRes = await request(app)
        .post('/api/auth/register')
        .send({
          name: 'Test User',
          email: 'logout@example.com',
          password: 'password123!',
          confirmPassword: 'password123!',
        });
      token = registerRes.body.token;
    });

    test('should logout successfully', async () => {
      const res = await request(app)
        .post('/api/auth/logout')
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.message).toBe('Logout successful');
    });
  });
});

describe('User Model', () => {
  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri);
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  beforeEach(async () => {
    await User.deleteMany({});
  });

  test('should create user with hashed password', async () => {
    const user = await User.create({
      name: 'Test User',
      email: 'model@example.com',
      password: 'password123!',
    });

    expect(user).toBeDefined();
    expect(user.name).toBe('Test User');
    expect(user.email).toBe('model@example.com');
    expect(user.password).not.toBe('password123!');
    expect(user.role).toBe('user');
    expect(user.isActive).toBe(true);
  });

  test('should compare password correctly', async () => {
    const user = await User.create({
      name: 'Test User',
      email: 'compare@example.com',
      password: 'password123!',
    });

    const userWithPassword = await User.findById(user._id).select('+password');
    
    const isMatch = await userWithPassword.comparePassword('password123!');
    expect(isMatch).toBe(true);

    const isWrongMatch = await userWithPassword.comparePassword('wrongpassword');
    expect(isWrongMatch).toBe(false);
  });

  test('should not create user with duplicate email', async () => {
    await User.create({
      name: 'First User',
      email: 'duplicate@example.com',
      password: 'password123!',
    });

    await expect(
      User.create({
        name: 'Second User',
        email: 'duplicate@example.com',
        password: 'password456!',
      })
    ).rejects.toThrow();
  });

  test('should not create user with invalid email', async () => {
    await expect(
      User.create({
        name: 'Test User',
        email: 'invalid-email',
        password: 'password123!',
      })
    ).rejects.toThrow();
  });

  test('should not create user with name too short', async () => {
    await expect(
      User.create({
        name: 'A',
        email: 'short@example.com',
        password: 'password123!',
      })
    ).rejects.toThrow();
  });

  test('should not create user with password too short', async () => {
    await expect(
      User.create({
        name: 'Test User',
        email: 'shortpass@example.com',
        password: '12345',
      })
    ).rejects.toThrow();
  });

  test('should exclude password from JSON output', async () => {
    const user = await User.create({
      name: 'Test User',
      email: 'json@example.com',
      password: 'password123!',
    });

    const userJson = user.toJSON();
    expect(userJson.password).toBeUndefined();
  });
});
