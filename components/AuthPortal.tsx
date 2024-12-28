'use client';

import { useState, useEffect } from 'react';
import { Github, Moon, Sun } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AuthPortal() {
  const [darkMode, setDarkMode] = useState<boolean>(
    () => window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
  );

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className="w-full max-w-md">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.01 }}
        className="bg-white dark:bg-gray-800 shadow-xl rounded-lg overflow-hidden"
      >
        <div className="p-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Git_Notes
            </h1>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Create, manage, and save your notes directly to your GitHub account with Git_Notes.
          </p>
          <button
            onClick={() => console.log('github')}
            className="w-full bg-gray-900 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded-md flex items-center justify-center mb-4 transition duration-300"
          >
            <Github className="mr-2" size={20} />
            Log in with GitHub
          </button>
          <button
            onClick={() => console.log('github')}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-md flex items-center justify-center transition duration-300"
          >
            <Github className="mr-2" size={20} />
            Sign up with GitHub
          </button>
        </div>
        <div className="bg-gray-100 dark:bg-gray-700 px-8 py-4">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Your GitHub data is secure. We only request the necessary scopes for notes management.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
