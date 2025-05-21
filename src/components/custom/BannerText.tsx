"use client";

import { motion, useAnimation } from 'framer-motion';
import { useEffect } from 'react';

const sentenceVariants = {
  hidden: { opacity: 1 }, // Stays visible, orchestrates children
  visible: {
    opacity: 1,
    transition: {
      delay: 0.5, // Delay before animation starts
      staggerChildren: 0.15, // Time between each child animation (appearance)
      delayChildren: 0.2,    // Delay before children start their 'exit' animation
      staggerDirection: 1    // Forwards for appearance
    },
  },
  exit: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      staggerDirection: -1 // Backwards for disappearance, or adjust logic
    }
  }
};

const wordVariants = {
  hidden: { opacity: 0, x: -20, transition: { duration: 0.3, ease: "easeOut" } },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
  exit: { opacity: 0, x: 20, transition: { duration: 0.4, ease: "easeIn" } }
};

export default function BannerText({ slogan }: { slogan: string }) {
  const words = slogan.split(' ');
  const controls = useAnimation();

  useEffect(() => {
    const sequence = async () => {
      // eslint-disable-next-line no-constant-condition
      while (true) {
        await controls.start('visible');
        // Simplified wait:
        // Consider wordVariants.visible.transition.duration (0.5s)
        // and sentenceVariants.visible.transition.staggerChildren (0.15s)
        // Total time for all words to appear: delay (0.5) + (words.length * staggerChildren (0.15)) + last word duration (0.5)
        // Exit: staggerChildren (0.1) + last word exit duration (0.4)
        const visibleDuration = (sentenceVariants.visible.transition.delay || 0) * 1000 + 
                                (words.length * (sentenceVariants.visible.transition.staggerChildren || 0)) * 1000 +
                                (wordVariants.visible.transition.duration || 0) * 1000;
        await new Promise(resolve => setTimeout(resolve, visibleDuration + 500)); // Hold visible a bit longer

        await controls.start('exit');
        const exitDuration = (words.length * (sentenceVariants.exit.transition.staggerChildren || 0)) * 1000 +
                             (wordVariants.exit.transition.duration || 0) * 1000;
        await new Promise(resolve => setTimeout(resolve, exitDuration + 500)); // Hold exited a bit longer
        
        await controls.start('hidden'); 
        await new Promise(resolve => setTimeout(resolve, 100)); // Brief pause
      }
    };
    if (slogan && words.length > 0) {
      sequence();
    }
  }, [controls, slogan, words.length]);

  return (
    <div className="banner-text py-8 text-center">
      <motion.h1
        className="text-3xl font-sans font-light mb-4 flex flex-wrap justify-center min-h-[3em]" // Added min-h for layout stability
        variants={sentenceVariants}
        initial="hidden"
        animate={controls}
        aria-label={slogan} // For accessibility
      >
        {words.map((word, index) => (
          <motion.span
            key={`${word}-${index}`} // More robust key
            variants={wordVariants}
            className="mr-2" // Tailwind class for margin-right: 0.5rem (adjust if space is part of word)
          >
            {word}
          </motion.span>
        ))}
      </motion.h1>
    </div>
  );
}
