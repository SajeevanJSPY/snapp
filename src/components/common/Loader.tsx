'use client';

export default function Loader() {
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="relative w-[0.15em] h-[0.15em] bg-current rounded-full animate-loader-spin">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[0.3em] h-[1em] rounded-full animate-loader-pulseA" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1em] h-[0.3em] rounded-full animate-loader-pulseB" />
            </div>

            <style jsx>{`
          @keyframes loader-spin {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
  
          @keyframes loader-pulse {
            0% {
              box-shadow: 0.04em -0.04em 0 0.02em currentColor;
            }
            25% {
              box-shadow: 0.04em 0.04em 0 0.02em currentColor;
            }
            50% {
              box-shadow: -0.04em 0.04em 0 0.02em currentColor;
            }
            75% {
              box-shadow: -0.04em -0.04em 0 0.02em currentColor;
            }
            100% {
              box-shadow: 0.04em -0.04em 0 0.02em currentColor;
            }
          }
  
          .animate-loader-spin {
            animation: loader-spin 30s linear infinite;
          }
  
          .animate-loader-pulseA {
            animation: loader-pulse 0.8s linear infinite;
          }
  
          .animate-loader-pulseB {
            animation: loader-pulse 1.2s linear infinite;
          }
        `}</style>
        </div>
    );
};
