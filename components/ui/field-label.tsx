import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle } from 'lucide-react';

interface FieldLabelProps {
  label: string;
  tooltip?: string;
  required?: boolean;
}

export function FieldLabel({ label, tooltip, required }: FieldLabelProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="flex items-center gap-2 mb-1.5">
      <span className="text-xs font-bold uppercase tracking-widest text-gray-400">
        {label}
        {required && <span className="text-temple-red ml-1">*</span>}
      </span>
      {tooltip && (
        <div className="relative">
          <button
            type="button"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            onClick={() => setShowTooltip(!showTooltip)}
            className="tooltip-trigger"
            aria-label={`Ayuda: ${label}`}
          >
            <HelpCircle size={12} />
          </button>
          <AnimatePresence>
            {showTooltip && (
              <motion.div
                initial={{ opacity: 0, y: 5, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 5, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50 w-64 p-3 bg-temple-navy border border-temple-gold/30 rounded-xl text-xs text-gray-300 leading-relaxed shadow-2xl"
              >
                {tooltip}
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-2 h-2 bg-temple-navy border-r border-b border-temple-gold/30 rotate-45 -mt-1"></div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
