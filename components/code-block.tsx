'use client';

import { motion, AnimatePresence } from 'framer-motion';
// Reverted import paths to original ESM for react-syntax-highlighter
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Copy, Maximize2, X } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
// Import the necessary Shadcn UI components for the dialog
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';

interface CodeBlockProps {
  code: string;
  language: string;
  title?: string;
  className?: string;
}

export function CodeBlock({ code, language, title, className }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  // State to control the visibility of the full code modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to copy code to clipboard
  const copyToClipboard = async () => {
    // Using document.execCommand('copy') for better compatibility in iframe environments
    const textarea = document.createElement('textarea');
    textarea.value = code;
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand('copy');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset copied state after 2 seconds
    } catch (err) {
      console.error('Failed to copy text: ', err);
      // Fallback for environments where execCommand is not allowed
      // You might want to display a message to the user that copying failed
    } finally {
      document.body.removeChild(textarea);
    }
  };

  return (
    <>
      {/* Main Code Block Component */}
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
            {/* Traffic light indicators */}
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
          </div>
          
          {/* Title of the code block */}
          {title && (
            <div className="text-blue-200 text-sm font-medium truncate flex-1 text-center font-bitcount">
              {title}
            </div>
          )}
          
          {/* Action buttons: Copy and Maximize */}
          <div className="flex items-center space-x-2 relative"> {/* Added relative for copied animation positioning */}
            <button
              onClick={copyToClipboard}
              className="p-1.5 hover:bg-slate-700 rounded text-blue-300 hover:text-blue-100 transition-colors glow-blue flex items-center gap-1"
              title="Copy code"
            >
              <Copy size={14} />
              <span className="text-sm">Copy</span>
            </button>
            {/* Maximize button: opens the modal to show full code */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="p-1.5 hover:bg-slate-700 rounded text-blue-300 hover:text-blue-100 transition-colors"
              title="Maximize"
            >
              <Maximize2 size={14} />
            </button>

            {/* "Copied!" feedback animation for main code block */}
            <AnimatePresence>
              {copied && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="absolute top-5 -translate-x-1/2 -translate-y-1/2 bg-green-600 text-white px-3 py-1 rounded-md text-sm font-silkscreen glow-blue whitespace-nowrap"
                >
                  Copied!
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        
        {/* Code content display */}
        <div className="relative">
          <SyntaxHighlighter
            language={language}
            style={{
              ...oneDark,
              'pre[class*="language-"]': {
                ...oneDark['pre[class*="language-"]'],
                background: 'rgb(15, 23, 42)', // Custom background for pre tag
              },
              'code[class*="language-"]': {
                ...oneDark['code[class*="language-"]'],
                background: 'rgb(15, 23, 42)', // Custom background for code tag
                fontFamily: 'Courier Prime, monospace', // Custom font for code
              }
            }}
            customStyle={{
              margin: 0,
              padding: '1.5rem',
              background: 'rgb(15, 23, 42)', // Overall background for the highlighter
              fontSize: '14px',
              lineHeight: '1.5',
              fontFamily: 'Bitcount Grid Double, monospace' // Custom font for the entire block
            }}
            showLineNumbers={true} // Display line numbers
            lineNumberStyle={{
              color: '#64748b', // Color for line numbers
              fontSize: '12px',
              paddingRight: '1rem',
              fontFamily: 'Bitcount Grid Double, monospace' // Font for line numbers
            }}
          >
            {code}
          </SyntaxHighlighter>
        </div>
      </motion.div>

      {/* Modal for full code view */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent
          className="max-w-4xl h-[90vh] p-0 overflow-hidden flex flex-col"
        >
          {/* Modal Header */}
          <DialogHeader className="p-4 border-b border-blue-500/20 bg-slate-800 flex flex-row items-center justify-between relative" >
            <div className="flex flex-col text-left">
              <DialogTitle className="text-blue-200 font-rubik">
                {title || "Full Code View"}
              </DialogTitle>
              <DialogDescription className="text-blue-300 font-silkscreen">
            {language}
          </DialogDescription>
        </div>

        {/* Copy and Close Buttons in Modal Header */}
        <div className="flex items-center space-x-2 relative mr-6">
          <button
            onClick={copyToClipboard}
            className="p-1.5 hover:bg-slate-700 rounded text-blue-300 hover:text-blue-100 transition-colors glow-blue flex items-center gap-1"
            title="Copy code"
          >
            <Copy size={14} />
            <span className="text-sm">Copy</span>
          </button>
          {/* Custom Close button for the modal (optional, currently commented out) */}
          {/* <button
            onClick={() => setIsModalOpen(false)}
            className="p-1.5 hover:bg-slate-700 rounded text-blue-300 hover:text-blue-100 transition-colors"
            title="Close"
          >
            <X size={14} />
          </button> */}

          {/* "Copied!" feedback animation for modal */}
          <AnimatePresence>
            {copied && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute top-6 -translate-x-1/2 -translate-y-1/2 bg-green-600 text-white px-3 py-1 rounded-md text-sm font-silkscreen glow-blue whitespace-nowrap"
          >
            Copied!
          </motion.div>
            )}
          </AnimatePresence>
        </div>
          </DialogHeader>
          
          {/* Scrollable area for code content */}
          <ScrollArea className="flex-1 h-full">
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
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </>
  );
}
