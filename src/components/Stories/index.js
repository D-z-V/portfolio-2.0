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
          padding: '0 0.5rem',
          margin: { sm: '0', md: '0 10rem' },
        }}
        className="stories"
      >
        {["C++", "Python", "Java", "JavaScript", "React", "NodeJS", "MongoDB", "SQL", "HTML", "CSS"].map((story, index) => (
          <ListItemButton
            key={index}
            onClick={() => handleStoryClick(index)}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0.5rem 3rem',
            }}
          >
            {index === activeIndex ? (
              <Image src={dynamicStory} alt="dynamic story" width={90} height={90} />
            ) : (
              <Image src={staticStory} alt="static story" width={90} height={90} />
            )}
          </ListItemButton>
        ))}
      </Box>
    </>
  );
};

export default Stories;
