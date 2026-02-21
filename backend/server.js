import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import eventRoutes from './routes/events.js';
import dashboardRoutes from './routes/dashboard.js';
import { errorHandler } from './middleware/errorHandler.js';
import { apiRateLimiter } from './middleware/rateLimiter.js';
import path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables
dotenv.config();

// Get __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5001;

// ============================================
// Middleware Configuration
// ============================================

// CORS configuration
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Rate limiting for API routes
app.use('/api', apiRateLimiter);

// ============================================
// Static File Serving
// ============================================

// Serve frontend static files
const frontendPath = path.join(__dirname, '../frontend/dist');
app.use(express.static(frontendPath));

// ============================================
// API Routes
// ============================================

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
  });
});

// Mount API route groups
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/dashboard', dashboardRoutes);

// ============================================
// Error Handlers
// ============================================

// 404 handler for API routes
app.use('/api/*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'API endpoint not found',
  });
});

// Global error handler (must be last)
app.use(errorHandler);

// ============================================
// SPA Fallback
// ============================================

// Serve index.html for all non-API routes (SPA fallback)
app.get('*', (req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

// ============================================
// Server Startup
// ============================================

const startServer = async () => {
  try {
    // Connect to database
    await connectDB();

    // Start listening
    const server = app.listen(PORT, () => {
      console.log(`
╔══════════════════════════════════════════════════════════╗
║                                                          ║
║   ███████╗ ██████╗ ███████╗███████╗██╗  ██╗             ║
║   ██╔════╝██╔═══██╗██╔════╝██╔════╝██║  ██║             ║
║   █████╗  ██║   ██║███████╗███████╗███████║             ║
║   ██╔══╝  ██║   ██║╚════██║╚════██║██╔══██║             ║
║   ██║     ╚██████╔╝███████║███████║██║  ██║             ║
║   ╚═╝      ╚═════╝ ╚══════╝╚══════╝╚═╝  ╚═╝             ║
║                                                          ║
╠══════════════════════════════════════════════════════════╣
║  Bento Auth System Backend                              ║
╠══════════════════════════════════════════════════════════╣
║  Environment:  ${process.env.NODE_ENV || 'development'}                     ║
║  Server Port:  ${PORT}                                          ║
║  Database:    MongoDB                                    ║
╠══════════════════════════════════════════════════════════╣
║  API Endpoints:                                          ║
║  • POST   /api/auth/register                             ║
║  • POST   /api/auth/login                                ║
║  • GET    /api/auth/me                                   ║
║  • GET    /api/users                                     ║
║  • GET    /api/events                                    ║
║  • GET    /api/dashboard                                 ║
╠══════════════════════════════════════════════════════════╣
║  Frontend:  http://localhost:5173                       ║
║  API:       http://localhost:${PORT}/api                   ║
╚══════════════════════════════════════════════════════════╝
      `);
    });

    // Handle server errors
    server.on('error', (error) => {
      if (error.code === 'EADDRINUSE') {
        console.error(`\n❌ Port ${PORT} is already in use. Please choose a different port.\n`);
        process.exit(1);
      } else {
        console.error('\n❌ Server error:', error);
        process.exit(1);
      }
    });

    // Graceful shutdown
    process.on('SIGTERM', () => {
      console.log('\n⏳ SIGTERM received. Shutting down gracefully...');
      server.close(() => {
        console.log('✅ Server closed');
        process.exit(0);
      });
    });

    process.on('SIGINT', () => {
      console.log('\n⏳ SIGINT received. Shutting down gracefully...');
      server.close(() => {
        console.log('✅ Server closed');
        process.exit(0);
      });
    });
  } catch (error) {
    console.error('\n❌ Failed to start server:', error);
    process.exit(1);
  }
};

// Start the server
startServer();

export default app;
