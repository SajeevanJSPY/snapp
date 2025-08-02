'use client';

import { motion, AnimatePresence } from 'motion/react';
import Chat from '@/components/chat/Chat';
import { useIsMobile } from '@/hooks/ScreenDetection';
import { useChatContext } from '@/hooks/ChatUI';
import { ChatContactList } from '@/components/chat/ChatContactsList';

export default function Page() {
    const { isChatBox } = useChatContext();
    const isMobile = useIsMobile();

    const sectionVariants = {
        initial: (direction: number) => ({
            x: direction > 0 ? 100 : -100,
            opacity: 0,
            position: 'absolute' as const,
        }),
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        animate: (direction: number) => ({
            x: 0,
            opacity: 1,
            position: 'relative' as const,
            transition: {
                type: 'spring' as const,
                damping: 20,
                stiffness: 100,
            },
        }),
        exit: (direction: number) => ({
            x: direction > 0 ? -100 : 100,
            opacity: 0,
            position: 'absolute' as const,
            transition: {
                duration: 0.3,
            },
        }),
    };

    return (
        <main className="h-screen overflow-hidden block md:grid md:grid-cols-5">
            {/* for mobile screens */}
            {isMobile ? (
                <>
                    <AnimatePresence mode="wait" custom={1}>
                        {!isChatBox && (
                            <motion.div
                                key="contacts"
                                custom={1}
                                variants={sectionVariants}
                                initial="initial"
                                animate="animate"
                                exit="exit"
                                className="h-full"
                            >
                                <section className="w-full h-full overflow-y-auto">
                                    <ChatContactList />
                                </section>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <AnimatePresence mode="wait" custom={-1}>
                        {isChatBox && (
                            <motion.div
                                key="chat"
                                custom={-1}
                                variants={sectionVariants}
                                initial="initial"
                                animate="animate"
                                exit="exit"
                                className="h-full w-full"
                            >
                                <section className="w-full h-full overflow-y-auto">
                                    <Chat />
                                </section>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </>
            ) : (
                <>
                    <section className="md:col-span-2 w-full h-full overflow-y-auto">
                        <ChatContactList />
                    </section>
                    <section className="md:col-span-3 h-full overflow-y-auto">
                        <Chat />
                    </section>
                </>
            )}
        </main>
    );
}
