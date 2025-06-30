'use client';

import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Github, ExternalLink, Brain, Sparkles } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-blue-400/20 to-purple-600/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-gradient-to-r from-pink-400/20 to-orange-600/20 rounded-full blur-3xl"
        />
      </div>

      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Badge 
            variant="secondary" 
            className="mb-6 px-4 py-2 text-sm font-medium bg-gradient-to-r from-blue-600/10 to-purple-600/10 border border-blue-200"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            AI-Powered Education Platform
          </Badge>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-6"
        >
          Autonomous AI
          <br />
          Teaching Assistant
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed"
        >
          Democratizing personalized education through advanced AI. 
          A fully autonomous teaching assistant that adapts, learns, and grows with each student.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
        >
          <Button size="lg" className="px-8 py-4 text-lg">
            <Brain className="w-5 h-5 mr-2" />
            View Progress
          </Button>
          <Button variant="outline" size="lg" className="px-8 py-4 text-lg">
            <Github className="w-5 h-5 mr-2" />
            Source Code
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
        >
          <div className="text-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-blue-50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4"
            >
              <Brain className="w-8 h-8 text-blue-600" />
            </motion.div>
            <h3 className="text-lg font-semibold mb-2">Personalized Learning</h3>
            <p className="text-muted-foreground">AI adapts to individual learning styles and pace</p>
          </div>
          
          <div className="text-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-purple-50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4"
            >
              <Sparkles className="w-8 h-8 text-purple-600" />
            </motion.div>
            <h3 className="text-lg font-semibold mb-2">Self-Improving</h3>
            <p className="text-muted-foreground">Continuously learns and improves from interactions</p>
          </div>
          
          <div className="text-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-green-50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4"
            >
              <ExternalLink className="w-8 h-8 text-green-600" />
            </motion.div>
            <h3 className="text-lg font-semibold mb-2">Real-time Knowledge</h3>
            <p className="text-muted-foreground">Fetches latest information from trusted sources</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}