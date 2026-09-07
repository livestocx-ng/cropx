'use client';

import { motion } from 'framer-motion';
import { useReducedMotion } from '@mantine/hooks';

interface ScrollRevealProps {
  children: React.ReactNode;
  /** Stagger index, for revealing a group in sequence. */
  index?: number;
  /** Distance in pixels the element rises as it fades in. */
  rise?: number;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Shared fade-and-rise on scroll.
 *
 * Honours prefers-reduced-motion by rendering the content static: an
 * image-heavy page with motion on every panel is genuinely unpleasant for
 * people with vestibular sensitivity.
 */
export function ScrollReveal({ children, index = 0, rise = 24, className, style }: ScrollRevealProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0, y: rise }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, ease: 'easeOut', delay: Math.min(index * 0.08, 0.4) }}
    >
      {children}
    </motion.div>
  );
}
