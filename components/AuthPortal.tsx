'use client';

import { useState, useEffect } from 'react';
import { Github, Moon, Sun } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function AuthPortal() {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  
  const router = useRouter();

  useEffect(() => {
    // Check if the URL contains a "code" query parameter
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    if (code) {
      // Send the "code" to your API to fetch the access token
      axios.get(`/api/auth/callback?code=${code}`)
        .then((response) => response.data())
        .then((data) => {
          if (data.access_token) {
            // On success, redirect to the dashboard
            router.push('/dashboard');
          } else {
            // Handle error
            console.error("Access token not found", data.error);
          }
        })
        .catch((error) => {
          console.error("Error fetching access token", error);
        });
    }
  }, [router]);

    // Check for dark mode after component mounts (client-side)
    useEffect(() => {
      if (typeof window !== 'undefined' && window.matchMedia) {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setDarkMode(prefersDark);
      }
    }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [darkMode]);

  const scope = 'repo user user:email'

  const githubUrl = `https://github.com/login/oauth/authorize?scope=${scope}&client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}`;

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
          {/* <a href={`https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}&scope=${process.env.GITHUB_SCOPE}`}>
          <button
            
            className="w-full bg-gray-900 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-md flex items-center justify-center mb-4 transition duration-300"
          >
            <Github className="mr-2" size={20} />
            Log in with GitHub
          </button>
          </a> */}

          <a href={githubUrl}>
          <button
            onClick={() => console.log('github')}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-md flex items-center justify-center transition duration-300"
          >
            <Github className="mr-2" size={20} />
            Sign up with GitHub
          </button>
          </a>
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
