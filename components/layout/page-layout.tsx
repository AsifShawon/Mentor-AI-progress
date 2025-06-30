'use client';

import { motion } from 'framer-motion';
import { Navigation } from '@/components/navigation';

interface PageLayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

export function PageLayout({ children, title, description }: PageLayoutProps) {
  return (
    <div className="min-h-screen bg-cyber-gradient cyber-grid">
      <Navigation />
      
      <main className="pt-16">
        {(title || description) && (
          <section className="py-16 px-4">
            <div className="container mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                {title && (
                  <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-6 font-rubik">
                    {title}
                  </h1>
                )}
                {description && (
                  <p className="text-xl text-blue-200 max-w-3xl mx-auto font-silkscreen">
                    {description}
                  </p>
                )}
              </motion.div>
            </div>
          </section>
        )}
        
        {children}
      </main>
    </div>
  );
}