import { Box, Button, IconButton, Typography } from "@mui/material";
import { keyframes } from '@mui/system';
import { useEffect, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import LinearProgress from '@mui/material/LinearProgress';
import { useWindowSize } from "@uidotdev/usehooks";

import Stories from 'stories-react';
import 'stories-react/dist/index.css';

function Head(props) {
    return (
      <div
        style={{
          margin: '0.5rem 1rem',
          display: 'flex',
          alignItems: 'center',
          alignContent: 'center',
        }}
      >
        <div>
          <img
            src={props.url}
            alt="Avatar"
            style={{
              'vertical-align': 'middle',
              width: '37px',
              height: '37px',
              'border-radius': '50%',
            }}
          />
        </div>
        <div
          style={{
            color: 'white',
            fontWeight: '500',
            fontSize: '14px',
            marginLeft: '12px',
          }}
        >
            <Typography variant="body2" color="white" textAlign={'left'} display={'inline'} sx={{ fontSize: '1rem' }}>
            {props.name + " "} <span
                style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '0.85rem', marginLeft: '10px', fontWeight: 600 }}
            > {`${props.time} hours ago`} </span>
            </Typography>
        </div>
      </div>
    );
  }

  function SeeMoreComponent() {
    return (
      <div
        className="box"
        style={{
          paddingTop: '100px',
          padding: '24px',
          backgroundColor: '#fad0c4',
          height: '20%',
        }}
      >
        <h4>Component opened from see more</h4>
        <div
          style={{ display: 'flex', justifyContent: 'center', padding: '24px' }}
        >
          <img src="https://images.pexels.com/photos/10955653/pexels-photo-10955653.jpeg?dpr=2&w=100" />
        </div>
        <p>
          You need to add <code>zindex = 2</code> to any interaction u want in
          the component
        </p>
        <button
          onClick={() =>
            window.open('https://www.pexels.com/@imadclicks', '_blank')
          }
          style={{
            color: '#3399FF',
            border: '1px solid',
            borderColor: '#3399FF',
            borderRadius: '3px',
            height: '30px',
            cursor: 'pointer',
            position: 'relative',
            zIndex: '2',
            width: '100%',
          }}
        >
          Follow Imad Clicks on pexels for amazing pictures
        </button>
      </div>
    );
  }

  
  const stories = [
    {
      type: 'image',
      url: 'https://images.pexels.com/photos/9470805/pexels-photo-9470805.jpeg?w=300',
      duration: 15000,
      header: (
        <Head
          name="hannad"
          url="https://www.w3schools.com/howto/img_avatar.png"
          time="4"
        />
      ),
    },
    {
      type: 'image',
      duration: 6000,
      url: 'https://images.pexels.com/photos/9733197/pexels-photo-9733197.jpeg?w=300',
      header: (
        <Head
          name="john"
          url="https://www.w3schools.com/howto/img_avatar2.png"
          time="5"
        />
      ),
    },
    {
      duration: 7000,
      type: 'image',
      url: 'https://images.pexels.com/photos/10964888/pexels-photo-10964888.jpeg?w=300',
      header: (
        <Head
          name="Doe"
          url="https://www.w3schools.com/w3images/avatar5.png"
          time="6"
        />
      ),
    },
  ];
  
const Story = (props) => {
    return (
        <>
          <Stories stories={stories} />
      
        </>
    )
}

export default Story;
