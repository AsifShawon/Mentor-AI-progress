'use client';

import { motion } from 'framer-motion';
import { PageLayout } from '@/components/layout/page-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, Clock, Calendar, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

const roadmapPhases = [
  {
    phase: 'Phase 1',
    title: 'Foundation & Core Development',
    period: 'Jan 2025 - Mar 2025',
    status: 'in-progress',
    progress: 65,
    milestones: [
      { title: 'Project Architecture Setup', status: 'completed', date: 'Jan 15, 2025' },
      { title: 'LLM Integration & RAG Implementation', status: 'in-progress', date: 'Feb 1, 2025' },
      { title: 'User Authentication System', status: 'in-progress', date: 'Feb 15, 2025' },
      { title: 'Basic Memory System', status: 'planned', date: 'Mar 1, 2025' }
    ]
  },
  {
    phase: 'Phase 2',
    title: 'Intelligence & Personalization',
    period: 'Mar 2025 - May 2025',
    status: 'planned',
    progress: 0,
    milestones: [
      { title: 'Adaptive Learning Algorithm', status: 'planned', date: 'Mar 15, 2025' },
      { title: 'Web Scraping Module', status: 'planned', date: 'Apr 1, 2025' },
      { title: 'Advanced Memory Profiles', status: 'planned', date: 'Apr 15, 2025' },
      { title: 'Feedback Loop Implementation', status: 'planned', date: 'May 1, 2025' }
    ]
  },
  {
    phase: 'Phase 3',
    title: 'Enhanced Features & Multimodal',
    period: 'May 2025 - Jul 2025',
    status: 'planned',
    progress: 0,
    milestones: [
      { title: 'Voice Input Integration', status: 'planned', date: 'May 15, 2025' },
      { title: 'Image Processing Capabilities', status: 'planned', date: 'Jun 1, 2025' },
      { title: 'Advanced Analytics Dashboard', status: 'planned', date: 'Jun 15, 2025' },
      { title: 'Assessment Generation Engine', status: 'planned', date: 'Jul 1, 2025' }
    ]
  },
  {
    phase: 'Phase 4',
    title: 'Scaling & Optimization',
    period: 'Jul 2025 - Sep 2025',
    status: 'planned',
    progress: 0,
    milestones: [
      { title: 'Performance Optimization', status: 'planned', date: 'Jul 15, 2025' },
      { title: 'Mobile Application Development', status: 'planned', date: 'Aug 1, 2025' },
      { title: 'Multi-language Support', status: 'planned', date: 'Aug 15, 2025' },
      { title: 'Beta Testing Program', status: 'planned', date: 'Sep 1, 2025' }
    ]
  },
  {
    phase: 'Phase 5',
    title: 'Launch & Community',
    period: 'Sep 2025 - Dec 2025',
    status: 'planned',
    progress: 0,
    milestones: [
      { title: 'Public Beta Release', status: 'planned', date: 'Sep 15, 2025' },
      { title: 'Community Features', status: 'planned', date: 'Oct 1, 2025' },
      { title: 'Teacher Dashboard', status: 'planned', date: 'Nov 1, 2025' },
      { title: 'Official Launch', status: 'planned', date: 'Dec 1, 2025' }
    ]
  }
];

const statusConfig = {
  completed: { icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-200' },
  'in-progress': { icon: Clock, color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200' },
  planned: { icon: Calendar, color: 'text-gray-600', bg: 'bg-gray-50', border: 'border-gray-200' },
  blocked: { icon: AlertCircle, color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200' }
};

export default function RoadmapPage() {
  return (
    <PageLayout
      title="Development Roadmap"
      description="Follow our journey from concept to launch with detailed milestones and timelines"
    >
      {/* Timeline Overview */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Project Timeline</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A comprehensive 12-month development plan divided into strategic phases
            </p>
          </motion.div>

          <div className="space-y-8">
            {roadmapPhases.map((phase, index) => {
              const config = statusConfig[phase.status as keyof typeof statusConfig];
              const Icon = config.icon;

              return (
                <motion.div
                  key={phase.phase}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className={cn("hover:shadow-lg transition-all duration-300", config.border)}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className={cn("p-3 rounded-full", config.bg)}>
                            <Icon className={cn("w-6 h-6", config.color)} />
                          </div>
                          <div>
                            <Badge variant="outline" className="mb-2">
                              {phase.phase}
                            </Badge>
                            <CardTitle className="text-xl">{phase.title}</CardTitle>
                            <CardDescription className="text-base">{phase.period}</CardDescription>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-blue-600 mb-1">
                            {phase.progress}%
                          </div>
                          <Progress value={phase.progress} className="w-24" />
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {phase.milestones.map((milestone, milestoneIndex) => {
                          const milestoneConfig = statusConfig[milestone.status as keyof typeof statusConfig];
                          const MilestoneIcon = milestoneConfig.icon;

                          return (
                            <motion.div
                              key={milestone.title}
                              initial={{ opacity: 0, y: 20 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.4, delay: milestoneIndex * 0.1 }}
                              viewport={{ once: true }}
                              className={cn(
                                "p-4 rounded-lg border",
                                milestoneConfig.bg,
                                milestoneConfig.border
                              )}
                            >
                              <div className="flex items-start space-x-3">
                                <MilestoneIcon className={cn("w-5 h-5 mt-0.5", milestoneConfig.color)} />
                                <div className="flex-1">
                                  <h4 className="font-medium text-sm">{milestone.title}</h4>
                                  <p className="text-xs text-muted-foreground mt-1">{milestone.date}</p>
                                </div>
                              </div>
                            </motion.div>
                          );
                        })}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Key Metrics */}
      <section className="py-16 px-4 bg-white/50">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Development Metrics</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Key performance indicators tracking our progress toward launch
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: 'Total Milestones', value: '20', progress: 25, color: 'bg-blue-500' },
              { label: 'Completed', value: '5', progress: 65, color: 'bg-green-500' },
              { label: 'In Progress', value: '3', progress: 45, color: 'bg-yellow-500' },
              { label: 'Planned', value: '12', progress: 15, color: 'bg-gray-500' }
            ].map((metric, index) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <Card className="text-center hover:shadow-lg transition-all duration-300">
                  <CardContent className="pt-6">
                    <div className={`w-12 h-12 ${metric.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                      <span className="text-white font-bold">{metric.value}</span>
                    </div>
                    <h3 className="font-semibold mb-2">{metric.label}</h3>
                    <Progress value={metric.progress} className="mt-2" />
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