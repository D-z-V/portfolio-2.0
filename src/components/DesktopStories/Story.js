"use client";

import { Box, Button, IconButton, Typography } from "@mui/material";
import { keyframes } from '@mui/system';
import React, { useEffect, useState, Suspense, useRef } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import LinearProgress from '@mui/material/LinearProgress';
import { useWindowSize } from "@uidotdev/usehooks";
import { motion, useMotionValue, useTransform, AnimatePresence, useAnimation } from 'framer-motion';

const StoriesLazy = React.lazy(() => import("react-insta-stories"));
const WithSeeMore = React.lazy(() =>
  import("react-insta-stories").then((module) => ({
    default: module.WithSeeMore,
  }))
);

import { Skeleton } from '@mui/material';
import Image from "next/image";

const stories = [
  {
    url: 'https://picsum.photos/1080/1920',
    duration: 5000,
    header: {
      heading: 'Mohit Karekar',
      subheading: 'Posted 30m ago',
      profileImage: 'https://picsum.photos/100/100',
    },
  },
  {
    url: 'https://picsum.photos/1280/1920',
    duration: 5000,
    header: {
      heading: 'Mohit Karekar',
      subheading: 'Posted 30m ago',
      profileImage: 'https://picsum.photos/100/100',
    },
  },
  {
    url: 'https://picsum.photos/1180/1920',
    duration: 5000,
    header: {
      heading: 'Mohit Karekar',
      subheading: 'Posted 30m ago',
      profileImage: 'https://picsum.photos/100/100',
    },
  },
  {
    url: 'https://picsum.photos/1480/1920',
    duration: 5000,
    header: {
      heading: 'Mohit Karekar',
      subheading: 'Posted 30m ago',
      profileImage: 'https://picsum.photos/100/100',
    },
  },
  {
    url: 'https://picsum.photos/1080/1920',
    duration: 5000,
    header: {
      heading: 'Mohit Karekar',
      subheading: 'Posted 30m ago',
      profileImage: 'https://picsum.photos/100/100',
    },
  },
];
  
