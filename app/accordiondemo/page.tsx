'use client';
import React from 'react';
import Accordion from '../../src/components/Accordion/Accordion';

export default function AccordionDemoPage() {
  const accordionItems = [
    {
      id: 'item-1',
      title: 'What is InteractionKit?',
      content: (
        <div>
          <p>InteractionKit is a collection of beautiful React components with smooth animations inspired by iOS design. It includes sheets, buttons, accordions, and more.</p>
        </div>
      )
    },
    {
      id: 'item-2',
      title: 'How do I install it?',
      content: (
        <div>
          <p>You can install InteractionKit using npm:</p>
          <code className="block mt-2 p-2 bg-gray-100 rounded text-sm">
            npm install @armondschneider/interactionkit framer-motion hugeicons-react
          </code>
        </div>
      )
    },
    {
      id: 'item-3',
      title: 'What animations does it use?',
      content: (
        <div>
          <p>InteractionKit uses Framer Motion for smooth, spring-based animations that feel natural and responsive. All components include carefully tuned physics for the best user experience.</p>
        </div>
      )
    },
    {
      id: 'item-4',
      title: 'Is it mobile-friendly?',
      content: (
        <div>
          <p>Absolutely! All components are designed with mobile-first principles and touch interactions in mind. The sheet components especially shine on mobile devices.</p>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-scree py-12 px-4">
      <div className="max-w-2xl mx-auto">

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <Accordion 
            items={accordionItems}
            allowMultiple={false}
          />
        </div>
      </div>
    </div>
  );
}
