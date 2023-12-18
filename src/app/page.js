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

const drawerWidth = 240;

export default function Home() {
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
    }), []);

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        {size.width > 900 && <Navbar drawerWidth={drawerWidth} />}

        {size.width < 900 ? (
          <Box sx={{ display: 'flex', flexDirection: 'column', overflowX: 'hidden', overflowY: 'scroll'  }}>
            <Appbar/>
            <Box
              component="main"
              sx={{flexGrow: 1, p: 0, width: { md: `calc(100% - ${drawerWidth}px)` }, height: { md: `calc(100vh - 64px)` }, backgroundColor: 'black',color: 'white'}}
            >
              <Stories />
              <Divider sx={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }} />
              <Posts />
            </Box>
          </Box>
        ) : (
          <Box
            component="main"
            sx={{flexGrow: 1, p: 1.5, width: { md: `calc(100% - ${drawerWidth}px)` }, height: { md: `calc(100vh - 64px)` },backgroundColor: 'black',color: 'white'}}>
            <Stories />
            <Posts mobile />
          </Box>
        )}

        {size.width < 900 && <Navbar drawerWidth={drawerWidth} />}
      </ThemeProvider>
    </Box>
  )
}
