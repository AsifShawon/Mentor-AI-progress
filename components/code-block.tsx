'use client';

import { motion } from 'framer-motion';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Copy, Minimize2, Maximize2, X } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface CodeBlockProps {
  code: string;
  language: string;
  title?: string;
  className?: string;
}

export function CodeBlock({ code, language, title, className }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "bg-slate-900 rounded-lg overflow-hidden shadow-2xl border border-blue-500/20 glow-blue",
        className
      )}
    >
      {/* Mac-style window header */}
      <div className="flex items-center justify-between bg-slate-800 px-4 py-3 border-b border-blue-500/20">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
        </div>
        
        {title && (
          <div className="text-blue-200 text-sm font-medium truncate flex-1 text-center font-bitcount">
            {title}
          </div>
        )}
        
        <div className="flex items-center space-x-2">
          <button
            onClick={copyToClipboard}
            className="p-1.5 hover:bg-slate-700 rounded text-blue-300 hover:text-blue-100 transition-colors glow-blue"
            title="Copy code"
          >
            <Copy size={14} />
          </button>
          <button className="p-1.5 hover:bg-slate-700 rounded text-blue-300 hover:text-blue-100 transition-colors">
            <Minimize2 size={14} />
          </button>
          <button className="p-1.5 hover:bg-slate-700 rounded text-blue-300 hover:text-blue-100 transition-colors">
            <Maximize2 size={14} />
          </button>
          <button className="p-1.5 hover:bg-slate-700 rounded text-blue-300 hover:text-blue-100 transition-colors">
            <X size={14} />
          </button>
        </div>
      </div>
      
      {/* Code content */}
      <div className="relative">
        <SyntaxHighlighter
          language={language}
          style={{
            ...oneDark,
            'pre[class*="language-"]': {
              ...oneDark['pre[class*="language-"]'],
              background: 'rgb(15, 23, 42)',
            },
            'code[class*="language-"]': {
              ...oneDark['code[class*="language-"]'],
              background: 'rgb(15, 23, 42)',
              fontFamily: 'Courier Prime, monospace',
            }
          }}
          customStyle={{
            margin: 0,
            padding: '1.5rem',
            background: 'rgb(15, 23, 42)',
            fontSize: '14px',
            lineHeight: '1.5',
            fontFamily: 'Bitcount Grid Double, monospace'
          }}
          showLineNumbers={true}
          lineNumberStyle={{
            color: '#64748b',
            fontSize: '12px',
            paddingRight: '1rem',
            fontFamily: 'Bitcount Grid Double, monospace'
          }}
        >
          {code}
        </SyntaxHighlighter>
        
        {copied && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute top-4 right-4 bg-green-600 text-white px-3 py-1 rounded-md text-sm font-silkscreen glow-blue"
          >
            Copied!
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}