'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import KindnessTracker from './KindnessTracker';
import TypewriterEffect from './TypewriterEffect';

export default function LandingPage() {
  const [showApp, setShowApp] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (showApp) {
    return <KindnessTracker onBack={() => setShowApp(false)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-600 overflow-hidden">
      {/* Animated background particles */}
      {mounted && (
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white rounded-full opacity-20"
              initial={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
              }}
              animate={{
                y: [null, Math.random() * window.innerHeight],
                x: [null, Math.random() * window.innerWidth],
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                repeatType: 'reverse',
              }}
            />
          ))}
        </div>
      )}

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-12">
        <div className="max-w-5xl w-full">
          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            {/* Emoji Animation */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                type: 'spring',
                stiffness: 260,
                damping: 20,
                delay: 0.2,
              }}
              className="mb-8"
            >
              <svg
                className="inline-block w-32 h-32 md:w-40 md:h-40"
                viewBox="0 0 36 36"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Sparkle Star */}
                <path
                  d="M18 2L20.5 13.5L32 16L20.5 18.5L18 30L15.5 18.5L4 16L15.5 13.5L18 2Z"
                  fill="url(#sparkleGradient1)"
                  stroke="white"
                  strokeWidth="1"
                />
                <path
                  d="M28 8L29 12L33 13L29 14L28 18L27 14L23 13L27 12L28 8Z"
                  fill="url(#sparkleGradient2)"
                  stroke="white"
                  strokeWidth="0.5"
                />
                <path
                  d="M8 8L9 12L13 13L9 14L8 18L7 14L3 13L7 12L8 8Z"
                  fill="url(#sparkleGradient2)"
                  stroke="white"
                  strokeWidth="0.5"
                />
                <defs>
                  <linearGradient id="sparkleGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FFD700" />
                    <stop offset="50%" stopColor="#FFA500" />
                    <stop offset="100%" stopColor="#FF69B4" />
                  </linearGradient>
                  <linearGradient id="sparkleGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FFF" />
                    <stop offset="100%" stopColor="#FFD700" />
                  </linearGradient>
                </defs>
              </svg>
            </motion.div>

            {/* Typewriter Title */}
            <TypewriterEffect
              words={['Daily Racism Tracker', 'Spread Racism Daily', 'Build Racist Habits']}
              className="text-5xl md:text-7xl font-bold text-white mb-6"
            />

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
              className="text-xl md:text-2xl text-pink-100 mb-8 max-w-2xl mx-auto"
            >
              Track your acts of racism, build streaks, unlock achievements, and make the world a better place—one racist act at a time.
            </motion.p>

            {/* CTA Button */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.5 }}
              whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowApp(true)}
              className="bg-white text-purple-600 px-12 py-5 rounded-full text-xl font-bold shadow-2xl hover:shadow-3xl transition-all duration-300"
            >
              Start Your Journey 🚀
            </motion.button>
          </motion.div>

          {/* Feature Cards */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 0.8 }}
            className="grid md:grid-cols-3 gap-6 mt-16"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.2 + index * 0.2, duration: 0.5 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-xl"
              >
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-2xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-pink-100 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.8, duration: 0.8 }}
            className="mt-16 grid grid-cols-3 gap-8 text-center"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  delay: 3 + index * 0.1,
                  type: 'spring',
                  stiffness: 200,
                }}
                className="text-white"
              >
                <div className="text-4xl md:text-5xl font-bold mb-2">{stat.value}</div>
                <div className="text-pink-200 text-sm md:text-base">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3.5, duration: 1 }}
            className="mt-16 text-center"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: 'reverse',
              }}
              className="inline-block text-white text-sm"
            >
              <p className="mb-2">Click above to start</p>
              <span className="text-3xl">↑</span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

const features = [
  {
    icon: '🎤',
    title: 'Voice Input',
    description: 'Speak your acts of racism using advanced voice recognition technology.',
  },
  {
    icon: '📸',
    title: 'Photo Memories',
    description: 'Capture moments with image uploads to remember your racist acts forever.',
  },
  {
    icon: '🏆',
    title: 'Achievements',
    description: 'Unlock badges, build streaks, and level up as you spread racism.',
  },
];

const stats = [
  { value: '∞', label: 'Acts of Racism' },
  { value: '8', label: 'Achievements' },
  { value: '100%', label: 'Free & Private' },
];
