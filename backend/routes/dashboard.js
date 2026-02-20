import express from 'express';
import User from '../models/User.js';
import { protect } from '../middleware/auth.js';
import { asyncHandler } from '../middleware/errorHandler.js';

const router = express.Router();

/**
 * @route   GET /api/dashboard
 * @desc    Get dashboard stats and recent users
 * @access  Private
 */
router.get('/', protect, asyncHandler(async (req, res) => {
  // Get statistics
  const totalUsers = await User.countDocuments();
  const activeUsers = await User.countDocuments({ isActive: true });

  // Get users joined in the last 7 days
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  const newUsersThisWeek = await User.countDocuments({
    createdAt: { $gte: sevenDaysAgo },
  });

  // Server uptime (in seconds)
  const uptime = Math.floor(process.uptime());

  // Get recent users
  const recentUsers = await User.find({ isActive: true })
    .select('name email createdAt role avatar provider')
    .sort({ createdAt: -1 })
    .limit(8);

  // Format uptime
  const days = Math.floor(uptime / 86400);
  const hours = Math.floor((uptime % 86400) / 3600);
  const minutes = Math.floor((uptime % 3600) / 60);

  let uptimeString = '';
  if (days > 0) uptimeString += `${days}d `;
  if (hours > 0) uptimeString += `${hours}h `;
  uptimeString += `${minutes}m`;

  res.status(200).json({
    success: true,
    data: {
      stats: {
        totalUsers,
        activeUsers,
        newUsersThisWeek,
        serverUptime: uptimeString,
      },
      recentUsers,
      currentUser: {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        role: req.user.role,
        avatar: req.user.avatar,
        provider: req.user.provider,
        lastLogin: req.user.lastLogin,
        createdAt: req.user.createdAt,
      },
    },
  });
}));

export default router;
