import express from 'express';
import Event from '../models/Event.js';
import { protect, authorize } from '../middleware/auth.js';
import { asyncHandler } from '../middleware/errorHandler.js';
import { apiRateLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

/**
 * @route   GET /api/events
 * @desc    Get all events with optional filters
 * @access  Private
 */
router.get('/', protect, apiRateLimiter, asyncHandler(async (req, res) => {
  const { month, year, type, page = 1, limit = 20 } = req.query;

  // Build query
  const query = { isActive: true };

  // Filter by month/year
  if (month && year) {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0, 23, 59, 59);
    query.date = { $gte: startDate, $lte: endDate };
  }

  // Filter by type
  if (type) {
    query.type = type;
  }

  const pageNum = parseInt(page);
  const limitNum = parseInt(limit);
  const skip = (pageNum - 1) * limitNum;

  // Execute query
  const events = await Event.find(query)
    .populate('createdBy', 'name avatar')
    .populate('attendees', 'name avatar')
    .sort({ date: 1 })
    .skip(skip)
    .limit(limitNum);

  // Get total count
  const total = await Event.countDocuments(query);

  res.status(200).json({
    success: true,
    data: {
      events,
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
 * @route   GET /api/events/:id
 * @desc    Get event by ID
 * @access  Private
 */
router.get('/:id', protect, asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id)
    .populate('createdBy', 'name avatar email')
    .populate('attendees', 'name avatar email');

  if (!event) {
    return res.status(404).json({
      success: false,
      message: 'Event not found',
    });
  }

  res.status(200).json({
    success: true,
    data: event,
  });
}));

/**
 * @route   POST /api/events
 * @desc    Create new event
 * @access  Private
 */
router.post('/', protect, asyncHandler(async (req, res) => {
  req.body.createdBy = req.user._id;

  const event = await Event.create(req.body);

  const populatedEvent = await Event.findById(event._id)
    .populate('createdBy', 'name avatar');

  res.status(201).json({
    success: true,
    message: 'Event created successfully',
    data: populatedEvent,
  });
}));

/**
 * @route   PUT /api/events/:id
 * @desc    Update event
 * @access  Private (creator only)
 */
router.put('/:id', protect, asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);

  if (!event) {
    return res.status(404).json({
      success: false,
      message: 'Event not found',
    });
  }

  // Check if user is the creator
  if (event.createdBy.toString() !== req.user._id.toString()) {
    return res.status(403).json({
      success: false,
      message: 'Not authorized to update this event',
    });
  }

  const updatedEvent = await Event.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  ).populate('createdBy', 'name avatar');

  res.status(200).json({
    success: true,
    message: 'Event updated successfully',
    data: updatedEvent,
  });
}));

/**
 * @route   DELETE /api/events/:id
 * @desc    Delete event
 * @access  Private (creator or admin)
 */
router.delete('/:id', protect, asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);

  if (!event) {
    return res.status(404).json({
      success: false,
      message: 'Event not found',
    });
  }

  // Check if user is the creator or admin
  if (
    event.createdBy.toString() !== req.user._id.toString() &&
    req.user.role !== 'admin'
  ) {
    return res.status(403).json({
      success: false,
      message: 'Not authorized to delete this event',
    });
  }

  await event.deleteOne();

  res.status(200).json({
    success: true,
    message: 'Event deleted successfully',
  });
}));

/**
 * @route   POST /api/events/:id/attend
 * @desc    Toggle attendance for an event
 * @access  Private
 */
router.post('/:id/attend', protect, asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);

  if (!event) {
    return res.status(404).json({
      success: false,
      message: 'Event not found',
    });
  }

  // Check if event is in the past
  if (new Date(event.date) < new Date()) {
    return res.status(400).json({
      success: false,
      message: 'Cannot attend past events',
    });
  }

  // Check if max attendees reached
  if (event.maxAttendees && event.attendees.length >= event.maxAttendees) {
    return res.status(400).json({
      success: false,
      message: 'Event is fully booked',
    });
  }

  // Check if user is already attending
  const isAttending = event.attendees.includes(req.user._id);

  if (isAttending) {
    // Remove from attendees
    event.attendees = event.attendees.filter(
      (id) => id.toString() !== req.user._id.toString()
    );
    await event.save();

    return res.status(200).json({
      success: true,
      message: 'Successfully left the event',
      data: { attending: false },
    });
  } else {
    // Add to attendees
    event.attendees.push(req.user._id);
    await event.save();

    return res.status(200).json({
      success: true,
      message: 'Successfully joined the event',
      data: { attending: true },
    });
  }
}));

export default router;
