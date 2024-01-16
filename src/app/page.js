"use client";

import React from 'react';
import { useMemo } from "react";
import { useWindowSize } from "@uidotdev/usehooks";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Box, CssBaseline, Divider } from '@mui/material';

import Navbar from "@/components/Navbar";
import Appbar from "@/components/Appbar";
import Stories from "@/components/Stories";
import Posts from "@/components/Posts";
import Reels from '@/components/Reel';
import Image from 'next/image';
import localFont from 'next/font/local';
import CircularProgress from '@mui/material/CircularProgress';
import NextTopLoader from 'nextjs-toploader';
import Typography from '@mui/material/Typography';
import DesktopStories from '@/components/DesktopStories';

const drawerWidth = 240;

let firstLoadFlag = false;

const instagramLogoFont = localFont({ src: '../fonts/GrandHotel-Regular.ttf' });

export default function Home() {

  //for the first 2 seconds display the loading screen
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    if (firstLoadFlag) {
      setLoading(false);
    } else {
      setTimeout(() => {
        setLoading(false);
        firstLoadFlag = true;
      }, 100);
    }
  }, []);

  const size = useWindowSize();

  const theme = useMemo(
    () =>
      createTheme({
        components: {
          MuiCssBaseline: {
            styleOverrides: {
              body: {
                "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
                  width: 3,
                  borderRadius: 10,
                },
                "&::-webkit-scrollbar-track, & *::-webkit-scrollbar-track": {
                  boxShadow: 'inset 0 0 6px rgba(0,0,0,0.3)',
                  borderRadius: '10px',
                  backgroundColor: 'black',
                  marginTop: '4.25rem',
                  marginBottom: '3.5rem',
                },
                "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
                  borderRadius: 20,
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  border: "3px solid rgba(255, 255, 255, 0.2)",
                },
              },
            },
          },
        },
      }),
    []
  );

  return (
    <>
      <NextTopLoader
        color="linear-gradient(45deg, #405DE6, #FFD166)"
        shadow="0 0 10px #405DE6, 0 0 5px #405DE6, 0 0 10px #FFD166, 0 0 5px #FFD166"
        height={4}
      />

      <Box sx={{ display: 'flex', height: '100vh', backgroundColor: 'black' }}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {loading ? (
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', backgroundColor: 'black', width: 'calc(100vw + 500px)' }}>
                                <Typography
                    variant="h2"
                    noWrap
                    component="div"
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      minHeight: '50px',
                      cursor: 'pointer',
                      fontSize: '5.25rem',

                    }}
                  >
                    <p
                      className={`navbar__logo loader ${instagramLogoFont.className}`}
                      style={{ padding: '0.5rem 0', margin: '0' }}
                    >
                      Portfolio
                    </p>
                  </Typography>
            </Box>
          ) : (
            <>
              {size.width > 900 && <Navbar drawerWidth={drawerWidth} page="home" />}

              {size.width <= 900 ? (
                <Box sx={{ display: 'flex', flexDirection: 'column', overflowX: 'hidden', overflowY: 'scroll' }}>
                  <Appbar />

                  <Box
                    component="main"
                    sx={{ flexGrow: 1, p: 0, width: { md: `calc(100% - ${drawerWidth}px)` }, height: { md: `calc(100vh - 64px)` }, backgroundColor: 'black', color: 'white' }}
                  >

                    <Stories width = {size.width} />
                    <Divider sx={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }} />
                    <Posts />

                  </Box>

                </Box>
              ) : (
                <Box
                  component="main"
                  sx={{ flexGrow: 1, p: 1.5, width: { md: `calc(100% - ${drawerWidth}px)` }, height: { md: `calc(100vh - 64px)` }, backgroundColor: 'black', color: 'white' }}
                >
                      <DesktopStories />
                      <Posts mobile />
                </Box>
              )}

              {size.width <= 900 && <Navbar drawerWidth={drawerWidth} page = "home" />}
            </>
          )}
        </ThemeProvider>
      </Box>
    </>
  )
}
