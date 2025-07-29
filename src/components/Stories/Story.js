import { Box, IconButton } from "@mui/material";
import React, { useEffect, useState, lazy, Suspense, useRef } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { motion, useMotionValue, useTransform, AnimatePresence, useAnimation } from 'framer-motion';

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

const Story = (props) => {
  const [activeStoryIndex, setActiveStoryIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [dragDirection, setDragDirection] = useState(null); // 'vertical', 'horizontal', or null
  const [initialTouchPosition, setInitialTouchPosition] = useState({ x: 0, y: 0 });
  
  // Motion values for animations
  const y = useMotionValue(0);
  const x = useMotionValue(0);
  
  const viewportHeight = typeof window !== 'undefined' ? window.innerHeight : 1000;
  const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 1000;
  
  // Remove scaling/opacity transforms during drag - keep component same size
  // Only apply transforms when dismissing (after drag ends)
  const scale = useTransform(y, [0, viewportHeight * 0.3, viewportHeight], [1, 0.9, 0.8]);
  const opacity = useTransform(y, [0, viewportHeight * 0.5, viewportHeight], [1, 0.8, 0.4]);
  const borderRadius = useTransform(y, [0, viewportHeight * 0.2, viewportHeight / 2], ["0%", "15%", "30%"]);
  
  const controls = useAnimation();
  const horizontalControls = useAnimation();

  useEffect(() => {
    if (props.clicked) {
      document.body.style.overflow = 'hidden';
      y.set(0);
      x.set(0);
      setActiveStoryIndex(0);
      setIsLoading(true);
      setDragDirection(null);
      
      // Set initial position for horizontal container without animation
      horizontalControls.set({
        x: 0
      });
      
      // Don't animate controls when story opens - let layoutId handle it
      controls.set({
        y: 0,
        scale: 1,
        opacity: 1,
        borderRadius: "0%"
      });
      
      // Simulate loading completion after a short delay
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
    console.log('Drag start:', { x: info.point.x, y: info.point.y });
  };

  const handleDrag = (event, info) => {
    // Only determine direction if not already set and we have sufficient movement
    if (!dragDirection) {
      const deltaX = Math.abs(info.offset.x);
      const deltaY = Math.abs(info.offset.y);
      const magnitude = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      
      // Wait for at least 20px of movement before determining direction
      if (magnitude > 20) {
        const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
        
        // Strictly vertical: within 15 degrees of vertical (75-90 degrees)
        if (angle >= 75 && angle <= 90) {
          setDragDirection('vertical');
          console.log('Direction locked: VERTICAL');
        }
        // Horizontal or diagonal: anything else
        else {
          setDragDirection('horizontal');
          console.log('Direction locked: HORIZONTAL');
        }
      }
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
    
    console.log('Drag end analysis:', { 
      deltaX, 
      deltaY, 
      magnitude,
      finalDragDirection,
      velocityY: info.velocity.y
    });
    
    // Handle based on locked direction
    if (finalDragDirection === 'vertical') {
      // STRICTLY VERTICAL - only handle dismiss, no horizontal navigation
      if (deltaY > 0) {
        const dismissThreshold = viewportHeight * 0.1; // 10% of screen
        const flickVelocityThreshold = 300;
        const minDismissDistance = 50;

        if (deltaY > dismissThreshold || info.velocity.y > flickVelocityThreshold || deltaY > minDismissDistance) {
          console.log('Dismissing story - vertical threshold met');
          handleClose();
        } else {
          console.log('Snapping back - vertical threshold not met');
          // Snap back to fullscreen with minimal spring and no bounce
          controls.start({
            y: 0,
            scale: 1,
            opacity: 1,
            borderRadius: "0%",
            transition: {
              type: "tween",
              ease: "easeOut",
              duration: 0.2
            }
          });
        }
      } else {
        // Upward vertical movement - just snap back with no spring
        controls.start({
          y: 0,
          scale: 1,
          opacity: 1,
          borderRadius: "0%",
          transition: {
            type: "tween",
            ease: "easeOut",
            duration: 0.2
          }
        });
      }
    } else if (finalDragDirection === 'horizontal' || !finalDragDirection) {
      // HORIZONTAL OR DIAGONAL - handle story navigation
      const threshold = viewportWidth * 0.3;
      let newIndex = activeStoryIndex;
      
      if (Math.abs(deltaX) > threshold) {
        if (deltaX > 0 && activeStoryIndex > 0) {
          newIndex = activeStoryIndex - 1;
        } else if (deltaX < 0 && activeStoryIndex < stories.length - 1) {
          newIndex = activeStoryIndex + 1;
        }
      }
      
      console.log('Horizontal navigation:', { 
        deltaX, 
        threshold, 
        activeStoryIndex, 
        newIndex,
        willChange: newIndex !== activeStoryIndex 
      });
      
      setActiveStoryIndex(newIndex);
      
      // Animate to the correct position with less spring
      horizontalControls.start({
        x: -newIndex * viewportWidth,
        transition: { 
          type: "tween",
          ease: "easeOut",
          duration: 0.3
        }
      });
      
      // Also snap back vertical position with no spring
      controls.start({
        y: 0,
        scale: 1,
        opacity: 1,
        borderRadius: "0%",
        transition: {
          type: "tween",
          ease: "easeOut",
          duration: 0.2
        }
      });
    }
  };

  const handleHorizontalDragEnd = (event, info) => {
    setIsDragging(false);
    const finalDragDirection = dragDirection;
    setDragDirection(null);
    
    // If drag was locked to vertical, ignore horizontal navigation completely
    if (finalDragDirection === 'vertical') {
      console.log('Ignoring horizontal navigation - was vertical drag');
      // Snap back to current position with no spring
      horizontalControls.start({
        x: -activeStoryIndex * viewportWidth,
        transition: { 
          type: "tween",
          ease: "easeOut",
          duration: 0.2
        }
      });
      return;
    }
    
    const deltaX = info.offset.x;
    const deltaY = info.offset.y;
    const magnitude = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    
    if (magnitude === 0) return;
    
    console.log('Horizontal drag end analysis:', { 
      deltaX, 
      deltaY, 
      magnitude,
      finalDragDirection
    });
    
    // Handle horizontal navigation
    const threshold = viewportWidth * 0.3;
    let newIndex = activeStoryIndex;
    
    if (Math.abs(deltaX) > threshold) {
      if (deltaX > 0 && activeStoryIndex > 0) {
        newIndex = activeStoryIndex - 1;
      } else if (deltaX < 0 && activeStoryIndex < stories.length - 1) {
        newIndex = activeStoryIndex + 1;
      }
    }
    
    console.log('Horizontal navigation decision:', { 
      deltaX, 
      threshold, 
      activeStoryIndex, 
      newIndex,
      willChange: newIndex !== activeStoryIndex 
    });
    
    setActiveStoryIndex(newIndex);
    
    // Animate to the correct position with no spring
    horizontalControls.start({
      x: -newIndex * viewportWidth,
      transition: { 
        type: "tween",
        ease: "easeOut",
        duration: 0.3
      }
    });
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      handleClose();
    } else if (event.key === 'ArrowLeft' && activeStoryIndex > 0) {
      const newIndex = activeStoryIndex - 1;
      setActiveStoryIndex(newIndex);
      horizontalControls.start({
        x: -newIndex * viewportWidth,
        transition: { 
          type: "tween",
          ease: "easeOut",
          duration: 0.3
        }
      });
    } else if (event.key === 'ArrowRight' && activeStoryIndex < stories.length - 1) {
      const newIndex = activeStoryIndex + 1;
      setActiveStoryIndex(newIndex);
      horizontalControls.start({
        x: -newIndex * viewportWidth,
        transition: { 
          type: "tween",
          ease: "easeOut",
          duration: 0.3
        }
      });
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [activeStoryIndex]);

  const onExitComplete = () => {
    setActiveStoryIndex(0);
    controls.stop();
    horizontalControls.stop();
    y.set(0);
    x.set(0);
  };

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
            transition={{ duration: 0.3, ease: "easeOut" }}
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
          
          <motion.div
            layoutId={props.storyId}
            drag={dragDirection === 'horizontal' ? false : "y"}
            dragConstraints={{ top: 0, bottom: viewportHeight }}
            dragElastic={{ top: 0.2, bottom: 0.8 }}
            onDragStart={handleDragStart}
            onDrag={handleDrag}
            onDragEnd={handleDragEnd}
            initial={false}
            exit={{
              scale: 0.8,
              opacity: 0,
              transition: {
                type: "tween",
                ease: "easeIn",
                duration: 0.2
              }
            }}
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
              // Only apply scaling/opacity when dismissing, not during drag
              scale: isDragging ? 1 : scale,
              opacity: isDragging ? 1 : opacity,
              borderRadius: isDragging ? "0%" : borderRadius,
              userSelect: 'none',
              WebkitUserSelect: 'none',
              overflow: 'hidden',
            }}
            animate={controls}
            transition={{
              layout: {
                type: "tween",
                ease: "easeOut",
                duration: 0.4
              }
            }}
          >
          {/* Horizontal Swipe Container */}
          <motion.div
            className="story-container"
            style={{
              width: `${stories.length * 100}vw`,
              height: '100vh',
              display: 'flex',
              position: 'relative',
              overflow: 'hidden',
            }}
            drag={dragDirection === 'vertical' ? false : "x"}
            dragConstraints={{
              left: -(stories.length - 1) * viewportWidth,
              right: 0
            }}
            dragElastic={0.1}
            dragMomentum={false}
            onDragStart={handleDragStart}
            onDrag={handleDrag}
            onDragEnd={handleHorizontalDragEnd}
            animate={horizontalControls}
          >
            {stories.map((story, index) => (
              <motion.div
                key={index}
                className="story-slide"
                style={{
                  width: '100vw',
                  height: '100vh',
                  flexShrink: 0,
                  position: 'relative',
                }}
                animate={{ 
                  opacity: index === activeStoryIndex ? 1 : 0.3,
                  scale: index === activeStoryIndex ? 1 : 0.95
                }}
                transition={{ 
                  duration: 0.2,
                  ease: "easeInOut"
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
                
                {/* Debug indicators */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: '1rem',
                    left: '1rem',
                    color: 'white',
                    backgroundColor: 'rgba(0, 0, 0, 0.6)',
                    padding: '0.5rem',
                    borderRadius: '4px',
                    fontSize: '12px',
                    zIndex: 9999,
                  }}
                >
                  Story {index + 1} of {stories.length} | Active: {activeStoryIndex + 1}
                </Box>
                
                {/* Direction indicator */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: '3rem',
                    left: '1rem',
                    color: 'white',
                    backgroundColor: 'rgba(0, 0, 0, 0.6)',
                    padding: '0.5rem',
                    borderRadius: '4px',
                    fontSize: '10px',
                    zIndex: 9999,
                  }}
                >
                  Direction: {dragDirection || 'none'} | Dragging: {isDragging ? 'Yes' : 'No'}
                </Box>

                {/* Threshold indicator */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: '5rem',
                    left: '1rem',
                    color: 'white',
                    backgroundColor: 'rgba(0, 0, 0, 0.6)',
                    padding: '0.5rem',
                    borderRadius: '4px',
                    fontSize: '10px',
                    zIndex: 9999,
                  }}
                >
                  Vertical: 75-90° only | Horizontal: everything else
                </Box>
                
                {/* Rules indicator */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: '7rem',
                    left: '1rem',
                    color: 'white',
                    backgroundColor: 'rgba(0, 0, 0, 0.6)',
                    padding: '0.5rem',
                    borderRadius: '4px',
                    fontSize: '10px',
                    zIndex: 9999,
                  }}
                >
                  STRICT VERTICAL = dismiss only | DIAGONAL/HORIZONTAL = navigate
                </Box>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Story;