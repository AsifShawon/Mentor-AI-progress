'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Brain, 
  Database, 
  Globe, 
  Shield, 
  Zap, 
  BarChart3,
  Cpu,
  Server
} from 'lucide-react';

interface TechCategory {
  title: string;
  icon: React.ComponentType<any>;
  color: string;
  technologies: string[];
}

const techStack: TechCategory[] = [
  {
    title: 'Frontend',
    icon: Globe,
    color: 'bg-blue-500',
    technologies: ['Next.js', 'Tailwind CSS', 'shadcn/ui', 'Framer Motion']
  },
  {
    title: 'LLM Engine',
    icon: Brain,
    color: 'bg-purple-500',
    technologies: ['Mistral', 'Phi-3', 'LLaMA', 'LangChain', 'LangGraph']
  },
  {
    title: 'Backend',
    icon: Server,
    color: 'bg-green-500',
    technologies: ['FastAPI', 'LangServe', 'Python', 'Node.js']
  },
  {
    title: 'Database',
    icon: Database,
    color: 'bg-orange-500',
    technologies: ['Supabase', 'PostgreSQL', 'pgvector', 'Redis']
  },
  {
    title: 'Authentication',
    icon: Shield,
    color: 'bg-red-500',
    technologies: ['Supabase Auth', 'Firebase Auth', 'JWT', 'OAuth']
  },
  {
    title: 'AI/ML',
    icon: Cpu,
    color: 'bg-indigo-500',
    technologies: ['RAG', 'RLHF', 'Whisper', 'CLIP', 'Vector Search']
  },
  {
    title: 'Web Scraping',
    icon: Zap,
    color: 'bg-yellow-500',
    technologies: ['Playwright', 'Puppeteer', 'BeautifulSoup', 'Scrapy']
  },
  {
    title: 'Monitoring',
    icon: BarChart3,
    color: 'bg-pink-500',
    technologies: ['Prometheus', 'Grafana', 'PostHog', 'Sentry']
  }
];

export function TechStack() {
  return (
    <section className="py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl font-bold mb-4">Technology Stack</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Built with cutting-edge technologies to ensure scalability, performance, and reliability
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {techStack.map((category, index) => {
          const Icon = category.icon;
          return (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.1,
                ease: "easeOut"
              }}
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
            >
              <Card className="h-full hover:shadow-lg transition-all duration-300">
                <CardHeader className="pb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${category.color}`}>
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    <CardTitle className="text-lg">{category.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {category.technologies.map((tech) => (
                      <Badge 
                        key={tech} 
                        variant="secondary" 
                        className="text-xs"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}