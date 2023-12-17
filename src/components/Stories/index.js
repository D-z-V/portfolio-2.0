import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Image from 'next/image';
import React from 'react';

import ListItemButton from '@mui/material/ListItemButton';

import dynamicStory from './dynamicStory.gif';
import staticStory from './staticStory.png';


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
          // backgroundColor: 'white',
        }}
        className="stories"
      >
        {Object.entries(stories).map(([key, value], index) => (
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
          >

            {index === activeIndex ? (
              <>
                <Image src={dynamicStory} alt="dynamic story" width={80} height={80}

                />
                <Box


                  sx={{
                    backgroundColor: 'white',
                    borderRadius: '50%',
                    height: '61px',
                    width: '61px',
                    position: 'absolute',
                    padding: '0.15rem',

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
                <Image src={staticStory} alt="static story" width={80} height={80} />
                <Box


                  sx={{
                    backgroundColor: 'white',
                    borderRadius: '50%',
                    height: '60px',
                    width: '60px',
                    position: 'absolute',
                    padding: '0.15rem',
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
        ))}
      </Box>

    </>
  );
};

export default Stories;
