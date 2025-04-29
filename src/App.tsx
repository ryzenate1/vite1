import React, { useState, useRef, useEffect } from 'react';
import LocomotiveScroll from 'locomotive-scroll';
import { useSound } from './hooks/useSound';
import { motion, AnimatePresence } from 'framer-motion';

// --- Context Imports ---
import { useCursor } from './context/CursorContext';

// --- Component Imports ---
import Bootloader from './components/Bootloader/Bootloader';
import Navbar from './components/Navbar/Navbar';
import Landing from './components/Landing/Landing';
import About from './components/About/About';
import Contact from './components/Contact/Contact';
import VideoBackground from './components/Background/VideoBackground';
import ProjectsSection from './components/Projects/Projects';
import CustomCursor from './components/CustomCursor/CustomCursor';
import { ErrorDisplay } from './components/ErrorDisplay'
import Footer from './components/Footer/Footer';

// Types
interface Section {
  id: string;
  onContentReady?: () => void;
  Component: React.ComponentType<any>;
}

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [, setSoundError] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const locoScrollRef = useRef<LocomotiveScroll | null>(null);
  const { isTargeted, setCursorState } = useCursor();

  // --- Ambient Sound Management ---
  const { playSound, stopSound } = useSound('ambient', { 
    volume: 0.1, 
    loop: true
  });

  useEffect(() => {
    let ambientTimeout: number | undefined;
    
    try {
      // Initialize Locomotive Scroll
      if (scrollRef.current) {
        locoScrollRef.current = new LocomotiveScroll({
          el: scrollRef.current,
          smooth: true,
          multiplier: 1,
          lerp: 0.1,
          getDirection: true,
          getSpeed: true,
          smartphone: {
            smooth: true
          },
          tablet: {
            smooth: true
          }
        });
      }

      // Initialize sound after a delay
      ambientTimeout = window.setTimeout(() => {
        try {
          playSound();
        } catch (error) {
          setSoundError(true);
        }
      }, 2000);

      // Cleanup
      return () => {
        if (ambientTimeout) {
          clearTimeout(ambientTimeout);
        }
        stopSound();
        if (locoScrollRef.current) {
          locoScrollRef.current.destroy();
        }
      };
    } catch (error) {
      console.error('Error in App useEffect:', error);
    }
  }, [playSound, stopSound]);

  // --- Locomotive Scroll Setup ---
  useEffect(() => {
    let scrollInstance: LocomotiveScroll | null = null;

    const initScroll = () => {
      if (!isLoading && scrollRef.current && !locoScrollRef.current) {
        scrollInstance = new LocomotiveScroll({
          el: scrollRef.current,
          smooth: true,
          lerp: 0.08,
          multiplier: 1,
          getDirection: true,
          getSpeed: true,
          smartphone: {
            smooth: true
          },
          tablet: {
            smooth: true
          }
        });

        locoScrollRef.current = scrollInstance;

        // Initial update after a short delay
        setTimeout(() => {
          if (scrollInstance) {
            scrollInstance.update();
          }
        }, 100);
      }
    };

    // Initialize scroll
    initScroll();

    // Handle resize events
    const handleResize = () => {
      if (scrollInstance) {
        scrollInstance.update();
      }
    };
    window.addEventListener('resize', handleResize);

    // Handle scroll events
    const handleScroll = () => {
      if (isTargeted) {
        setCursorState({ isTargeted: false, targetRect: null });
      }
    };
    window.addEventListener('scroll', handleScroll);

    // Setup mutation observer for content changes
    const observer = new MutationObserver(() => {
      if (scrollInstance) {
        scrollInstance.update();
      }
    });

    if (scrollRef.current) {
      observer.observe(scrollRef.current, { 
        childList: true, 
        subtree: true,
        attributes: true,
        characterData: true
      });
    }

    // Cleanup function
    return () => {
      if (scrollInstance) {
        scrollInstance.destroy();
        scrollInstance = null;
        locoScrollRef.current = null;
      }
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, [isLoading, setCursorState, isTargeted]);

  // --- Handle Boot Complete ---
  const handleBootComplete = () => {
    setIsLoading(false);
  };

  // --- Sections Configuration ---
  const sections: Section[] = [
    { id: 'home', Component: Landing },
    { id: 'about', Component: About },
    { id: 'projects', Component: ProjectsSection },
    { id: 'contact', Component: Contact },
  ];

  const footerSection = (
    <footer 
      data-scroll-section 
      className="py-8 text-center text-neutral-500 text-xs bg-[#0d1117] relative z-10"
    >
      © {new Date().getFullYear()} Ryzen. All rights reserved.
    </footer>
  );

  return (
    <>
      <ErrorDisplay />
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Bootloader onBootComplete={handleBootComplete} />
          </motion.div>
        ) : (
          <motion.div
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative min-h-screen overflow-x-hidden"
          >
            <CustomCursor />
            <div className="font-sans opacity-100 transition-opacity duration-500 ease-in">
              <VideoBackground />
              <Navbar />
              <div ref={scrollRef} data-scroll-container className="relative z-10">
                {sections.map(({ id, Component }) => (
                  <Component key={id} id={id} />
                ))}
                <Footer />
                {footerSection}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default App;
