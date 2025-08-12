'use client';
import { useState } from "react";
import ButtonTextEffect from "../src/components/Button/ButtonTextEffect";
import Button from "../src/components/Button/Button";
import SendButton from "../src/components/Button/SendButton";
import TextInput from "../src/components/Chat/TextInput";
import Message from "../src/components/Chat/Message";
import ImageExpand from "../src/components/Imgs/ImageExpand";
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "../src/components/Sheet";
import TooltipDropdown from "../src/components/Tooltip/TooltipDropdown";
import HoverTooltip from "../src/components/Tooltip/HoverTooltip";
import Avatar from "../src/components/Avatar/Avatar";
import { FileEditIcon, HeadphonesIcon, Message01Icon } from 'hugeicons-react';

const sampleImages = [
  {
    src: 'https://images.unsplash.com/photo-1608744882201-52a7f7f3dd60?q=80&w=736&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    alt: 'Image Alt Title',
  },
  {
    src: 'https://images.unsplash.com/photo-1618173745308-59d13ae72fce?q=80&w=765&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    alt: 'Image Alt Title',
  },
];

export default function Home() {
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [isTopSheetOpen, setIsTopSheetOpen] = useState(false);
  const [isLeftSheetOpen, setIsLeftSheetOpen] = useState(false);
  const [isRightSheetOpen, setIsRightSheetOpen] = useState(false);

  const helpItems = [
    {
      icon: FileEditIcon,
      label: 'Documentation',
      onClick: () => alert('Opening documentation')
    },
    {
      icon: HeadphonesIcon,
      label: 'Support',
      onClick: () => alert('Opening support')
    },
    {
      icon: Message01Icon,
      label: 'Contact us',
      onClick: () => alert('Opening contact')
    }
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 gap-12 sm:p-20 font-[family-name:var(--font-inter-sans)]">
      <div className="flex items-center justify-center gap-8">
        <HoverTooltip content="Profile avatar - Account created August 2019" position="bottom">
          <Avatar
            variant="image"
            src="https://images.pexels.com/photos/8825559/pexels-photo-8825559.jpeg"
            alt="Profile avatar"
          />
        </HoverTooltip>
        <HoverTooltip content="Initials avatar - Armond Schneider" position="bottom">
          <Avatar
            variant="initials"
            initials="AS"
            alt="Profile initials avatar"
          />
        </HoverTooltip>
      </div>

      <div className="flex items-center justify-center gap-8">
        <HoverTooltip content="Click me!" position="top">
          <Button>
            Button
          </Button>     
        </HoverTooltip>

        <HoverTooltip content="Animated button effect" position="top">
          <ButtonTextEffect />
        </HoverTooltip>

        <Button variant="delete" deleteLabel="Delete" deletedLabel="Deleted" />

        <SendButton />
        <SendButton variant="disabled" />
      </div>

      <div className="flex items-center justify-center gap-8">
        <TextInput
        placeholder="Type your message here..."
        />

        <Message />
      </div>

      {/* Sheet Examples */}
      <div className="flex flex-wrap items-center justify-center gap-4">
        <SheetTrigger 
          onClick={() => setIsBottomSheetOpen(true)}
          className="bg-blue-500 text-white hover:bg-blue-600"
        >
          Open Bottom Sheet
        </SheetTrigger>
      </div>

      {/* Bottom Sheet */}
      <Sheet 
        isOpen={isBottomSheetOpen} 
        onClose={() => setIsBottomSheetOpen(false)}
        position="bottom"
        size="md"
      >
        <SheetHeader 
          title="Bottom Drawer" 
          description="This is a bottom sheet drawer, just like iOS!"
        />
        <SheetContent>
          <div className="space-y-4">
            <p className="text-gray-700">
              This bottom sheet slides up from the bottom of the screen with smooth animations.
              Perfect for mobile-first interfaces and quick actions.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <button className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                Action 1
              </button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      <div className="flex items-center gap-4">
        <span className="text-gray-700">Need help?</span>
        <TooltipDropdown items={helpItems} />
      </div>
    </div>
  );
}
