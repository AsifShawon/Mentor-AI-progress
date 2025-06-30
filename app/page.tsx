'use client';

import { motion } from 'framer-motion';
import { PageLayout } from '@/components/layout/page-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Brain, Sparkles, Target, Code, CalendarDays, Rocket, ArrowRight, Github, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <PageLayout>
      {/* Hero Section */}
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
              className="mb-6 px-4 py-2 text-sm font-medium bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-400/30 text-blue-200 font-silkscreen"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              AI-Powered Education Platform
            </Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold gradient-text mb-6 font-rubik"
          >
            Autonomous AI
            <br />
            Teaching Assistant
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-blue-200 mb-8 max-w-3xl mx-auto leading-relaxed font-silkscreen"
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
            <Link href="/progress">
              <Button size="lg" className="px-8 py-4 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 glow-blue font-silkscreen">
                <Brain className="w-5 h-5 mr-2" />
                View Progress
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="px-8 py-4 text-lg border-blue-400/30 text-blue-200 hover:bg-blue-500/10 font-silkscreen">
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
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-blue-500/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 glow-blue"
              >
                <Brain className="w-8 h-8 text-blue-400" />
              </motion.div>
              <h3 className="text-lg font-semibold mb-2 text-blue-100 font-rubik">Personalized Learning</h3>
              <p className="text-blue-300 font-silkscreen">AI adapts to individual learning styles and pace</p>
            </div>
            
            <div className="text-center">
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-purple-500/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 glow-purple"
              >
                <Sparkles className="w-8 h-8 text-purple-400" />
              </motion.div>
              <h3 className="text-lg font-semibold mb-2 text-blue-100 font-rubik">Self-Improving</h3>
              <p className="text-blue-300 font-silkscreen">Continuously learns and improves from interactions</p>
            </div>
            
            <div className="text-center">
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-green-500/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 glow-blue"
              >
                <ExternalLink className="w-8 h-8 text-green-400" />
              </motion.div>
              <h3 className="text-lg font-semibold mb-2 text-blue-100 font-rubik">Real-time Knowledge</h3>
              <p className="text-blue-300 font-silkscreen">Fetches latest information from trusted sources</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-16 px-4 bg-slate-900/50">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Target, title: 'Current Phase', value: 'Development', color: 'bg-blue-500' },
              { icon: Code, title: 'Lines of Code', value: '15,000+', color: 'bg-green-500' },
              { icon: CalendarDays, title: 'Timeline', value: '6 Months', color: 'bg-purple-500' },
              { icon: Rocket, title: 'Progress', value: '45%', color: 'bg-orange-500' }
            ].map((stat, index) => (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <Card className="text-center hover:shadow-lg transition-all duration-300 bg-slate-800/50 border-blue-500/20 glow-blue">
                  <CardContent className="pt-6">
                    <div className={`w-12 h-12 ${stat.color} rounded-full flex items-center justify-center mx-auto mb-4 glow-blue`}>
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-sm text-blue-300 mb-1 font-silkscreen">{stat.title}</h3>
                    <p className="text-2xl font-bold text-blue-100 font-rubik">{stat.value}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Navigation */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4 gradient-text font-rubik">Explore the Project</h2>
            <p className="text-lg text-blue-200 max-w-2xl mx-auto font-silkscreen">
              Dive deeper into the development journey, features, and technical implementation
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'About Project',
                description: 'Learn about the vision, goals, and impact of the AI Teaching Assistant',
                href: '/about',
                icon: Brain,
                color: 'from-blue-500 to-blue-600'
              },
              {
                title: 'Roadmap',
                description: 'Explore the development timeline and upcoming milestones',
                href: '/roadmap',
                icon: CalendarDays,
                color: 'from-purple-500 to-purple-600'
              },
              {
                title: 'Features',
                description: 'Discover the powerful capabilities and unique features',
                href: '/features',
                icon: Sparkles,
                color: 'from-green-500 to-green-600'
              },
              {
                title: 'Progress',
                description: 'View detailed development progress with code implementations',
                href: '/progress',
                icon: Code,
                color: 'from-orange-500 to-orange-600'
              }
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
              >
                <Link href={item.href}>
                  <Card className="h-full hover:shadow-xl transition-all duration-300 cursor-pointer group bg-slate-800/50 border-blue-500/20 glow-blue">
                    <CardHeader>
                      <div className={`w-12 h-12 bg-gradient-to-r ${item.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 glow-blue`}>
                        <item.icon className="w-6 h-6 text-white" />
                      </div>
                      <CardTitle className="group-hover:text-blue-400 transition-colors text-blue-100 font-rubik">
                        {item.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base text-blue-300 font-silkscreen">
                        {item.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}