'use client';
import ImageExpand from "../../src/components/Imgs/ImageExpand";

const sampleImages = [
  {
    src: 'https://images.unsplash.com/photo-1608744882201-52a7f7f3dd60?q=80&w=736&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    alt: 'Beach sunset in Hawaii',
  },
  {
    src: 'https://images.unsplash.com/photo-1618173745308-59d13ae72fce?q=80&w=765&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    alt: 'Tropical paradise view',
  },
];

export default function ImageTestPage() {
  return (
    <div className="flex flex-col min-h-screen p-8 gap-8 sm:p-20 max-w-4xl mx-auto">
      {/* Date Header */}
      <div className="border-b border-gray-200 pb-4">
        <h1 className="text-md font-bold text-gray-900">Hawaii Vacation</h1>
        <p className="text-sm text-gray-500 mt-1">July 30, 2025</p>
      </div>

      {/* Journal Entry */}
      <div className="space-y-6">
        <p className="text-sm text-gray-800 leading-relaxed">
          What an incredible day here in Hawaii! The morning started with the most breathtaking sunrise I've ever witnessed. The colors painted across the sky were absolutely magical - deep oranges melting into soft pinks and purples. We spent the early hours walking along the pristine white sand beach, collecting shells and watching the gentle waves roll in.
        </p>

        <p className="text-sm text-gray-800 leading-relaxed">
          After a delicious breakfast of fresh tropical fruits and locally-made coffee, we decided to explore some of the hidden coves along the coastline. The water was crystal clear and perfectly warm - like stepping into a giant natural bathtub. We snorkeled for hours, marveling at the vibrant coral reefs and the incredible diversity of marine life. I've never seen fish so colorful and tropical flowers so vivid. This place truly feels like paradise on earth.
        </p>
      </div>
      
      {/* Image Stack */}
      <div className="flex flex-col items-center gap-4 mt-4">
        <ImageExpand
          images={sampleImages}
        />
      </div>
    </div>
  );
}
