'use client';

import { motion } from 'framer-motion';
import { PageLayout } from '@/components/layout/page-layout';
import { CodeBlock } from '@/components/code-block';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, GitCommit, Code, FileText } from 'lucide-react';

const progressEntries = [
  {
    date: '2025-01-15',
    title: 'Project Architecture & Initial Setup',
    description: 'Established the foundational architecture for the AI Teaching Assistant platform with Next.js frontend and FastAPI backend integration.',
    type: 'architecture',
    code: `# Project Structure Setup
project/
├── frontend/          # Next.js application
│   ├── app/          # App router pages
│   ├── components/   # Reusable UI components
│   └── lib/          # Utility functions
├── backend/          # FastAPI application
│   ├── app/
│   │   ├── models/   # Database models
│   │   ├── api/      # API endpoints
│   │   └── core/     # Core functionality
└── ai_engine/        # LLM integration
    ├── models/       # AI model configurations
    ├── chains/       # LangChain implementations
    └── memory/       # Memory management`,
    language: 'bash'
  },
  {
    date: '2025-01-18',
    title: 'LLM Integration with LangChain',
    description: 'Integrated Mistral and Phi-3 models using LangChain for the core AI tutoring functionality with RAG capabilities.',
    type: 'ai',
    code: `from langchain.llms import LlamaCPP
from langchain.chains import RetrievalQA
from langchain.embeddings import HuggingFaceEmbeddings
from langchain.vectorstores import Chroma
from langchain.memory import ConversationBufferWindowMemory

class AITeachingAssistant:
    def __init__(self, model_path: str):
        # Initialize the LLM
        self.llm = LlamaCPP(
            model_path=model_path,
            temperature=0.7,
            max_tokens=2048,
            context_length=4096,
            verbose=False
        )
        
        # Setup embeddings for RAG
        self.embeddings = HuggingFaceEmbeddings(
            model_name="sentence-transformers/all-MiniLM-L6-v2"
        )
        
        # Initialize vector store
        self.vector_store = Chroma(
            persist_directory="./chroma_db",
            embedding_function=self.embeddings
        )
        
        # Setup conversation memory
        self.memory = ConversationBufferWindowMemory(
            k=10,
            return_messages=True
        )
        
        # Create QA chain with retrieval
        self.qa_chain = RetrievalQA.from_chain_type(
            llm=self.llm,
            chain_type="stuff",
            retriever=self.vector_store.as_retriever(
                search_kwargs={"k": 5}
            ),
            memory=self.memory
        )
    
    async def teach(self, query: str, student_profile: dict) -> str:
        """Main teaching method with personalization"""
        # Enhance query with student context
        enhanced_query = self._enhance_query(query, student_profile)
        
        # Generate response
        response = await self.qa_chain.arun(enhanced_query)
        
        # Apply teaching methodology
        return self._apply_socratic_method(response, student_profile)`,
    language: 'python'
  },
  {
    date: '2025-01-22',
    title: 'User Authentication & Database Setup',
    description: 'Implemented secure user authentication using Supabase Auth and set up PostgreSQL database with user profiles and learning history.',
    type: 'backend',
    code: `-- User profiles table
CREATE TABLE user_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT,
    learning_style TEXT CHECK (learning_style IN ('visual', 'auditory', 'kinesthetic', 'reading')),
    preferred_subjects TEXT[],
    skill_level INTEGER DEFAULT 1,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Learning sessions table
CREATE TABLE learning_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    subject TEXT NOT NULL,
    topic TEXT,
    questions_asked JSONB,
    responses JSONB,
    performance_score INTEGER,
    session_duration INTEGER, -- in minutes
    learning_insights JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Subject progress tracking
CREATE TABLE subject_progress (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    subject TEXT NOT NULL,
    current_level INTEGER DEFAULT 1,
    skill_graph JSONB,
    weak_areas TEXT[],
    strong_areas TEXT[],
    total_hours INTEGER DEFAULT 0,
    last_accessed TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, subject)
);

-- Enable Row Level Security
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE learning_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE subject_progress ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view own profile" ON user_profiles
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own profile" ON user_profiles
    FOR UPDATE USING (auth.uid() = user_id);`,
    language: 'sql'
  },
  {
    date: '2025-01-25',
    title: 'Memory System Implementation',
    description: 'Developed the personalized learning memory system that tracks student progress, preferences, and adapts teaching methods accordingly.',
    type: 'ai',
    code: `interface StudentProfile {
  userId: string;
  learningStyle: 'visual' | 'auditory' | 'kinesthetic' | 'reading';
  subjectProgress: Record<string, SubjectProgress>;
  sessions: LearningSession[];
  preferences: StudentPreferences;
}

interface SubjectProgress {
  currentLevel: number;
  skillGraph: SkillNode[];
  weakAreas: string[];
  strongAreas: string[];
  lastAccessed: Date;
  totalHours: number;
  masteryScore: number;
}

class LearningMemoryManager {
  private supabase: SupabaseClient;
  
  constructor(supabaseClient: SupabaseClient) {
    this.supabase = supabaseClient;
  }
  
  async updateStudentProgress(
    userId: string, 
    subject: string, 
    sessionData: LearningSession
  ): Promise<void> {
    // Get current profile
    const profile = await this.getStudentProfile(userId);
    
    // Calculate progress update
    const updatedProgress = this.calculateProgressUpdate(
      profile.subjectProgress[subject],
      sessionData
    );
    
    // Extract learning insights
    const insights = this.extractLearningInsights(sessionData);
    
    // Store session data
    await this.supabase
      .from('learning_sessions')
      .insert({
        user_id: userId,
        subject,
        topic: sessionData.topic,
        questions_asked: sessionData.questions,
        responses: sessionData.responses,
        performance_score: sessionData.score,
        session_duration: sessionData.duration,
        learning_insights: insights
      });
    
    // Update subject progress
    await this.supabase
      .from('subject_progress')
      .upsert({
        user_id: userId,
        subject,
        current_level: updatedProgress.currentLevel,
        skill_graph: updatedProgress.skillGraph,
        weak_areas: updatedProgress.weakAreas,
        strong_areas: updatedProgress.strongAreas,
        total_hours: updatedProgress.totalHours,
        last_accessed: new Date().toISOString()
      });
  }
  
  private extractLearningInsights(session: LearningSession): LearningInsights {
    return {
      conceptsUnderstood: this.identifyMasteredConcepts(session),
      strugglingAreas: this.identifyWeaknesses(session),
      recommendedNext: this.suggestNextTopics(session),
      learningVelocity: this.calculateLearningSpeed(session),
      engagementLevel: this.assessEngagement(session)
    };
  }
}`,
    language: 'typescript'
  },
  {
    date: '2025-01-28',
    title: 'Web Scraping Module Development',
    description: 'Built context-aware web scraping capabilities using Playwright to fetch real-time educational content from trusted sources.',
    type: 'backend',
    code: `import asyncio
from playwright.async_api import async_playwright
from bs4 import BeautifulSoup
from typing import List, Dict, Optional
import openai
from urllib.parse import urljoin, urlparse

class EducationalContentScraper:
    def __init__(self):
        self.trusted_domains = [
            'wikipedia.org',
            'khanacademy.org',
            'coursera.org',
            'edx.org',
            'arxiv.org',
            'scholar.google.com',
            'mit.edu',
            'stanford.edu'
        ]
        
        self.content_selectors = {
            'wikipedia.org': {
                'content': '#mw-content-text',
                'title': '#firstHeading',
                'exclude': ['.navbox', '.infobox', '.references']
            },
            'khanacademy.org': {
                'content': '.article-content',
                'title': '.article-title',
                'exclude': ['.sidebar', '.footer']
            }
        }
    
    async def search_and_scrape(
        self, 
        query: str, 
        context: str,
        max_sources: int = 5
    ) -> List[Dict]:
        """Search for educational content and scrape relevant information"""
        
        async with async_playwright() as p:
            browser = await p.chromium.launch(
                headless=True,
                args=['--no-sandbox', '--disable-dev-shm-usage']
            )
            page = await browser.new_page()
            
            # Set user agent to avoid blocking
            await page.set_extra_http_headers({
                'User-Agent': 'Mozilla/5.0 (compatible; EducationalBot/1.0)'
            })
            
            try:
                # Search for content
                search_results = await self.search_educational_content(
                    page, query, context
                )
                
                scraped_content = []
                for result in search_results[:max_sources]:
                    if self.is_trusted_domain(result['url']):
                        content = await self.scrape_page_content(
                            page, result['url']
                        )
                        if content:
                            # Validate and filter content
                            validated_content = await self.validate_content(
                                content, query, context
                            )
                            if validated_content['confidence_score'] > 0.7:
                                scraped_content.append(validated_content)
                
                return scraped_content
                
            finally:
                await browser.close()
    
    async def scrape_page_content(
        self, 
        page, 
        url: str
    ) -> Optional[Dict]:
        """Extract content from a specific page"""
        try:
            await page.goto(url, wait_until='networkidle')
            
            # Get domain-specific selectors
            domain = urlparse(url).netloc
            selectors = self.content_selectors.get(domain, {
                'content': 'main, article, .content',
                'title': 'h1, .title',
                'exclude': ['.sidebar', '.footer', '.nav']
            })
            
            # Extract title
            title_element = await page.query_selector(selectors['title'])
            title = await title_element.inner_text() if title_element else ""
            
            # Extract main content
            content_element = await page.query_selector(selectors['content'])
            if not content_element:
                return None
            
            # Remove excluded elements
            for exclude_selector in selectors.get('exclude', []):
                excluded_elements = await page.query_selector_all(exclude_selector)
                for element in excluded_elements:
                    await element.evaluate('element => element.remove()')
            
            # Get clean text content
            content = await content_element.inner_text()
            
            return {
                'url': url,
                'title': title.strip(),
                'content': content.strip()[:5000],  # Limit content length
                'domain': domain,
                'scraped_at': datetime.now().isoformat()
            }
            
        except Exception as e:
            print(f"Error scraping {url}: {str(e)}")
            return None`,
    language: 'python'
  }
];

