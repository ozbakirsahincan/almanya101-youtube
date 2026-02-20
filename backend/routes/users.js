import express from 'express';
import User from '../models/User.js';
import { protect, authorize } from '../middleware/auth.js';
import { asyncHandler } from '../middleware/errorHandler.js';
import { apiRateLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

/**
 * @route   GET /api/users
 * @desc    Get all users with optional filters
 * @access  Private
 */
router.get('/', protect, apiRateLimiter, asyncHandler(async (req, res) => {
  const { search, city, techStack, page = 1, limit = 20 } = req.query;

  // Build query
  const query = { isActive: true };

  if (search) {
    query.$or = [
      { name: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } },
      { bio: { $regex: search, $options: 'i' } },
    ];
  }

  if (city) {
    query.city = { $regex: city, $options: 'i' };
  }

  if (techStack) {
    query.techStack = { $in: techStack.split(',').map(t => t.trim()) };
  }

  const pageNum = parseInt(page);
  const limitNum = parseInt(limit);
  const skip = (pageNum - 1) * limitNum;

  // Execute query
  const users = await User.find(query)
    .select('-password')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limitNum);

  // Get total count
  const total = await User.countDocuments(query);

  res.status(200).json({
    success: true,
    data: {
      users,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        pages: Math.ceil(total / limitNum),
      },
    },
  });
}));

/**
 * @route   GET /api/users/:id
 * @desc    Get user by ID
 * @access  Private
 */
router.get('/:id', protect, asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');

  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found',
    });
  }

  res.status(200).json({
    success: true,
    data: user,
  });
}));

/**
 * @route   PUT /api/users/profile
 * @desc    Update user profile
 * @access  Private
 */
router.put('/profile', protect, asyncHandler(async (req, res) => {
  const allowedFields = [
    'name', 'bio', 'city', 'country', 'linkedin',
    'github', 'phone', 'showPhone', 'techStack'
  ];

  const updateData = {};
  allowedFields.forEach((field) => {
    if (req.body[field] !== undefined) {
      updateData[field] = req.body[field];
    }
  });

  const user = await User.findByIdAndUpdate(
    req.user._id,
    updateData,
    {
      new: true,
      runValidators: true,
    }
  ).select('-password');

  res.status(200).json({
    success: true,
    message: 'Profile updated successfully',
    data: user,
  });
}));

/**
 * @route   GET /api/users/cities
 * @desc    Get list of cities (for filter dropdown)
 * @access  Private
 */
router.get('/meta/cities', protect, asyncHandler(async (req, res) => {
  const cities = await User.distinct('city', { isActive: true, city: { $ne: '' } });

  res.status(200).json({
    success: true,
    data: cities.sort(),
  });
}));

/**
 * @route   GET /api/users/techstack
 * @desc    Get list of tech stacks (for filter dropdown)
 * @access  Private
 */
router.get('/meta/techstack', protect, asyncHandler(async (req, res) => {
  const techStacks = await User.distinct('techStack', { isActive: true });

  res.status(200).json({
    success: true,
    data: techStacks.sort(),
  });
}));

export default router;
