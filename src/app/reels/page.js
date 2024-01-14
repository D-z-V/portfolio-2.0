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

import { useWindowSize } from "@uidotdev/usehooks";

const drawerWidth = 240;


const Reels = () => {

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
                    <Box sx={{ scrollSnapType: "y mandatory", backgroundColor: 'black', width: { md: `calc(100% - ${drawerWidth}px)` }, height: { md: `calc(100vh - 64px)` }, backgroundColor: 'black', color: 'white'}}>
                        <Box sx={{ scrollSnapAlign: "start" }}>
                            <Reel start reelLink="https://i.ibb.co/x7qZ9mw/giphy-3.gif" userName="Cyberpunk II" profilePic="https://i.ibb.co/tL1dnMC/77086465-113941020067774-8405997317559156736-n-modified.png" />
                        </Box>
                        <Box sx={{ scrollSnapAlign: "start" }}>
                            <Reel reelLink="https://i.ibb.co/X5mFqVj/giphy-1.gif" userName="Nyan Cat" profilePic="https://i.ibb.co/tL1dnMC/77086465-113941020067774-8405997317559156736-n-modified.png" />
                        </Box>
                        <Box sx={{ scrollSnapAlign: "start" }}>
                            <Reel reelLink="https://i.ibb.co/YcwyndY/giphy.gif" userName="I See You" profilePic="https://i.ibb.co/tL1dnMC/77086465-113941020067774-8405997317559156736-n-modified.png" />
                        </Box>
                        <Box sx={{ scrollSnapAlign: "start" }}>
                            <Reel reelLink="https://i.ibb.co/x7qZ9mw/giphy-3.gif" userName="Cyberpunk II" profilePic="https://i.ibb.co/tL1dnMC/77086465-113941020067774-8405997317559156736-n-modified.png" />
                        </Box>
                    </Box>

              ) : (

                <Box sx={{ scrollSnapType: "y mandatory", backgroundColor: 'black', width: { md: `calc(100% - ${drawerWidth}px)` }, height: { md: `calc(100vh - 64px)` }, backgroundColor: 'black', color: 'white', ml : { md: `${drawerWidth}px` }  }}>
                    <Box sx={{ scrollSnapAlign: "start" }}>
                        <Reel start reelLink="https://i.ibb.co/x7qZ9mw/giphy-3.gif" userName="Cyberpunk II" profilePic="https://i.ibb.co/tL1dnMC/77086465-113941020067774-8405997317559156736-n-modified.png" />
                    </Box>
                    <Box sx={{ scrollSnapAlign: "start" }}>
                        <Reel reelLink="https://i.ibb.co/X5mFqVj/giphy-1.gif" userName="Nyan Cat" profilePic="https://i.ibb.co/tL1dnMC/77086465-113941020067774-8405997317559156736-n-modified.png" />
                    </Box>
                    <Box sx={{ scrollSnapAlign: "start" }}>
                        <Reel reelLink="https://i.ibb.co/YcwyndY/giphy.gif" userName="I See You" profilePic="https://i.ibb.co/tL1dnMC/77086465-113941020067774-8405997317559156736-n-modified.png" />
                    </Box>
                    <Box sx={{ scrollSnapAlign: "start" }}>
                        <Reel reelLink="https://i.ibb.co/x7qZ9mw/giphy-3.gif" userName="Cyberpunk II" profilePic="https://i.ibb.co/tL1dnMC/77086465-113941020067774-8405997317559156736-n-modified.png" />
                    </Box>
                </Box>

              )}

              {size.width <= 900 && <Navbar drawerWidth={drawerWidth} />}

            </ThemeProvider>

            <Navbar drawerWidth={drawerWidth} />
        </>
    );
}

export default Reels;


