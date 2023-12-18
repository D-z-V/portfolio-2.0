import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Image from 'next/image';
import React from 'react';

import ListItemButton from '@mui/material/ListItemButton';

import dynamicStory from './dynamicStory.gif';
import staticStory from './staticStory.png';

import ChevronRightIcon from '@mui/icons-material/ChevronRight';


const Stories = () => {
  const [activeIndex, setActiveIndex] = React.useState(null);

  const handleStoryClick = (index) => {
    setActiveIndex(index);
  };


  const stories = {
    'NextJS': 'https://upload.wikimedia.org/wikipedia/commons/8/8e/Nextjs-logo.svg',
    'ReactJS': 'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg',
    'NodeJS': 'https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg',
    'MongoDB': 'https://upload.wikimedia.org/wikipedia/commons/9/93/MongoDB_Logo.svg',
    'Pytorch': 'https://upload.wikimedia.org/wikipedia/commons/1/10/PyTorch_logo_icon.svg',
    'Tensorflow': 'https://upload.wikimedia.org/wikipedia/commons/2/2d/Tensorflow_logo.svg',
    'Keras': 'https://upload.wikimedia.org/wikipedia/commons/a/ae/Keras_logo.svg',
    'SQL': 'https://upload.wikimedia.org/wikipedia/commons/2/29/Postgresql_elephant.svg',
    'Flask': 'https://upload.wikimedia.org/wikipedia/commons/3/3c/Flask_logo.svg',
    'Git': 'https://upload.wikimedia.org/wikipedia/commons/3/3f/Git_icon.svg',
    'Github': 'https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg',
    'Heroku': 'https://upload.wikimedia.org/wikipedia/commons/e/ec/Heroku_logo.svg',
  }

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          minHeight: '50px',
          cursor: 'pointer',
          overflowX: 'scroll',
          overflowY: 'hidden',
          whiteSpace: 'nowrap',
          padding: '0',
          margin: { sm: '0', md: '0 10rem' },
          pb: 1,
          // backgroundColor: 'white',
          userSelect: 'none',
          
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
              padding: '3rem',
              borderRadius: '50%',
              height: '80px',
              width: '100px',

            }}
            className='story'
          >

              <>
                {/* <Image src={dynamicStory} alt="dynamic story" width={85} height={85}

                /> */}
                <Box


                  sx={{
                    backgroundColor: 'white',
                      borderRadius: '50%',
                    height: '70px',
                    width: '70px',
                    position: 'absolute',
                    padding: '0.15rem',

                  }}
                >
                  <Image src={"https://www.svgrepo.com/show/424916/meta-logo-facebook.svg"} alt={"NextJS"} width={65} height={65}
                    style={
                      {
                        position: 'absolute',
                        // top: { md: '12%', sm: '10%' },
                        // left: { md: '19%', sm: '17%' },
                        zIndex: '0',
                        clipPath: 'circle(50% at 50% 50%)',
                        
                      }

                    }

                  />

                  <ChevronRightIcon sx={{color: 'white',
                    backgroundColor: '#0093f1',
                    position: 'absolute',
                    top: '68%',
                    left: '68%',
                    borderRadius: '50%',
                    border: '2px solid black',
                    fontSize: '1.65rem',

                
                }} />

                </Box>
              </>

          </ListItemButton>
          <Typography variant="body2" color="white" textAlign={'center'} sx={{ px: 1, py: 0 }}>
                      {"My Skills"}
          </Typography>
        </Box>

        {Object.entries(stories).map(([key, value], index) => (
          <Box key={index} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <ListItemButton
            key={index}
            onClick={() => handleStoryClick(index)}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '3rem',
              borderRadius: '50%',
              height: '80px',
              width: '100px',
            }}
            className='story'
          >

            {index === activeIndex ? (
              <>
                <Image src={dynamicStory} alt="dynamic story" width={85} height={85}

                />
                <Box


                  sx={{
                    backgroundColor: 'white',
                    borderRadius: '50%',
                    height: '65px',
                    width: '65px',
                    position: 'absolute',
                    padding: '0.25rem',

                  }}
                >
                  <Image src={value} alt={key} width={55} height={55}
                    style={
                      {
                        position: 'absolute',
                        // top: { md: '12%', sm: '10%' },
                        // left: { md: '19%', sm: '17%' },
                        zIndex: '1',
                        clipPath: 'circle(50% at 50% 50%)',
                      }

                    }

                  />
                </Box>
              </>
            ) : (
              <>
                <Image src={staticStory} alt="static story" width={85} height={85} />
                <Box


                  sx={{
                    backgroundColor: 'white',
                    borderRadius: '50%',
                    height: '65px',
                    width: '65px',
                    position: 'absolute',
                    padding: '0.25rem',
                  }}
                >
                  <Image src={value} alt={key} width={55} height={55}
                    style={
                      {
                        position: 'absolute',
                        // top: { md: '12%', sm: '10%' },
                        // left: { md: '19%', sm: '17%' },
                        zIndex: '1',
                        clipPath: 'circle(50% at 50% 50%)',
                      }

                    }

                  />
                </Box>

              </>
            )}

          </ListItemButton>
                      <Typography variant="body2" color="white" textAlign={'center'} sx={{ px: 1, py: 0 }}>
                      {key}
                    </Typography>
                    </Box>
        ))}
      </Box>

    </>
  );
};

export default Stories;
