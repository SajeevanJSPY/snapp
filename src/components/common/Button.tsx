import { motion } from 'motion/react';
import { ReactNode } from 'react';

export default function ResponsiveButton({ children }: { children: ReactNode }) {
    return (
        <motion.div
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.8 }}
            className="cursor-pointer"
        >
            {children}
        </motion.div>
    );
}