const Story = (props) => {
  const [activeStoryIndex, setActiveStoryIndex] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [isDismissing, setIsDismissing] = useState(false);
  const [gestureType, setGestureType] = useState(null); // 'horizontal' or 'vertical'
  
  // Motion values for 3D cube navigation
  const rotationY = useMotionValue(0);
  const baseRotation = useRef(0);
  
  // Motion values for elastic snap dismiss gesture
  const y = useMotionValue(0);
  const x = useMotionValue(0);
  const viewportHeight = typeof window !== 'undefined' ? window.innerHeight : 1000;
  const dismissThreshold = viewportHeight * 0.3; // 30% threshold for elastic snap
  const scale = useTransform(y, [0, dismissThreshold], [1, 0.9]); // Minimal scale change
  const opacity = useTransform(y, [0, dismissThreshold], [1, 1]); // Keep full opacity until threshold
  
  const controls = useAnimation();
  const storyRef = useRef(null);
  const gestureStart = useRef({ x: 0, y: 0 });
  const gestureDistance = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // When the story viewer opens, disable body scrolling
    document.body.style.overflow = 'hidden';

    // When the story viewer closes (component unmounts), re-enable body scrolling
    return () => {
        document.body.style.overflow = 'auto';
    };
  }, []);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      props.onClose();
      setIsExiting(false);
    }, 150); // Faster exit
  };

  const handlePanStart = (event, info) => {
    baseRotation.current = activeStoryIndex * -90;
    gestureStart.current = { x: info.point.x, y: info.point.y };
    gestureDistance.current = { x: 0, y: 0 };
    setGestureType(null);
  };

  const handlePan = (event, info) => {
    const currentX = info.point.x;
    const currentY = info.point.y;
    
    gestureDistance.current.x = Math.abs(currentX - gestureStart.current.x);
    gestureDistance.current.y = Math.abs(currentY - gestureStart.current.y);
    
    // Determine gesture type after minimum distance
    const minDistance = 20; // Minimum distance to determine gesture type
    if (!gestureType && (gestureDistance.current.x > minDistance || gestureDistance.current.y > minDistance)) {
      if (gestureDistance.current.x > gestureDistance.current.y) {
        setGestureType('horizontal');
      } else {
        setGestureType('vertical');
      }
    }
    
    // Only handle horizontal gestures for story navigation
    if (gestureType === 'horizontal') {
      const dragFactor = 0.8;
      const newRotation = baseRotation.current + (info.offset.x * dragFactor);
      rotationY.set(newRotation);
    }
  };

  const handlePanEnd = (event, info) => {
    if (gestureType === 'horizontal') {
      const threshold = window.innerWidth * 0.3;
      const velocity = info.velocity.x;
      const offset = info.offset.x;
      
      let newIndex = activeStoryIndex;
      
      if (Math.abs(offset) + Math.abs(velocity) > threshold) {
        if (offset > 0 && activeStoryIndex > 0) {
          newIndex = activeStoryIndex - 1;
        } else if (offset < 0 && activeStoryIndex < stories.length - 1) {
          newIndex = activeStoryIndex + 1;
        }
      }
      
      setActiveStoryIndex(newIndex);
      
      // Animate to final position with snappier spring
      controls.start({
        rotateY: newIndex * -90,
        transition: { type: "spring", stiffness: 400, damping: 25 }
      });
    }
    
    // Reset gesture type
    setGestureType(null);
  };

  const handleDragStart = () => {
    setIsDismissing(false);
    gestureStart.current = { x: 0, y: 0 };
    gestureDistance.current = { x: 0, y: 0 };
    setGestureType(null);
  };

  const handleDrag = (event, info) => {
    // Only track vertical gestures for dismiss
    const currentY = info.point.y;
    gestureDistance.current.y = Math.abs(currentY - gestureStart.current.y);
    
    // Determine if this is a vertical gesture
    const minDistance = 30; // Minimum distance to consider vertical gesture
    if (!gestureType && gestureDistance.current.y > minDistance) {
      setGestureType('vertical');
    }
    
    // Only follow finger if it's a vertical gesture
    if (gestureType === 'vertical') {
      y.set(info.point.y);
    }
  };

  const handleDragEnd = (event, info) => {
    // Only handle dismiss if it was a clear vertical gesture
    if (gestureType === 'vertical') {
      const threshold = dismissThreshold;
      const velocity = info.velocity.y;
      const offset = info.offset.y;
      
      if (offset > threshold || velocity > 500) {
        // Elastic snap dismiss
        setIsDismissing(true);
        controls.start({
          y: viewportHeight,
          scale: 0.8,
          opacity: 0,
          transition: { 
            type: "spring", 
            stiffness: 200, 
            damping: 20,
            duration: 0.4
          }
        });
        
        setTimeout(() => {
          handleClose();
        }, 400);
      } else {
        // Snap back to original position with elastic feel
        controls.start({
          y: 0,
          scale: 1,
          opacity: 1,
          transition: { 
            type: "spring", 
            stiffness: 300, 
            damping: 25,
            duration: 0.3
          }
        });
      }
    }
    
    // Reset gesture type
    setGestureType(null);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      handleClose();
    } else if (event.key === 'ArrowLeft' && activeStoryIndex > 0) {
      setActiveStoryIndex(activeStoryIndex - 1);
    } else if (event.key === 'ArrowRight' && activeStoryIndex < stories.length - 1) {
      setActiveStoryIndex(activeStoryIndex + 1);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [activeStoryIndex]);

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          ref={storyRef}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.15, ease: "easeOut" }} // Faster animation
          drag="y"
          dragConstraints={{ top: 0, bottom: viewportHeight }}
          dragElastic={0.2} // Elastic feel for dismiss gesture
          onDragStart={handleDragStart}
          onDrag={handleDrag}
          onDragEnd={handleDragEnd}
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: 'black',
            position: 'relative',
            overflow: 'hidden',
            touchAction: 'pan-y',
            y,
            scale,
            opacity,
          }}
        >
          {/* 3D Cube Container */}
          <motion.div
            className="scene"
            style={{
              width: '100%',
              height: '100%',
              position: 'relative',
              perspective: '1000px',
              perspectiveOrigin: '50% 50%',
              overflow: 'hidden',
            }}
            onPanStart={handlePanStart}
            onPan={handlePan}
            onPanEnd={handlePanEnd}
          >
            <motion.div
              className="cube"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                transformStyle: 'preserve-3d',
                rotateY: rotationY,
              }}
              animate={controls}
            >
              {/* Story Faces */}
              {stories.map((story, index) => (
                <motion.div
                  key={index}
                  className="cube__face"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backfaceVisibility: 'hidden',
                    transform: `rotateY(${index * 90}deg) translateZ(50vw)`,
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: index === activeStoryIndex ? 1 : 0 }}
                  transition={{ duration: 0.2 }} // Faster transitions
                >
                  <Suspense fallback={<div style={{ backgroundColor: 'black', width: '100%', height: '100%' }} />}>
                    <StoriesLazy
                      preloadCount={3}
                      loop
                      keyboardNavigation
                      defaultInterval={8000}
                      height="100%"
                      width="100%"
                      stories={stories2}
                      onStoryEnd={(s, st) => console.log("story ended", s, st)}
                      onAllStoriesEnd={(s, st) => console.log("all stories ended", s, st)}
                      onStoryStart={(s, st) => console.log("story started", s, st)}
                      onNext={() => console.log("next button pressed")}
                      onPrevious={() => console.log("previous button pressed")}
                      storyContainerStyles={{ overflow: "hidden" }}
                    />
                  </Suspense>
                  
                  {/* Close Button */}
                  <IconButton 
                    aria-label="close" 
                    className="story-close-button"
                    sx={{ 
                      color: 'white', 
                      position: 'absolute', 
                      top: '1rem', 
                      right: '1rem', 
                      zIndex: '9999',
                    }} 
                    onClick={handleClose}
                  >
                    <CloseIcon height={32} width={32} />
                  </IconButton>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const Story2 = ({ action, isPaused }) => {
  return (
    <div style={{ ...contentStyle, background: "Aquamarine", color: "#333" }}>
      <h1>You get the control of the story.</h1>
      <p>
        Render your custom JSX by passing just a{" "}
        <code style={{ fontStyle: "italic" }}>content</code> property inside
        your story object.
      </p>
      <p>
        You get a <code style={{ fontStyle: "italic" }}>action</code> prop as an
        input to your content function, that can be used to play or pause the
        story.
      </p>
      <h1>{isPaused ? "Paused" : "Playing"}</h1>
      <h4>v2 is out 🎉</h4>
      <p>React Native version coming soon.</p>
    </div>
  );
};

const stories2 = [
  {
    content: ({ action, isPaused }) => {
      return (
        <div style={contentStyle}>
          <h1>The new version is here.</h1>
          <p>This is the new story.</p>
          <p>Now render React components right into your stories.</p>
          <p>Possibilities are endless, like here - here's a code block!</p>
          <pre>
            <code style={code}>console.log('Hello, world!')</code>
          </pre>
          <p>Or here, an image!</p>
          <br />
          <img
            style={image}
            src="https://images.unsplash.com/photo-1565506737357-af89222625ad?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"
          ></img>
          <h3>Perfect. But there's more! →</h3>
        </div>
      );
    },
  },
  {
    content: ({ action, story }) => {
      return (
        <Suspense>
          <WithSeeMore story={story} action={action}>
            <div style={{ background: "snow", padding: 20, height: "100%", color: "black" }}>
              <h1 style={{ marginTop: "100%", marginBottom: 0 }}>🌝</h1>
              <h1 style={{ marginTop: 5, color: "black" }}>
                We have our good old image and video stories, just the same.
              </h1>
            </div>
          </WithSeeMore>
        </Suspense>
      );
    },
    seeMoreCollapsed: ({ toggleMore, action }) => (
      <p style={customSeeMore} onClick={() => toggleMore(true)}>
        A custom See More message →
      </p>
    ),
    seeMore: ({ close }) => (
      <div
        style={{
          maxWidth: "100%",
          height: "100%",
          padding: 40,
          background: "white",
          color: "black",
        }}
      >
        <h2>Just checking the see more feature.</h2>
        <p style={{ textDecoration: "underline" }} onClick={close}>
          Go on, close this popup.
        </p>
      </div>
    ),
    duration: 5000,
  },
  {
    url: "https://picsum.photos/1080/1920",
    seeMore: ({ close }) => (
      <div
        style={{
          maxWidth: "100%",
          height: "100%",
          padding: 40,
          background: "white",
          color: "black",
        }}
      >
        <h2>Just checking the see more feature.</h2>
        <p style={{ textDecoration: "underline" }} onClick={close}>
          Go on, close this popup.
        </p>
      </div>
    ),
  },
  {
    url:
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    type: "video",
  },
  {
    content: Story2,
  },
  {
    url: "https://plus.unsplash.com/premium_photo-1676231417481-5eae894e7f68?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1742&q=80",
  },
  {
    url: "https://images.unsplash.com/photo-1676321626679-2513969695d3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
  },
  {
    url: "https://images.unsplash.com/photo-1676359912443-1bf438548584?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
  },
  {
    url: "https://images.unsplash.com/photo-1676316698468-a907099ad5bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80",
    preloadResource: false,
  },
  {
    url: "https://images.unsplash.com/photo-1676310483825-daa08914445e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2920&q=80",
    preloadResource: false,
  },
  {
    url: "https://images.unsplash.com/photo-1676321685222-0b527e61d5c7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
    preloadResource: false,
  },
];

const image = {
  display: "block",
  maxWidth: "100%",
};

const code = {
  background: "#eee",
  padding: "5px 10px",
  borderRadius: "4px",
  color: "#333",
};

const contentStyle = {
  background: "#333",
  width: "100%",
  padding: 20,
  color: "white",
  height: "100%",
};

const customSeeMore = {
  textAlign: "center",
  fontSize: 14,
  bottom: 20,
  position: "relative",
};



export default Story;
