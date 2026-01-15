import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AppCard } from '@/components/cards/AppCard';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getAppDownloads } from '@/lib/downloadUtils';

gsap.registerPlugin(ScrollTrigger);

const apps = [
  {
    id: 'youmusics',
    name: 'Youmusics (Beta)',
    description: 'Stream unlimited music with high-quality audio and smart playlists.',
    icon: '/apklogos/Youmusics.png',
    rating: 4.9,
    downloads: '20',
    category: 'Music Player',
    gradient: 'linear-gradient(135deg, #00d4ff 0%, #7c3aed 100%)',
  },
  {
    id: 'donga-paatalu',
    name: 'Donga Paatalu',
    description: 'Stream and enjoy your favorite Telugu songs anytime, anywhere.',
    icon: '/apklogos/DP-APP.png',
    rating: 4.8,
    downloads: '20',
    category: 'Music Player',
    gradient: 'linear-gradient(135deg, #7c3aed 0%, #ec4899 100%)',
  },
  {
    id: 'gta-vice-city-web',
    name: 'GTA Vice City Web',
    description: 'Experience the iconic Vice City adventure in your browser.',
    icon: '/weblogo/gta.jpg',
    rating: 4.7,
    visits: '650K',
    category: 'Games',
    gradient: 'linear-gradient(135deg, #10b981 0%, #00d4ff 100%)',
    basePath: 'webapp',
  },
  {
    id: 'dongapatalu-web',
    name: 'Dongapatalu Web',
    description: 'Stream and enjoy your favorite Telugu songs anytime, anywhere.',
    icon: '/apklogos/DP-APP.png',
    rating: 4.8,
    visits: '20',
    category: 'Music Player',
    gradient: 'linear-gradient(135deg, #7c3aed 0%, #ec4899 100%)',
    basePath: 'webapp',
  },

];

export const FeaturedApps: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const [appsWithCounts, setAppsWithCounts] = useState<any[]>(apps);

  useEffect(() => {
    // Update download/visit counts for all apps
    const updatedApps = apps.map(app => {
      if (app.visits) {
        return { ...app, visits: getAppDownloads(app.id, app.visits) };
      } else if (app.downloads) {
        return { ...app, downloads: getAppDownloads(app.id, app.downloads) };
      }
      return app;
    });
    setAppsWithCounts(updatedApps);

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
          {appsWithCounts.map((app, index) => (
            <AppCard key={app.id} {...app} index={index} basePath={app.basePath} />
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
