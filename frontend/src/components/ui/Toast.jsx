import { useEffect, useState } from 'react';

/**
 * Toast Component - Displays notification messages
 * @param {string} message - Toast message
 * @param {string} type - Type: success, error, info
 * @param {function} onClose - Callback when toast is dismissed
 * @param {number} duration - Auto-dismiss duration in ms
 */
const Toast = ({ message, type = 'info', onClose, duration = 3500 }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300); // Wait for exit animation
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const iconMap = {
    success: <i className="fas fa-check-circle" />,
    error: <i className="fas fa-times-circle" />,
    info: <i className="fas fa-info-circle" />,
  };

  const colorMap = {
    success: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
    error: 'bg-red-500/10 border-red-500/30 text-red-400',
    info: 'bg-indigo-500/10 border-indigo-500/30 text-indigo-400',
  };

  return (
    <div
      className={`toast px-4 py-3 rounded-lg border backdrop-blur-md flex items-center gap-3 min-w-[300px] max-w-[400px] ${
        isVisible ? 'translate-x-0 opacity-100' : 'translate-x-[120%] opacity-0'
      } transition-all duration-300 ease-out ${colorMap[type]}`}
    >
      <span className="text-lg">{iconMap[type]}</span>
      <span className="text-sm font-medium flex-1">{message}</span>
      <button
        onClick={() => {
          setIsVisible(false);
          setTimeout(onClose, 300);
        }}
        className="hover:opacity-70 transition-opacity"
      >
        <i className="fas fa-times" />
      </button>
    </div>
  );
};

export default Toast;
