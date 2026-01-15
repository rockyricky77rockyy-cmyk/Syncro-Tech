import React, { useEffect, useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ArrowLeft,
  Star,
  Download,
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
import { getAppDownloads, incrementDownload, shareApp } from '@/lib/downloadUtils';

gsap.registerPlugin(ScrollTrigger);

const apps: Record<string, {
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
  apk: string;
}> = {
  'youmusics': {
    name: 'Youmusics (Beta)',
    description: 'Stream unlimited music with high-quality audio and smart playlists.',
    longDescription: 'Discover the ultimate music streaming experience with Youmusics. Access millions of songs across all genres, create personalized playlists, and enjoy crystal-clear audio quality. With smart recommendations powered by AI, offline downloads, and seamless playback, Youmusics brings your favorite music to life wherever you go.',
    icon: '/apklogos/Youmusics.png',
    rating: 4.9,
    reviews: '20',
    downloads: '20',
    category: 'Music Player',
    gradient: 'linear-gradient(135deg, #00d4ff 0%, #7c3aed 100%)',
    developer: 'Syncro Technologies Inc.',
    version: '1.1.1',
    size: '53 MB',
    features: [
      'Stream millions of songs in high quality',
      'AI-powered music recommendations',
      'Create and share custom playlists',
      'Offline download for on-the-go listening',
      'Lyrics display and sing-along mode',
      'Cross-device sync and playback',
      'Equalizer and audio customization',
      'Discover new music with personalized radio',
    ],
    screenshots: [
      '/apkScreenshots/Y1.jpg',
      '/apkScreenshots/Y2.jpg',
      '/apkScreenshots/Y3.jpg',
      '/apkScreenshots/Y4.jpg',
      '/apkScreenshots/Y5.jpg',
      '/apkScreenshots/Y6.jpg',
      '/apkScreenshots/Y7.jpg',
      '/apkScreenshots/Y8.jpg',
      '/apkScreenshots/Y9.jpg',
      '/apkScreenshots/Y10.jpg',
    ],
    apk: 'Youmusics.apk',
  },
  'donga-paatalu': {
    name: 'Donga Paatalu',
    description: 'Stream and enjoy your favorite Telugu songs anytime, anywhere.',
    longDescription: 'Immerse yourself in the world of Telugu music with Donga Paatalu, your ultimate music companion. Discover a vast collection of Telugu songs across all genres - from classic melodies to the latest hits. With a beautiful, intuitive interface and powerful playback features, Donga Paatalu brings your favorite music to life. Create custom playlists, enjoy high-quality audio streaming, and never miss a beat with offline downloads.',
    icon: '/apklogos/DP-APP.png',
    rating: 4.8,
    reviews: '150',
    downloads: '20',
    category: 'Music Player',
    gradient: 'linear-gradient(135deg, #7c3aed 0%, #ec4899 100%)',
    developer: 'Syncro Technologies Inc.',
    version: '1.8.0',
    size: '30 MB',
    features: [
      'Extensive library of Telugu songs across all genres',
      'High-quality audio streaming and playback',
      'Create and manage custom playlists',
      'Offline download support for your favorite tracks',
      'Beautiful and intuitive user interface',
      'Search and discover new music easily',
      'Background playback with lock screen controls',
      'Share your favorite songs with friends',
    ],
    screenshots: [
      '/apkScreenshots/1.jpg',
      '/apkScreenshots/2.jpg',
      '/apkScreenshots/3.jpg',
      '/apkScreenshots/4.jpg',
      '/apkScreenshots/5.jpg',
      '/apkScreenshots/6.jpg',
      '/apkScreenshots/7.jpg',
      '/apkScreenshots/8.jpg',
      '/apkScreenshots/9.jpg',
      '/apkScreenshots/10.jpg',
    ],
    apk: 'DongaPaatalu.apk',
  },
  // 'taskpro': {
  //   name: 'TaskPro',
  //   description: 'Smart task management with AI prioritization.',
  //   longDescription: 'Supercharge your productivity with TaskPro, the intelligent task management app that uses AI to help you prioritize what matters most. From personal to-dos to team projects, TaskPro keeps everything organized with smart reminders, calendar integration, and powerful collaboration features.',
  //   icon: '✅',
  //   rating: 4.7,
  //   reviews: '65K',
  //   downloads: '650K',
  //   category: 'Productivity',
  //   gradient: 'linear-gradient(135deg, #10b981 0%, #00d4ff 100%)',
  //   developer: 'Syncro Technologies Inc.',
  //   version: '4.1.2',
  //   size: '28 MB',
  //   features: [
  //     'AI-powered task prioritization',
  //     'Team collaboration and sharing',
  //     'Calendar and reminder integration',
  //     'Custom labels and categories',
  //     'Time tracking and reports',
  //     'Cross-platform sync',
  //   ],
  //   screenshots: [
  //     'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=300&h=600&fit=crop',
  //     'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=300&h=600&fit=crop',
  //     'https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?w=300&h=600&fit=crop',
  //   ],
  //   apk: 'testing.apk',
  // },
  // 'photoai': {
  //   name: 'PhotoAI',
  //   description: 'Advanced photo editor with AI enhancement.',
  //   longDescription: 'Unleash your creativity with PhotoAI, the ultimate photo editing app powered by artificial intelligence. From one-tap enhancements to advanced editing tools, PhotoAI makes professional-quality edits accessible to everyone. Remove backgrounds, apply stunning filters, and transform your photos with just a few taps.',
  //   icon: '📸',
  //   rating: 4.9,
  //   reviews: '210K',
  //   downloads: '2.1M',
  //   category: 'Photography',
  //   gradient: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)',
  //   developer: 'Syncro Technologies Inc.',
  //   version: '5.0.0',
  //   size: '62 MB',
  //   features: [
  //     'AI-powered photo enhancement',
  //     'Background removal and replacement',
  //     'Professional filters and presets',
  //     'Advanced retouching tools',
  //     'Batch editing for multiple photos',
  //     'Export in various formats',
  //   ],
  //   screenshots: [
  //     'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=300&h=600&fit=crop',
  //     'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=300&h=600&fit=crop',
  //     'https://images.unsplash.com/photo-1493863641943-9b68992a8d07?w=300&h=600&fit=crop',
  //   ],
  //   apk: 'testing.apk',
  // },
  // 'financeflow': {
  //   name: 'FinanceFlow',
  //   description: 'Personal finance tracker with smart insights.',
  //   longDescription: 'Take control of your finances with FinanceFlow, your personal finance companion. Track expenses, set budgets, and get smart insights into your spending habits. With automatic categorization and investment tracking, FinanceFlow helps you make smarter financial decisions every day.',
  //   icon: '💰',
  //   rating: 4.6,
  //   reviews: '54K',
  //   downloads: '540K',
  //   category: 'Finance',
  //   gradient: 'linear-gradient(135deg, #22c55e 0%, #10b981 100%)',
  //   developer: 'Syncro Technologies Inc.',
  //   version: '2.5.1',
  //   size: '32 MB',
  //   features: [
  //     'Automatic expense categorization',
  //     'Budget planning and tracking',
  //     'Investment portfolio overview',
  //     'Bill reminders and alerts',
  //     'Financial reports and insights',
  //     'Bank sync with 10,000+ institutions',
  //   ],
  //   screenshots: [
  //     'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=300&h=600&fit=crop',
  //     'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=300&h=600&fit=crop',
  //     'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&h=600&fit=crop',
  //   ],
  //   apk: 'testing.apk',
  // },
  // 'socialplus': {
  //   name: 'SocialPlus',
  //   description: 'Next-gen social networking with AR features.',
  //   longDescription: 'Connect like never before with SocialPlus, the social network designed for the future. With AR filters, encrypted messaging, and innovative content sharing features, SocialPlus brings people together while keeping your privacy protected. Express yourself with immersive posts and discover communities that share your passions.',
  //   icon: '🌐',
  //   rating: 4.5,
  //   reviews: '350K',
  //   downloads: '3.5M',
  //   category: 'Social',
  //   gradient: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
  //   developer: 'Syncro Technologies Inc.',
  //   version: '6.2.0',
  //   size: '78 MB',
  //   features: [
  //     'AR filters and effects',
  //     'End-to-end encrypted messaging',
  //     'Stories and reels creation',
  //     'Community discovery and groups',
  //     'Live streaming with effects',
  //     'Cross-platform sharing',
  //   ],
  //   screenshots: [
  //     'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=300&h=600&fit=crop',
  //     'https://images.unsplash.com/photo-1562577309-4932fdd64cd1?w=300&h=600&fit=crop',
  //     'https://images.unsplash.com/photo-1522098543979-ffc7f79a56c4?w=300&h=600&fit=crop',
  //   ],
  //   apk: 'testing.apk',
  // },
};

const AppDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const app = apps[id || ''];
  const screenshotRef = useRef<HTMLDivElement>(null);
  const [currentDownloads, setCurrentDownloads] = useState<string>('');

  useEffect(() => {
    if (app) {
      setCurrentDownloads(getAppDownloads(id || '', app.downloads));
    }
  }, [id, app]);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = `/apk/${app.apk}`;
    link.download = app.apk;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Increment download count
    incrementDownload(id || '');
    setCurrentDownloads(getAppDownloads(id || '', app.downloads));
  };

  const handleShare = async () => {
    await shareApp(app.name, app.description);
  };

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

  if (!app) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-display font-bold text-foreground mb-4">App Not Found</h1>
          <Link to="/apps" className="text-primary hover:underline">
            Back to Apps
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
                to="/apps"
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft size={18} />
                Back to Apps
              </Link>
            </motion.div>

            {/* App header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex flex-col md:flex-row gap-8 mb-12"
            >
              {/* App icon */}
              <div
                className="w-32 h-32 rounded-3xl flex items-center justify-center text-6xl shadow-lg flex-shrink-0 overflow-hidden"
                style={{ background: app.gradient }}
              >
                {app.icon.startsWith('/') || app.icon.startsWith('http') ? (
                  <img src={app.icon} alt={app.name} className="w-full h-full object-cover" />
                ) : (
                  app.icon
                )}
              </div>

              {/* App info */}
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <span className="px-3 py-1 rounded-full bg-muted/50 text-xs font-medium text-muted-foreground">
                    {app.category}
                  </span>
                </div>
                <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-3">
                  {app.name}
                </h1>
                <p className="text-lg text-muted-foreground mb-4">{app.developer}</p>

                <div className="flex flex-wrap items-center gap-6 mb-6">
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    <span className="font-semibold text-foreground">{app.rating}</span>
                    <span className="text-muted-foreground">({app.reviews} reviews)</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Download className="w-5 h-5" />
                    <span>{currentDownloads || app.downloads} downloads</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <MagneticButton variant="primary" onClick={handleDownload}>
                    <span className="flex items-center gap-2">
                      <Download size={18} />
                      Download Now
                    </span>
                  </MagneticButton>
                  <MagneticButton variant="ghost" onClick={handleShare}>
                    <Share2 size={18} />
                  </MagneticButton>
                </div>
              </div>
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
                  {app.screenshots.map((src, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className="flex-shrink-0 w-64 h-[480px] rounded-2xl overflow-hidden glass"
                    >
                      <img
                        src={src}
                        alt={`${app.name} screenshot ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
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
                  About this app
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-8">
                  {app.longDescription}
                </p>

                <h3 className="font-display text-xl font-semibold text-foreground mb-4">
                  Features
                </h3>
                <ul className="space-y-3">
                  {app.features.map((feature, index) => (
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

              {/* App Info Card */}
              <motion.aside
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <div className="glass p-6 rounded-2xl sticky top-32">
                  <h3 className="font-display text-lg font-semibold text-foreground mb-4">
                    App Information
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 py-3 border-b border-border/50">
                      <Smartphone className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Version</p>
                        <p className="font-medium text-foreground">{app.version}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 py-3 border-b border-border/50">
                      <Download className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Size</p>
                        <p className="font-medium text-foreground">{app.size}</p>
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

export default AppDetail;
