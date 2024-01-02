"use client";

import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Avatar, Button, CardActionArea, CardActions, IconButton, Collapse } from '@mui/material';
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Box, CssBaseline } from '@mui/material';
import ProfileIcon from '@/Icons/ProfileIcon';
import ShareIcon from '@/Icons/ShareIcon';
import CommentIcon from '@/Icons/CommentIcon';
import Navbar from '@/components/Navbar';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Reel from '@/components/Reel';

const reels = () => {
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
        <ThemeProvider theme={theme}>
            <CssBaseline />

            <Box sx={{ scrollSnapType: "y mandatory" }}>
                <Box sx={{ scrollSnapAlign: "start" }}>
                    <Reel start reelLink = "https://i.ibb.co/x7qZ9mw/giphy-3.gif" userName = "Cyberpunk II" profilePic = "https://i.ibb.co/tL1dnMC/77086465-113941020067774-8405997317559156736-n-modified.png" />
                </Box>
                <Box sx={{ scrollSnapAlign: "start" }}>
                    <Reel reelLink = "https://i.ibb.co/X5mFqVj/giphy-1.gif" userName = "Nyan Cat" profilePic = "https://i.ibb.co/tL1dnMC/77086465-113941020067774-8405997317559156736-n-modified.png" />
                </Box>
                <Box sx={{ scrollSnapAlign: "start" }}>
                    <Reel reelLink = "https://i.ibb.co/YcwyndY/giphy.gif" userName = "I See You" profilePic = "https://i.ibb.co/tL1dnMC/77086465-113941020067774-8405997317559156736-n-modified.png" />
                </Box>
                <Box sx={{ scrollSnapAlign: "start" }}>
                    <Reel  reelLink = "https://i.ibb.co/x7qZ9mw/giphy-3.gif" userName = "Cyberpunk II" profilePic = "https://i.ibb.co/tL1dnMC/77086465-113941020067774-8405997317559156736-n-modified.png" />
                </Box>
            </Box>

            <Navbar />
        </ThemeProvider>
    );
}

export default reels;