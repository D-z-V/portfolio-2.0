import { Box, IconButton } from "@mui/material";
import React, { useEffect, useState, lazy, Suspense, useRef, useCallback } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { motion, useMotionValue, useTransform, AnimatePresence, useAnimation } from 'framer-motion';
import './StoryCube.css';

const StoriesLazy = React.lazy(() => import("react-insta-stories"));

const stories = [
  {
    url: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTA4MCIgaGVpZ2h0PSIxOTIwIiB2aWV3Qm94PSIwIDAgMTA4MCAxOTIwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxsaW5lYXJHcmFkaWVudCBpZD0iZ3JhZGllbnQxIiB4MT0iMCUiIHkxPSIwJSIgeDI9IjEwMCUiIHkyPSIxMDAlIj48c3RvcCBvZmZzZXQ9IjAlIiBzdHlsZT0ic3RvcC1jb2xvcjojNGY0NmU1O3N0b3Atb3BhY2l0eToxIiAvPjxzdG9wIG9mZnNldD0iMTAwJSIgc3R5bGU9InN0b3AtY29sb3I6IzA2YjZkNDtzdG9wLW9wYWNpdHk6MSIgLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iMTA4MCIgaGVpZ2h0PSIxOTIwIiBmaWxsPSJ1cmwoI2dyYWRpZW50MSkiLz48L3N2Zz4=',
    duration: 5000,
    header: {
      heading: 'NextJS',
      subheading: 'Posted 30m ago',
      profileImage: 'https://upload.wikimedia.org/wikipedia/commons/8/8e/Nextjs-logo.svg',
    },
  },
  {
    url: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTI4MCIgaGVpZ2h0PSIxOTIwIiB2aWV3Qm94PSIwIDAgMTI4MCAxOTIwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxsaW5lYXJHcmFkaWVudCBpZD0iZ3JhZGllbnQyIiB4MT0iMCUiIHkxPSIwJSIgeDI9IjEwMCUiIHkyPSIxMDAlIj48c3RvcCBvZmZzZXQ9IjAlIiBzdHlsZT0ic3RvcC1jb2xvcjojZWM0ODk5O3N0b3Atb3BhY2l0eToxIiAvPjxzdG9wIG9mZnNldD0iMTAwJSIgc3R5bGU9InN0b3AtY29sb3I6I2Y5N2MxNjtzdG9wLW9wYWNpdHk6MSIgLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iMTI4MCIgaGVpZ2h0PSIxOTIwIiBmaWxsPSJ1cmwoI2dyYWRpZW50MikiLz48L3N2Zz4=',
    duration: 5000,
    header: {
      heading: 'ReactJS',
      subheading: 'Posted 30m ago',
      profileImage: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg',
    },
  },
  {
    url: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTE4MCIgaGVpZ2h0PSIxOTIwIiB2aWV3Qm94PSIwIDAgMTE4MCAxOTIwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxsaW5lYXJHcmFkaWVudCBpZD0iZ3JhZGllbnQzIiB4MT0iMCUiIHkxPSIwJSIgeDI9IjEwMCUiIHkyPSIxMDAlIj48c3RvcCBvZmZzZXQ9IjAlIiBzdHlsZT0ic3RvcC1jb2xvcjojMTBiOTgxO3N0b3Atb3BhY2l0eToxIiAvPjxzdG9wIG9mZnNldD0iMTAwJSIgc3R5bGU9InN0b3AtY29sb3I6IzA1OWY3ZTtzdG9wLW9wYWNpdHk6MSIgLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iMTE4MCIgaGVpZ2h0PSIxOTIwIiBmaWxsPSJ1cmwoI2dyYWRpZW50MykiLz48L3N2Zz4=',
    duration: 5000,
    header: {
      heading: 'NodeJS',
      subheading: 'Posted 30m ago',
      profileImage: 'https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg',
    },
  },
  {
    url: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQ4MCIgaGVpZ2h0PSIxOTIwIiB2aWV3Qm94PSIwIDAgMTQ4MCAxOTIwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxsaW5lYXJHcmFkaWVudCBpZD0iZ3JhZGllbnQ0IiB4MT0iMCUiIHkxPSIwJSIgeDI9IjEwMCUiIHkyPSIxMDAlIj48c3RvcCBvZmZzZXQ9IjAlIiBzdHlsZT0ic3RvcC1jb2xvcjojOGI1Y2Y2O3N0b3Atb3BhY2l0eToxIiAvPjxzdG9wIG9mZnNldD0iMTAwJSIgc3R5bGU9InN0b3AtY29sb3I6IzA5OGZkZjtzdG9wLW9wYWNpdHk6MSIgLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iMTQ4MCIgaGVpZ2h0PSIxOTIwIiBmaWxsPSJ1cmwoI2dyYWRpZW50NCkiLz48L3N2Zz4=',
    duration: 5000,
    header: {
      heading: 'MongoDB',
      subheading: 'Posted 30m ago',
      profileImage: 'https://upload.wikimedia.org/wikipedia/commons/9/93/MongoDB_Logo.svg',
    },
  },
  {
    url: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTA4MCIgaGVpZ2h0PSIxOTIwIiB2aWV3Qm94PSIwIDAgMTA4MCAxOTIwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxsaW5lYXJHcmFkaWVudCBpZD0iZ3JhZGllbnQ1IiB4MT0iMCUiIHkxPSIwJSIgeDI9IjEwMCUiIHkyPSIxMDAlIj48c3RvcCBvZmZzZXQ9IjAlIiBzdHlsZT0ic3RvcC1jb2xvcjojZmY3MDQ3O3N0b3Atb3BhY2l0eToxIiAvPjxzdG9wIG9mZnNldD0iMTAwJSIgc3R5bGU9InN0b3AtY29sb3I6I2VmNDQ0NDtzdG9wLW9wYWNpdHk6MSIgLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iMTA4MCIgaGVpZ2h0PSIxOTIwIiBmaWxsPSJ1cmwoI2dyYWRpZW50NSkiLz48L3N2Zz4=',
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
  const [displayStoryIndex, setDisplayStoryIndex] = useState(0); // Index used for rendering faces
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [dragDirection, setDragDirection] = useState(null);
  const [initialTouchPosition, setInitialTouchPosition] = useState({ x: 0, y: 0 });
  const [rotatePercent, setRotatePercent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [preloadedStories, setPreloadedStories] = useState(new Set([0])); // Track preloaded stories
  
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

  // Preload adjacent stories
  const preloadAdjacentStories = useCallback((centerIndex) => {
    setPreloadedStories(prevStories => {
      const toPreload = new Set(prevStories);
      
      // Always preload current story
      toPreload.add(centerIndex);
      
      // Preload previous story if exists
      if (centerIndex > 0) {
        toPreload.add(centerIndex - 1);
      }
      
      // Preload next story if exists
      if (centerIndex < stories.length - 1) {
        toPreload.add(centerIndex + 1);
      }
      
      return toPreload;
    });
  }, []);

  useEffect(() => {
    if (props.clicked) {
      document.body.style.overflow = 'hidden';
      y.set(0);
      x.set(0);
      const initialIndex = 0;
      setActiveStoryIndex(initialIndex);
      setDisplayStoryIndex(initialIndex);
      setIsLoading(true);
      setDragDirection(null);
      setRotatePercent(0);
      setIsTransitioning(false);
      
      // Preload all stories immediately to prevent loading states
      const allStoriesToPreload = new Set();
      for (let i = 0; i < Math.min(stories.length, 3); i++) {
        allStoriesToPreload.add(i);
      }
      setPreloadedStories(allStoriesToPreload);
      
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
      
      // Reduce loading time
      setTimeout(() => {
        setIsLoading(false);
      }, 200);
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
    
    // Reset motion values to ensure clean start
    x.set(0);
    y.set(0);
  };

  const handleDrag = (event, info) => {
    // Immediate direction detection with smaller threshold
    if (!dragDirection) {
      const deltaX = Math.abs(info.offset.x);
      const deltaY = Math.abs(info.offset.y);
      const magnitude = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      
      if (magnitude > 8) { // Much smaller threshold for immediate detection
        const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
        
        // More restrictive vertical detection - only pure vertical movements
        if (angle >= 85 && angle <= 90) {
          setDragDirection('vertical');
        } else {
          // Everything else is considered horizontal to prioritize cube navigation
          setDragDirection('horizontal');
        }
      }
    }
    
    // Immediately block movement if horizontal is detected
    if (dragDirection === 'horizontal') {
      // Aggressively block all container movement - force to 0 immediately
      y.set(0);
      x.set(0);
      
      // Also block the motion values in the style to prevent any visual movement
      if (event.target) {
        event.target.style.transform = 'translate3d(0px, 0px, 0px)';
      }
      
      // Prevent any further motion value updates
      event.preventDefault?.();
      event.stopPropagation?.();
      
      // Calculate rotation percentage based on horizontal drag only
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
      if (Math.abs(currentPercent) > 0.27 && Math.abs(currentPercent) <= 1) {
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
      
      // Only update active story index AFTER the transition starts
      // This prevents the wrong story from being mounted during transition
      if (newIndex !== activeStoryIndex) {
        // Preload the new story and adjacent ones before changing index
        preloadAdjacentStories(newIndex);
        
        // Immediate update - no delay needed since we're using stable keys now
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

  // Update displayStoryIndex immediately when activeStoryIndex changes to reduce flickering
  useEffect(() => {
    setDisplayStoryIndex(activeStoryIndex);
  }, [activeStoryIndex]);

  const handleKeyDown = useCallback((event) => {
    if (event.key === 'Escape') {
      handleClose();
    } else if (event.key === 'ArrowLeft' && activeStoryIndex > 0) {
      const newIndex = activeStoryIndex - 1;
      
      // Preload stories before transition
      preloadAdjacentStories(newIndex);
      
      // Animate with CSS transition
      if (cubeRef.current && sceneRef.current) {
        cubeRef.current.classList.add('cube-transition');
        sceneRef.current.style.setProperty('--rotatePercent', '1');
        setIsTransitioning(true);
        setRotatePercent(1);
      }
      
      // Immediate update for smooth transitions
      setActiveStoryIndex(newIndex);
    } else if (event.key === 'ArrowRight' && activeStoryIndex < stories.length - 1) {
      const newIndex = activeStoryIndex + 1;
      
      // Preload stories before transition
      preloadAdjacentStories(newIndex);
      
      // Animate with CSS transition
      if (cubeRef.current && sceneRef.current) {
        cubeRef.current.classList.add('cube-transition');
        sceneRef.current.style.setProperty('--rotatePercent', '-1');
        setIsTransitioning(true);
        setRotatePercent(-1);
      }
      
      // Immediate update for smooth transitions
      setActiveStoryIndex(newIndex);
    }
  }, [activeStoryIndex]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const onExitComplete = () => {
    setActiveStoryIndex(0);
    setDisplayStoryIndex(0);
    setRotatePercent(0);
    setIsTransitioning(false);
    setPreloadedStories(new Set([0]));
    controls.stop();
    y.set(0);
    x.set(0);
  };

  // Get the three visible story faces for the cube using stable display index
  const getVisibleStories = useCallback(() => {
    const visibleStories = [];
    const baseIndex = displayStoryIndex; // Always use displayStoryIndex for stable rendering
    
    // Previous story (left face)
    if (baseIndex > 0) {
      visibleStories.push({
        story: stories[baseIndex - 1],
        index: baseIndex - 1,
        position: 'left',
        isPreloaded: preloadedStories.has(baseIndex - 1)
      });
    }
    
    // Current story (front face)
    visibleStories.push({
      story: stories[baseIndex],
      index: baseIndex,
      position: 'front',
      isPreloaded: preloadedStories.has(baseIndex)
    });
    
    // Next story (right face)
    if (baseIndex < stories.length - 1) {
      visibleStories.push({
        story: stories[baseIndex + 1],
        index: baseIndex + 1,
        position: 'right',
        isPreloaded: preloadedStories.has(baseIndex + 1)
      });
    }
    
    return visibleStories;
  }, [displayStoryIndex, preloadedStories]); // Remove activeStoryIndex and isTransitioning from deps

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
            dragMomentum={false}
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
              x: dragDirection === 'horizontal' ? 0 : x,
              y: dragDirection === 'horizontal' ? 0 : y,
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
                        {/* Touch Handler for Horizontal Cube Rotation */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 1,
                touchAction: 'none',
              }}
              onTouchStart={(e) => {
                if (dragDirection === 'vertical') return;
                const touch = e.touches[0];
                setInitialTouchPosition({ x: touch.clientX, y: touch.clientY });
              }}
              onTouchMove={(e) => {
                if (dragDirection === 'vertical') return;
                const touch = e.touches[0];
                const deltaX = touch.clientX - initialTouchPosition.x;
                const deltaY = touch.clientY - initialTouchPosition.y;
                
                // Detect direction if not already set
                if (!dragDirection) {
                  const magnitude = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
                  if (magnitude > 8) {
                    const angle = Math.atan2(Math.abs(deltaY), Math.abs(deltaX)) * (180 / Math.PI);
                    if (angle >= 85 && angle <= 90) {
                      setDragDirection('vertical');
                      return;
                    } else {
                      setDragDirection('horizontal');
                    }
                  }
                }
                
                // Handle horizontal cube rotation
                if (dragDirection === 'horizontal') {
                  let percentage = deltaX / viewportWidth;
                  
                  if (percentage > 0.95) percentage = 0.95;
                  if (percentage < -0.95) percentage = -0.95;

                  if (activeStoryIndex === 0 && percentage > 0) {
                    percentage = 0;
                  }

                  if (activeStoryIndex === stories.length - 1 && percentage < 0) {
                    percentage = 0;
                  }

                  if (sceneRef.current) {
                    sceneRef.current.style.setProperty('--rotatePercent', `${percentage}`);
                  }
                  setRotatePercent(percentage);
                }
              }}
              onTouchEnd={(e) => {
                if (dragDirection === 'horizontal') {
                  // Handle cube navigation with threshold-based snapping
                  const currentPercent = rotatePercent;
                  let finalPercent = 0;
                  let newIndex = activeStoryIndex;
                  
                  if (Math.abs(currentPercent) > 0.27 && Math.abs(currentPercent) <= 1) {
                    if (currentPercent > 0) {
                      finalPercent = 1;
                      if (activeStoryIndex > 0) {
                        newIndex = activeStoryIndex - 1;
                      }
                    } else {
                      finalPercent = -1;
                      if (activeStoryIndex < stories.length - 1) {
                        newIndex = activeStoryIndex + 1;
                      }
                    }
                  } else {
                    finalPercent = 0;
                  }
                  
                  if (cubeRef.current) {
                    cubeRef.current.classList.add('cube-transition');
                  }
                  setIsTransitioning(true);
                  
                  if (sceneRef.current) {
                    sceneRef.current.style.setProperty('--rotatePercent', `${finalPercent}`);
                  }
                  setRotatePercent(finalPercent);
                  
                  if (newIndex !== activeStoryIndex) {
                    // Preload stories before changing index
                    preloadAdjacentStories(newIndex);
                    
                    // Immediate update for smooth transitions
                    setActiveStoryIndex(newIndex);
                  }
                }
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
                {visibleStories.map(({ story, index, position, isPreloaded }) => {
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
                  
                  // Determine if this story should be active
                  const isActive = index === activeStoryIndex;
                  
                  return (
                    <div
                      key={`story-face-${index}-${position}`}
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
                        {isLoading && position === 'front' ? (
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
                            key={`story-content-${index}`}
                            stories={[story]}
                            defaultInterval={5000}
                            height="100%"
                            width="100%"
                            storyContainerStyles={{ borderRadius: "8px", overflow: "hidden" }}
                            loop={false}
                            isPaused={!isActive}
                          />
                        )}
                      </Suspense>
                    </div>
                  );
                })}
              </div>
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