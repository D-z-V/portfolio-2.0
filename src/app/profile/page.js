"use client";

import * as React from 'react';
import Typography from '@mui/material/Typography';
import { Avatar, Button, CardActionArea, CardActions, IconButton, Collapse, Divider } from '@mui/material';
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Box, CssBaseline } from '@mui/material';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import NextTopLoader from 'nextjs-toploader';
import { useWindowSize } from "@uidotdev/usehooks";
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Stories from '@/components/Stories';
import SummarizeIcon from '@mui/icons-material/Summarize';
import GridOnIcon from '@mui/icons-material/GridOn';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

const drawerWidth = 240;

const profile = () => {

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

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
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', height: '100vh', margin: '1rem', height: { md: `calc(100vh - 64px)` }, marginTop: '1rem' }}>
                                <Typography variant="h5" sx={{ color: 'white', fontWeight: 600 }}>sn1pe._</Typography>
                                <Box>
                                    <IconButton size="large" color="inherit" aria-label="menu" sx={{ p: 0, mx: 2 }}>
                                        <LinkedInIcon sx={{ color: 'white', fontSize: '2rem' }} />
                                    </IconButton>
                                    <IconButton size="large" color="inherit" aria-label="menu" sx={{ p: 0 }}>
                                        <InstagramIcon sx={{ color: 'white', fontSize: '2rem' }} />
                                    </IconButton>
                                </Box>
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', m: "0.5rem" }}>
                                <Avatar sx={{ height: 110, width: 110, mr: 1 }}>
                                    <Image src={'https://picsum.photos/200/300'} alt="profile" width={120} height={120} />
                                </Avatar>
                                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', m: 1 }}>
                                    <Typography variant="body1" sx={{ color: 'white', fontSize: "1.25rem", fontWeight: 600 }}>0</Typography>
                                    <Typography variant='body1' sx={{ color: 'white', fontSize: "1rem" }}>Posts</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', m: 1 }}>
                                    <Typography variant="body1" sx={{ color: 'white', fontSize: "1.25rem", fontWeight: 600 }}>400</Typography>
                                    <Typography variant='body1' sx={{ color: 'white', fontSize: "1rem" }}>Followers</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', m: 1 }}>
                                    <Typography variant="body1" sx={{ color: 'white', fontSize: "1.25rem", fontWeight: 600 }}>450</Typography>
                                    <Typography variant='body1' sx={{ color: 'white', fontSize: "1Srem" }}>Following</Typography>
                                </Box>
                            </Box>
                            <Typography variant="body1" sx={{ color: 'white', fontSize: "1rem", fontWeight: 600, m: "0.5rem" }}>Dev Bhandari</Typography>
                            <Button variant="contained" sx={{ color: 'white', mt: '1rem', height: "2.25rem", borderRadius: "0.5rem", m: "0.5rem", mb: "1rem" }}>Resume</Button>
                            <Stories />

                            <Tabs value={value} onChange={handleChange}
                                variant="fullWidth"
                                TabIndicatorProps={{
                                    sx: {
                                        color: 'white',
                                        backgroundColor: 'white',
                                        height: "0.15rem",
                                    }
                                }}
                                sx={{
                                    my: "1rem",
                                }}
                            >
                                <Tab label={

                                    <SummarizeIcon sx={{ height: 27, width: 27, paddingBottom: "0.25rem" }} />

                                }

                                    sx={{ color: 'white' }} />
                                <Tab label={

                                    <GridOnIcon sx={{ height: 27, width: 27, paddingBottom: "0.25rem" }} />

                                } sx={{ color: 'white', mx: 1 }} />
                                <Tab label={

                                    <EmojiEventsIcon sx={{ height: 27, width: 27, paddingBottom: "0.25rem" }} />

                                } sx={{ color: 'white' }} />
                            </Tabs>
                        </Box>
                    </>

                ) : (
                    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '5rem', width: { md: `calc(100% - ${drawerWidth}px)` }, backgroundColor: 'black', color: 'white', ml: { md: `${drawerWidth}px` } }}>
                        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', mx: "2rem", mb: "2.5rem" }}>
                            <Avatar sx={{ height: 200, width: 200 }}>
                                <Image src={'https://picsum.photos/200/300'} alt="profile" width={200} height={200} />
                            </Avatar>
                            <Box sx={{ ml: '5rem', display: 'flex', flexDirection: 'column' }}>
                                <Box sx={{ display: 'flex', flexDirection: 'row', }}>
                                    <Typography variant="h5" sx={{ color: 'white', marginTop: '1rem' }}>sn1pe._</Typography>
                                    <Button variant="contained" sx={{ p: 2, backgroundColor: 'rgb(54, 54, 54)', color: 'white', m: '1rem', ml: '2rem', height: "2rem", borderRadius: "0.5rem" }}>LinkedIn</Button>
                                    <Button variant="contained" sx={{ p: 2, backgroundColor: 'rgb(54, 54, 54)', color: 'white', my: '1rem', height: "2rem", borderRadius: "0.5rem" }}>Instagram</Button>
                                </Box>
                                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', mt: "1rem" }}>
                                    <Typography variant="body1" sx={{ color: 'white', fontSize: "1.25rem" }}><span style={{ fontWeight: 600, }}>0</span> posts</Typography>
                                    <Typography variant="body1" sx={{ color: 'white', fontSize: "1.25rem" }}><span style={{ fontWeight: 600, }}>400</span> followers</Typography>
                                    <Typography variant="body1" sx={{ color: 'white', fontSize: "1.25rem" }}><span style={{ fontWeight: 600, }}>500</span> following</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', flexDirection: 'column', mt: "1rem" }}>
                                    <Typography variant="body1" sx={{ color: 'white', fontSize: "1rem" }}><span style={{ fontWeight: 500 }}>Dev Bhandari</span></Typography>
                                    <Button variant="contained" sx={{ color: 'white', mt: '1rem', height: "2.25rem", borderRadius: "0.75rem" }}>Resume</Button>
                                </Box>

                            </Box>
                        </Box>
                        <Stories />
                        <Divider sx={{ backgroundColor: 'rgba(255, 255, 255, 0.3)', mx: "3.5rem", my: "2.5rem", mb: 0 }} />
                        <Box sx={{ width: '100%', backgroundColor: 'black', color: 'white', display: 'flex', flexDirection: 'row', justifyContent: 'center', mx: "2rem" }}>
                            <Tabs value={value} onChange={handleChange} centered
                                sx={{
                                    mx: "3.5rem",
                                }}
                                TabIndicatorProps={{
                                    sx: {
                                        top: 0,
                                        color: 'white',
                                        backgroundColor: 'white',
                                    }
                                }}

                            >
                                <Tab label={
                                    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                        <SummarizeIcon sx={{ height: 27, width: 27, paddingBottom: "0.25rem" }} />
                                        <Typography variant="body1" sx={{ color: 'white', fontSize: "0.75rem", ml: 1 }}>
                                            Resume
                                        </Typography>
                                    </Box>
                                }

                                    sx={{ color: 'white' }} />
                                <Tab label={
                                    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                        <GridOnIcon sx={{ height: 27, width: 27, paddingBottom: "0.25rem" }} />
                                        <Typography variant="body1" sx={{ color: 'white', fontSize: "0.75rem", ml: 1 }}>
                                            Projects
                                        </Typography>
                                    </Box>
                                } sx={{ color: 'white', mx: 1 }} />
                                <Tab label={
                                    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                        <EmojiEventsIcon sx={{ height: 27, width: 27, paddingBottom: "0.25rem" }} />
                                        <Typography variant="body1" sx={{ color: 'white', fontSize: "0.75rem", ml: 1 }}>
                                            Achievements
                                        </Typography>
                                    </Box>
                                } sx={{ color: 'white' }} />
                            </Tabs>
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