'use client'

import { motion, useAnimation } from 'framer-motion'
import { useEffect } from 'react'

export default function BannerText({ slogan }: { slogan: string }) {
  const WORD_APPEAR_DURATION = 2
  const WORD_EXIT_DURATION = 0.4
  const WORD_X_OFFSET = 20
  const WORD_APPEAR_EASE = 'easeOut'
  const WORD_EXIT_EASE = 'easeIn'

  const STAGGER_CHILDREN_APPEAR = 0.15
  const STAGGER_CHILDREN_EXIT = 0.1

  const SENTENCE_INITIAL_DELAY = 2.5
  const SENTENCE_VISIBLE_HOLD_ADDITIONAL = 0.5
  const SENTENCE_EXIT_HOLD_ADDITIONAL = 0.5
  const SENTENCE_LOOP_RESTART_PAUSE = 0.1

  const LOOP_ANIMATION = true

  const sentenceVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        delay: SENTENCE_INITIAL_DELAY,
        staggerChildren: STAGGER_CHILDREN_APPEAR,
        delayChildren: 0.2,
        staggerDirection: 1,
      },
    },
    exit: {
      opacity: 1,
      transition: {
        staggerChildren: STAGGER_CHILDREN_EXIT,
        staggerDirection: -1,
      },
    },
  }

  const wordVariants = {
    hidden: {
      opacity: 0,
      x: -WORD_X_OFFSET,
      transition: { duration: WORD_APPEAR_DURATION, ease: WORD_APPEAR_EASE },
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: WORD_APPEAR_DURATION, ease: WORD_APPEAR_EASE },
    },
    exit: {
      opacity: 0,
      x: WORD_X_OFFSET,
      transition: { duration: WORD_EXIT_DURATION, ease: WORD_EXIT_EASE },
    },
  }

  const words = slogan?.split(' ') || []
  const controls = useAnimation()

  useEffect(() => {
    const sequence = async () => {
      await controls.start('visible')
      const visibleDurationMs =
        SENTENCE_INITIAL_DELAY * 1000 +
        words.length * STAGGER_CHILDREN_APPEAR * 1000 +
        WORD_APPEAR_DURATION * 1000 +
        SENTENCE_VISIBLE_HOLD_ADDITIONAL * 1000
      await new Promise((resolve) =>
        setTimeout(resolve, visibleDurationMs - SENTENCE_INITIAL_DELAY * 1000),
      )

      await controls.start('exit')
      const exitDurationMs =
        words.length * STAGGER_CHILDREN_EXIT * 1000 +
        WORD_EXIT_DURATION * 1000 +
        SENTENCE_EXIT_HOLD_ADDITIONAL * 1000
      await new Promise((resolve) => setTimeout(resolve, exitDurationMs))

      await controls.start('hidden')
      await new Promise((resolve) => setTimeout(resolve, SENTENCE_LOOP_RESTART_PAUSE * 1000))
    }

    const loopedSequence = async () => {
      // eslint-disable-next-line no-constant-condition
      while (true) {
        await sequence()
      }
    }

    if (slogan && words.length > 0) {
      if (LOOP_ANIMATION) {
        loopedSequence()
      } else {
        sequence()
      }
    }
  }, [
    controls,
    slogan,
    words,
    LOOP_ANIMATION,
    SENTENCE_INITIAL_DELAY,
    STAGGER_CHILDREN_APPEAR,
    WORD_APPEAR_DURATION,
    SENTENCE_VISIBLE_HOLD_ADDITIONAL,
    STAGGER_CHILDREN_EXIT,
    WORD_EXIT_DURATION,
    SENTENCE_EXIT_HOLD_ADDITIONAL,
    SENTENCE_LOOP_RESTART_PAUSE,
  ])

  return (
    <div className="banner-text py-8 text-center">
      <motion.h1
        className="text-3xl font-sans font-light mb-4 flex flex-wrap justify-center min-h-[3em]"
        variants={sentenceVariants}
        initial="hidden"
        animate={controls}
        aria-label={slogan}
      >
        {words.map((word, index) => (
          <motion.span key={`${word}-${index}`} variants={wordVariants} className="mr-2">
            {word}
          </motion.span>
        ))}
      </motion.h1>
    </div>
  )
}
