import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { isDemoMode, getMockEventsData } from '../utils/demoMode';
import { getAllEvents } from '../api/events';
import Badge from '../components/ui/Badge';

/**
 * EventsPage - Event discovery and management page
 */
const EventsPage = () => {
  const { isDemo } = useAuth();
  const { info } = useToast();
  const [mounted, setMounted] = useState(false);
  const [filterType, setFilterType] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Fetch events data
  const { data: eventsData, isLoading, refetch } = useQuery({
    queryKey: ['events', filterType],
    queryFn: async () => {
      if (isDemoMode()) {
        return getMockEventsData();
      }

      const response = await getAllEvents({ type: filterType });
      if (response.data.success) {
        return response.data.data;
      }
      throw new Error('Failed to load events');
    },
    enabled: mounted,
  });

  useEffect(() => {
    setMounted(true);
    if (isDemo) {
      info('Demo mode active - Using mock data');
    }
  }, [isDemo, info]);

  const events = eventsData?.events || [];

  const eventTypeColors = {
    meetup: 'bg-blue-500/10 text-blue-400',
    workshop: 'bg-purple-500/10 text-purple-400',
    webinar: 'bg-emerald-500/10 text-emerald-400',
    hackathon: 'bg-orange-500/10 text-orange-400',
    conference: 'bg-red-500/10 text-red-400',
    social: 'bg-pink-500/10 text-pink-400',
    other: 'bg-white/10 text-white/60',
  };

  return (
    <div className="space-y-6">
      {/* Header with Filter and Create */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="bento-input w-auto px-4 appearance-none cursor-pointer"
          >
            <option value="">All Events</option>
            <option value="meetup">Meetups</option>
            <option value="workshop">Workshops</option>
            <option value="webinar">Webinars</option>
            <option value="hackathon">Hackathons</option>
            <option value="conference">Conferences</option>
            <option value="social">Social Events</option>
          </select>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 px-4 h-10 rounded-lg bg-indigo-500 text-white font-medium hover:bg-indigo-600 hover:shadow-glow-hover transition-all"
        >
          <i className="fas fa-plus" />
          <span>Create Event</span>
        </button>
      </div>

      {/* Events Grid */}
      {isLoading ? (
        <div className="glass-card p-12 flex items-center justify-center">
          <div className="spinner w-8 h-8" />
        </div>
      ) : events.length === 0 ? (
        <div className="glass-card p-12 flex flex-col items-center justify-center">
          <i className="fas fa-calendar text-4xl text-white/20 mb-4" />
          <p className="text-white/40">No events found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {events.map((event) => (
            <div key={event.id} className="glass-card p-6 hover:border-white/12 transition-all duration-300">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <Badge
                    variant="accent"
                    className={eventTypeColors[event.type]}
                  >
                    {event.type}
                  </Badge>
                  <h3 className="font-display font-bold text-xl text-white mt-3">
                    {event.title}
                  </h3>
                  <p className="text-sm text-white/60 mt-2 line-clamp-2">
                    {event.description}
                  </p>
                </div>
              </div>

              {/* Meta Information */}
              <div className="space-y-3 mt-4 pt-4 border-t border-white/6">
                <div className="flex items-center gap-3 text-sm text-white/60">
                  <i className="fas fa-calendar-alt w-5 text-center" />
                  <span>{new Date(event.date).toLocaleDateString('en-US', {
                    weekday: 'short',
                    month: 'short',
                    day: 'numeric',
                  })}</span>
                </div>

                <div className="flex items-center gap-3 text-sm text-white/60">
                  <i className={`fas ${event.isOnline ? 'fa-video' : 'fa-map-marker-alt'} w-5 text-center`} />
                  <span>
                    {event.isOnline ? 'Online Event' : event.location}
                  </span>
                </div>

                {event.maxAttendees && (
                  <div className="flex items-center gap-3 text-sm text-white/60">
                    <i className="fas fa-users w-5 text-center" />
                    <span>
                      {event.attendees?.length || 0} / {event.maxAttendees} attendees
                    </span>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3 mt-4 pt-4 border-t border-white/6">
                <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/20 transition-all">
                  <i className="fas fa-info-circle" />
                  <span>Details</span>
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-white/8 text-white/60 hover:text-white hover:border-white/12 transition-all">
                  <i className="fas fa-calendar-plus" />
                  <span>
                    {event.attendees?.length > 0 ? 'Leave' : 'Join'}
                  </span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create Event Modal Placeholder */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="glass-card w-full max-w-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display font-bold text-xl text-white">Create Event</h2>
              <button
                onClick={() => setShowCreateModal(false)}
                className="w-8 h-8 rounded-lg hover:bg-white/10 flex items-center justify-center text-white/40 hover:text-white transition-colors"
              >
                <i className="fas fa-times" />
              </button>
            </div>
            <p className="text-white/40">Event creation form would go here...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventsPage;
