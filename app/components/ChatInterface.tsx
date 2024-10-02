'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });

      if (!response.ok) throw new Error('API请求失败');

      const data = await response.json();
      setMessages(prev => [...prev, data]);
    } catch (error) {
      console.error('Error:', error);
      // 处理错误,例如显示错误消息
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {messages.map((message, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-2 p-4 rounded-lg ${
              message.role === 'user' ? 'ml-auto bg-apple-blue text-white' : 'mr-auto bg-white dark:bg-gray-800'
            }`}
          >
            <ReactMarkdown 
              rehypePlugins={[rehypeRaw]}
              components={{
                p: ({...props}) => <p className="mb-3" {...props} />,
                h1: ({...props}) => <h1 className="text-2xl font-bold mb-3" {...props} />,
                h2: ({...props}) => <h2 className="text-xl font-bold mb-2" {...props} />,
                h3: ({...props}) => <h3 className="text-lg font-bold mb-2" {...props} />,
                ul: ({...props}) => <ul className="list-disc list-inside mb-3" {...props} />,
                ol: ({...props}) => <ol className="list-decimal list-inside mb-3" {...props} />,
                li: ({...props}) => <li className="mb-1" {...props} />,
                code: ({inline, ...props}: {inline?: boolean} & React.HTMLProps<HTMLElement>) => 
                  inline ? (
                    <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded" {...props} />
                  ) : (
                    <code className="block bg-gray-200 dark:bg-gray-700 p-2 rounded mb-3" {...props} />
                  ),
              }}
            >
              {message.content}
            </ReactMarkdown>
          </motion.div>
        ))}
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-gray-500"
          >
            正在思考...
          </motion.div>
        )}
      </div>
      <form onSubmit={handleSubmit} className="p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <div className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 p-2 rounded-full border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-apple-blue"
            placeholder="输入消息..."
            disabled={isLoading}
          />
          <button
            type="submit"
            className="px-4 py-2 bg-apple-blue text-white rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            disabled={isLoading}
          >
            发送
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatInterface;