"use client";

import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Avatar, Button, CardActionArea, CardActions, IconButton, Collapse } from '@mui/material';
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Box, CssBaseline } from '@mui/material';
import Image from 'next/image';
import ProfileIcon from '@/Icons/ProfileIcon';
import ShareIcon from '@/Icons/ShareIcon';
import CommentIcon from '@/Icons/CommentIcon';
import Navbar from '@/components/Navbar';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import NextTopLoader from 'nextjs-toploader';
import { useWindowSize } from "@uidotdev/usehooks";
import Appbar from '@/components/Appbar';

const drawerWidth = 240;

const profile = () => {
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
                    <>
                    <Appbar />

                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', height: '100vh', margin: '2rem', width: { md: `calc(100% - ${drawerWidth}px)` }, height: { md: `calc(100vh - 64px)` } }}>
                        <Avatar sx={{height: 200, width: 200 }}>
                            <Image src = { 'https://picsum.photos/200/300' } alt = "profile" width = { 200 } height = { 200 } />
                        </Avatar>
                        <Box sx={{ ml: '6rem', display: 'flex', flexDirection: 'row', }}>
                            <Typography variant="h5" sx={{ color: 'white', marginTop: '1rem' }}>No posts yet</Typography>
                            <Button variant="contained" sx={{ backgroundColor: 'grey', color: 'white', m: '1rem', ml: '2rem', height: "2rem" }}>LinkedIn</Button>
                            <Button variant="contained" sx={{ backgroundColor: 'grey', color: 'white', m: '1rem', height: "2rem" }}>Instagram</Button>
                        </Box>
                    </Box>
                    </>

                ) : (

                        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', margin: '2rem', width: { md: `calc(100% - ${drawerWidth}px)` }, backgroundColor: 'black', color: 'white', ml : { md: `${drawerWidth}px` } }}>
                            <Avatar sx={{height: 200, width: 200 }}>
                                <Image src = { 'https://picsum.photos/200/300' } alt = "profile" width = { 200 } height = { 200 } />
                            </Avatar>
                            <Box sx={{ ml: '6rem', display: 'flex', flexDirection: 'row', }}>
                                <Typography variant="h5" sx={{ color: 'white', marginTop: '1rem' }}>No posts yet</Typography>
                                <Button variant="contained" sx={{ backgroundColor: 'grey', color: 'white', m: '1rem', ml: '2rem', height: "2rem" }}>LinkedIn</Button>
                                <Button variant="contained" sx={{ backgroundColor: 'grey', color: 'white', m: '1rem', height: "2rem" }}>Instagram</Button>
                            </Box>
                        </Box>

                )}

                {size.width <= 900 && <Navbar drawerWidth={drawerWidth} />}


            </ThemeProvider>

            <Navbar drawerWidth={drawerWidth} />
        </>
    )
}

export default profile;