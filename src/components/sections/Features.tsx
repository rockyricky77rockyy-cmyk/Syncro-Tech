import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Zap, Shield, Palette, Sparkles, Target, Users, Rocket, Award } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Optimized performance with instant load times and smooth animations across all devices.',
    color: 'from-yellow-400 to-orange-500',
  },
  {
    icon: Shield,
    title: 'Secure by Design',
    description: 'Enterprise-grade security with end-to-end encryption and privacy-first architecture.',
    color: 'from-green-400 to-emerald-500',
  },
  {
    icon: Palette,
    title: 'Beautiful Design',
    description: 'Award-winning interfaces crafted with attention to every pixel and interaction.',
    color: 'from-purple-400 to-pink-500',
  },
  {
    icon: Sparkles,
    title: 'AI Powered',
    description: 'Intelligent features that learn and adapt to your preferences over time.',
    color: 'from-cyan-400 to-blue-500',
  },
];

const values = [
  {
    icon: Target,
    title: 'Mission-Driven',
    description: 'We build apps that solve real problems and make a meaningful impact in people\'s lives.',
  },
  {
    icon: Users,
    title: 'User-First',
    description: 'Every decision we make starts with asking: how does this benefit our users?',
  },
  {
    icon: Rocket,
    title: 'Innovation',
    description: 'We push boundaries and embrace cutting-edge technology to deliver exceptional experiences.',
  },
  {
    icon: Award,
    title: 'Excellence',
    description: 'We hold ourselves to the highest standards in design, development, and user experience.',
  },
];

export const Features: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardsRef.current?.children;
      if (!cards) return;

      gsap.from(cards, {
        y: 100,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: cardsRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-12 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/10 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-[120px] translate-x-1/2 -translate-y-1/2" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-secondary/10 text-secondary text-sm font-medium mb-4">
            Why Choose Us
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Built for <span className="neon-text-purple text-secondary">Excellence</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Every app we create is engineered with cutting-edge technology and designed
            with user experience at its core.
          </p>

          {/* Values grid - directly below "at its core" */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="p-8 rounded-2xl glass text-center"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mx-auto mb-6">
                  <value.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                  {value.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Features grid */}
        <div ref={cardsRef} className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8 md:mt-16">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              whileHover={{ y: -8 }}
              className="p-8 rounded-2xl glass text-center"
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mx-auto mb-6">
                <feature.icon className="w-7 h-7 text-primary" />
              </div>

              {/* Content */}
              <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
