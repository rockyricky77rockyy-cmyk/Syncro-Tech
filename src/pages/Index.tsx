import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from '@/components/layout/Navbar';
import { Hero } from '@/components/sections/Hero';
import { FeaturedApps } from '@/components/sections/FeaturedApps';
import { Features } from '@/components/sections/Features';
import { CTA } from '@/components/sections/CTA';
import { Footer } from '@/components/layout/Footer';

const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

const Index: React.FC = () => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.4 }}
        className="min-h-screen bg-background"
      >
        <Navbar />
        <main>
          <Hero />
          <FeaturedApps />
          <Features />
          <CTA />
        </main>
        <Footer />
      </motion.div>
    </AnimatePresence>
  );
};

export default Index;
