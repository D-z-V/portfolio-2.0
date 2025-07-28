import { Box, IconButton } from "@mui/material";
import React, { useEffect, useState, lazy, Suspense, useRef, useCallback } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { motion, useMotionValue, useTransform, AnimatePresence, useAnimation } from 'framer-motion';
import './StoryCube.css';

const StoriesLazy = React.lazy(() => import("react-insta-stories"));

const stories = [
  {
    url: 'https://picsum.photos/1080/1920',
    duration: 5000,
    header: {
      heading: 'NextJS',
      subheading: 'Posted 30m ago',
      profileImage: 'https://upload.wikimedia.org/wikipedia/commons/8/8e/Nextjs-logo.svg',
    },
  },
  {
    url: 'https://picsum.photos/1280/1920',
    duration: 5000,
    header: {
      heading: 'ReactJS',
      subheading: 'Posted 30m ago',
      profileImage: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg',
    },
  },
  {
    url: 'https://picsum.photos/1180/1920',
    duration: 5000,
    header: {
      heading: 'NodeJS',
      subheading: 'Posted 30m ago',
      profileImage: 'https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg',
    },
  },
  {
    url: 'https://picsum.photos/1480/1920',
    duration: 5000,
    header: {
      heading: 'MongoDB',
      subheading: 'Posted 30m ago',
      profileImage: 'https://upload.wikimedia.org/wikipedia/commons/9/93/MongoDB_Logo.svg',
    },
  },
  {
    url: 'https://picsum.photos/1080/1920',
    duration: 5000,
    header: {
      heading: 'PyTorch',
      subheading: 'Posted 30m ago',
      profileImage: 'https://upload.wikimedia.org/wikipedia/commons/1/10/PyTorch_logo_icon.svg',
    },
  },
];

