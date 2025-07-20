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
  const [isVerticalMovement, setIsVerticalMovement] = useState(false);
  
  // Motion values for animations
  const y = useMotionValue(0);
  const x = useMotionValue(0);
  
  const viewportHeight = typeof window !== 'undefined' ? window.innerHeight : 1000;
  const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 1000;
  
  // Remove scaling/opacity transforms during drag - keep component same size
  // Only apply transforms when dismissing (after drag ends)
  const scale = useTransform(y, [0, viewportHeight * 0.5, viewportHeight], [1, 0.9, 0.7]);
  const opacity = useTransform(y, [0, viewportHeight * 0.6, viewportHeight], [1, 0.8, 0.3]);
  const borderRadius = useTransform(y, [0, viewportHeight * 0.3, viewportHeight / 2], ["0%", "20%", "40%"]);
  
  const controls = useAnimation();
  const horizontalControls = useAnimation();

  useEffect(() => {
    if (props.clicked) {
      document.body.style.overflow = 'hidden';
      y.set(0);
      x.set(0);
      setActiveStoryIndex(0);
      setIsLoading(true);
      
      // Set initial position for horizontal container
      horizontalControls.set({
        x: 0
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
    setIsVerticalMovement(false); // Reset vertical movement state
    console.log('Drag start:', { x: info.point.x, y: info.point.y });
  };

  const handleDrag = (event, info) => {
    // Detect vertical movement early during drag
    const deltaX = info.offset.x;
    const deltaY = info.offset.y;
    const magnitude = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    
    if (magnitude > 10) { // Only check after some movement
      const cosVertical = Math.abs(deltaY) / magnitude;
      const cosHorizontal = Math.abs(deltaX) / magnitude;
      
      // Detect vertical movement with a lower threshold (0.7) for early detection
      const isVertical = cosVertical > 0.7 && cosHorizontal < 0.7;
      
      if (isVertical && !isVerticalMovement) {
        setIsVerticalMovement(true);
        console.log('Vertical movement detected during drag');
      }
    }
  };

  const handleDragEnd = (event, info) => {
    setIsDragging(false);
    setIsVerticalMovement(false); // Reset vertical movement state
    
    // Calculate the angle of movement using dot product
    const deltaX = info.offset.x;
    const deltaY = info.offset.y;
    const magnitude = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    
    if (magnitude === 0) return; // No movement
    
    // Calculate cosine of angle with vertical axis (0° = vertical, 90° = horizontal)
    const cosVertical = Math.abs(deltaY) / magnitude;
    const cosHorizontal = Math.abs(deltaX) / magnitude;
    
    // Much stricter vertical threshold - only consider it vertical if cos > 0.98
    const isStrictlyVertical = cosVertical > 0.98;
    
    console.log('Vertical drag analysis:', { 
      deltaX, 
      deltaY, 
      magnitude,
      cosVertical,
      cosHorizontal,
      isStrictlyVertical
    });
    
    // Only handle vertical dismiss if it's strictly vertical (cos > 0.98)
    if (isStrictlyVertical && deltaY > 0) {
      // Much more sensitive thresholds for vertical dismiss
      const dismissThreshold = viewportHeight * 0.1; // Reduced from 0.2 to 0.1 (10% of screen)
      const flickVelocityThreshold = 300; // Reduced from 600 to 300
      const minDismissDistance = 50; // Minimum distance to dismiss

      if (deltaY > dismissThreshold || info.velocity.y > flickVelocityThreshold || deltaY > minDismissDistance) {
        console.log('Dismissing story - sensitive vertical threshold met');
        handleClose();
      } else {
        console.log('Snapping back - sensitive vertical threshold not met');
        // Snap back to fullscreen
        controls.start({
          y: 0,
          scale: 1,
          opacity: 1,
          borderRadius: "0%",
          transition: {
            type: "spring",
            stiffness: 450,
            damping: 25,
          }
        });
      }
    } else {
      // If not strictly vertical (cos < 0.98), treat as horizontal swipe
      // Use the magnitude of the cosine for horizontal navigation
      const horizontalMagnitude = cosHorizontal;
      const threshold = viewportWidth * 0.3; // 30% threshold
      const offset = deltaX * horizontalMagnitude; // Scale by horizontal component
      
      let newIndex = activeStoryIndex;
      
      // Only change story if threshold is met
      if (Math.abs(offset) > threshold) {
        if (offset > 0 && activeStoryIndex > 0) {
          newIndex = activeStoryIndex - 1;
        } else if (offset < 0 && activeStoryIndex < stories.length - 1) {
          newIndex = activeStoryIndex + 1;
        }
      }
      
      console.log('Horizontal navigation from vertical drag:', { 
        offset, 
        threshold, 
        horizontalMagnitude,
        activeStoryIndex, 
        newIndex,
        willChange: newIndex !== activeStoryIndex 
      });
      
      setActiveStoryIndex(newIndex);
      
      // Animate to the correct position
      horizontalControls.start({
        x: -newIndex * viewportWidth,
        transition: { 
          type: "spring", 
          stiffness: 500,
          damping: 30
        }
      });
      
      // Also snap back vertical position
      controls.start({
        y: 0,
        scale: 1,
        opacity: 1,
        borderRadius: "0%",
        transition: {
          type: "spring",
          stiffness: 450,
          damping: 25,
        }
      });
    }
  };

  const handleHorizontalDragEnd = (event, info) => {
    setIsDragging(false);
    setIsVerticalMovement(false); // Reset vertical movement state
    
    // If vertical movement was detected during drag, ignore horizontal navigation
    if (isVerticalMovement) {
      console.log('Ignoring horizontal navigation - vertical movement detected');
      // Snap back to current position
      horizontalControls.start({
        x: -activeStoryIndex * viewportWidth,
        transition: { 
          type: "spring", 
          stiffness: 500,
          damping: 30
        }
      });
      return;
    }
    
    // Calculate the angle of movement using dot product
    const deltaX = info.offset.x;
    const deltaY = info.offset.y;
    const magnitude = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    
    if (magnitude === 0) return; // No movement
    
    // Calculate cosine of angle with horizontal axis
    const cosHorizontal = Math.abs(deltaX) / magnitude;
    const cosVertical = Math.abs(deltaY) / magnitude;
    
    // Consider it horizontal if it's more horizontal than vertical AND not strictly vertical
    const isStrictlyVertical = cosVertical > 0.98;
    const isHorizontal = cosHorizontal > cosVertical && !isStrictlyVertical;
    
    console.log('Horizontal drag analysis:', { 
      deltaX, 
      deltaY, 
      magnitude,
      cosHorizontal,
      cosVertical,
      isStrictlyVertical,
      isHorizontal
    });
    
    // Handle horizontal navigation
    if (isHorizontal) {
      const threshold = viewportWidth * 0.3; // 30% threshold
      const offset = deltaX;
      
      let newIndex = activeStoryIndex;
      let willSnap = false;
      
      // Only change story if 30% is revealed
      if (Math.abs(offset) > threshold) {
        willSnap = true;
        if (offset > 0 && activeStoryIndex > 0) {
          newIndex = activeStoryIndex - 1;
        } else if (offset < 0 && activeStoryIndex < stories.length - 1) {
          newIndex = activeStoryIndex + 1;
        }
      }
      
      console.log('Horizontal navigation decision:', { 
        offset, 
        threshold, 
        activeStoryIndex, 
        newIndex,
        willSnap,
        willChange: newIndex !== activeStoryIndex 
      });
      
      setActiveStoryIndex(newIndex);
      
      // Animate to the correct position
      horizontalControls.start({
        x: -newIndex * viewportWidth,
        transition: { 
          type: "spring", 
          stiffness: 500,
          damping: 30
        }
      });
    } else if (isStrictlyVertical && deltaY > 0) {
      // If it's strictly vertical and downward, handle as vertical dismiss
      // Use the same sensitive thresholds as vertical drag
      const dismissThreshold = viewportHeight * 0.1; // 10% of screen
      const flickVelocityThreshold = 300; // Reduced velocity threshold
      const minDismissDistance = 50; // Minimum distance to dismiss

      if (deltaY > dismissThreshold || info.velocity.y > flickVelocityThreshold || deltaY > minDismissDistance) {
        console.log('Dismissing story from horizontal drag - sensitive vertical threshold met');
        handleClose();
      } else {
        console.log('Snapping back from horizontal drag - sensitive vertical threshold not met');
        // Snap back to fullscreen
        controls.start({
          y: 0,
          scale: 1,
          opacity: 1,
          borderRadius: "0%",
          transition: {
            type: "spring",
            stiffness: 450,
            damping: 25,
          }
        });
      }
    } else {
      // If not clearly horizontal or vertical, snap back to current position
      console.log('Snapping back - ambiguous movement');
      horizontalControls.start({
        x: -activeStoryIndex * viewportWidth,
        transition: { 
          type: "spring", 
          stiffness: 500,
          damping: 30
        }
      });
    }
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
          type: "spring", 
          stiffness: 500,
          damping: 30
        }
      });
    } else if (event.key === 'ArrowRight' && activeStoryIndex < stories.length - 1) {
      const newIndex = activeStoryIndex + 1;
      setActiveStoryIndex(newIndex);
      horizontalControls.start({
        x: -newIndex * viewportWidth,
        transition: { 
          type: "spring", 
          stiffness: 500,
          damping: 30
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
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              backgroundColor: 'black',
              zIndex: 9997, // Just below the story component
            }}
          />
          
          <motion.div
            layoutId={props.storyId}
            drag="y"
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
              // Only apply scaling/opacity when dismissing, not during drag
              scale: isDragging ? 1 : scale,
              opacity: isDragging ? 1 : opacity,
              borderRadius: isDragging ? "0%" : borderRadius,
              userSelect: 'none',
              WebkitUserSelect: 'none',
            }}
            initial={{
              borderRadius: "50%",
              opacity: 0,
              scale: 0.8,
            }}
            exit={{
              borderRadius: "50%",
              opacity: 0,
              scale: 0.8,
              transition: {
                type: "spring",
                stiffness: 300,
                damping: 20,
                duration: 0.25
              }
            }}
            animate={controls}
          >
          {/* Horizontal Swipe Container */}
          <motion.div
            className="story-container"
            style={{
              width: `${stories.length * 100}vw`,
              height: '100vh',
              display: 'flex',
              position: 'relative',
            }}
            drag={isVerticalMovement ? null : "x"}
            dragConstraints={{
              left: -(stories.length - 1) * viewportWidth,
              right: 0
            }}
            dragElastic={0.1}
            dragMomentum={false}
            onDragStart={handleDragStart}
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
                
                {/* Snap threshold indicator */}
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
                  H-Snap: 30% ({Math.round(viewportWidth * 0.3)}px) | V-Dismiss: 10% ({Math.round(viewportHeight * 0.1)}px)
                </Box>

                {/* Movement type indicator */}
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
                  Dragging: {isDragging ? 'Yes' : 'No'} | Vertical: {isVerticalMovement ? 'Yes' : 'No'}
                </Box>
                
                {/* Gesture analysis indicator */}
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
                  V-Threshold: cos &gt; 0.98 | H-Threshold: cos &gt; 0.5
                </Box>
                
                {/* New behavior indicator */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: '9rem',
                    left: '1rem',
                    color: 'white',
                    backgroundColor: 'rgba(0, 0, 0, 0.6)',
                    padding: '0.5rem',
                    borderRadius: '4px',
                    fontSize: '10px',
                    zIndex: 9999,
                  }}
                >
                  Sensitive V-Dismiss | H-Scroll disabled when V detected
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