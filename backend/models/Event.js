import mongoose from 'mongoose';

/**
 * Event Schema for community events management
 */
const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide an event title'],
      trim: true,
      maxlength: [200, 'Title cannot exceed 200 characters'],
    },
    description: {
      type: String,
      required: [true, 'Please provide an event description'],
      maxlength: 2000,
    },
    date: {
      type: Date,
      required: [true, 'Please provide an event date'],
    },
    endTime: {
      type: Date,
      required: false,
    },
    location: {
      type: String,
      required: function () {
        return !this.isOnline;
      },
    },
    isOnline: {
      type: Boolean,
      default: false,
    },
    meetingLink: {
      type: String,
      required: function () {
        return this.isOnline;
      },
    },
    type: {
      type: String,
      enum: ['meetup', 'workshop', 'webinar', 'hackathon', 'conference', 'social', 'other'],
      default: 'meetup',
    },
    maxAttendees: {
      type: Number,
      default: null,
    },
    attendees: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    tags: {
      type: [String],
      default: [],
    },
    image: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// Index for date-based queries
eventSchema.index({ date: 1 });
// Index for type filtering
eventSchema.index({ type: 1 });
// Index for active events
eventSchema.index({ isActive: 1 });

export default mongoose.model('Event', eventSchema);