const StoryCube = (props) => {
  const [activeStoryIndex, setActiveStoryIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [dragDirection, setDragDirection] = useState(null);
  const [initialTouchPosition, setInitialTouchPosition] = useState({ x: 0, y: 0 });
  const [rotatePercent, setRotatePercent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  // Refs for DOM manipulation
  const sceneRef = useRef(null);
  const cubeRef = useRef(null);
  
  // Motion values for animations
  const y = useMotionValue(0);
  const x = useMotionValue(0);
  
  const viewportHeight = typeof window !== 'undefined' ? window.innerHeight : 1000;
  const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 1000;
  
  // Transforms for swipe-to-dismiss
  const scale = useTransform(y, [0, viewportHeight * 0.3, viewportHeight], [1, 0.9, 0.8]);
  const opacity = useTransform(y, [0, viewportHeight * 0.5, viewportHeight], [1, 0.8, 0.4]);
  const borderRadius = useTransform(y, [0, viewportHeight * 0.2, viewportHeight / 2], ["0%", "15%", "30%"]);
  
  const controls = useAnimation();

  useEffect(() => {
    if (props.clicked) {
      document.body.style.overflow = 'hidden';
      y.set(0);
      x.set(0);
      setActiveStoryIndex(0);
      setIsLoading(true);
      setDragDirection(null);
      setRotatePercent(0);
      setIsTransitioning(false);
      
      // Initialize scene with CSS custom property
      if (sceneRef.current) {
        sceneRef.current.style.setProperty('--rotatePercent', '0');
      }
      
      controls.set({
        y: 0,
        scale: 1,
        opacity: 1,
        borderRadius: "0%"
      });
      
      // Simulate loading completion
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [props.clicked, props.storyId]);

  const handleClose = () => {
    props.setActiveIndex(null);
  };

  const handleDragStart = (event, info) => {
    setIsDragging(true);
    setDragDirection(null);
    setInitialTouchPosition({ x: info.point.x, y: info.point.y });
    
    // Remove transition class during drag for immediate response
    if (cubeRef.current) {
      cubeRef.current.classList.remove('cube-transition');
    }
    setIsTransitioning(false);
  };

  const handleDrag = (event, info) => {
    if (!dragDirection) {
      const deltaX = Math.abs(info.offset.x);
      const deltaY = Math.abs(info.offset.y);
      const magnitude = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      
      if (magnitude > 20) {
        const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
        
        if (angle >= 75 && angle <= 90) {
          setDragDirection('vertical');
        } else {
          setDragDirection('horizontal');
        }
      }
    }
    
    if (dragDirection === 'horizontal') {
      // Calculate rotation percentage based on horizontal drag
      let percentage = info.offset.x / viewportWidth;
      
      // Keep the transition smooth and responsive
      if (percentage > 0.95) percentage = 0.95;
      if (percentage < -0.95) percentage = -0.95;

      // Prevent move to left for first story
      if (activeStoryIndex === 0 && percentage > 0) {
        percentage = 0;
      }

      // Prevent move to right for last story
      if (activeStoryIndex === stories.length - 1 && percentage < 0) {
        percentage = 0;
      }

      // Update CSS custom property for real-time rotation
      if (sceneRef.current) {
        sceneRef.current.style.setProperty('--rotatePercent', `${percentage}`);
      }
      setRotatePercent(percentage);
    }
  };

  const handleDragEnd = (event, info) => {
    setIsDragging(false);
    const finalDragDirection = dragDirection;
    setDragDirection(null);
    
    const deltaX = info.offset.x;
    const deltaY = info.offset.y;
    const magnitude = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    
    if (magnitude === 0) return;
    
    if (finalDragDirection === 'vertical') {
      // Handle swipe-to-dismiss
      if (deltaY > 0) {
        const dismissThreshold = viewportHeight * 0.1;
        const flickVelocityThreshold = 300;
        const minDismissDistance = 50;

        if (deltaY > dismissThreshold || info.velocity.y > flickVelocityThreshold || deltaY > minDismissDistance) {
          handleClose();
        } else {
          // Snap back
          controls.start({
            y: 0,
            scale: 1,
            opacity: 1,
            borderRadius: "0%",
            transition: {
              type: "spring",
              stiffness: 1200,
              damping: 50,
              duration: 0.1
            }
          });
        }
      } else {
        // Snap back for upward movement
        controls.start({
          y: 0,
          scale: 1,
          opacity: 1,
          borderRadius: "0%",
          transition: {
            type: "spring",
            stiffness: 1200,
            damping: 50,
            duration: 0.1
          }
        });
      }
    } else if (finalDragDirection === 'horizontal') {
      // Handle cube navigation with threshold-based snapping
      const currentPercent = rotatePercent;
      let finalPercent = 0;
      let newIndex = activeStoryIndex;
      
      // Determine final snap position based on threshold (50% like in the example)
      if (Math.abs(currentPercent) > 0.5 && Math.abs(currentPercent) <= 1) {
        if (currentPercent > 0) {
          // Swipe right - go to previous story
          finalPercent = 1;
          if (activeStoryIndex > 0) {
            newIndex = activeStoryIndex - 1;
          }
        } else {
          // Swipe left - go to next story
          finalPercent = -1;
          if (activeStoryIndex < stories.length - 1) {
            newIndex = activeStoryIndex + 1;
          }
        }
      } else {
        // Snap back to center
        finalPercent = 0;
      }
      
      // Add transition class for smooth snapping
      if (cubeRef.current) {
        cubeRef.current.classList.add('cube-transition');
      }
      setIsTransitioning(true);
      
      // Update CSS custom property for final position
      if (sceneRef.current) {
        sceneRef.current.style.setProperty('--rotatePercent', `${finalPercent}`);
      }
      setRotatePercent(finalPercent);
      
      // Update active story index if changed
      if (newIndex !== activeStoryIndex) {
        setActiveStoryIndex(newIndex);
      }
      
      // Also snap back vertical position
      controls.start({
        y: 0,
        scale: 1,
        opacity: 1,
        borderRadius: "0%",
        transition: {
          type: "spring",
          stiffness: 500,
          damping: 30,
          duration: 0.2
        }
      });
    }
  };

  // Handle transition end to reset faces and prepare for next interaction
  const handleTransitionEnd = useCallback(() => {
    if (isTransitioning) {
      // Reset to center position after transition
      if (sceneRef.current) {
        sceneRef.current.style.setProperty('--rotatePercent', '0');
      }
      setRotatePercent(0);
      
      // Remove transition class for immediate response on next drag
      if (cubeRef.current) {
        cubeRef.current.classList.remove('cube-transition');
      }
      setIsTransitioning(false);
    }
  }, [isTransitioning]);

  const handleKeyDown = useCallback((event) => {
    if (event.key === 'Escape') {
      handleClose();
    } else if (event.key === 'ArrowLeft' && activeStoryIndex > 0) {
      const newIndex = activeStoryIndex - 1;
      setActiveStoryIndex(newIndex);
      
      // Animate with CSS transition
      if (cubeRef.current && sceneRef.current) {
        cubeRef.current.classList.add('cube-transition');
        sceneRef.current.style.setProperty('--rotatePercent', '1');
        setIsTransitioning(true);
        setRotatePercent(1);
      }
    } else if (event.key === 'ArrowRight' && activeStoryIndex < stories.length - 1) {
      const newIndex = activeStoryIndex + 1;
      setActiveStoryIndex(newIndex);
      
      // Animate with CSS transition
      if (cubeRef.current && sceneRef.current) {
        cubeRef.current.classList.add('cube-transition');
        sceneRef.current.style.setProperty('--rotatePercent', '-1');
        setIsTransitioning(true);
        setRotatePercent(-1);
      }
    }
  }, [activeStoryIndex]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const onExitComplete = () => {
    setActiveStoryIndex(0);
    setRotatePercent(0);
    setIsTransitioning(false);
    controls.stop();
    y.set(0);
    x.set(0);
  };

  // Get the three visible story faces for the cube
  const getVisibleStories = () => {
    const visibleStories = [];
    
    // Previous story (left face)
    if (activeStoryIndex > 0) {
      visibleStories.push({
        story: stories[activeStoryIndex - 1],
        index: activeStoryIndex - 1,
        position: 'left'
      });
    }
    
    // Current story (front face)
    visibleStories.push({
      story: stories[activeStoryIndex],
      index: activeStoryIndex,
      position: 'front'
    });
    
    // Next story (right face)
    if (activeStoryIndex < stories.length - 1) {
      visibleStories.push({
        story: stories[activeStoryIndex + 1],
        index: activeStoryIndex + 1,
        position: 'right'
      });
    }
    
    return visibleStories;
  };

  const visibleStories = getVisibleStories();

  // Don't render during SSR
  if (typeof window === 'undefined') {
    return null;
  }

  return (
    <AnimatePresence onExitComplete={onExitComplete}>
      {props.clicked && (
        <>
          {/* Black background overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              backgroundColor: 'black',
              zIndex: 9997,
            }}
          />
          
          {/* Main container with swipe-to-dismiss */}
          <motion.div
            layoutId={props.storyId}
            drag={dragDirection === 'horizontal' ? false : "y"}
            dragConstraints={{ top: 0, bottom: viewportHeight }}
            dragElastic={{ top: 0.2, bottom: 0.8 }}
            onDragStart={handleDragStart}
            onDrag={handleDrag}
            onDragEnd={handleDragEnd}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              backgroundColor: 'black',
              zIndex: 9998,
              touchAction: 'none',
              x: 0,
              y,
              scale: isDragging ? 1 : scale,
              opacity: isDragging ? 1 : opacity,
              borderRadius: isDragging ? "0%" : borderRadius,
              userSelect: 'none',
              WebkitUserSelect: 'none',
              overflow: 'hidden',
              // 3D perspective for the cube
              perspective: '300vw',
              perspectiveOrigin: 'center center',
            }}
            animate={controls}
            transition={{
              type: "spring",
              stiffness: 600,
              damping: 50,
              duration: 0.05
            }}
          >
            {/* 3D Cube Scene */}
            <div
              ref={sceneRef}
              className="stories-scene"
              style={{
                width: '100%',
                height: 'calc(100vh - 0px)', // Adjust if needed for mobile
                position: 'relative',
                transformStyle: 'preserve-3d',
                '--rotatePercent': rotatePercent,
              }}
            >
              {/* 3D Cube Container */}
              <div
                ref={cubeRef}
                className="stories-cube"
                drag={dragDirection === 'vertical' ? false : "x"}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.1}
                dragMomentum={false}
                onTransitionEnd={handleTransitionEnd}
                style={{
                  position: 'relative',
                  width: '100vw',
                  height: '100vh',
                  transformStyle: 'preserve-3d',
                  transform: `translateZ(-50vw) rotateY(calc((1 - var(--rotatePercent)) * 90deg * -1))`,
                  willChange: 'transform',
                }}
              >
                {/* Render cube faces */}
                {visibleStories.map(({ story, index, position }) => {
                  let faceTransform = '';
                  
                  switch (position) {
                    case 'left':
                      faceTransform = 'rotateY(0deg) translateZ(50vw)';
                      break;
                    case 'front':
                      faceTransform = 'rotateY(90deg) translateZ(50vw)';
                      break;
                    case 'right':
                      faceTransform = 'rotateY(180deg) translateZ(50vw)';
                      break;
                    default:
                      faceTransform = 'rotateY(90deg) translateZ(50vw)';
                  }
                  
                  return (
                    <div
                      key={`${index}-${position}`}
                      className="story-face"
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100vw',
                        height: '100vh',
                        backfaceVisibility: 'hidden',
                        transform: faceTransform,
                        willChange: 'transform',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center center',
                        borderRadius: '8px',
                      }}
                    >
                      <Suspense fallback={
                        <div style={{ 
                          backgroundColor: '#111', 
                          width: '100%', 
                          height: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'white',
                          fontSize: '18px',
                          flexDirection: 'column',
                          gap: '1rem'
                        }}>
                          <div style={{
                            width: '40px',
                            height: '40px',
                            border: '3px solid rgba(255,255,255,0.3)',
                            borderTop: '3px solid white',
                            borderRadius: '50%',
                            animation: 'spin 1s linear infinite'
                          }}></div>
                          Loading story...
                        </div>
                      }>
                        {isLoading ? (
                          <div style={{ 
                            backgroundColor: '#111', 
                            width: '100%', 
                            height: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontSize: '18px',
                            flexDirection: 'column',
                            gap: '1rem'
                          }}>
                            <div style={{
                              width: '40px',
                              height: '40px',
                              border: '3px solid rgba(255,255,255,0.3)',
                              borderTop: '3px solid white',
                              borderRadius: '50%',
                              animation: 'spin 1s linear infinite'
                            }}></div>
                            Loading story...
                          </div>
                        ) : (
                          <StoriesLazy
                            stories={[story]}
                            defaultInterval={5000}
                            height="100%"
                            width="100%"
                            storyContainerStyles={{ borderRadius: "8px", overflow: "hidden" }}
                            loop={false}
                            isPaused={index !== activeStoryIndex}
                          />
                        )}
                      </Suspense>
                    </div>
                  );
                })}
              </div>
            </div>
            
            {/* Close button */}
            <IconButton 
              aria-label="close" 
              sx={{ 
                color: 'white', 
                position: 'absolute', 
                top: '1rem', 
                right: '1rem', 
                zIndex: '9999',
                backgroundColor: 'rgba(0, 0, 0, 0.4)',
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.6)',
                }
              }} 
              onClick={handleClose}
            >
              <CloseIcon />
            </IconButton>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default StoryCube;