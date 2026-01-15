import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Star, Download, Eye } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AppCardProps {
  id: string;
  name: string;
  description: string;
  icon: string;
  rating: number;
  downloads?: string;
  visits?: string;
  category: string;
  gradient: string;
  index: number;
  basePath?: string;
}

export const AppCard: React.FC<AppCardProps> = ({
  id,
  name,
  description,
  icon,
  rating,
  downloads,
  visits,
  category,
  gradient,
  index,
  basePath = 'app',
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['15deg', '-15deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-15deg', '15deg']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const mouseX = (e.clientX - rect.left) / rect.width - 0.5;
    const mouseY = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(mouseX);
    y.set(mouseY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <Link to={`/${basePath}/${id}`}>
        <motion.div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={handleMouseLeave}
          style={{
            rotateX,
            rotateY,
            transformStyle: 'preserve-3d',
          }}
          className="relative group cursor-pointer"
        >
          <div
            className={cn(
              'relative p-6 rounded-2xl glass transition-all duration-500',
              isHovered && 'neon-border'
            )}
          >
            {/* Gradient overlay on hover */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              className="absolute inset-0 rounded-2xl opacity-20"
              style={{ background: gradient }}
            />

            <div className="relative z-10">
              {/* App Icon */}
              <motion.div
                style={{ transform: 'translateZ(40px)', background: gradient }}
                className="w-16 h-16 rounded-2xl mb-4 flex items-center justify-center text-3xl shadow-lg overflow-hidden"
              >
                {icon.startsWith('/') || icon.startsWith('http') ? (
                  <img src={icon} alt={name} className="w-full h-full object-cover" />
                ) : (
                  icon
                )}
              </motion.div>

              {/* Category badge */}
              <div className="inline-block px-3 py-1 rounded-full bg-muted/50 text-xs font-medium text-muted-foreground mb-3">
                {category}
              </div>

              {/* App name */}
              <h3
                className="font-display text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors"
                style={{ transform: 'translateZ(30px)' }}
              >
                {name}
              </h3>

              {/* Description */}
              <p
                className="text-sm text-muted-foreground mb-4 line-clamp-2"
                style={{ transform: 'translateZ(20px)' }}
              >
                {description}
              </p>

              {/* Stats */}
              <div
                className="flex items-center justify-between pt-4 border-t border-border/50"
                style={{ transform: 'translateZ(15px)' }}
              >
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <span className="text-sm font-medium text-foreground">{rating}</span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  {visits ? <Eye className="w-4 h-4" /> : <Download className="w-4 h-4" />}
                  <span className="text-sm">{visits || downloads}</span>
                </div>
              </div>
            </div>

            {/* Shine effect */}
            <motion.div
              initial={{ x: '-100%', opacity: 0 }}
              animate={{ x: isHovered ? '200%' : '-100%', opacity: isHovered ? 0.3 : 0 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-white to-transparent skew-x-12 rounded-2xl"
            />
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
};
