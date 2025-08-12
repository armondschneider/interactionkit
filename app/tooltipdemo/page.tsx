"use client";

import TooltipDropdown from '../../src/components/Tooltip/TooltipDropdown';
import HoverTooltip from '../../src/components/Tooltip/HoverTooltip';
import Button from '../../src/components/Button/Button';
import Avatar from '../../src/components/Avatar/Avatar';
import { FileEditIcon, HeadphonesIcon, Message01Icon, HelpCircleIcon } from 'hugeicons-react';

export default function TooltipDemo() {
  const helpItems = [
    {
      icon: FileEditIcon,
      label: 'Documentation',
      onClick: () => console.log('Opening documentation')
    },
    {
      icon: HeadphonesIcon,
      label: 'Support',
      onClick: () => console.log('Opening support')
    },
    {
      icon: Message01Icon,
      label: 'Contact us',
      onClick: () => console.log('Opening contact')
    }
  ];

  const infoItems = [
    {
      label: 'About this feature',
      onClick: () => console.log('About clicked')
    },
    {
      label: 'Learn more',
      onClick: () => console.log('Learn more clicked')
    },
    {
      label: 'Keyboard shortcuts',
      onClick: () => console.log('Shortcuts clicked')
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
          Tooltip Components Demo
        </h1>

        {/* HoverTooltip Examples */}
        <div className="mb-12 bg-white rounded-xl p-6 shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">HoverTooltip Examples</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Avatar with tooltip */}
            <div className="flex flex-col items-center gap-4">
              <h3 className="text-lg font-medium text-gray-700">Avatar with Tooltip</h3>
              <div className="flex gap-4">
                <HoverTooltip content="Profile avatar - Account created August 2019" position="bottom">
                  <Avatar
                    variant="image"
                    src="https://images.pexels.com/photos/8825559/pexels-photo-8825559.jpeg"
                    alt="Profile avatar"
                  />
                </HoverTooltip>
                <HoverTooltip content="Initials avatar - Armond Schneider" position="top">
                  <Avatar variant="initials" initials="AS" alt="Initials avatar" />
                </HoverTooltip>
              </div>
            </div>

            {/* Button with tooltip */}
            <div className="flex flex-col items-center gap-4">
              <h3 className="text-lg font-medium text-gray-700">Button with Tooltip</h3>
              <div className="flex gap-4">
                <HoverTooltip content="Click to submit form" position="top">
                  <Button>Submit</Button>
                </HoverTooltip>
                <HoverTooltip content="This action cannot be undone" position="bottom">
                  <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                    Delete
                  </button>
                </HoverTooltip>
              </div>
            </div>

            {/* Different positions */}
            <div className="flex flex-col items-center gap-4">
              <h3 className="text-lg font-medium text-gray-700">Different Positions</h3>
              <div className="grid grid-cols-2 gap-8 p-8">
                <HoverTooltip content="Top tooltip" position="top">
                  <div className="p-3 bg-blue-100 rounded-lg cursor-help">Top</div>
                </HoverTooltip>
                <HoverTooltip content="Right tooltip" position="right">
                  <div className="p-3 bg-green-100 rounded-lg cursor-help">Right</div>
                </HoverTooltip>
                <HoverTooltip content="Left tooltip" position="left">
                  <div className="p-3 bg-yellow-100 rounded-lg cursor-help">Left</div>
                </HoverTooltip>
                <HoverTooltip content="Bottom tooltip" position="bottom">
                  <div className="p-3 bg-purple-100 rounded-lg cursor-help">Bottom</div>
                </HoverTooltip>
              </div>
            </div>

            {/* Rich content tooltip */}
            <div className="flex flex-col items-center gap-4">
              <h3 className="text-lg font-medium text-gray-700">Rich Content</h3>
              <HoverTooltip 
                content={
                  <div className="text-center">
                    <div className="font-semibold">Pro Feature</div>
                    <div className="text-xs opacity-75">Upgrade to unlock</div>
                  </div>
                }
                position="top"
              >
                <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg">
                  Premium Feature
                </button>
              </HoverTooltip>
            </div>
          </div>
        </div>

        {/* TooltipDropdown Examples */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">TooltipDropdown Examples</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Default Position (Bottom) */}
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Default Position</h2>
              <TooltipDropdown items={helpItems} />
            </div>
            <p className="text-gray-600">
              Hover over the info icon to see the dropdown appear below with a smooth scale animation.
            </p>
          </div>

          {/* Top Position */}
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <p className="text-gray-600 mb-4">
              This dropdown appears above the trigger with upward animation.
            </p>
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-semibold text-gray-800">Top Position</h2>
              <TooltipDropdown items={infoItems} position="top" />
            </div>
          </div>

          {/* Left Position */}
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-end gap-3">
              <TooltipDropdown items={helpItems} position="left" />
              <h2 className="text-xl font-semibold text-gray-800">Left Position</h2>
            </div>
            <p className="text-gray-600 mt-4">
              The dropdown slides out from the left side of the trigger.
            </p>
          </div>

          {/* Right Position */}
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-semibold text-gray-800">Right Position</h2>
              <TooltipDropdown items={infoItems} position="right" />
            </div>
            <p className="text-gray-600 mt-4">
              The dropdown expands to the right with proper transform origin.
            </p>
          </div>

          {/* Custom Trigger */}
          <div className="bg-white rounded-xl p-6 shadow-lg md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Custom Trigger</h2>
              <TooltipDropdown 
                items={helpItems}
                trigger={
                  <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2">
                    <HelpCircleIcon size={18} />
                    Need Help?
                  </button>
                }
              />
            </div>
            <p className="text-gray-600">
              You can provide a custom trigger element instead of the default info icon.
            </p>
          </div>
        </div>

        {/* Demo Features */}
        <div className="mt-12 bg-white rounded-xl p-6 shadow-lg">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">HoverTooltip:</h4>
              <ul className="space-y-1 text-gray-600 text-sm">
                <li>• Hover-based tooltips with smooth animations</li>
                <li>• Multiple positioning options</li>
                <li>• Works with any trigger element</li>
                <li>• Rich content support</li>
                <li>• Automatic arrow positioning</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">TooltipDropdown:</h4>
              <ul className="space-y-1 text-gray-600 text-sm">
                <li>• Hover-based dropdown menus</li>
                <li>• Scale-out animations using Framer Motion</li>
                <li>• Menu item actions on click</li>
                <li>• Custom triggers and icons</li>
                <li>• Multiple positioning options</li>
              </ul>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}
