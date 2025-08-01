'use client';

export default function Loader() {
    return (
        <>
            <style jsx>{`
          @keyframes ringmove {
            0% {
              transform: rotateX(90deg) rotateZ(0deg) rotateX(30deg);
            }
            100% {
              transform: rotateX(90deg) rotateZ(360deg) rotateX(30deg);
            }
          }
        `}</style>

            <div className="m-0 p-0 w-screen h-screen flex justify-center items-center flex-col bg-black">
                <div className="fixed text-[1.5vw] [perspective:10em] [transform-style:preserve-3d] w-[10em] h-[10em]">
                    <div
                        className="fixed w-full h-full rounded-full border-[1em] border-[hsl(240,72%,65%)] mt-[-3em] [transform-style:preserve-3d]"
                        style={{
                            animation: 'ringmove 1s linear infinite',
                        }}
                    />
                    <div
                        className="fixed w-full h-full rounded-full border-[1em] border-[hsl(220,100%,70%)] mt-[3em] [transform-style:preserve-3d]"
                        style={{
                            animation: 'ringmove 1s linear infinite',
                            animationDelay: '-0.5s',
                        }}
                    />
                </div>
            </div>
        </>
    );
}