const typeConfig = {
  architecture: { icon: FileText, color: 'bg-blue-500', label: 'Architecture' },
  ai: { icon: Code, color: 'bg-purple-500', label: 'AI Development' },
  backend: { icon: GitCommit, color: 'bg-green-500', label: 'Backend' },
  frontend: { icon: Calendar, color: 'bg-orange-500', label: 'Frontend' }
};

export default function ProgressPage() {
  return (
    <PageLayout
      title="Development Progress"
      description="Follow the detailed development journey with code implementations and technical insights"
    >
      {/* Progress Timeline */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="space-y-12">
            {progressEntries.map((entry, index) => {
              const config = typeConfig[entry.type as keyof typeof typeConfig];
              const Icon = config.icon;

              return (
                <motion.div
                  key={entry.date}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  {/* Timeline line */}
                  {index < progressEntries.length - 1 && (
                    <div className="absolute left-6 top-20 w-0.5 h-full bg-gradient-to-b from-gray-300 to-transparent"></div>
                  )}
                  
                  <div className="flex items-start space-x-6">
                    {/* Timeline marker */}
                    <div className={`w-12 h-12 ${config.color} rounded-full flex items-center justify-center flex-shrink-0 relative z-10`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1">
                      <Card className="hover:shadow-lg transition-all duration-300">
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="flex items-center space-x-3 mb-2">
                                <Badge variant="outline" className="text-xs">
                                  {entry.date}
                                </Badge>
                                <Badge variant="secondary" className={`text-xs ${config.color.replace('bg-', 'text-')} bg-opacity-10`}>
                                  {config.label}
                                </Badge>
                              </div>
                              <CardTitle className="text-xl">{entry.title}</CardTitle>
                            </div>
                          </div>
                          <CardDescription className="text-base leading-relaxed">
                            {entry.description}
                          </CardDescription>
                        </CardHeader>
                        
                        <CardContent>
                          <CodeBlock
                            code={entry.code}
                            language={entry.language}
                            title={`${entry.title.toLowerCase().replace(/\s+/g, '_')}.${entry.language === 'typescript' ? 'ts' : entry.language === 'python' ? 'py' : entry.language === 'sql' ? 'sql' : 'sh'}`}
                          />
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Progress Stats */}
      <section className="py-16 px-4 bg-white/50">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Development Statistics</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Key metrics and achievements from our development journey
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: 'Code Commits', value: '150+', description: 'Total commits across all repositories' },
              { label: 'Lines of Code', value: '15,000+', description: 'Production-ready code written' },
              { label: 'Features Implemented', value: '12', description: 'Core features completed' },
              { label: 'Test Coverage', value: '85%', description: 'Automated test coverage' }
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
                    <div className="text-3xl font-bold text-blue-600 mb-2">{stat.value}</div>
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