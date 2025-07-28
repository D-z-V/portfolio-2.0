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
  const [cubeRotation, setCubeRotation] = useState(0);
  
  // Motion values for animations
  const y = useMotionValue(0);
  const x = useMotionValue(0);
  const rotationY = useMotionValue(0);
  
  const viewportHeight = typeof window !== 'undefined' ? window.innerHeight : 1000;
  const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 1000;
  
  // Transforms for swipe-to-dismiss
  const scale = useTransform(y, [0, viewportHeight * 0.3, viewportHeight], [1, 0.9, 0.8]);
  const opacity = useTransform(y, [0, viewportHeight * 0.5, viewportHeight], [1, 0.8, 0.4]);
  const borderRadius = useTransform(y, [0, viewportHeight * 0.2, viewportHeight / 2], ["0%", "15%", "30%"]);
  
  // 3D Cube transforms
  const cubeTransform = useTransform(
    rotationY,
    (value) => `translateZ(-50vw) rotateY(${value}deg)`
  );
  
  const controls = useAnimation();
  const cubeControls = useAnimation();

  useEffect(() => {
    if (props.clicked) {
      document.body.style.overflow = 'hidden';
      y.set(0);
      x.set(0);
      rotationY.set(0);
      setActiveStoryIndex(0);
      setIsLoading(true);
      setDragDirection(null);
      setCubeRotation(0);
      
      // Initialize cube position
      cubeControls.set({
        rotateY: 0
      });
      
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
          // For horizontal drag, update cube rotation in real-time
          // Testing reversed direction: 
          // Swipe right (positive deltaX) should rotate cube left (negative) to peek at next story
          // Swipe left (negative deltaX) should rotate cube right (positive) to peek at previous story
          const dragProgress = info.offset.x / viewportWidth;
          const rotationDelta = -dragProgress * 90; // Reversed mapping
          const newRotation = cubeRotation + rotationDelta;
          rotationY.set(newRotation);
        }
      }
    } else if (dragDirection === 'horizontal') {
      // Continue real-time cube rotation during horizontal drag
      const dragProgress = info.offset.x / viewportWidth;
      const rotationDelta = -dragProgress * 90; // Reversed mapping
      const newRotation = cubeRotation + rotationDelta;
      rotationY.set(newRotation);
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
      // Handle 3D cube navigation
      const threshold = viewportWidth * 0.25; // Reduced threshold for better UX
      let newIndex = activeStoryIndex;
      
      // Check if we should navigate based on threshold or velocity
      if (Math.abs(deltaX) > threshold || Math.abs(info.velocity.x) > 500) {
        // Instagram-style navigation (CORRECTED):
        // Swipe left (deltaX < 0) = go to NEXT story 
        // Swipe right (deltaX > 0) = go to PREVIOUS story
        // BUT: Let's test the opposite to see if this fixes the issue
        if (deltaX > 0 && activeStoryIndex < stories.length - 1) {
          newIndex = activeStoryIndex + 1; // Next story (testing reversed direction)
        } else if (deltaX < 0 && activeStoryIndex > 0) {
          newIndex = activeStoryIndex - 1; // Previous story (testing reversed direction)
        }
      }
      
      // Update active story index and cube rotation
      setActiveStoryIndex(newIndex);
      const targetRotation = -newIndex * 90; // Each story is 90 degrees apart
      setCubeRotation(targetRotation);
      
      // Animate cube to final position (whether changed or snapping back)
      cubeControls.start({
        rotateY: targetRotation,
        transition: { 
          type: "spring", 
          stiffness: 800,
          damping: 40,
          duration: 0.25
        }
      });
      
      // Reset the real-time rotation value to match the target
      rotationY.set(targetRotation);
      
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

  const handleKeyDown = useCallback((event) => {
    if (event.key === 'Escape') {
      handleClose();
    } else if (event.key === 'ArrowLeft' && activeStoryIndex > 0) {
      const newIndex = activeStoryIndex - 1;
      setActiveStoryIndex(newIndex);
      const targetRotation = -newIndex * 90;
      setCubeRotation(targetRotation);
      cubeControls.start({
        rotateY: targetRotation,
        transition: { 
          type: "spring", 
          stiffness: 800,
          damping: 40,
          duration: 0.25
        }
      });
      rotationY.set(targetRotation);
    } else if (event.key === 'ArrowRight' && activeStoryIndex < stories.length - 1) {
      const newIndex = activeStoryIndex + 1;
      setActiveStoryIndex(newIndex);
      const targetRotation = -newIndex * 90;
      setCubeRotation(targetRotation);
      cubeControls.start({
        rotateY: targetRotation,
        transition: { 
          type: "spring", 
          stiffness: 800,
          damping: 40,
          duration: 0.25
        }
      });
      rotationY.set(targetRotation);
    }
  }, [activeStoryIndex, cubeControls, rotationY]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const onExitComplete = () => {
    setActiveStoryIndex(0);
    setCubeRotation(0);
    controls.stop();
    cubeControls.stop();
    y.set(0);
    x.set(0);
    rotationY.set(0);
  };

  // Get the three visible story faces for the cube
  const getVisibleStories = () => {
    const visibleStories = [];
    
    // Current story (front face)
    visibleStories.push({
      story: stories[activeStoryIndex],
      index: activeStoryIndex,
      position: 'front'
    });
    
    // Previous story (left face)
    if (activeStoryIndex > 0) {
      visibleStories.push({
        story: stories[activeStoryIndex - 1],
        index: activeStoryIndex - 1,
        position: 'left'
      });
    }
    
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
            <motion.div
              className="stories-scene"
              style={{
                width: '100%',
                height: '100%',
                position: 'relative',
                transformStyle: 'preserve-3d',
              }}
            >
              {/* 3D Cube Container */}
              <motion.div
                className="stories-cube"
                drag={dragDirection === 'vertical' ? false : "x"}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.1}
                dragMomentum={false}
                onDragStart={handleDragStart}
                onDrag={handleDrag}
                onDragEnd={handleDragEnd}
                style={{
                  position: 'relative',
                  width: '100vw',
                  height: '100vh',
                  transformStyle: 'preserve-3d',
                  transform: cubeTransform,
                }}
                animate={cubeControls}
              >
                {/* Render cube faces */}
                {visibleStories.map(({ story, index, position }) => {
                  let faceTransform = '';
                  
                  switch (position) {
                    case 'left':
                      faceTransform = 'rotateY(-90deg) translateZ(50vw)';
                      break;
                    case 'front':
                      faceTransform = 'rotateY(0deg) translateZ(50vw)';
                      break;
                    case 'right':
                      faceTransform = 'rotateY(90deg) translateZ(50vw)';
                      break;
                    default:
                      faceTransform = 'rotateY(0deg) translateZ(50vw)';
                  }
                  
                  return (
                    <motion.div
                      key={`${index}-${position}`}
                      className="story-face"
                      style={{
                        position: 'absolute',
                        width: '100vw',
                        height: '100vh',
                        backfaceVisibility: 'hidden',
                        transform: faceTransform,
                        willChange: 'transform',
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
                    </motion.div>
                  );
                })}
              </motion.div>
            </motion.div>
            
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
            
            {/* Debug info */}
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
              3D Cube: Story {activeStoryIndex + 1} of {stories.length} | Rotation: {cubeRotation}°
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

            {/* Usage instructions */}
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
              TESTING: Swipe RIGHT for next story | Swipe LEFT for previous | Swipe DOWN to dismiss
            </Box>
            
            {/* Threshold indicator */}
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
              Threshold: 25% ({Math.round(viewportWidth * 0.25)}px) | Target rotation: {Math.round(cubeRotation)}°
            </Box>
            
            {/* Real-time rotation indicator */}
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
              Live rotation: {Math.round(rotationY.get())}° | Active story: {activeStoryIndex}
            </Box>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default StoryCube;