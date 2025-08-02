'use client';
import { useState } from "react";
import { motion } from "framer-motion";
import { Sheet, SheetContent, SheetHeader } from "../../src/components/Sheet";
import Button from "../../src/components/Button/Button";

export default function SheetDemoPage() {
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  return (
    <motion.div 
      className="min-h-screen flex items-center justify-center p-8"
      animate={{
        scale: isBottomSheetOpen ? 0.95 : 1,
        borderRadius: isBottomSheetOpen ? "20px" : "0px"
      }}
      transition={{
        type: "spring",
        damping: 30,
        stiffness: 300,
        mass: 0.8
      }}
    >
      <div className="text-center">
        <Button 
          onClick={() => setIsBottomSheetOpen(true)}
          className="bg-black text-white hover:bg-gray-800"
        >
          Open Sheet
        </Button>

        {/* Bottom Sheet */}
        <Sheet 
          isOpen={isBottomSheetOpen} 
          onClose={() => setIsBottomSheetOpen(false)}
          position="bottom"
          size="md"
          showCloseButton={false}
        >
          <SheetHeader 
            title="Bottom Drawer" 
            description="This is a bottom sheet drawer, just like iOS!"
            onClose={() => setIsBottomSheetOpen(false)}
            showCloseButton={true}
          />
          <SheetContent>
            <div className="space-y-6">
                <p className="text-sm text-gray-600">
                  This bottom sheet is perfect for mobile interfaces where you want to present options or actions without leaving the current context.
                </p>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </motion.div>
  );
}
