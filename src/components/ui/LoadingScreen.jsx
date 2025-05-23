import React from "react";
import { Loader2 } from "lucide-react";

const LoadingScreen = () => {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm z-[999]"
      role="status"
      aria-label="Loading"
    >
      <div className="flex flex-col items-center gap-6 text-center">
        <div className="relative">
          <Loader2
            className="w-16 h-16 text-[#B567FF] animate-spin"
            aria-hidden="true"
          />
          <div className="absolute inset-0 border-4 border-black rounded-full animate-pulse" />
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-white animate-bounce">
            The Leprechaun’s Wish
          </h2>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
