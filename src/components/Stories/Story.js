import { Box, Button, IconButton, Typography, TextField } from "@mui/material";
import { keyframes } from '@mui/system';
import React, { useEffect, useState, lazy, Suspense, useRef } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import ReplyIcon from '@mui/icons-material/Reply';
import SendIcon from '@mui/icons-material/Send';
import { motion, useMotionValue, useTransform, AnimatePresence, useAnimation } from 'framer-motion';

const StoriesLazy = React.lazy(() => import("react-insta-stories"));
const WithSeeMore = React.lazy(() =>
  import("react-insta-stories").then((module) => ({
    default: module.WithSeeMore,
  }))
);

const animationTime = 0.15;

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
  const [overlayState, setOverlayState] = useState('CLOSED'); // 'CLOSED' | 'OPENING' | 'OPEN' | 'CLOSING'
  const [messageText, setMessageText] = useState('');

  // Motion values for animations
  const rotationY = useMotionValue(0);
  const baseRotation = useRef(0);
  const y = useMotionValue(0);
  const x = useMotionValue(0);
  
  const viewportHeight = typeof window !== 'undefined' ? window.innerHeight : 1000;
  
  // Enhanced visual feedback for a more "elastic" feel with non-linear mapping
  const scale = useTransform(y, [0, viewportHeight * 0.3, viewportHeight], [1, 0.8, 0.6]);
  const opacity = useTransform(y, [0, viewportHeight * 0.4, viewportHeight], [1, 0.6, 0.1]);
  const borderRadius = useTransform(y, [0, viewportHeight * 0.2, viewportHeight / 2], ["0%", "25%", "50%"]);
  
  // Overlay animation values
  const overlayProgress = useMotionValue(0);
  const overlayOpacity = useTransform(overlayProgress, [0, 1], [0, 1]);
  const overlayTranslateY = useTransform(overlayProgress, [0, 1], [100, 0]);
  
  // Reply icon animation for horizontal navigation
  const replyIconRotation = useTransform(x, [-window.innerWidth, 0, window.innerWidth], [-30, 0, 30]);
  const replyIconOpacity = useTransform(x, [-window.innerWidth * 0.3, 0, window.innerWidth * 0.3], [0.3, 1, 0.3]);
  
  const controls = useAnimation();

  useEffect(() => {
    if (props.clicked) {
      document.body.style.overflow = 'hidden';
      y.set(0); // Reset position on open
      x.set(0);
      rotationY.set(0);
      setActiveStoryIndex(0);
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [props.clicked, props.storyId]);

  const handleClose = () => {
    props.setActiveIndex(null);
  };

  const handlePanStart = (event, info) => {
    baseRotation.current = activeStoryIndex * -90;
  };

  const handlePan = (event, info) => {
    // Prioritize vertical drag for dismissal, only allow horizontal pan if drag is mostly horizontal
    if (Math.abs(info.offset.x) > Math.abs(info.offset.y)) {
        const dragFactor = 0.6;
        const newRotation = baseRotation.current + (info.offset.x * dragFactor);
        rotationY.set(newRotation);
    }
  };

  const handlePanEnd = (event, info) => {
    if (Math.abs(info.offset.x) > Math.abs(info.offset.y)) {
        const threshold = window.innerWidth * 0.25;
        const velocity = info.velocity.x;
        const offset = info.offset.x;
        
        let newIndex = activeStoryIndex;
        
        if (Math.abs(offset) > threshold || Math.abs(velocity) > 300) {
          if (offset > 0 && activeStoryIndex > 0) {
            newIndex = activeStoryIndex - 1;
          } else if (offset < 0 && activeStoryIndex < stories.length - 1) {
            newIndex = activeStoryIndex + 1;
          }
        }
        
        setActiveStoryIndex(newIndex);
        
        controls.start({
          rotateY: newIndex * -90,
          transition: { 
            type: "spring", 
            stiffness: 280, // Slightly softer for smoother transitions
            damping: 25 // Less damping for more bounce
          }
        });
    }
  };

  const handleDragEnd = (event, info) => {
    const dismissThreshold = viewportHeight * 0.2;
    const flickVelocityThreshold = 600;
    const upwardThreshold = viewportHeight * 0.2;
    const upwardVelocityThreshold = -800;

    // Check for upward swipe (reply overlay)
    if (info.offset.y < -upwardThreshold || info.velocity.y < upwardVelocityThreshold) {
      // Trigger overlay opening
      setOverlayState('OPENING');
      controls.start({
        overlayProgress: 1,
        transition: { 
          type: "spring",
          stiffness: 300,
          damping: 30,
          duration: 0.35
        }
      }).then(() => {
        setOverlayState('OPEN');
        // Focus the input field
        const inputField = document.getElementById('story-reply-input');
        if (inputField) {
          inputField.focus();
        }
      });
      return;
    }

    // Check for downward swipe (dismiss)
    if (info.offset.y > dismissThreshold || info.velocity.y > flickVelocityThreshold) {
      // --- TRIGGER EXIT ANIMATION ---
      // Let Framer Motion handle the layoutId transition automatically
      handleClose();
    } else {
      // --- SNAP-BACK TO FULLSCREEN ---
      controls.start({
        y: 0,
        x: 0,
        scale: 1,
        opacity: 1,
        borderRadius: "0%",
        transition: {
          type: "spring",
          stiffness: 350,
          damping: 30,
        }
      });
    }
  };

  const handleOverlayClose = () => {
    setOverlayState('CLOSING');
    controls.start({
      overlayProgress: 0,
      transition: { 
        type: "spring",
        stiffness: 300,
        damping: 30,
        duration: 0.25
      }
    }).then(() => {
      setOverlayState('CLOSED');
      setMessageText('');
    });
  };

  const handleSendMessage = () => {
    if (messageText.trim()) {
      console.log('Sending message:', messageText);
      // Here you would typically send the message to your backend
      setMessageText('');
      handleOverlayClose();
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      if (overlayState === 'OPEN') {
        handleOverlayClose();
      } else {
        handleClose();
      }
    } else if (event.key === 'ArrowLeft' && activeStoryIndex > 0) {
      setActiveStoryIndex(activeStoryIndex - 1);
    } else if (event.key === 'ArrowRight' && activeStoryIndex < stories.length - 1) {
      setActiveStoryIndex(activeStoryIndex + 1);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [activeStoryIndex, overlayState]);

  const onExitComplete = () => {
    // Reset all state after the exit animation is finished
    setActiveStoryIndex(0);
    rotationY.set(0);
    baseRotation.current = 0;
    controls.stop();
    y.set(0); // Crucial reset
    x.set(0); // Reset x position too
  };

  return (
    <AnimatePresence onExitComplete={onExitComplete}>
      {props.clicked && (
        <motion.div
          layoutId={props.storyId}
          drag="y"
          dragConstraints={{ top: 0, bottom: viewportHeight }}
          dragElastic={{ top: 0.2, bottom: 0.8 }}
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
            x,
            y,
            scale,
            opacity,
            borderRadius,
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
              stiffness: 200,
              damping: 25,
              duration: 0.4
            }
          }}
          animate={controls}
        >
          <motion.div
            className="scene"
            style={{
              width: '100%',
              height: '100%',
              position: 'relative',
              perspective: '1000px',
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
                width: '100%',
                height: '100%',
                transformStyle: 'preserve-3d',
                rotateY: rotationY,
              }}
              animate={controls}
            >
              {stories.map((story, index) => (
                <motion.div
                  key={index}
                  className="cube__face"
                  style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    backfaceVisibility: 'hidden',
                    transform: `rotateY(${index * 90}deg) translateZ(50vw)`,
                  }}
                  animate={{ opacity: index === activeStoryIndex ? 1 : 0.3 }}
                  transition={{ 
                    duration: 0.4,
                    ease: "easeInOut" // Smoother transitions between stories
                  }}
                >
                  <Suspense fallback={<div style={{ backgroundColor: '#111', width: '100%', height: '100%' }} />}>
                    <StoriesLazy
                      stories={[story]}
                      defaultInterval={5000}
                      height="100%"
                      width="100%"
                      storyContainerStyles={{ borderRadius: "8px", overflow: "hidden" }}
                      loop={false}
                      isPaused={index !== activeStoryIndex}
                    />
                  </Suspense>
                  
                  {/* Reply Icon - Takes the icon with you during horizontal navigation */}
                  <motion.div
                    style={{
                      position: 'absolute',
                      bottom: '2rem',
                      right: '2rem',
                      zIndex: 9999,
                      rotate: replyIconRotation,
                      opacity: replyIconOpacity,
                    }}
                  >
                    <IconButton 
                      aria-label="reply" 
                      sx={{ 
                        color: 'white', 
                        backgroundColor: 'rgba(0, 0, 0, 0.4)',
                        '&:hover': {
                          backgroundColor: 'rgba(0, 0, 0, 0.6)',
                        }
                      }} 
                      onClick={() => {
                        setOverlayState('OPENING');
                        controls.start({
                          overlayProgress: 1,
                          transition: { 
                            type: "spring",
                            stiffness: 300,
                            damping: 30,
                            duration: 0.35
                          }
                        }).then(() => {
                          setOverlayState('OPEN');
                          const inputField = document.getElementById('story-reply-input');
                          if (inputField) {
                            inputField.focus();
                          }
                        });
                      }}
                    >
                      <ReplyIcon />
                    </IconButton>
                  </motion.div>
                  
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
              ))}
            </motion.div>
          </motion.div>

          {/* Message Input Overlay */}
          <AnimatePresence>
            {overlayState !== 'CLOSED' && (
              <motion.div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
                  padding: '2rem',
                  zIndex: 10000,
                  opacity: overlayOpacity,
                  y: overlayTranslateY,
                }}
                initial={{ opacity: 0, y: 100 }}
                exit={{ opacity: 0, y: 100 }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '25px',
                    padding: '0.5rem 1rem',
                    backdropFilter: 'blur(10px)',
                  }}
                >
                  <TextField
                    id="story-reply-input"
                    placeholder="Reply to story..."
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        handleSendMessage();
                      }
                    }}
                    sx={{
                      flex: 1,
                      '& .MuiInputBase-root': {
                        color: 'white',
                        '&::placeholder': {
                          color: 'rgba(255, 255, 255, 0.7)',
                        },
                        '& fieldset': {
                          border: 'none',
                        },
                        '&:hover fieldset': {
                          border: 'none',
                        },
                        '&.Mui-focused fieldset': {
                          border: 'none',
                        },
                      },
                    }}
                    InputProps={{
                      style: { color: 'white' },
                    }}
                  />
                  <IconButton
                    onClick={handleSendMessage}
                    disabled={!messageText.trim()}
                    sx={{
                      color: messageText.trim() ? 'white' : 'rgba(255, 255, 255, 0.3)',
                      '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      },
                    }}
                  >
                    <SendIcon />
                  </IconButton>
                </Box>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Dummy components and data for completeness
const Story2 = () => <div>Story Content</div>;
const stories2 = [{ content: Story2 }];
const contentStyle = {};
const code = {};
const image = {};
const customSeeMore = {};

export default Story;
