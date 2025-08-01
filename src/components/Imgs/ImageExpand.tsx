"use client";

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

type ImageType = {
  src: string;
  alt: string;
};

type ImageStackProps = {
  images: ImageType[];
  className?: string;
};

// Calculate dimensions for each image based on index
const calculateDimensions = (index: number, isExpanded: boolean) => {
  if (isExpanded) {
    // Expanded dimensions - wider aspect ratios
    switch (index) {
      case 0: return { width: 240, height: 180 };
      case 1: return { width: 260, height: 180 };
      case 2: return { width: 280, height: 160 };
      case 3: return { width: 320, height: 180 };
      default: return { width: 220, height: 180 };
    }
  } else {
    return { width: 240, height: 180 }; // Wider collapsed state
  }
};

// calculate offset based on index and expanded state
const calculateOffset = (index: number, isExpanded: boolean) => {
  if (isExpanded) {
    switch (index) {
      case 0: return { x: -120, y: -80 };
      case 1: return { x: 120, y: -110 };
      case 2: return { x: -120, y: 50 };
      case 3: return { x: 120, y: 120 };
      default: return { x: 0, y: 0 };
    }
  } else {
    return { x: 0, y: index * 35 };
  }
};

const ImageExpand = ({
  images,
  className = '',
}: ImageStackProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Memoize rotations to prevent them from changing on every render
  const rotations = useMemo(() => {
    return images.map((_, index) => ({
      collapsed: Math.random() * 15 - 5, // Small random rotation when collapsed
      expanded: Math.random() * 25 - 5   // Larger random rotation when expanded
    }));
  }, [images]);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`relative flex justify-center ${className}`}>
      <div 
        className="relative" 
        style={{ 
          height: isExpanded ? '400px' : '200px',
          width: isExpanded ? '800px' : '260px',
          transition: 'all 0.5s ease-in-out'
        }}
      >
        <AnimatePresence>
          {images.map((image, index) => {
            const dimensions = calculateDimensions(index, isExpanded);
            const offset = calculateOffset(index, isExpanded);
            const rotation = isExpanded ? rotations[index].expanded : rotations[index].collapsed;
            
            return (
              <motion.div
                key={image.src}
                className="absolute rounded-3xl overflow-hidden bg-white border-4 border-white cursor-pointer"
                style={{
                  zIndex: 20 + index,
                  width: dimensions.width,
                  height: dimensions.height,
                  left: '50%',
                  top: '50%',
                  transformOrigin: 'center center',
                  boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2)'
                }}
                onClick={toggleExpand}
                initial={false}
                animate={{
                  x: offset.x - dimensions.width / 2,
                  y: offset.y - dimensions.height / 2,
                  rotate: rotation,
                  width: dimensions.width,
                  height: dimensions.height,
                }}
                transition={{
                  type: 'spring',
                  damping: 25,
                  stiffness: 200,
                  mass: 1.2,
                  bounce: 0.8,
                }}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={dimensions.width}
                  height={dimensions.height}
                  className="w-full h-full object-cover"
                  priority
                />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ImageExpand;