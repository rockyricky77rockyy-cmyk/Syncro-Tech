import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Target, Rocket, Award } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CTA } from '@/components/sections/CTA';

const stats = [
  { value: '50+', label: 'Apps Published' },
  { value: '2M+', label: 'Happy Users' },
  { value: '15+', label: 'Countries' },
  { value: '4.8', label: 'Avg Rating' },
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

const About: React.FC = () => {
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
          {/* Hero section */}
          <section className="relative mb-24 overflow-hidden">
            <div className="absolute inset-0 hero-gradient" />
            <div className="container mx-auto px-6 relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center max-w-3xl mx-auto"
              >
                <span className="inline-block px-4 py-2 rounded-full bg-secondary/10 text-secondary text-sm font-medium mb-6">
                  About Us
                </span>
                <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                  Building the Future of{' '}
                  <span className="gradient-text">Mobile Innovation</span>
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                  We're a team of passionate developers, designers, and dreamers 
                  dedicated to creating mobile experiences that inspire and empower.
                </p>
              </motion.div>
            </div>
          </section>

          {/* Stats */}
          <section className="mb-24">
            <div className="container mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="grid grid-cols-2 md:grid-cols-4 gap-8"
              >
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="text-center p-6 rounded-2xl glass"
                  >
                    <p className="font-display text-4xl md:text-5xl font-bold gradient-text mb-2">
                      {stat.value}
                    </p>
                    <p className="text-muted-foreground">{stat.label}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>

          {/* Story section */}
          <section className="mb-24">
            <div className="container mx-auto px-6">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
                    Our Story
                  </h2>
                  <div className="space-y-4 text-muted-foreground leading-relaxed">
                    <p>
                      NexaApps was founded in 2020 with a simple mission: to create 
                      mobile applications that genuinely improve people's lives.
                    </p>
                    <p>
                      What started as a small team of three developers working out of a 
                      garage has grown into a company of 50+ talented individuals, each 
                      bringing their unique skills and perspectives to our work.
                    </p>
                    <p>
                      Today, our apps are used by millions of people around the world, 
                      and we're just getting started. We continue to push the boundaries 
                      of what's possible in mobile technology, always with our users at 
                      the heart of everything we do.
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  <div className="aspect-square rounded-3xl glass p-8 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mx-auto mb-6">
                        <span className="font-display font-bold text-primary-foreground text-4xl">N</span>
                      </div>
                      <p className="font-display text-2xl font-semibold text-foreground mb-2">
                        NexaApps
                      </p>
                      <p className="text-muted-foreground">Est. 2020</p>
                    </div>
                  </div>
                  <div className="absolute -top-4 -right-4 w-32 h-32 bg-primary/20 rounded-full blur-[60px]" />
                  <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-secondary/20 rounded-full blur-[60px]" />
                </motion.div>
              </div>
            </div>
          </section>

          {/* Values */}
          <section className="mb-24">
            <div className="container mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Our Values
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  These core principles guide everything we do at NexaApps.
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
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
            </div>
          </section>

          <CTA />
        </main>

        <Footer />
      </motion.div>
    </AnimatePresence>
  );
};

export default About;
