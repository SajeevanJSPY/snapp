import { ReactNode } from 'react';

export default function ResponsiveButton({ children }: { children: ReactNode }) {
    return (
        <div className="p-2 cursor-pointer transform transition duration-200 ease-in-out hover:scale-120 active:scale-90 focus:outline-none rounded-2xl">
            {children}
        </div>
    );
}
