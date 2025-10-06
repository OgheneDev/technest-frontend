import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, Info, XCircle, X } from 'lucide-react';

type ToastType = 'success' | 'error' | 'info' | 'warning';

interface ToastProps {
  show: boolean;
  message: string;
  type?: ToastType;
  onClose?: () => void;
  duration?: number;
}

const toastStyles: Record<ToastType, { bg: string; border: string; icon: any }> = {
  success: {
    bg: 'bg-emerald-500/10 backdrop-blur-xl',
    border: 'border-emerald-500/30',
    icon: CheckCircle2
  },
  error: {
    bg: 'bg-red-500/10 backdrop-blur-xl',
    border: 'border-red-500/30',
    icon: XCircle
  },
  warning: {
    bg: 'bg-amber-500/10 backdrop-blur-xl',
    border: 'border-amber-500/30',
    icon: AlertCircle
  },
  info: {
    bg: 'bg-blue-500/10 backdrop-blur-xl',
    border: 'border-blue-500/30',
    icon: Info
  }
};

const iconColors: Record<ToastType, string> = {
  success: 'text-emerald-400',
  error: 'text-red-400',
  warning: 'text-amber-400',
  info: 'text-blue-400'
};

export const Toast = ({ 
  show, 
  message, 
  type = 'success',
  onClose,
  duration = 3000 
}: ToastProps) => {
  const style = toastStyles[type];
  const IconComponent = style.icon;

  React.useEffect(() => {
    if (show && duration > 0) {
      const timer = setTimeout(() => {
        onClose?.();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [show, duration, onClose]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95, x: '-50%' }}
          animate={{ 
            opacity: 1, 
            y: 0, 
            scale: 1, 
            x: '-50%',
            transition: {
              type: 'spring',
              stiffness: 500,
              damping: 30
            }
          }}
          exit={{ 
            opacity: 0, 
            y: 20, 
            scale: 0.95, 
            x: '-50%',
            transition: {
              duration: 0.2
            }
          }}
          className={`fixed bottom-6 left-1/2 transform ${style.bg} ${style.border} border backdrop-blur-xl text-white px-5 py-4 rounded-2xl shadow-2xl z-50 min-w-[320px] max-w-md`}
        >
          <div className="flex items-center gap-3">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ 
                scale: 1, 
                rotate: 0,
                transition: {
                  type: 'spring',
                  stiffness: 400,
                  damping: 20,
                  delay: 0.1
                }
              }}
            >
              <IconComponent className={`w-5 h-5 ${iconColors[type]} flex-shrink-0`} />
            </motion.div>
            
            <p className="text-sm font-medium text-gray-100 flex-1 leading-relaxed">
              {message}
            </p>
            
            {onClose && (
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="text-gray-400 hover:text-white cursor-pointer transition-colors flex-shrink-0 ml-2"
                aria-label="Close notification"
              >
                <X className="w-4 h-4" />
              </motion.button>
            )}
          </div>
          
          {duration > 0 && (
            <motion.div
              initial={{ scaleX: 1 }}
              animate={{ scaleX: 0 }}
              transition={{ duration: duration / 1000, ease: 'linear' }}
              className={`absolute bottom-0 left-0 h-0.5 ${iconColors[type].replace('text', 'bg')} w-full origin-left rounded-full`}
              style={{ transformOrigin: 'left' }}
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};