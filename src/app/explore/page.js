"use client";

import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Avatar, Button, CardActionArea, CardActions, IconButton, Collapse } from '@mui/material';
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Box, CssBaseline } from '@mui/material';
import ProfileIcon from '@/icons/ProfileIcon';
import ShareIcon from '@/icons/ShareIcon';
import CommentIcon from '@/icons/CommentIcon';
import Navbar from '@/components/Navbar';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Reel from '@/components/Reel';
import NextTopLoader from 'nextjs-toploader';
import Appbar from "@/components/Appbar";
import Grid from '@/components/Grid';

import { useWindowSize } from "@uidotdev/usehooks";

const drawerWidth = 240;


const Explore = () => {

    const size = useWindowSize();

    const theme = React.useMemo(
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
            <ThemeProvider theme={theme}>
                <CssBaseline />

                {size.width <= 900 ? (
                    <Box sx={{ backgroundColor: 'black', width: { md: `calc(100% - ${drawerWidth}px)` }, height: { md: `calc(100vh - 64px)` }, color: 'white' }}>

                        <Grid />

                    </Box>

                ) : (

                    <Box sx={{ width: { md: `calc(100% - ${drawerWidth}px)` }, height: { md: `calc(100vh - 64px)` }, backgroundColor: 'black', color: 'white', ml: { md: `${drawerWidth}px` } }}>
                        <Box sx={{ py: 3, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color: 'white' }}>
                            <Typography
                                sx={{ width: { md: 'calc(100% - 5rem)', lg: 'calc(100% - 20rem)' }, display: 'flex', flexDirection: 'column', textAlign: 'center', fontSize: '1.5rem', fontWeight: 600, mb: 2 }}
                            >        
                                  <Grid />      
                            </Typography>
                        </Box>


                    </Box>

                )}

                {size.width <= 900 && <Navbar drawerWidth={drawerWidth} page = "explore" />}

            </ThemeProvider>

            {size.width > 900 && <Navbar drawerWidth={drawerWidth} page="explore" />}
        </>
    );
}

export default Explore;


