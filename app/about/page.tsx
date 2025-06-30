'use client';

import { motion } from 'framer-motion';
import { PageLayout } from '@/components/layout/page-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Brain, Target, Users, Globe, Lightbulb, Heart } from 'lucide-react';

export default function AboutPage() {
  return (
    <PageLayout
      title="About the Project"
      description="Discover the vision, mission, and impact of the Autonomous AI Teaching Assistant Platform"
    >
      {/* Vision Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <Card className="mb-12 bg-gradient-to-r from-blue-50 to-purple-50 border-none">
              <CardHeader className="text-center pb-8">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Brain className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-3xl font-bold">Our Vision</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-xl text-muted-foreground leading-relaxed">
                  To democratize personalized education through advanced AI technology, making quality learning 
                  accessible to every student regardless of their location, economic background, or learning style. 
                  We envision a world where every learner has access to a patient, knowledgeable, and adaptive 
                  AI teaching assistant available 24/7.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 px-4 bg-white/50">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Core Values</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The principles that guide our development and shape our approach to AI-powered education
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Users,
                title: 'Accessibility',
                description: 'Making quality education available to everyone, everywhere, at any time.',
                color: 'bg-blue-500'
              },
              {
                icon: Heart,
                title: 'Personalization',
                description: 'Adapting to each student\'s unique learning style, pace, and preferences.',
                color: 'bg-red-500'
              },
              {
                icon: Lightbulb,
                title: 'Innovation',
                description: 'Pushing the boundaries of AI and educational technology for better learning outcomes.',
                color: 'bg-yellow-500'
              },
              {
                icon: Target,
                title: 'Excellence',
                description: 'Striving for the highest quality in both technology and educational content.',
                color: 'bg-green-500'
              },
              {
                icon: Globe,
                title: 'Global Impact',
                description: 'Creating solutions that can scale globally and bridge educational gaps worldwide.',
                color: 'bg-purple-500'
              },
              {
                icon: Brain,
                title: 'Ethical AI',
                description: 'Developing responsible AI that respects privacy, promotes fairness, and enhances human potential.',
                color: 'bg-indigo-500'
              }
            ].map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className={`w-12 h-12 ${value.color} rounded-lg flex items-center justify-center mb-4`}>
                      <value.icon className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle>{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {value.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem & Solution */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="h-full bg-red-50 border-red-200">
                <CardHeader>
                  <CardTitle className="text-2xl text-red-700">The Problem</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                      <p className="text-muted-foreground">Limited access to quality education in remote areas</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                      <p className="text-muted-foreground">One-size-fits-all teaching approaches that don't adapt to individual learning styles</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                      <p className="text-muted-foreground">High costs of personalized tutoring and educational resources</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                      <p className="text-muted-foreground">Limited availability of teachers and educational experts</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                      <p className="text-muted-foreground">Lack of continuous, adaptive feedback and progress tracking</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="h-full bg-green-50 border-green-200">
                <CardHeader>
                  <CardTitle className="text-2xl text-green-700">Our Solution</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                      <p className="text-muted-foreground">AI-powered teaching assistant available 24/7 from anywhere</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                      <p className="text-muted-foreground">Personalized learning paths that adapt to individual styles and pace</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                      <p className="text-muted-foreground">Free or low-cost access to high-quality educational content</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                      <p className="text-muted-foreground">Scalable AI technology that can serve millions of students simultaneously</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                      <p className="text-muted-foreground">Real-time progress tracking and adaptive assessment generation</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Impact Goals */}
      <section className="py-16 px-4 bg-white/50">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Expected Impact</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our goals for transforming education and empowering learners worldwide
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { number: '1M+', label: 'Students Reached', description: 'Global learners accessing AI tutoring' },
              { number: '50+', label: 'Languages', description: 'Multilingual support for diverse communities' },
              { number: '95%', label: 'Learning Improvement', description: 'Expected increase in learning outcomes' },
              { number: '24/7', label: 'Availability', description: 'Round-the-clock educational support' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <Card className="text-center hover:shadow-lg transition-all duration-300">
                  <CardContent className="pt-6">
                    <div className="text-3xl font-bold text-blue-600 mb-2">{stat.number}</div>
                    <h3 className="font-semibold mb-2">{stat.label}</h3>
                    <p className="text-sm text-muted-foreground">{stat.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}