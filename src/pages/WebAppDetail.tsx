import React, { useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ArrowLeft,
  Star,
  ExternalLink,
  Share2,
  Shield,
  Smartphone,
  ChevronLeft,
  ChevronRight,
  Check
} from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { MagneticButton } from '@/components/ui/magnetic-button';

gsap.registerPlugin(ScrollTrigger);

const webapps: Record<string, {
  name: string;
  description: string;
  longDescription: string;
  icon: string;
  rating: number;
  reviews: string;
  downloads: string;
  category: string;
  gradient: string;
  developer: string;
  version: string;
  size: string;
  features: string[];
  screenshots: string[];
  url: string;
  video?: string;
}> = {
  'nexa-fitness-web': {
    name: 'Nexa Fitness Web',
    description: 'AI-powered personal trainer with custom workout plans.',
    longDescription: 'Transform your fitness journey with Nexa Fitness Web, the most advanced AI-powered personal training web app. Get customized workout plans tailored to your goals, real-time form correction using your camera, and track your progress with detailed analytics. Whether you\'re a beginner or an athlete, Nexa Fitness adapts to you.',
    icon: '💪',
    rating: 4.9,
    reviews: '125K',
    downloads: '1.2M',
    category: 'Health & Fitness',
    gradient: 'linear-gradient(135deg, #00d4ff 0%, #7c3aed 100%)',
    developer: 'Syncro Technologies Inc.',
    version: '3.2.1',
    size: 'Web App',
    features: [
      'AI-powered workout recommendations',
      'Real-time form correction with camera',
      'Custom meal planning and nutrition tracking',
      'Integration with Apple Watch and Fitbit',
      'Offline workout support',
      'Progress tracking with detailed analytics',
    ],
    screenshots: [
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=600&fit=crop',
      'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=300&h=600&fit=crop',
      'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=300&h=600&fit=crop',
    ],
    url: 'https://nexa-fitness-web.example.com',
    video: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
  },
  'dongapatalu-web': {
    name: 'Dongapatalu Web',
    description: 'Meditation and mindfulness for inner peace.',
    longDescription: 'Find your calm with MindFlow Web, a comprehensive meditation and mindfulness web app designed to reduce stress, improve sleep, and boost mental clarity. With thousands of guided sessions led by world-renowned teachers, ambient soundscapes, and personalized recommendations, MindFlow is your sanctuary for mental wellness.',
    icon: '/apklogos/DP-APP.png',
    rating: 4.8,
    reviews: '150',
    downloads: '20',
    category: 'Music Player',
    gradient: 'linear-gradient(135deg, #7c3aed 0%, #ec4899 100%)',
    developer: 'Syncro Technologies Inc.',
    version: '1.8.0',
    size: 'Web App',
    features: [
      'Thousands of guided meditation sessions',
      'Sleep stories and ambient sounds',
      'Breathing exercises and stress relief',
      'Daily mindfulness reminders',
      'Progress tracking and streaks',
      'Offline access to favorites',
    ],
    screenshots: [
      'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=300&h=600&fit=crop',
      'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=300&h=600&fit=crop',
      'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=300&h=600&fit=crop',
    ],
    url: 'https://dongapaatalu.vercel.app/',
    video: '/webVideos/DongaPaatalu.mp4'
  },
  'taskpro-web': {
    name: 'TaskPro Web',
    description: 'Smart task management with AI prioritization.',
    longDescription: 'Supercharge your productivity with TaskPro Web, the intelligent task management web app that uses AI to help you prioritize what matters most. From personal to-dos to team projects, TaskPro keeps everything organized with smart reminders, calendar integration, and powerful collaboration features.',
    icon: '✅',
    rating: 4.7,
    reviews: '65K',
    downloads: '650K',
    category: 'Productivity',
    gradient: 'linear-gradient(135deg, #10b981 0%, #00d4ff 100%)',
    developer: 'Syncro Technologies Inc.',
    version: '4.1.2',
    size: 'Web App',
    features: [
      'AI-powered task prioritization',
      'Team collaboration and sharing',
      'Calendar and reminder integration',
      'Custom labels and categories',
      'Time tracking and reports',
      'Cross-platform sync',
    ],
    screenshots: [
      'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=300&h=600&fit=crop',
      'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=300&h=600&fit=crop',
      'https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?w=300&h=600&fit=crop',
    ],
    url: 'https://taskpro-web.example.com',
  },
  'photoai-web': {
    name: 'PhotoAI Web',
    description: 'Advanced photo editor with AI enhancement.',
    longDescription: 'Unleash your creativity with PhotoAI Web, the ultimate photo editing web app powered by artificial intelligence. From one-tap enhancements to advanced editing tools, PhotoAI makes professional-quality edits accessible to everyone. Remove backgrounds, apply stunning filters, and transform your photos with just a few taps.',
    icon: '📸',
    rating: 4.9,
    reviews: '210K',
    downloads: '2.1M',
    category: 'Photography',
    gradient: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)',
    developer: 'Syncro Technologies Inc.',
    version: '5.0.0',
    size: 'Web App',
    features: [
      'AI-powered photo enhancement',
      'Background removal and replacement',
      'Professional filters and presets',
      'Advanced retouching tools',
      'Batch editing for multiple photos',
      'Export in various formats',
    ],
    screenshots: [
      'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=300&h=600&fit=crop',
      'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=300&h=600&fit=crop',
      'https://images.unsplash.com/photo-1493863641943-9b68992a8d07?w=300&h=600&fit=crop',
    ],
    url: 'https://photoai-web.example.com',
  },
  'financeflow-web': {
    name: 'FinanceFlow Web',
    description: 'Personal finance tracker with smart insights.',
    longDescription: 'Take control of your finances with FinanceFlow Web, your personal finance companion. Track expenses, set budgets, and get smart insights into your spending habits. With automatic categorization and investment tracking, FinanceFlow helps you make smarter financial decisions every day.',
    icon: '💰',
    rating: 4.6,
    reviews: '54K',
    downloads: '540K',
    category: 'Finance',
    gradient: 'linear-gradient(135deg, #22c55e 0%, #10b981 100%)',
    developer: 'Syncro Technologies Inc.',
    version: '2.5.1',
    size: 'Web App',
    features: [
      'Automatic expense categorization',
      'Budget planning and tracking',
      'Investment portfolio overview',
      'Bill reminders and alerts',
      'Financial reports and insights',
      'Bank sync with 10,000+ institutions',
    ],
    screenshots: [
      'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=300&h=600&fit=crop',
      'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=300&h=600&fit=crop',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&h=600&fit=crop',
    ],
    url: 'https://financeflow-web.example.com',
  },
  'socialplus-web': {
    name: 'SocialPlus Web',
    description: 'Next-gen social networking with AR features.',
    longDescription: 'Connect like never before with SocialPlus Web, the social network designed for the future. With AR filters, encrypted messaging, and innovative content sharing features, SocialPlus brings people together while keeping your privacy protected. Express yourself with immersive posts and discover communities that share your passions.',
    icon: '🌐',
    rating: 4.5,
    reviews: '350K',
    downloads: '3.5M',
    category: 'Social',
    gradient: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
    developer: 'Syncro Technologies Inc.',
    version: '6.2.0',
    size: 'Web App',
    features: [
      'AR filters and effects',
      'End-to-end encrypted messaging',
      'Stories and reels creation',
      'Community discovery and groups',
      'Live streaming with effects',
      'Cross-platform sharing',
    ],
    screenshots: [
      'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=300&h=600&fit=crop',
      'https://images.unsplash.com/photo-1562577309-4932fdd64cd1?w=300&h=600&fit=crop',
      'https://images.unsplash.com/photo-1522098543979-ffc7f79a56c4?w=300&h=600&fit=crop',
    ],
    url: 'https://socialplus-web.example.com',
  },
};

const WebAppDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const webapp = webapps[id || ''];
  const screenshotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const scrollScreenshots = (direction: 'left' | 'right') => {
    if (!screenshotRef.current) return;
    const scrollAmount = 280;
    screenshotRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  const handleOpenLink = () => {
    window.open(webapp.url, '_blank');
  };

  if (!webapp) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-display font-bold text-foreground mb-4">Web App Not Found</h1>
          <Link to="/webapps" className="text-primary hover:underline">
            Back to Web Apps
          </Link>
        </div>
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-screen bg-background"
      >
        <Navbar />

        <main className="pt-32 pb-20">
          <div className="container mx-auto px-6">
            {/* Back button */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-8"
            >
              <Link
                to="/webapps"
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft size={18} />
                Back to Web Apps
              </Link>
            </motion.div>

            {/* Web App header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-12"
            >
              <div className="flex flex-col md:flex-row gap-8 mb-8">
                {/* Web App icon */}
                <div
                  className="w-32 h-32 rounded-3xl flex items-center justify-center text-6xl shadow-lg flex-shrink-0 overflow-hidden"
                  style={{ background: webapp.gradient }}
                >
                  {webapp.icon.startsWith('/') || webapp.icon.startsWith('http') ? (
                    <img src={webapp.icon} alt={webapp.name} className="w-full h-full object-cover" />
                  ) : (
                    webapp.icon
                  )}
                </div>

                {/* Web App info */}
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <span className="px-3 py-1 rounded-full bg-muted/50 text-xs font-medium text-muted-foreground">
                      {webapp.category}
                    </span>
                  </div>
                  <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-3">
                    {webapp.name}
                  </h1>
                  <p className="text-lg text-muted-foreground mb-4">{webapp.developer}</p>

                  <div className="flex flex-wrap items-center gap-6">
                    <div className="flex items-center gap-2">
                      <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                      <span className="font-semibold text-foreground">{webapp.rating}</span>
                      <span className="text-muted-foreground">({webapp.reviews} reviews)</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <ExternalLink className="w-5 h-5" />
                      <span>Web App</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Video Section */}
              {webapp.video && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="mb-8"
                >
                  <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
                    Preview
                  </h2>
                  <div className="aspect-video rounded-2xl overflow-hidden glass">
                    {webapp.video.endsWith('.mp4') || webapp.video.endsWith('.webm') || webapp.video.endsWith('.ogg') ? (
                      <video
                        src={webapp.video}
                        className="w-full h-full object-cover"
                        controls
                        autoPlay
                        muted
                        loop
                        playsInline
                      >
                        Your browser does not support the video tag.
                      </video>
                    ) : (
                      <iframe
                        src={webapp.video}
                        title={`${webapp.name} preview`}
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    )}
                  </div>
                </motion.div>
              )}

              {/* Website Link */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mb-8"
              >
                <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
                  Visit Website
                </h2>
                <div className="flex flex-col sm:flex-row gap-4 items-start">
                  <div className="flex-1 p-4 rounded-xl glass">
                    <p className="text-sm text-muted-foreground mb-2">Website URL</p>
                    <a
                      href={webapp.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline break-all"
                    >
                      {webapp.url}
                    </a>
                  </div>
                  <MagneticButton variant="primary" onClick={handleOpenLink}>
                    <span className="flex items-center gap-2">
                      <ExternalLink size={18} />
                      Open Website
                    </span>
                  </MagneticButton>
                </div>
              </motion.div>

              {/* Description */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
                  About this web app
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {webapp.longDescription}
                </p>
              </motion.div>
            </motion.div>

            {/* Screenshots */}
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-12"
            >
              <h2 className="font-display text-2xl font-semibold text-foreground mb-6">
                Screenshots
              </h2>
              <div className="relative">
                <button
                  onClick={() => scrollScreenshots('left')}
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full glass flex items-center justify-center text-foreground hover:bg-card/80 transition-colors"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={() => scrollScreenshots('right')}
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full glass flex items-center justify-center text-foreground hover:bg-card/80 transition-colors"
                >
                  <ChevronRight size={20} />
                </button>
                <div
                  ref={screenshotRef}
                  className="flex gap-4 overflow-x-auto scrollbar-hide py-4 px-2"
                >
                  {webapp.screenshots.map((src, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className="flex-shrink-0 w-64 h-[480px] rounded-2xl overflow-hidden glass"
                    >
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                        className="flex-shrink-0 w-64 h-[480px] rounded-2xl overflow-hidden glass"
                      >
                        <img
                          src={src}
                          alt={`${webapp.name} screenshot ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </motion.div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.section>

            {/* Description & Features */}
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Description */}
              <motion.section
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="lg:col-span-2"
              >
                <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
                  About this web app
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-8">
                  {webapp.longDescription}
                </p>

                <h3 className="font-display text-xl font-semibold text-foreground mb-4">
                  Features
                </h3>
                <ul className="space-y-3">
                  {webapp.features.map((feature, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + index * 0.05 }}
                      className="flex items-start gap-3"
                    >
                      <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-primary" />
                      </div>
                      <span className="text-muted-foreground">{feature}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.section>

              {/* Web App Info Card */}
              <motion.aside
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <div className="glass p-6 rounded-2xl sticky top-32">
                  <h3 className="font-display text-lg font-semibold text-foreground mb-4">
                    Web App Information
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 py-3 border-b border-border/50">
                      <Smartphone className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Version</p>
                        <p className="font-medium text-foreground">{webapp.version}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 py-3 border-b border-border/50">
                      <ExternalLink className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Type</p>
                        <p className="font-medium text-foreground">{webapp.size}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 py-3">
                      <Shield className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Security</p>
                        <p className="font-medium text-foreground">Verified Safe</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.aside>
            </div>
          </div>
        </main>

        <Footer />
      </motion.div>
    </AnimatePresence>
  );
};

export default WebAppDetail;
