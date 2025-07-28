'use client';

import { useState } from 'react';
import { Box, Typography, Button, Paper, Chip } from '@mui/material';
import StoryCube from '@/components/Stories/StoryCube';
import Story from '@/components/Stories/Story';

export default function StoriesDemo() {
  const [activeStoryType, setActiveStoryType] = useState(null);
  const [storyMode, setStoryMode] = useState('cube'); // 'cube' or 'traditional'
  const [iconPosition, setIconPosition] = useState({ top: 100, left: 100 });

  const handleStoryClick = (type, event) => {
    const rect = event.target.getBoundingClientRect();
    setIconPosition({
      top: rect.top,
      left: rect.left
    });
    setActiveStoryType(type);
  };

  const handleStoryClose = () => {
    setActiveStoryType(null);
  };

  const StoryComponent = storyMode === 'cube' ? StoryCube : Story;

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#000',
        color: 'white',
        padding: '2rem',
        position: 'relative',
      }}
    >
      {/* Header */}
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Instagram-Style 3D Cube Stories
        </Typography>
        <Typography variant="h6" color="rgba(255,255,255,0.7)" gutterBottom>
          Experience smooth 3D cube transitions with gesture navigation
        </Typography>
        
        {/* Mode Toggle */}
        <Box sx={{ mt: 3, mb: 3 }}>
          <Button
            variant={storyMode === 'cube' ? 'contained' : 'outlined'}
            onClick={() => setStoryMode('cube')}
            sx={{ mr: 2, color: 'white', borderColor: 'white' }}
          >
            3D Cube Mode
          </Button>
          <Button
            variant={storyMode === 'traditional' ? 'contained' : 'outlined'}
            onClick={() => setStoryMode('traditional')}
            sx={{ color: 'white', borderColor: 'white' }}
          >
            Traditional Mode
          </Button>
        </Box>
      </Box>

      {/* Features Grid */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 3,
          mb: 4,
        }}
      >
        <Paper
          sx={{
            p: 3,
            backgroundColor: 'rgba(255,255,255,0.05)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          <Typography variant="h6" gutterBottom>
            🎯 3D Cube Navigation
          </Typography>
          <Typography variant="body2" color="rgba(255,255,255,0.7)">
            Swipe horizontally to rotate the 3D cube and navigate between stories. 
            Each story is positioned on a different face of the cube for smooth transitions.
          </Typography>
        </Paper>

        <Paper
          sx={{
            p: 3,
            backgroundColor: 'rgba(255,255,255,0.05)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          <Typography variant="h6" gutterBottom>
            👆 Gesture Control
          </Typography>
          <Typography variant="body2" color="rgba(255,255,255,0.7)">
            Real-time 1:1 finger-to-rotation mapping. Swipe down to dismiss the story viewer.
            Supports both touch gestures and keyboard navigation.
          </Typography>
        </Paper>

        <Paper
          sx={{
            p: 3,
            backgroundColor: 'rgba(255,255,255,0.05)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          <Typography variant="h6" gutterBottom>
            ⚡ Performance Optimized
          </Typography>
          <Typography variant="body2" color="rgba(255,255,255,0.7)">
            GPU-accelerated transforms, hardware acceleration, and efficient memory management.
            Only 3 story faces are rendered at any time.
          </Typography>
        </Paper>
      </Box>

      {/* Demo Stories */}
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          Try It Out
        </Typography>
        <Typography variant="body1" color="rgba(255,255,255,0.7)" gutterBottom>
          Click on any story avatar below to experience the {storyMode === 'cube' ? '3D cube' : 'traditional'} navigation
        </Typography>
      </Box>

      {/* Story Avatars */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          gap: 3,
          flexWrap: 'wrap',
          mb: 4,
        }}
      >
        {[
          { name: 'NextJS', color: '#000000', icon: '⚛️' },
          { name: 'React', color: '#61DAFB', icon: '⚛️' },
          { name: 'NodeJS', color: '#339933', icon: '🟢' },
          { name: 'MongoDB', color: '#47A248', icon: '🍃' },
          { name: 'PyTorch', color: '#EE4C2C', icon: '🔥' },
        ].map((story, index) => (
          <Box
            key={story.name}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              cursor: 'pointer',
              transition: 'transform 0.2s ease',
              '&:hover': {
                transform: 'scale(1.1)',
              },
            }}
            onClick={(e) => handleStoryClick(index, e)}
          >
            <Box
              sx={{
                width: 80,
                height: 80,
                borderRadius: '50%',
                backgroundColor: story.color,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2rem',
                border: '3px solid rgba(255,255,255,0.3)',
                mb: 1,
              }}
            >
              {story.icon}
            </Box>
            <Typography variant="caption" color="rgba(255,255,255,0.7)">
              {story.name}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* Technical Details */}
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          Technical Implementation
        </Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            gap: 1,
            flexWrap: 'wrap',
            mb: 3,
          }}
        >
          <Chip label="CSS 3D Transforms" variant="outlined" sx={{ color: 'white', borderColor: 'white' }} />
          <Chip label="Framer Motion" variant="outlined" sx={{ color: 'white', borderColor: 'white' }} />
          <Chip label="Gesture Recognition" variant="outlined" sx={{ color: 'white', borderColor: 'white' }} />
          <Chip label="Hardware Acceleration" variant="outlined" sx={{ color: 'white', borderColor: 'white' }} />
          <Chip label="Spring Physics" variant="outlined" sx={{ color: 'white', borderColor: 'white' }} />
          <Chip label="Touch Optimized" variant="outlined" sx={{ color: 'white', borderColor: 'white' }} />
        </Box>
      </Box>

      {/* Instructions */}
      <Paper
        sx={{
          p: 3,
          backgroundColor: 'rgba(255,255,255,0.05)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.1)',
          textAlign: 'center',
        }}
      >
        <Typography variant="h6" gutterBottom>
          How to Use
        </Typography>
        <Box sx={{ textAlign: 'left', maxWidth: 600, mx: 'auto' }}>
          <Typography variant="body2" color="rgba(255,255,255,0.7)" paragraph>
            <strong>Desktop:</strong>
          </Typography>
          <Typography variant="body2" color="rgba(255,255,255,0.7)" paragraph>
            • Click and drag horizontally to rotate the cube<br/>
            • Use arrow keys (← →) to navigate between stories<br/>
            • Press Escape to close the story viewer<br/>
            • Drag vertically to dismiss
          </Typography>
          
          <Typography variant="body2" color="rgba(255,255,255,0.7)" paragraph>
            <strong>Mobile:</strong>
          </Typography>
          <Typography variant="body2" color="rgba(255,255,255,0.7)">
            • Swipe horizontally to navigate between stories<br/>
            • Swipe down to dismiss the story viewer<br/>
            • Tap the close button to exit
          </Typography>
        </Box>
      </Paper>

      {/* Story Component */}
      <StoryComponent
        clicked={activeStoryType !== null}
        setActiveIndex={handleStoryClose}
        storyId={activeStoryType !== null ? `demo-story-${activeStoryType}` : null}
        top={iconPosition.top}
        left={iconPosition.left}
      />
    </Box>
  );
}