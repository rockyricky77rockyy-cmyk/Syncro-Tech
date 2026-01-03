import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AppCard } from '@/components/cards/AppCard';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const apps = [
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
    id: 'mindflow',
    name: 'MindFlow',
    description: 'Meditation and mindfulness app with guided sessions and sleep sounds.',
    icon: '🧘',
    rating: 4.8,
    downloads: '890K',
    category: 'Lifestyle',
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

export const FeaturedApps: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current?.children || [], {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-24 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-radial from-primary/5 via-transparent to-transparent" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section header */}
        <div ref={titleRef} className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4"
          >
            Featured Apps
          </motion.span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Discover Our <span className="gradient-text">Best Creations</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our collection of premium applications designed to enhance your daily life
            with cutting-edge technology and beautiful interfaces.
          </p>
        </div>

        {/* App grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {apps.map((app, index) => (
            <AppCard key={app.id} {...app} index={index} />
          ))}
        </div>

        {/* View all link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-12"
        >
          <Link to="/apps">
            <motion.button
              whileHover={{ scale: 1.05, x: 5 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 text-primary font-medium hover:gap-4 transition-all"
            >
              View All Apps
              <ArrowRight size={18} />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
