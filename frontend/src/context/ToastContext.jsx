import { createContext, useContext, useCallback } from 'react';
import { createRoot } from 'react-dom/client';
import Toast from '../components/ui/Toast';

/**
 * ToastContext - Manages toast notifications
 * Provides success, error, and info notification methods
 */

const ToastContext = createContext(null);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

// Toast container element
let toastContainer = null;
let toastRoot = null;

/**
 * Create toast container if it doesn't exist
 */
const ensureContainer = () => {
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'toast-container';
    toastContainer.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 9999;
      display: flex;
      flex-direction: column;
      gap: 10px;
    `;
    document.body.appendChild(toastContainer);
    toastRoot = createRoot(toastContainer);
  }
  return toastContainer;
};

/**
 * Add a toast notification
 */
const addToast = (message, type = 'info', duration = 3500) => {
  const container = ensureContainer();

  // Create toast element
  const toastElement = document.createElement('div');

  // Render toast component
  toastRoot.render(
    <Toast
      message={message}
      type={type}
      onClose={() => {
        toastElement.remove();
      }}
      duration={duration}
    />
  );

  container.appendChild(toastElement);
};

export const ToastProvider = ({ children }) => {
  /**
   * Show success toast
   */
  const success = useCallback((message) => {
    addToast(message, 'success');
  }, []);

  /**
   * Show error toast
   */
  const error = useCallback((message) => {
    addToast(message, 'error');
  }, []);

  /**
   * Show info toast
   */
  const info = useCallback((message) => {
    addToast(message, 'info');
  }, []);

  const value = { success, error, info };

  return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>;
};
