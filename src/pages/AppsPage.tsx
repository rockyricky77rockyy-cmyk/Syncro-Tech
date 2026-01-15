import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Search, Filter } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { AppCard } from '@/components/cards/AppCard';

gsap.registerPlugin(ScrollTrigger);

const allApps = [
  {
    id: 'nexa-fitness',
    name: 'Nexa Fitness',
    description: 'AI-powered personal trainer with custom workout plans and real-time tracking.',
    icon: '💪',
    rating: 4.9,
    downloads: '1.2M',
    category: 'Health & Fitness',
    gradient: 'linear-gradient(135deg, #00d4ff 0%, #7c3aed 100%)',
  },
  {
    id: 'donga-paatalu',
    name: 'Donga Paatalu',
    description: 'Meditation and mindfulness app with guided sessions and sleep sounds.',
    icon: '/apklogos/DP-APP.png',
    rating: 4.8,
    downloads: '20',
    category: 'Music Player',
    gradient: 'linear-gradient(135deg, #7c3aed 0%, #ec4899 100%)',
  },
  {
    id: 'taskpro',
    name: 'TaskPro',
    description: 'Smart task management with AI prioritization and team collaboration.',
    icon: '✅',
    rating: 4.7,
    downloads: '650K',
    category: 'Productivity',
    gradient: 'linear-gradient(135deg, #10b981 0%, #00d4ff 100%)',
  },
  {
    id: 'photoai',
    name: 'PhotoAI',
    description: 'Advanced photo editor with AI enhancement and creative filters.',
    icon: '📸',
    rating: 4.9,
    downloads: '2.1M',
    category: 'Photography',
    gradient: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)',
  },
  {
    id: 'financeflow',
    name: 'FinanceFlow',
    description: 'Personal finance tracker with smart budgeting and investment insights.',
    icon: '💰',
    rating: 4.6,
    downloads: '540K',
    category: 'Finance',
    gradient: 'linear-gradient(135deg, #22c55e 0%, #10b981 100%)',
  },
  {
    id: 'socialplus',
    name: 'SocialPlus',
    description: 'Next-gen social networking with AR features and encrypted messaging.',
    icon: '🌐',
    rating: 4.5,
    downloads: '3.5M',
    category: 'Social',
    gradient: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
  },
];

const categories = ['All', 'Music Player', 'Health & Fitness', 'Productivity', 'Photography', 'Finance', 'Social'];

const AppsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredApps = allApps.filter((app) => {
    const matchesSearch = app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || app.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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
            {/* Header */}
            <motion.div
              ref={headerRef}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                App Store
              </span>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
                Explore Our <span className="gradient-text">Apps</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Discover our collection of premium applications designed to enhance
                your daily life with cutting-edge technology.
              </p>
            </motion.div>

            {/* Search and filters */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-12"
            >
              {/* Search bar */}
              <div className="relative max-w-md mx-auto mb-8">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search apps..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-6 py-4 rounded-xl bg-card/50 border border-glass-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </div>

              {/* Category filters */}
              <div className="flex flex-wrap justify-center gap-2">
                {categories.map((category) => (
                  <motion.button
                    key={category}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-5 py-2.5 rounded-xl font-medium transition-all ${selectedCategory === category
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-card/50 text-muted-foreground hover:text-foreground hover:bg-card/80 border border-glass-border'
                      }`}
                  >
                    {category}
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Apps grid */}
            <motion.div
              layout
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              <AnimatePresence mode="popLayout">
                {filteredApps.map((app, index) => (
                  <motion.div
                    key={app.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                  >
                    <AppCard {...app} index={index} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {/* No results */}
            {filteredApps.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <p className="text-lg text-muted-foreground">
                  No apps found matching your criteria.
                </p>
              </motion.div>
            )}
          </div>
        </main>

        <Footer />
      </motion.div>
    </AnimatePresence>
  );
};

export default AppsPage;
