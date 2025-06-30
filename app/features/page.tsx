'use client';

import { motion } from 'framer-motion';
import { PageLayout } from '@/components/layout/page-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Brain, 
  Users, 
  Globe, 
  Mic, 
  Eye, 
  BarChart3, 
  Shield, 
  Zap,
  BookOpen,
  MessageSquare,
  Target,
  Lightbulb
} from 'lucide-react';

const featureCategories = [
  {
    title: 'Core AI Features',
    description: 'Advanced artificial intelligence capabilities that power personalized learning',
    features: [
      {
        icon: Brain,
        title: 'LLM-Powered Tutoring',
        description: 'Advanced language models fine-tuned for educational content and Socratic questioning',
        status: 'in-development',
        color: 'from-blue-500 to-blue-600'
      },
      {
        icon: Target,
        title: 'Adaptive Learning',
        description: 'AI algorithms that adapt teaching methods based on student performance and preferences',
        status: 'planned',
        color: 'from-purple-500 to-purple-600'
      },
      {
        icon: Lightbulb,
        title: 'Self-Improving System',
        description: 'Continuous learning from student interactions to improve teaching effectiveness',
        status: 'planned',
        color: 'from-yellow-500 to-yellow-600'
      }
    ]
  },
  {
    title: 'Personalization Engine',
    description: 'Tailored learning experiences that adapt to individual student needs',
    features: [
      {
        icon: Users,
        title: 'Learning Style Detection',
        description: 'Automatically identifies and adapts to visual, auditory, kinesthetic, and reading preferences',
        status: 'in-development',
        color: 'from-green-500 to-green-600'
      },
      {
        icon: BookOpen,
        title: 'Personal Memory Profiles',
        description: 'Maintains detailed learning history, progress, and preferences for each student',
        status: 'in-development',
        color: 'from-indigo-500 to-indigo-600'
      },
      {
        icon: BarChart3,
        title: 'Progress Tracking',
        description: 'Comprehensive analytics and insights into learning patterns and achievements',
        status: 'planned',
        color: 'from-pink-500 to-pink-600'
      }
    ]
  },
  {
    title: 'Knowledge & Content',
    description: 'Dynamic content generation and real-time knowledge acquisition',
    features: [
      {
        icon: Globe,
        title: 'Web Knowledge Retrieval',
        description: 'Context-aware web scraping from trusted educational sources for up-to-date information',
        status: 'in-development',
        color: 'from-cyan-500 to-cyan-600'
      },
      {
        icon: MessageSquare,
        title: 'RAG Implementation',
        description: 'Retrieval-Augmented Generation for accurate, contextual responses with source citations',
        status: 'in-development',
        color: 'from-orange-500 to-orange-600'
      },
      {
        icon: Zap,
        title: 'Dynamic Assessment',
        description: 'Automatic generation of quizzes, tests, and practice problems tailored to student level',
        status: 'planned',
        color: 'from-red-500 to-red-600'
      }
    ]
  },
  {
    title: 'Multimodal Capabilities',
    description: 'Support for various input and output modalities for enhanced learning',
    features: [
      {
        icon: Mic,
        title: 'Voice Interaction',
        description: 'Speech-to-text input and text-to-speech output for natural conversation',
        status: 'planned',
        color: 'from-teal-500 to-teal-600'
      },
      {
        icon: Eye,
        title: 'Visual Processing',
        description: 'Image recognition, OCR, and diagram analysis for visual learning materials',
        status: 'planned',
        color: 'from-violet-500 to-violet-600'
      },
      {
        icon: Shield,
        title: 'Secure Authentication',
        description: 'Robust user authentication and privacy protection for student data',
        status: 'in-development',
        color: 'from-emerald-500 to-emerald-600'
      }
    ]
  }
];

const statusConfig = {
  'completed': { label: 'Completed', color: 'bg-green-100 text-green-800' },
  'in-development': { label: 'In Development', color: 'bg-blue-100 text-blue-800' },
  'planned': { label: 'Planned', color: 'bg-gray-100 text-gray-800' }
};

export default function FeaturesPage() {
  return (
    <PageLayout
      title="Platform Features"
      description="Explore the comprehensive capabilities that make our AI Teaching Assistant revolutionary"
    >
      {/* Feature Categories */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="space-y-16">
            {featureCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold mb-4">{category.title}</h2>
                  <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    {category.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {category.features.map((feature, featureIndex) => (
                    <motion.div
                      key={feature.title}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: featureIndex * 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{ y: -8 }}
                    >
                      <Card className="h-full hover:shadow-xl transition-all duration-300 group">
                        <CardHeader>
                          <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                            <feature.icon className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex items-center justify-between">
                            <CardTitle className="group-hover:text-blue-600 transition-colors">
                              {feature.title}
                            </CardTitle>
                            <Badge 
                              variant="secondary" 
                              className={statusConfig[feature.status as keyof typeof statusConfig].color}
                            >
                              {statusConfig[feature.status as keyof typeof statusConfig].label}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <CardDescription className="text-base leading-relaxed">
                            {feature.description}
                          </CardDescription>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Comparison */}
      <section className="py-16 px-4 bg-white/50">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Why Choose Our AI Tutor?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              See how our platform compares to traditional learning methods
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="text-xl text-red-600">Traditional Learning</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    'Fixed schedules and limited availability',
                    'One-size-fits-all teaching approach',
                    'High costs for personalized tutoring',
                    'Limited access to diverse resources',
                    'Slow adaptation to learning needs',
                    'Geographic and economic barriers'
                  ].map((item, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                      <p className="text-muted-foreground">{item}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border-green-200 bg-green-50">
                <CardHeader>
                  <CardTitle className="text-xl text-green-600">AI Teaching Assistant</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    '24/7 availability from anywhere',
                    'Personalized learning paths for each student',
                    'Free or low-cost access to quality education',
                    'Unlimited access to global knowledge base',
                    'Real-time adaptation to learning progress',
                    'Accessible to anyone with internet connection'
                  ].map((item, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                      <p className="text-muted-foreground">{item}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}