import { useLocation, useOutlet } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';

export function Layout() {
  const location = useLocation();
  const outlet = useOutlet();
  const shouldReduceMotion = useReducedMotion();

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -15 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          {outlet}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
