"use client";

import Navbar from "@/components/Navbar"
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';

import React from 'react';

import Typography from '@mui/material/Typography';

import Appbar from "@/components/Appbar"

import { useMemo } from "react";

import { ThemeProvider, createTheme } from "@mui/material/styles";


const drawerWidth = 240;

export default function Home() {
  const [width, setWidth] = React.useState(1200);

  React.useEffect(() => {
    setWidth(window.innerWidth);
    const handleResize = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

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
      {   width > 900 ? <Navbar drawerWidth={drawerWidth} /> : null   }

      {width < 900 ? (
        <Box sx={{ display: 'flex', flexDirection: 'column',  }}>

          <Appbar/>



          <Box
            component="main"
            sx={{
              flexGrow: 1, p: 1.5, width: { md: `calc(100% - ${drawerWidth}px)` }, height: { md: `calc(100vh - 64px)` },
              backgroundColor: 'black',
              color: 'white'
            }}
          >
            <Typography paragraph>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua. Rhoncus dolor purus non
              enim praesent elementum facilisis leo vel. Risus at ultrices mi tempus
              imperdiet. Semper risus in hendrerit gravida rutrum quisque non tellus.
              Convallis convallis tellus id interdum velit laoreet id donec ultrices.
              Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
              adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra
              nibh cras. Metus vulputate eu scelerisque felis imperdiet proin fermentum
              leo. Mauris commodo quis imperdiet massa tincidunt. Cras tincidunt lobortis
              feugiat vivamus at augue. At augue eget arcu dictum varius duis at
              consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa
              sapien faucibus et molestie ac.
            </Typography>
            <Typography paragraph>
              Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper
              eget nulla facilisi etiam dignissim diam. Pulvinar elementum integer enim
              neque volutpat ac tincidunt. Ornare suspendisse sed nisi lacus sed viverra
              tellus. Purus sit amet volutpat consequat mauris. Elementum eu facilisis
              sed odio morbi. Euismod lacinia at quis risus sed vulputate odio. Morbi
              tincidunt ornare massa eget egestas purus viverra accumsan in. In hendrerit
              gravida rutrum quisque non tellus orci ac. Pellentesque nec nam aliquam sem
              et tortor. Habitant morbi tristique senectus et. Adipiscing elit duis
              tristique sollicitudin nibh sit. Ornare aenean euismod elementum nisi quis
              eleifend. Commodo viverra maecenas accumsan lacus vel facilisis. Nulla
              posuere sollicitudin aliquam ultrices sagittis orci a.
            </Typography>
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
          <Typography paragraph>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Rhoncus dolor purus non
            enim praesent elementum facilisis leo vel. Risus at ultrices mi tempus
            imperdiet. Semper risus in hendrerit gravida rutrum quisque non tellus.
            Convallis convallis tellus id interdum velit laoreet id donec ultrices.
            Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
            adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra
            nibh cras. Metus vulputate eu scelerisque felis imperdiet proin fermentum
            leo. Mauris commodo quis imperdiet massa tincidunt. Cras tincidunt lobortis
            feugiat vivamus at augue. At augue eget arcu dictum varius duis at
            consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa
            sapien faucibus et molestie ac.
          </Typography>
          <Typography paragraph>
            Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper
            eget nulla facilisi etiam dignissim diam. Pulvinar elementum integer enim
            neque volutpat ac tincidunt. Ornare suspendisse sed nisi lacus sed viverra
            tellus. Purus sit amet volutpat consequat mauris. Elementum eu facilisis
            sed odio morbi. Euismod lacinia at quis risus sed vulputate odio. Morbi
            tincidunt ornare massa eget egestas purus viverra accumsan in. In hendrerit
            gravida rutrum quisque non tellus orci ac. Pellentesque nec nam aliquam sem
            et tortor. Habitant morbi tristique senectus et. Adipiscing elit duis
            tristique sollicitudin nibh sit. Ornare aenean euismod elementum nisi quis
            eleifend. Commodo viverra maecenas accumsan lacus vel facilisis. Nulla
            posuere sollicitudin aliquam ultrices sagittis orci a.
          </Typography>
        </Box>
        )}

      {   width < 900 ? <Navbar drawerWidth={drawerWidth} /> : null  }
          </ThemeProvider>
    </Box>
  )
}
