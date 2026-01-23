"use client"
import React, { useState, useEffect, useRef, HTMLAttributes } from 'react';

const cn = (...classes: (string | undefined | null | false)[]) => {
  return classes.filter(Boolean).join(' ');
}

// Define the type for a single gallery item
export interface GalleryItem {
  title: string;
  subtitle: string;
  photo: {
    url: string; 
    text: string;
    pos?: string;
    credit: string;
  };
}

interface CircularGalleryProps extends HTMLAttributes<HTMLDivElement> {
  items: GalleryItem[]
  radius?: number;
  autoRotateSpeed?: number;
}

const CircularGallery = React.forwardRef<HTMLDivElement, CircularGalleryProps>(
  ({ items, className, radius = 500, autoRotateSpeed = 0.30, ...props }, ref) => {
    const [rotation, setRotation] = useState(0);
    const [isScrolling, setIsScrolling] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const animationFrameRef = useRef<number | null>(null);

    // Detect mobile viewport
    useEffect(() => {
      const checkMobile = () => {
        setIsMobile(window.innerWidth < 768);
      };
      checkMobile();
      window.addEventListener('resize', checkMobile);
      return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Effect to handle scroll-based rotation
    useEffect(() => {
      const handleScroll = () => {
        setIsScrolling(true);
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }

        const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollProgress = scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0;
        
        const fullRotations = 2;
        const scrollRotation = scrollProgress * (360 * fullRotations);
        setRotation(scrollRotation);

        scrollTimeoutRef.current = setTimeout(() => {
          setIsScrolling(false);
        }, 150);
      };

      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => {
        window.removeEventListener('scroll', handleScroll);
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }
      };
    }, []);

    // Effect for auto-rotation when not scrolling
    useEffect(() => {
      const autoRotate = () => {
        if (!isScrolling) {
          setRotation(prev => prev + autoRotateSpeed);
        }
        animationFrameRef.current = requestAnimationFrame(autoRotate);
      };

      animationFrameRef.current = requestAnimationFrame(autoRotate);

      return () => {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
      };
    }, [isScrolling, autoRotateSpeed]);

    const anglePerItem = 360 / items.length;
    
    // Responsive radius based on screen size
    const responsiveRadius = isMobile ? Math.min(radius * 0.5, 300) : radius;
    
    return (
      <div
        ref={ref}
        role="region"
        aria-label="Circular 3D Space Gallery"
        className={cn("relative w-full h-full flex items-center justify-center", className)}
        style={{ perspective: isMobile ? '1000px' : '2000px' }}
        {...props}
      >
        <div
          className="relative w-full h-full"
          style={{
            transform: `rotateY(${rotation}deg)`,
            transformStyle: 'preserve-3d',
          }}
        >
          {items.map((item, i) => {
            const itemAngle = i * anglePerItem;
            const totalRotation = rotation % 360;
            const relativeAngle = (itemAngle + totalRotation + 360) % 360;
            const normalizedAngle = Math.abs(relativeAngle > 180 ? 360 - relativeAngle : relativeAngle);
            const opacity = Math.max(0.3, 1 - (normalizedAngle / 180));

            // Responsive card sizing
            const cardWidth = isMobile ? 150 : 300;
            const cardHeight = isMobile ? 200 : 400;

            return (
              <div
                key={item.photo.url} 
                role="group"
                aria-label={item.title}
                className="absolute"
                style={{
                  width: `${cardWidth}px`,
                  height: `${cardHeight}px`,
                  transform: `rotateY(${itemAngle}deg) translateZ(${responsiveRadius}px)`,
                  left: '50%',
                  top: '50%',
                  marginLeft: `-${cardWidth / 2}px`,
                  marginTop: `-${cardHeight / 2}px`,
                  opacity: opacity,
                  transition: 'opacity 0.3s linear'
                }}
              >
                <div className="relative w-full h-full rounded-lg shadow-2xl overflow-hidden group border border-white/20 bg-black/40 backdrop-blur-lg">
                  <img
                    src={item.photo.url}
                    alt={item.photo.text}
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{ objectPosition: item.photo.pos || 'center' }}
                  />
                  {/* Space-themed gradient overlay */}
                  <div className={`absolute bottom-0 left-0 w-full ${isMobile ? 'p-2' : 'p-4'} bg-linear-to-t from-black via-black/80 to-transparent text-white`}>
                    <h2 className={`${isMobile ? 'text-sm' : 'text-xl'} font-bold tracking-wide`}>{item.title}</h2>
                    <p className={`${isMobile ? 'text-xs' : 'text-sm'} italic opacity-80 text-cyan-300`}>{item.subtitle}</p>
                    {/* <p className={`${isMobile ? 'text-[10px]' : 'text-xs'} mt-1 opacity-70 font-mono`}>Image: {item.photo.credit}</p> */}
                  </div>
                  {/* Cosmic glow effect */}
                  <div className="absolute inset-0 bg-linear-to-t from-blue-600/10 via-transparent to-purple-600/10 pointer-events-none" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
);

CircularGallery.displayName = 'CircularGallery';

// Space-themed gallery data
const spaceGalleryData: GalleryItem[] = [
  {
    title: 'Hackemon CTF',
    subtitle: 'DUET Gulberg Campus',
    photo: {
      url: '/pic-2.jpg',
      text: 'A Pokemon themed CTF',
      pos: '50% 50%',
      credit: 'NASA/ESA'
    }
  },
  {
    title: 'TeknoFest 3.0',
    subtitle: 'Innovation Expo',
    photo: {
      url: '/pic-8.jpeg',
      text: 'Technical Partners',
      pos: '50% 40%',
      credit: 'Space Telescope'
    }
  },
  {
    title: 'Reign of the Rogue CTF',
    subtitle: 'Tech Gala 1.0',
    photo: {
      url: '/pic-9.jpeg',
      text: 'Bano Qabil',
      pos: '50% 50%',
      credit: 'Deep Field Survey'
    }
  },
  {
    title: 'Random Shot',
    subtitle: 'TecknoFest 3.0',
    photo: {
      url: '/pic-16.jpeg',
      text: 'Bano Qabil',
      pos: '50% 50%',
      credit: 'Deep Field Survey'
    }
  },
  {
    title: 'TecknoFest Collaborative Partners',
    subtitle: 'Volunteers of the Event',
    photo: {
      url: '/pic-10.jpeg',
      text: 'Event Volunteers',
      pos: '50% 50%',
      credit: 'Cosmic Background'
    }
  },
  {
    title: 'TecknoFest Soveinier',
    subtitle: 'Shield of the Event',
    photo: {
      url: '/pic-11.jpeg',
      text: 'Shield',
      pos: '50% 50%',
      credit: 'Observatory Network'
    }
  },
  {
    title: 'Bits of the Black Pearl CTF',
    subtitle: 'Pirates of the Caribbean themed CTF',
    photo: {
      url: '/pic-12.jpeg',
      text: 'Our Customized CTF Platform',
      pos: '50% 50%',
      credit: 'Space Agency'
    }
  },
  {
    title: 'CTF Titans',
    subtitle: 'Our CTF Creators Team',
    photo: {
      url: '/pic-15.jpeg',
      text: 'Creators & Developers',
      pos: '50% 55%',
      credit: 'Earth Observatory'
    }
  },
];

export function SpaceGallerySection() {
  return (
    <div className="w-full bg-black text-white relative" style={{ height: '500vh' }}>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-white rounded-full opacity-70 animate-pulse" />
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-white rounded-full opacity-50" />
        <div className="absolute bottom-1/3 left-1/2 w-1 h-1 bg-blue-300 rounded-full opacity-60 animate-pulse" />
        <div className="absolute top-2/3 right-1/4 w-1 h-1 bg-purple-300 rounded-full opacity-40" />
      </div>
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <div className="absolute top-10 inset-x-0 z-30 flex justify-center pointer-events-none">
          <div className="text-center">
            <span className="font-mono text-xs tracking-[0.3em] text-gray-500 uppercase block mb-3">
              // COSMIC EXPLORATION
            </span>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Event Gallery
            </h1>
            <p className="text-gray-400 mt-2 text-sm md:text-base">
              Scroll to explore the cosmos
            </p>
          </div>
        </div>
        <div className="relative z-10 h-full pt-40">
          <CircularGallery items={spaceGalleryData} />
        </div>
      </div>
    </div>
  );
}