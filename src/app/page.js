"use client";

import Navbar from "@/components/Navbar"
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';

import React from 'react';


import Appbar from "@/components/Appbar"

import Stories from "@/components/Stories";

import { useMemo } from "react";
import { useWindowSize } from "@uidotdev/usehooks";
import { ThemeProvider, createTheme } from "@mui/material/styles";



const drawerWidth = 240;

export default function Home() {

  const size = useWindowSize();

  // const [width, setWidth] = React.useState(size.width);

  // React.useEffect(() => {
  //   setWidth(window.innerWidth);

  //   const handleResize = () => {
  //     setWidth(window.innerWidth);

  //     // console.log(screen.width);
  //   };
  //   window.addEventListener('resize', handleResize);
  //   return () => {
  //     window.removeEventListener('resize', handleResize);
  //   };
  // }, []);

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
                  backgroundColor: 'black', // Set to your preferred background color
                  marginTop: '4.25rem',
                  marginBottom: '3.5rem',
                },
                "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
                  borderRadius: 20,
                  backgroundColor: 'rgba(255, 255, 255, 0.2)', // Set to your preferred light white color
                  border: "3px solid rgba(255, 255, 255, 0.2)",
                },
              },
            },
          },
        },
    }), []);

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <ThemeProvider theme={theme}>
      <CssBaseline/>
      {   size.width > 900 ? <Navbar drawerWidth={drawerWidth} /> : null   }

      { size.width < 900 ? (
        <Box sx={{ display: 'flex', flexDirection: 'column', overflowX: 'hidden'  }}>

          <Appbar/>



          <Box
            component="main"
            sx={{
              flexGrow: 1, p: 1.5, width: { md: `calc(100% - ${drawerWidth}px)` }, height: { md: `calc(100vh - 64px)` },
              backgroundColor: 'black',
              color: 'white'
            }}
          >
            <Stories />
          </Box>
        </Box>
      ) : (
        <Box
          component="main"
          sx={{
            flexGrow: 1, p: 1.5, width: { md: `calc(100% - ${drawerWidth}px)` }, height: { md: `calc(100vh - 64px)` },
            backgroundColor: 'black',
            color: 'white'
          }}
        >

          <Stories />

        </Box>
        )}

      {   size.width < 900 ? <Navbar drawerWidth={drawerWidth} /> : null  }
          </ThemeProvider>
    </Box>
  )
}
