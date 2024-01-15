"use client";
import localFont from 'next/font/local';
import Link from "next/link";

import React, { useState, useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

import HomeIcon from '@/icons/HomeIcon';
import ExploreIcon from '@/icons/ExploreIcon';
import ProjectIcon from '@/icons/ProjectIcon';
import ProfileIcon from '@/icons/ProfileIcon';
import ContactIcon from '@/icons/ContactIcon';
import MoreIcon from '@/icons/MoreIcon';
import BlogIcon from '@/icons/BlogIcon';

import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Paper from '@mui/material/Paper';

const instagramLogoFont = localFont({ src: '../../fonts/GrandHotel-Regular.ttf' });

const Navbar = (props) => {
    // const [selectedNavIndex, setSelectedNavIndex] = useState('Home');
    // const ref = useRef(null);

    // useEffect(() => {
    //     ref.current.ownerDocument.body.scrollTop = 0;
    // }, [selectedNavIndex]);

    const TopNavComponents = {
        'home': HomeIcon,
        'explore': ExploreIcon,
        'reels': ProjectIcon,
        'profile': ProfileIcon,
    }

    const BottomNavComponents = {
        'contact': ContactIcon,
        'more': MoreIcon,
    }

    const drawer = (
        <>
            <Typography variant="h4" noWrap component="div" sx={{ display: 'flex', alignItems: 'center', margin: '1.25rem 0 1.75rem 1rem', minHeight: '50px', cursor: 'pointer' }}>
                <p className={`navbar__logo ${instagramLogoFont.className}`} style={{ padding: '0.5rem 0', margin: '0' }}>Portfolio</p>
            </Typography>

            <List sx={{ paddingBottom: `calc(100%)`, color: 'white', height: `calc(100vh - 240px)` }}>
                {Object.entries(TopNavComponents).map(([text, Icon]) => (
                    <Link href={text == 'home' ? '/' : `/${text.toLowerCase()}`} key={text}>
                        <ListItem key={text} disablePadding>
                            <ListItemButton
                                sx={{
                                    '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' }, borderRadius: '12px', padding: '0.5rem',
                                    margin: '0 0.25rem'
                                }}
                                // onClick={() => setSelectedNavIndex(text)}
                            >
                                {/* {selectedNavIndex === text ? <Icon selected /> : <Icon />}
                                 */}
                                 <Icon />
                                <ListItemText primary={text.charAt(0).toUpperCase() + text.slice(1)}
                                    sx={{
                                        marginLeft: '1.25rem',
                                        '& .MuiListItemText-primary': { fontSize: '1.15rem' }
                                    }}
                                />
                            </ListItemButton>
                        </ListItem>
                    </Link>
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
                            // onClick={() => setSelectedNavIndex(text)}
                        >
                            {props.page === text ? <Icon selected /> : <Icon />}
                            <Icon />
                            <ListItemText primary={text.charAt(0).toUpperCase() + text.slice(1)}
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
                sx={{ width: { md: props.drawerWidth }, flexShrink: { md: 0 }, height: '10vh' }}
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

            <Box display={{ xs: 'block', sm: 'block', md: 'none' }}>
                <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 2 }} elevation={3}>
                    <BottomNavigation sx={{ backgroundColor: 'black' }}>
                        {Object.entries(TopNavComponents).map(([text, Icon]) => (
                            <Link href={text == 'home' ? '/' : `/${text.toLowerCase()}`} key={text} style={{ width: '100%' }}>
                                <BottomNavigationAction key={text} label={text} icon={props.page === text ? <Icon selected /> : <Icon />}
                                    sx={{
                                        color: 'white',
                                        paddingX: '0rem',
                                    }}
                                    // onClick={() => setSelectedNavIndex(text)}
                                />
                            </Link>
                        ))}
                    </BottomNavigation>
                </Paper>
            </Box>
        </>
    )
}

export default Navbar;