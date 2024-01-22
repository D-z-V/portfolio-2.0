import { Box, Button, IconButton, Typography } from "@mui/material";
import { keyframes } from '@mui/system';
import React, { useEffect, useState, lazy, Suspense } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { useSwipeable } from 'react-swipeable';

const StoriesLazy = React.lazy(() => import("react-insta-stories"));
const WithSeeMore = React.lazy(() =>
  import("react-insta-stories").then((module) => ({
    default: module.WithSeeMore,
  }))
);


const animationTime = 0.2;


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

  const [clicked, setClicked] = useState(props.clicked);
  const [animation, setAnimation] = useState([props.top + 50, props.left + 50]);

  const storyAnimation = keyframes`
                0% { height: 0; width: 0; top: ${props.top + 50}; left: ${props.left + 50}; }
                100% { top: 0; left: 0; height: 100vh; width: 100vw; }
        `;

  const [rotate, setRotate] = useState(0);
  const [animationDone, setAnimationDone] = useState(false);

  const handler = useSwipeable({
    onSwipedLeft: () => {
      setRotate(rotate - 90);
    },
    onSwipedRight: () => {
      setRotate(rotate + 90);
    },
    trackMouse: true
  })
  if (props.clicked) {
    setTimeout(() => {
      setAnimation([0, 0]);
    }, animationTime * 1000);
    setTimeout(() => {
      setAnimationDone(true);
    }, animationTime * 1000 + 200);
  }

  const handleClose = () => {
    setClicked(false);
    props.setActiveIndex(null);

  };


  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Box
          sx={{
            backgroundColor: 'black',
            position: 'absolute',
            top: animation[0],
            left: animation[1],
            zIndex: '9998',
            display: clicked ? 'block' : 'none',
            animation: `${storyAnimation} ${animationTime}s ease-in`,
            maxHeight: '100vh',
          }}
          className="scene"
        >
          <Box
            className="cube"
            style={{ transform: `translateZ(-50vw) rotateY(${rotate}deg)` }}
            {...handler}
          >
            <Box className="cube__face cube__face--1">
              <Suspense>
                <StoriesLazy
                  preloadCount={3}
                  loop
                  keyboardNavigation
                  defaultInterval={8000}
                  height={"100%"}
                  width={"100%"}
                  stories={stories2}
                  onStoryEnd={(s, st) => console.log("story ended", s, st)}
                  onAllStoriesEnd={(s, st) => console.log("all stories ended", s, st)}
                  onStoryStart={(s, st) => console.log("story started", s, st)}
                  onNext={() => console.log("next button pressed")}
                  onPrevious={() => console.log("previous button pressed")}
                  storyContainerStyles={{ overflow: "hidden" }}

                />
              </Suspense>
              <IconButton aria-label="close" sx={{ color: 'white', position: 'absolute', top: '1rem', right: '1rem', zIndex: '9999' }} onClick={handleClose}

                onTouchEnd={handleClose}
              >

                <CloseIcon height={32} width={32} />
              </IconButton>
            </Box>
            <Box className="cube__face cube__face--2" sx={{display: animationDone ? 'block' : 'none'}}>
              <Suspense>
                <StoriesLazy
                  preloadCount={3}
                  loop
                  keyboardNavigation
                  defaultInterval={8000}
                  height={"100%"}
                  width={"100%"}
                  stories={stories2}
                  onStoryEnd={(s, st) => console.log("story ended", s, st)}
                  onAllStoriesEnd={(s, st) => console.log("all stories ended", s, st)}
                  onStoryStart={(s, st) => console.log("story started", s, st)}
                  onNext={() => console.log("next button pressed")}
                  onPrevious={() => console.log("previous button pressed")}
                  storyContainerStyles={{ overflow: "hidden" }}

                />
              </Suspense>
              <IconButton aria-label="close" sx={{ color: 'white', position: 'absolute', top: '1rem', right: '1rem', zIndex: '9999' }} onClick={handleClose}

                onTouchEnd={handleClose}
              >

                <CloseIcon height={32} width={32} />
              </IconButton>
            </Box>
            <Box className="cube__face cube__face--3" sx={{display: animationDone ? 'block' : 'none'}}>
              <Suspense>
                <StoriesLazy
                  preloadCount={3}
                  loop
                  keyboardNavigation
                  defaultInterval={8000}
                  height={"100%"}
                  width={"100%"}
                  stories={stories2}
                  onStoryEnd={(s, st) => console.log("story ended", s, st)}
                  onAllStoriesEnd={(s, st) => console.log("all stories ended", s, st)}
                  onStoryStart={(s, st) => console.log("story started", s, st)}
                  onNext={() => console.log("next button pressed")}
                  onPrevious={() => console.log("previous button pressed")}
                  storyContainerStyles={{ overflow: "hidden" }}

                />
              </Suspense>
              <IconButton aria-label="close" sx={{ color: 'white', position: 'absolute', top: '1rem', right: '1rem', zIndex: '9999' }} onClick={handleClose}

                onTouchEnd={handleClose}
              >

                <CloseIcon height={32} width={32} />
              </IconButton>
            </Box>
            <Box className="cube__face cube__face--4" sx={{display: animationDone ? 'block' : 'none'}}>
              <Suspense>
                <StoriesLazy
                  preloadCount={3}
                  loop
                  keyboardNavigation
                  defaultInterval={8000}
                  height={"100%"}
                  width={"100%"}
                  stories={stories2}
                  onStoryEnd={(s, st) => console.log("story ended", s, st)}
                  onAllStoriesEnd={(s, st) => console.log("all stories ended", s, st)}
                  onStoryStart={(s, st) => console.log("story started", s, st)}
                  onNext={() => console.log("next button pressed")}
                  onPrevious={() => console.log("previous button pressed")}
                  storyContainerStyles={{ overflow: "hidden" }}

                />
              </Suspense>
              <IconButton aria-label="close" sx={{ color: 'white', position: 'absolute', top: '1rem', right: '1rem', zIndex: '9999' }} onClick={handleClose}

                onTouchEnd={handleClose}
              >

                <CloseIcon height={32} width={32} />
              </IconButton>
            </Box>

          </Box>
        </Box>
      </Box>
    </>
  )
}

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
