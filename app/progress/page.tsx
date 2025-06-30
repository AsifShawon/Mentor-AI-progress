'use client';

import { motion } from 'framer-motion';
import { PageLayout } from '@/components/layout/page-layout';
import { CodeBlock } from '@/components/code-block';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, GitCommit, Code, FileText, Brain, Database, Globe, Zap } from 'lucide-react';

const progressEntries = [
  {
    date: '2025-01-15',
    title: 'Project Architecture & Initial Setup',
    description: 'Established the foundational architecture for the AI Teaching Assistant platform with Next.js frontend and FastAPI backend integration. This setup provides a scalable foundation for the entire system.',
    details: [
      'Created modular project structure with clear separation of concerns',
      'Configured Next.js with TypeScript for type-safe development',
      'Set up FastAPI backend with proper routing and middleware',
      'Implemented development environment with hot reloading'
    ],
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
    └── memory/       # Memory management

# Development Setup Commands
npm create next-app@latest frontend --typescript --tailwind --eslint
cd backend && pip install fastapi uvicorn langchain
mkdir -p ai_engine/{models,chains,memory}`,
    language: 'bash'
  },
  {
    date: '2025-01-18',
    title: 'LLM Integration with LangChain',
    description: 'Integrated Mistral and Phi-3 models using LangChain for the core AI tutoring functionality with RAG capabilities. This forms the brain of our teaching assistant.',
    details: [
      'Implemented LangChain framework for LLM orchestration',
      'Added RAG (Retrieval-Augmented Generation) capabilities',
      'Created conversation memory management system',
      'Built Socratic questioning methodology into responses'
    ],
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
        return self._apply_socratic_method(response, student_profile)
    
    def _enhance_query(self, query: str, profile: dict) -> str:
        """Enhance query with student learning context"""
        learning_style = profile.get('learning_style', 'balanced')
        skill_level = profile.get('skill_level', 1)
        
        context = f"""
        Student Learning Context:
        - Learning Style: {learning_style}
        - Skill Level: {skill_level}/10
        - Previous Topics: {profile.get('completed_topics', [])}
        
        Original Query: {query}
        
        Please provide a response that:
        1. Matches the student's learning style
        2. Is appropriate for their skill level
        3. Uses Socratic questioning to guide learning
        4. Builds on their previous knowledge
        """
        return context`,
    language: 'python'
  },
  {
    date: '2025-01-22',
    title: 'User Authentication & Database Setup',
    description: 'Implemented secure user authentication using Supabase Auth and set up PostgreSQL database with user profiles and learning history. This enables personalized learning experiences.',
    details: [
      'Configured Supabase authentication with email/password',
      'Designed database schema for user profiles and learning data',
      'Implemented Row Level Security (RLS) for data protection',
      'Created automated session tracking and progress monitoring'
    ],
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

-- Knowledge base for RAG
CREATE TABLE knowledge_base (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    subject TEXT NOT NULL,
    topic TEXT NOT NULL,
    content TEXT NOT NULL,
    difficulty_level INTEGER DEFAULT 1,
    source_url TEXT,
    embedding vector(384), -- for similarity search
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE learning_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE subject_progress ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view own profile" ON user_profiles
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own profile" ON user_profiles
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can view own sessions" ON learning_sessions
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own sessions" ON learning_sessions
    FOR INSERT WITH CHECK (auth.uid() = user_id);`,
    language: 'sql'
  },
  {
    date: '2025-01-25',
    title: 'Memory System Implementation',
    description: 'Developed the personalized learning memory system that tracks student progress, preferences, and adapts teaching methods accordingly. This is the core of our adaptive learning engine.',
    details: [
      'Built comprehensive student profiling system',
      'Implemented learning analytics and progress tracking',
      'Created adaptive difficulty adjustment algorithms',
      'Added real-time learning insights generation'
    ],
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

interface LearningInsights {
  conceptsUnderstood: string[];
  strugglingAreas: string[];
  recommendedNext: string[];
  learningVelocity: number;
  engagementLevel: number;
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
  
  private calculateProgressUpdate(
    currentProgress: SubjectProgress,
    session: LearningSession
  ): SubjectProgress {
    // Advanced algorithm to update student progress
    const performanceWeight = session.score / 100;
    const timeWeight = Math.min(session.duration / 60, 1); // Cap at 1 hour
    
    const progressIncrease = (performanceWeight * 0.7 + timeWeight * 0.3) * 5;
    
    return {
      ...currentProgress,
      currentLevel: Math.min(currentProgress.currentLevel + progressIncrease, 100),
      totalHours: currentProgress.totalHours + (session.duration / 60),
      lastAccessed: new Date()
    };
  }
}`,
    language: 'typescript'
  },
  {
    date: '2025-01-28',
    title: 'Web Scraping Module Development',
    description: 'Built context-aware web scraping capabilities using Playwright to fetch real-time educational content from trusted sources. This ensures our AI always has access to the latest information.',
    details: [
      'Implemented headless browser automation with Playwright',
      'Created domain whitelist for trusted educational sources',
      'Built content validation and quality scoring system',
      'Added real-time knowledge base updates'
    ],
    type: 'backend',
    code: `import asyncio
from playwright.async_api import async_playwright
from bs4 import BeautifulSoup
from typing import List, Dict, Optional
import openai
from urllib.parse import urljoin, urlparse
from datetime import datetime

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
            'stanford.edu',
            'britannica.com',
            'mathworld.wolfram.com'
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
            },
            'arxiv.org': {
                'content': '.ltx_abstract, .ltx_section',
                'title': '.ltx_title',
                'exclude': ['.ltx_bibliography']
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
            return None
    
    async def validate_content(
        self, 
        content: Dict, 
        query: str, 
        context: str
    ) -> Dict:
        """Validate content quality and relevance"""
        
        # Calculate relevance score
        relevance_score = self.calculate_relevance(
            content['content'], query, context
        )
        
        # Check content quality
        quality_score = self.assess_content_quality(content['content'])
        
        # Overall confidence score
        confidence_score = (relevance_score * 0.7 + quality_score * 0.3)
        
        return {
            **content,
            'relevance_score': relevance_score,
            'quality_score': quality_score,
            'confidence_score': confidence_score
        }
    
    def is_trusted_domain(self, url: str) -> bool:
        """Check if URL is from a trusted educational domain"""
        domain = urlparse(url).netloc.lower()
        return any(trusted in domain for trusted in self.trusted_domains)`,
    language: 'python'
  }
];

const typeConfig = {
  architecture: { icon: FileText, color: 'from-blue-500 to-blue-600', label: 'Architecture', bg: 'bg-blue-500/10' },
  ai: { icon: Brain, color: 'from-purple-500 to-purple-600', label: 'AI Development', bg: 'bg-purple-500/10' },
  backend: { icon: Database, color: 'from-green-500 to-green-600', label: 'Backend', bg: 'bg-green-500/10' },
  frontend: { icon: Globe, color: 'from-orange-500 to-orange-600', label: 'Frontend', bg: 'bg-orange-500/10' }
};

export default function ProgressPage() {
  return (
    <PageLayout
      title="Development Progress"
      description="Follow the detailed development journey with code implementations and technical insights"
    >
      {/* Progress Timeline */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="space-y-16">
            {progressEntries.map((entry, index) => {
              const config = typeConfig[entry.type as keyof typeof typeConfig];
              const Icon = config.icon;
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={entry.date}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  {/* Timeline connector line */}
                  {index < progressEntries.length - 1 && (
                    <div className="absolute left-1/2 top-0 w-0.5 h-full bg-gradient-to-b from-blue-500/50 to-transparent transform -translate-x-0.5 z-0"></div>
                  )}
                  
                  {/* Timeline marker */}
                  <div className="absolute left-1/2 top-8 w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transform -translate-x-1/2 z-10 glow-blue"></div>
                  
                  <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-start ${isEven ? '' : 'lg:grid-flow-col-dense'}`}>
                    {/* Description Card */}
                    <motion.div
                      initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      viewport={{ once: true }}
                      className={`${isEven ? 'lg:pr-8' : 'lg:pl-8 lg:col-start-2'}`}
                    >
                      <Card className="h-full bg-slate-800/50 border-blue-500/20 glow-blue hover:glow-purple transition-all duration-300">
                        <CardHeader>
                          <div className="flex items-center space-x-3 mb-4">
                            <div className={`w-12 h-12 bg-gradient-to-r ${config.color} rounded-lg flex items-center justify-center glow-blue`}>
                              <Icon className="w-6 h-6 text-white" />
                            </div>
                            <div>
                              <Badge variant="outline" className="mb-2 border-blue-400/30 text-blue-200 font-bitcount">
                                {entry.date}
                              </Badge>
                              <Badge variant="secondary" className={`${config.bg} text-blue-200 border-blue-400/30 font-silkscreen`}>
                                {config.label}
                              </Badge>
                            </div>
                          </div>
                          <CardTitle className="text-2xl gradient-text font-rubik">
                            {entry.title}
                          </CardTitle>
                          <CardDescription className="text-base leading-relaxed text-blue-200 font-silkscreen">
                            {entry.description}
                          </CardDescription>
                        </CardHeader>
                        
                        <CardContent>
                          <div className="space-y-3">
                            <h4 className="font-semibold text-blue-100 font-rubik">Key Achievements:</h4>
                            <ul className="space-y-2">
                              {entry.details.map((detail, detailIndex) => (
                                <motion.li
                                  key={detailIndex}
                                  initial={{ opacity: 0, x: -20 }}
                                  whileInView={{ opacity: 1, x: 0 }}
                                  transition={{ duration: 0.4, delay: detailIndex * 0.1 }}
                                  viewport={{ once: true }}
                                  className="flex items-start space-x-3"
                                >
                                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                                  <p className="text-blue-300 text-sm font-silkscreen">{detail}</p>
                                </motion.li>
                              ))}
                            </ul>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>

                    {/* Code Block */}
                    <motion.div
                      initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                      viewport={{ once: true }}
                      className={`${isEven ? 'lg:pl-8' : 'lg:pr-8 lg:col-start-1 lg:row-start-1'}`}
                    >
                      <CodeBlock
                        code={entry.code}
                        language={entry.language}
                        title={`${entry.title.toLowerCase().replace(/\s+/g, '_')}.${entry.language === 'typescript' ? 'ts' : entry.language === 'python' ? 'py' : entry.language === 'sql' ? 'sql' : 'sh'}`}
                        className="h-full"
                      />
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Progress Stats */}
      <section className="py-16 px-4 bg-slate-900/30">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4 gradient-text font-rubik">Development Statistics</h2>
            <p className="text-lg text-blue-200 max-w-2xl mx-auto font-silkscreen">
              Key metrics and achievements from our development journey
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: 'Code Commits', value: '150+', description: 'Total commits across all repositories', icon: GitCommit },
              { label: 'Lines of Code', value: '15,000+', description: 'Production-ready code written', icon: Code },
              { label: 'Features Implemented', value: '12', description: 'Core features completed', icon: Zap },
              { label: 'Test Coverage', value: '85%', description: 'Automated test coverage', icon: FileText }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <Card className="text-center hover:shadow-lg transition-all duration-300 bg-slate-800/50 border-blue-500/20 glow-blue">
                  <CardContent className="pt-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 glow-blue">
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-3xl font-bold gradient-text mb-2 font-rubik">{stat.value}</div>
                    <h3 className="font-semibold mb-2 text-blue-100 font-silkscreen">{stat.label}</h3>
                    <p className="text-sm text-blue-300 font-silkscreen">{stat.description}</p>
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