import React from 'react';
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
declare const Accordion: React.FC<AccordionProps>;
export default Accordion;
