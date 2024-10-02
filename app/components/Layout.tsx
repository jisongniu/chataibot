'use client';

import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Navbar from './Navbar';
import ChatInterface from './ChatInterface';

const Layout: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
      <Head>
        <title>Apple风格AI聊天</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />
      <main className="container mx-auto px-4 py-8 bg-apple-gray dark:bg-gray-900">
        <ChatInterface />
      </main>
    </div>
  );
};

export default Layout;