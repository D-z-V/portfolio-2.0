"use client";
import localFont from 'next/font/local';

import React, { useState, useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

import HomeIcon from '@/Icons/HomeIcon';
import ExploreIcon from '@/Icons/ExploreIcon';
import ProjectIcon from '@/Icons/ProjectIcon';
import ProfileIcon from '@/Icons/ProfileIcon';
import ContactIcon from '@/Icons/ContactIcon';
import MoreIcon from '@/Icons/MoreIcon';
import BlogIcon from '@/Icons/BlogIcon';

import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Paper from '@mui/material/Paper';

const instagramLogoFont = localFont({ src: '../../fonts/GrandHotel-Regular.ttf' });

const Navbar = (props) => {
    const [selectedNavIndex, setSelectedNavIndex] = useState('Home');
    const ref = useRef(null);

    useEffect(() => {
        ref.current.ownerDocument.body.scrollTop = 0;
    }, [selectedNavIndex]);

    const TopNavComponents = {
        'Home': HomeIcon,
        'Explore': ExploreIcon,
        'Projects': ProjectIcon,
        'Profile': ProfileIcon,
        'Blog': BlogIcon,
    }

    const BottomNavComponents = {
        'Contact': ContactIcon,
        'More': MoreIcon,
    }

    const drawer = (
        <>
            <Typography variant="h4" noWrap component="div" sx={{ display: 'flex', alignItems: 'center', margin: '1.25rem 0 1.75rem 1rem', minHeight: '50px', cursor: 'pointer' }}>
                <p className={`navbar__logo ${instagramLogoFont.className}`} style={{ padding: '0.5rem 0', margin: '0' }}>Portfolio</p>
            </Typography>

            <List sx={{ paddingBottom: `calc(100%)`, color: 'white', height: `calc(100vh - 240px)` }}>
                {Object.entries(TopNavComponents).map(([text, Icon]) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton
                            sx={{
                                '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' }, borderRadius: '12px', padding: '0.5rem',
                                margin: '0 0.25rem'
                            }}
                            onClick={() => setSelectedNavIndex(text)}
                        >
                            {selectedNavIndex === text ? <Icon selected /> : <Icon />}
                            <ListItemText primary={text}
                                sx={{
                                    marginLeft: '1.25rem',
                                    '& .MuiListItemText-primary': { fontSize: '1.15rem' }
                                }}
                            />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>

            <List>
                {Object.entries(BottomNavComponents).map(([text, Icon]) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton
                            sx={{
                                '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' }, borderRadius: '12px', padding: '0.5rem',
                                margin: '0 0.25rem'
                            }}
                            onClick={() => setSelectedNavIndex(text)}
                        >
                            {selectedNavIndex === text ? <Icon selected /> : <Icon />}
                            <ListItemText primary={text}
                                sx={{
                                    marginLeft: '1.25rem',
                                    '& .MuiListItemText-primary': { fontSize: '1.15rem' }
                                }}
                            />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </>
    );

    return (
        <>
            <Box
                component="nav"
                sx={{ width: { md: props.drawerWidth }, flexShrink: { md: 0 }, height: '100vh' }}
                aria-label="mailbox folders"
            >
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { sm: 'none', md: 'block', xs: 'none' },
                        '& .MuiDrawer-paper': {
                            boxSizing: 'border-box', width: props.drawerWidth, color: 'white', backgroundColor: 'black', height: '100vh',
                            borderRight: '1px solid rgba(255, 255, 255, 0.1)',
                        },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>

            <Box ref={ref} display={{ xs: 'block', sm: 'block', md: 'none' }}>
                <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
                    <BottomNavigation sx={{ backgroundColor: 'black' }}>
                        {Object.entries(TopNavComponents).map(([text, Icon]) => (
                            <BottomNavigationAction key={text} label={text} icon={selectedNavIndex === text ? <Icon selected /> : <Icon />}
                                sx={{
                                    color: 'white',
                                    paddingX: '0rem',
                                }}
                                onClick={() => setSelectedNavIndex(text)}
                            />
                        ))}
                    </BottomNavigation>
                </Paper>
            </Box>
        </>
    )
}

export default Navbar;