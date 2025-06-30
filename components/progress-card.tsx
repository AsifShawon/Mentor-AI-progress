'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { CalendarDays, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Milestone {
  id: string;
  title: string;
  description: string;
  progress: number;
  status: 'completed' | 'in-progress' | 'planned' | 'blocked';
  dueDate?: string;
  completedDate?: string;
  tags: string[];
}

interface ProgressCardProps {
  milestone: Milestone;
  index: number;
}

const statusConfig = {
  completed: {
    icon: CheckCircle,
    color: 'bg-green-500',
    textColor: 'text-green-700',
    bgColor: 'bg-green-50',
    badge: 'bg-green-100 text-green-800'
  },
  'in-progress': {
    icon: Clock,
    color: 'bg-blue-500',
    textColor: 'text-blue-700',
    bgColor: 'bg-blue-50',
    badge: 'bg-blue-100 text-blue-800'
  },
  planned: {
    icon: CalendarDays,
    color: 'bg-gray-500',
    textColor: 'text-gray-700',
    bgColor: 'bg-gray-50',
    badge: 'bg-gray-100 text-gray-800'
  },
  blocked: {
    icon: AlertCircle,
    color: 'bg-red-500',
    textColor: 'text-red-700',
    bgColor: 'bg-red-50',
    badge: 'bg-red-100 text-red-800'
  }
};

export function ProgressCard({ milestone, index }: ProgressCardProps) {
  const config = statusConfig[milestone.status];
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        ease: "easeOut"
      }}
      whileHover={{ 
        y: -8,
        transition: { duration: 0.2 }
      }}
    >
      <Card className={cn(
        "h-full transition-all duration-300 hover:shadow-xl border-l-4",
        config.color.replace('bg-', 'border-l-')
      )}>
        <CardHeader className="pb-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              <div className={cn(
                "p-2 rounded-lg",
                config.bgColor
              )}>
                <Icon className={cn("h-5 w-5", config.textColor)} />
              </div>
              <div>
                <CardTitle className="text-lg font-semibold">
                  {milestone.title}
                </CardTitle>
                <Badge 
                  variant="secondary" 
                  className={cn("mt-1", config.badge)}
                >
                  {milestone.status.replace('-', ' ')}
                </Badge>
              </div>
            </div>
            <div className="text-right text-sm text-muted-foreground">
              {milestone.completedDate ? (
                <div>Completed: {milestone.completedDate}</div>
              ) : milestone.dueDate ? (
                <div>Due: {milestone.dueDate}</div>
              ) : null}
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <CardDescription className="text-base leading-relaxed">
            {milestone.description}
          </CardDescription>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="font-medium">Progress</span>
              <span className="text-muted-foreground">{milestone.progress}%</span>
            </div>
            <Progress 
              value={milestone.progress} 
              className="h-2"
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            {milestone.tags.map((tag) => (
              <Badge 
                key={tag} 
                variant="outline" 
                className="text-xs"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}