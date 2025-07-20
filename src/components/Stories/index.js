import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Image from 'next/image';
import React, { useEffect } from 'react';

import ListItemButton from '@mui/material/ListItemButton';

import dynamicStory from './dynamicStory.gif';
import staticStory from './staticStory.png';

import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import Story from '@/components/Stories/Story';
import { useWindowSize } from "@uidotdev/usehooks";
import { motion } from 'framer-motion';

const Stories = (props) => {
  const [activeIndex, setActiveIndex] = React.useState(null);
  const [iconPosition, setIconPosition] = React.useState({ top: 0, left: 0 });
  const [stories, setStories] = React.useState([]);
  const [animationIndex, setAnimationIndex] = React.useState(null);

  const handleStoryClick = (index, position) => {
    console.log('Story clicked:', { index, position });
    
    // Always allow opening the story, regardless of viewed status
    setActiveIndex(index);
    setIconPosition(position);
    
    // Mark as viewed if not already viewed
    if (!stories[index].viewed) {
      setAnimationIndex(index);
      setTimeout(() => {
        const newStories = [...stories];
        newStories[index].viewed = true;
        localStorage.setItem('stories', JSON.stringify(newStories));
        setStories(newStories);
      }, 3000);
    }
  };

  const handleStoryClose = () => {
    // Reset story state when dismissed
    setActiveIndex(null);
    setAnimationIndex(null);
  };

  useEffect(() => {
    if (localStorage.getItem('stories') === null) {
      const newStories = [
        {
          "name": "NextJS",
          'image': 'https://upload.wikimedia.org/wikipedia/commons/8/8e/Nextjs-logo.svg',
          "viewed": false,
          
        },
        {
          "name": "ReactJS",
          'image': 'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg',
          "viewed": false,
        },
        {
          "name": "NodeJS",
          'image': 'https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg',
          "viewed": false,
        },
        {
          "name": "MongoDB",
          "image": 'https://upload.wikimedia.org/wikipedia/commons/9/93/MongoDB_Logo.svg',
          "viewed": false,
        },
        {
          "name": "Pytorch",
          "image": 'https://upload.wikimedia.org/wikipedia/commons/1/10/PyTorch_logo_icon.svg',
          "viewed": false,
        },
        {
          "name": "Tensorflow",
          "image": 'https://upload.wikimedia.org/wikipedia/commons/2/2d/Tensorflow_logo.svg',
          "viewed": false,
        },
        {
          "name": "Keras",
          "image": 'https://upload.wikimedia.org/wikipedia/commons/a/ae/Keras_logo.svg',
          "viewed": false,
        },
        {
          "name": "SQL",
          "image": 'https://upload.wikimedia.org/wikipedia/commons/2/29/Postgresql_elephant.svg',
          "viewed": false,
        },
        {
          "name": "Flask",
          "image": 'https://upload.wikimedia.org/wikipedia/commons/3/3c/Flask_logo.svg',
          "viewed": false,
        },
        {
          "name": "Git",
          "image": 'https://upload.wikimedia.org/wikipedia/commons/3/3f/Git_icon.svg',
          "viewed": false,
        },
        {
          "name": "Github",
          "image": 'https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg',
          "viewed": false,
        },
        {
          "name": "Heroku",
          "image": 'https://upload.wikimedia.org/wikipedia/commons/e/ec/Heroku_logo.svg',
          "viewed": false,
        },
      ];
      localStorage.setItem('stories', JSON.stringify(newStories));
      setStories(newStories);
    } else {
      setStories(JSON.parse(localStorage.getItem('stories')));
    }
  }, []);

  const size = useWindowSize();


  return (
    <>
      {/* Instagram-like Box Container */}
      <Box
        sx={{
          backgroundColor: 'rgba(255, 255, 255, 0.05)', // Semi-transparent background
          backdropFilter: 'blur(10px)', // Glass effect
          borderRadius: '16px', // Rounded corners
          border: '1px solid rgba(255, 255, 255, 0.1)', // Subtle border
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)', // Instagram-like shadow
          margin: { xs: '8px', sm: '12px', md: '0 10rem' }, // Responsive margins
          mb: 2, // Bottom margin
          p: 2, // Padding inside the box
          position: 'relative',
          overflow: 'hidden',
          // Add a subtle gradient overlay
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 100%)',
            pointerEvents: 'none',
            borderRadius: '16px',
          }
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: { xl: 'center' },
            alignItems: 'center',
            minHeight: '50px',
            cursor: 'pointer',
            overflowX: 'scroll',
            overflowY: 'hidden',
            whiteSpace: 'nowrap',
            padding: '0',
            pb: 1,
            userSelect: 'none',
            position: 'relative', // Ensure content is above the overlay
            zIndex: 1,
            // Custom scrollbar styling for Instagram feel
            '&::-webkit-scrollbar': {
              height: '4px',
            },
            '&::-webkit-scrollbar-track': {
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '2px',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: 'rgba(255, 255, 255, 0.3)',
              borderRadius: '2px',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.5)',
              },
            },
          }}
          className="stories"
        >
          <Box key="Mext" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <ListItemButton
              key={"NextJS"}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '50%',
                height: '80px',
                width: '85px',
              }}
              className='story'
            >
              <>
                {/* <Image src={dynamicStory} alt="dynamic story" width={65} height={65} /> */}
                <Box
                  sx={{
                    backgroundColor: 'white',
                    borderRadius: '50%',
                    height: '60px',
                    width: '60px',
                    position: 'absolute',

                  }}
                >
                  <Image
                    src={"https://www.svgrepo.com/show/424916/meta-logo-facebook.svg"}
                    alt={"NextJS"}
                    width={60}
                    height={60}
                    style={{
                      position: 'absolute',
                      // top: { md: '12%', sm: '10%' },
                      // left: { md: '19%', sm: '17%' },
                      zIndex: '0',
                      clipPath: 'circle(50% at 50% 50%)',
                    }}
                  />
                  <ChevronRightIcon
                    sx={{
                      color: 'white',
                      backgroundColor: '#0093f1',
                      position: 'absolute',
                      top: '68%',
                      left: '68%',
                      borderRadius: '50%',
                      border: '2px solid black',
                      fontSize: '1.55rem',
                    }}
                  />
                </Box>
              </>
            </ListItemButton>
            <Typography variant="body2" color="white" textAlign={'center'} sx={{ px: 1, py: 0 }}>
              {"My Skills"}
            </Typography>
          </Box>

          {stories.map(({ name: key, image: value, viewed }, index) => (
            <Box key={index} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <ListItemButton
                key={index}
                data-story-id={`story-${index}`}
                onClick={(event) => {
                  const rect = event.currentTarget.getBoundingClientRect();
                  const position = {
                    top: rect.top + window.scrollY,
                    left: rect.left + window.scrollX,
                  };
                  handleStoryClick(index, position);
                }}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '1rem',
                  borderRadius: '50%',
                  height: '80px',
                  width: '85px',
                  px: 0,
                }}
                className='story'
              >

                {viewed ? (
                  <>
                    {/* Static icon that doesn't move */}
                    <div
                      style={{
                        borderRadius: '50%',
                        height: '65px',
                        width: '65px',
                        position: 'absolute',
                        border: '2px solid rgba(255, 255, 255, 0.3)',
                        padding: '0.17rem',
                      }}
                    >
                      <Box
                        sx={{
                          backgroundColor: 'white',
                          borderRadius: '50%',
                          height: '55px',
                          width: '55px',
                          position: 'absolute',
                          padding: '0.3rem',
                        }}
                      >
                        <Image
                          src={value}
                          alt={key}
                          width={45}
                          height={45}
                          style={{
                            position: 'absolute',
                            zIndex: '1',
                            clipPath: 'circle(50% at 50% 50%)',
                          }}
                        />
                      </Box>
                    </div>
                    {/* Animation element that moves */}
                    <motion.div
                      layoutId={`story-${index}`}
                      style={{
                        borderRadius: '50%',
                        height: '65px',
                        width: '65px',
                        position: 'absolute',
                        border: '2px solid rgba(255, 255, 255, 0.3)',
                        padding: '0.17rem',
                        opacity: activeIndex === index ? 0 : 1, // Visible when not active
                        zIndex: activeIndex === index ? 0 : 1, // Lower z-index when active
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 1000, // Very fast spring for quick dismiss
                        damping: 60, // Less damping for snappy return
                        duration: 0.1 // Quick dismiss animation
                      }}
                    >
                      <Box
                        sx={{
                          backgroundColor: 'white',
                          borderRadius: '50%',
                          height: '55px',
                          width: '55px',
                          position: 'absolute',
                          padding: '0.3rem',
                        }}
                      >
                        <Image
                          src={value}
                          alt={key}
                          width={45}
                          height={45}
                          style={{
                            position: 'absolute',
                            zIndex: '1',
                            clipPath: 'circle(50% at 50% 50%)',
                          }}
                        />
                      </Box>
                    </motion.div>
                  </>
                ) :
                  (
                    <>
                      {index === animationIndex ? (
                        <>
                          <Image src={dynamicStory} alt="dynamic story" width={75} height={75} />
                          {/* Static icon */}
                          <div
                            style={{
                              backgroundColor: 'white',
                              borderRadius: '50%',
                              height: '60px',
                              width: '60px',
                              position: 'absolute',
                              padding: '0.4rem',
                            }}
                          >
                            <Image
                              src={value}
                              alt={key}
                              width={45}
                              height={45}
                              style={{
                                position: 'absolute',
                                zIndex: '1',
                                clipPath: 'circle(50% at 50% 50%)',
                              }}
                            />
                          </div>
                          {/* Animation element */}
                          <motion.div
                            layoutId={`story-${index}`}
                            style={{
                              backgroundColor: 'white',
                              borderRadius: '50%',
                              height: '60px',
                              width: '60px',
                              position: 'absolute',
                              padding: '0.4rem',
                              opacity: activeIndex === index ? 0 : 1, // Visible when not active
                              zIndex: activeIndex === index ? 0 : 1, // Lower z-index when active
                            }}
                            transition={{
                              type: "spring",
                              stiffness: 2000, // Very fast spring for quick dismiss
                              damping: 20, // Less damping for snappy return
                              duration: 0.1 // Quick dismiss animation
                            }}
                          >
                            <Image
                              src={value}
                              alt={key}
                              width={45}
                              height={45}
                              style={{
                                position: 'absolute',
                                zIndex: '1',
                                clipPath: 'circle(50% at 50% 50%)',
                              }}
                            />
                          </motion.div>
                        </>
                      ) : (
                        <>
                          <Image src={staticStory} alt="static story" width={75} height={75} />
                          {/* Static icon */}
                          <div
                            style={{
                              backgroundColor: 'white',
                              borderRadius: '50%',
                              height: '60px',
                              width: '60px',
                              position: 'absolute',
                              padding: '0.4rem',
                            }}
                          >
                            <Image
                              src={value}
                              alt={key}
                              width={45}
                              height={45}
                              style={{
                                position: 'absolute',
                                zIndex: '1',
                                clipPath: 'circle(50% at 50% 50%)',
                              }}
                            />
                          </div>
                          {/* Animation element */}
                          <motion.div
                            layoutId={`story-${index}`}
                            style={{
                              backgroundColor: 'white',
                              borderRadius: '50%',
                              height: '60px',
                              width: '60px',
                              position: 'absolute',
                              padding: '0.4rem',
                              opacity: activeIndex === index ? 0 : 1, // Visible when not active
                              zIndex: activeIndex === index ? 0 : 1, // Lower z-index when active
                            }}
                            transition={{
                              type: "spring",
                              stiffness: 2000, // Very fast spring for quick dismiss
                              damping: 20, // Less damping for snappy return
                              duration: 0.1 // Quick dismiss animation
                            }}
                          >
                            <Image
                              src={value}
                              alt={key}
                              width={45}
                              height={45}
                              style={{
                                position: 'absolute',
                                zIndex: '1',
                                clipPath: 'circle(50% at 50% 50%)',
                              }}
                            />
                          </motion.div>
                        </>
                      )
                      }
                    </>
                  )}
              </ListItemButton>
              <Typography variant="body2" color="white" textAlign={'center'} sx={{ px: 1, py: 0 }}>
                {key}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>

      <Story 
        clicked={activeIndex !== null} 
        setActiveIndex={handleStoryClose}
        storyId={activeIndex !== null ? `story-${activeIndex}` : null}
        top={iconPosition.top}
        left={iconPosition.left}
      />
    </>
  );
};

export default Stories;
