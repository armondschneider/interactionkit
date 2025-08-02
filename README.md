# InteractionKit

React components with smooth animations.

## Installation

```bash
npm install @armondschneider/interactionkit framer-motion hugeicons-react
```

## Usage

```tsx
import { Sheet, SheetContent, SheetHeader, Accordion } from '@armondschneider/interactionkit';

// Sheet drawer
<Sheet isOpen={isOpen} onClose={() => setIsOpen(false)}>
  <SheetHeader title="My Sheet" onClose={() => setIsOpen(false)} />
  <SheetContent>Your content</SheetContent>
</Sheet>

// Animated button
<Button>Click me</Button>

// Expandable images
<ImageExpand images={[{src: '/img.jpg', alt: 'Image'}]} />

// Accordion
<Accordion 
  items={[
    { id: '1', title: 'Question 1', content: 'Answer 1' },
    { id: '2', title: 'Question 2', content: 'Answer 2' }
  ]}
/>
```

Requires Tailwind CSS in your project.
