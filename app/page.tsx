'use client';
import { useState } from "react";
import ButtonTextEffect from "../src/components/Button/ButtonTextEffect";
import AvatarTooltip from "../src/components/Avatar/AvatarTooltip";
import Button from "../src/components/Button/Button";
import SendButton from "../src/components/Button/SendButton";
import TextInput from "../src/components/Chat/TextInput";
import Message from "../src/components/Chat/Message";
import ImageExpand from "../src/components/Imgs/ImageExpand";
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "../src/components/Sheet";

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

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 gap-12 sm:p-20 font-[family-name:var(--font-inter-sans)]">
      <div className="flex items-center justify-center gap-8">
        <AvatarTooltip
          variant="image"
          src="https://images.pexels.com/photos/8825559/pexels-photo-8825559.jpeg"
          alt="Profile avatar"
        />
        <AvatarTooltip
          variant="initials"
          initials="AS"
          alt="Profile initials avatar"
        />
      </div>

      <div className="flex items-center justify-center gap-8">
        <Button>
          Button
        </Button>     

        <ButtonTextEffect />

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

        <SheetTrigger 
          onClick={() => setIsTopSheetOpen(true)}
          className="bg-green-500 text-white hover:bg-green-600"
        >
          Open Top Sheet
        </SheetTrigger>

        <SheetTrigger 
          onClick={() => setIsLeftSheetOpen(true)}
          className="bg-purple-500 text-white hover:bg-purple-600"
        >
          Open Left Sheet
        </SheetTrigger>

        <SheetTrigger 
          onClick={() => setIsRightSheetOpen(true)}
          className="bg-orange-500 text-white hover:bg-orange-600"
        >
          Open Right Sheet
        </SheetTrigger>
      </div>

      <ImageExpand 
        images={sampleImages}
        className="mb-8"
      />

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
          onClose={() => setIsBottomSheetOpen(false)}
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
              <button className="p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                Action 2
              </button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Top Sheet */}
      <Sheet 
        isOpen={isTopSheetOpen} 
        onClose={() => setIsTopSheetOpen(false)}
        position="top"
        size="sm"
      >
        <SheetHeader 
          title="Top Notification" 
          onClose={() => setIsTopSheetOpen(false)}
        />
        <SheetContent>
          <p className="text-gray-700">
            This sheet slides down from the top - great for notifications or alerts!
          </p>
        </SheetContent>
      </Sheet>

      {/* Left Sheet */}
      <Sheet 
        isOpen={isLeftSheetOpen} 
        onClose={() => setIsLeftSheetOpen(false)}
        position="left"
        size="md"
      >
        <SheetHeader 
          title="Side Menu" 
          onClose={() => setIsLeftSheetOpen(false)}
        />
        <SheetContent>
          <div className="space-y-2">
            <button className="w-full p-3 text-left hover:bg-gray-100 rounded-lg transition-colors">
              🏠 Home
            </button>
            <button className="w-full p-3 text-left hover:bg-gray-100 rounded-lg transition-colors">
              👤 Profile
            </button>
            <button className="w-full p-3 text-left hover:bg-gray-100 rounded-lg transition-colors">
              ⚙️ Settings
            </button>
            <button className="w-full p-3 text-left hover:bg-gray-100 rounded-lg transition-colors">
              📞 Contact
            </button>
          </div>
        </SheetContent>
      </Sheet>

      {/* Right Sheet */}
      <Sheet 
        isOpen={isRightSheetOpen} 
        onClose={() => setIsRightSheetOpen(false)}
        position="right"
        size="lg"
      >
        <SheetHeader 
          title="Details Panel" 
          description="Additional information and settings"
          onClose={() => setIsRightSheetOpen(false)}
        />
        <SheetContent>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold mb-2">User Information</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <p>Name: John Doe</p>
                <p>Email: john@example.com</p>
                <p>Role: Administrator</p>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Recent Activity</h3>
              <div className="space-y-2 text-sm">
                <div className="p-2 bg-gray-50 rounded">
                  Updated profile picture
                </div>
                <div className="p-2 bg-gray-50 rounded">
                  Changed password
                </div>
                <div className="p-2 bg-gray-50 rounded">
                  Logged in from new device
                </div>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
