'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDown01Icon, ArrowUp01Icon } from 'hugeicons-react';

interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
  className?: string;
}

interface AccordionItemProps {
  item: AccordionItem;
  isOpen: boolean;
  onToggle: () => void;
  isLast?: boolean;
}

const AccordionItemComponent: React.FC<AccordionItemProps> = ({ 
  item, 
  isOpen, 
  onToggle, 
  isLast = false 
}) => {
  return (
    <div className={`${!isLast ? 'border-b border-gray-200' : ''}`}>
      {/* Header */}
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-gray-50 transition-colors duration-200"
      >
        <span className="text-sm font-medium text-gray-900">
          {item.title}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          className="flex-shrink-0 ml-4"
        >
          {isOpen ? (
            <ArrowUp01Icon className="h-5 w-5 text-gray-500" />
          ) : (
            <ArrowDown01Icon className="h-5 w-5 text-gray-500" />
          )}
        </motion.div>
      </button>

      {/* Content */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ 
              type: 'spring',
              stiffness: 300,
              damping: 30,
              opacity: { duration: 0.2 }
            }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-5 text-sm text-gray-600">
              {item.content}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Accordion: React.FC<AccordionProps> = ({ 
  items, 
  allowMultiple = false, 
  className = '' 
}) => {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  const toggleItem = (itemId: string) => {
    setOpenItems(prev => {
      const newOpenItems = new Set(prev);
      
      if (newOpenItems.has(itemId)) {
        // Close the item
        newOpenItems.delete(itemId);
      } else {
        // Open the item
        if (!allowMultiple) {
          // If multiple items aren't allowed, close all others
          newOpenItems.clear();
        }
        newOpenItems.add(itemId);
      }
      
      return newOpenItems;
    });
  };

  return (
    <div className={`bg-white ${className}`}>
      {items.map((item, index) => (
        <AccordionItemComponent
          key={item.id}
          item={item}
          isOpen={openItems.has(item.id)}
          onToggle={() => toggleItem(item.id)}
          isLast={index === items.length - 1}
        />
      ))}
    </div>
  );
};

export default Accordion;
