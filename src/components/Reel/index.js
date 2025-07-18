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
import MoreVertIcon from '@mui/icons-material/MoreVert';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Skeleton } from '@mui/material';
import Image from 'next/image';

const Reel = (props) => {
    const [expanded, setExpanded] = React.useState(false);
    const [heartClicked, setHeartClicked] = React.useState(false);
    const [liked, setLiked] = React.useState(false);
    const [likes, setLikes] = React.useState(0);
    const [mediaDoubleClick, setMediaDoubleClick] = React.useState(false);
    const [lastTap, setLastTap] = React.useState(0);
    const [reelLoading, setReelLoading] = React.useState(true);

    const handleLoad = () => {
        console.log("loaded");
        setReelLoading(false);
    }

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const handleHeartClick = () => {
        if (heartClicked) {
            setLikes(likes - 1);
        } else {
            setLikes(likes + 1);
        }
        setLiked(!liked);
        setHeartClicked(!heartClicked);
    }

    const handleCardMediaDoubleClick = () => {
        if (!liked) {
            handleHeartClick();
        }
        setMediaDoubleClick(true);
        setTimeout(() => {
            setMediaDoubleClick(false);
        }, 1000);
    }

    const handleTouchStart = () => {
        const currentTime = new Date().getTime();
        const tapLength = currentTime - lastTap;

        if (tapLength < 300 && tapLength > 0) {
            handleCardMediaDoubleClick();
        } else {
            setLastTap(currentTime);
        }
    };

    return (
        <>
            <Card sx={{ width: "100%", backgroundColor: "black", color: "white", maxWidth: 500, position: "relative", height: "100%" }}>

                     {reelLoading && <Skeleton variant="rectangular" width={'100%'} height={'100%'} animation="wave" sx={{ borderRadius: 3, backgroundColor: "rgba(255, 255, 255, 0.13)" }} />}

                    <Image
                        priority
                        src={props.reelLink}
                        alt={props.userName}
                        onLoad={handleLoad}
                        width={1080}
                        height={1920}
                        style={{ width: "100%", height: "100%", objectFit: "contain", objectPosition: "center" }}
                    />




                <Box sx={{ maxWidth: 500, position: "absolute", top: "0", left: "0", right: "0", bottom: "0", margin: "auto", zIndex: "1" }}>

                <Button onDoubleClick={handleCardMediaDoubleClick} onTouchStart={handleTouchStart} sx={{ width: '88%', height: "77%", p: 0,
                '&&:hover': {
                    backgroundColor: 'transparent',
                },
            
            }} disableFocusRipple={true} disableRipple={true} disableTouchRipple={true}>   </Button>
                </Box>


                        <Box sx={{ maxWidth: 500, position: "absolute", top: "0", left: "0", right: "0", bottom: {xs: "10rem", md: "0"}, margin: "auto" }}>
                        
                        <Box sx={{ color: "white", position: "absolute", bottom: "5%", left: "3%", width: "75%" }}>
                            {reelLoading && <><Skeleton variant="rectangular" width={'50%'} height={40} animation="wave" sx={{ borderRadius: 3, backgroundColor: "rgba(255, 255, 255, 0.13)" }} />
                             <Skeleton variant="rectangular" width={'100%'} height={70} animation="wave" sx={{ borderRadius: 3, backgroundColor: "rgba(255, 255, 255, 0.13)", my: 1 }} /></>
                             }
                            
                             {!reelLoading &&
                                <>
                                    <Typography gutterBottom variant="h6" component="div" display={"flex"} alignItems={"center"}>

                                        <Avatar sx={{ height: 47, width: 47, marginRight: "0.5rem", padding: "0.4rem" }} src={props.profilePic} alt={props.userName} 
                                        />

                                        {props.userName}
                                
                                    </Typography>
                                    <Button
                                        expand={expanded.toString()}
                                        onClick={handleExpandClick}
                                        aria-expanded={expanded}
                                        aria-label="show more"
                                        sx={{ color: 'white', textTransform: 'none', p: 0 }}
                                        disableFocusRipple={true}
                                        disableRipple={true}
                                        disableTouchRipple={true}
                                    >
                                        <Typography variant="body2" color="white" textAlign={'left'} display={'inline'} zIndex={1}>
                                            {
                                                "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                                            }
                                            <Collapse in={expanded} timeout="auto" unmountOnExit>
                                                {"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."}
                                            </Collapse>
                                        </Typography>
                                    </Button>

                                    </>
                                }


                        </Box>
                        <Box sx={{ color: "white", position: "absolute", bottom: "2%", right: "3%", display: "flex", flexDirection: "column",  zIndex: "1"  }}>
                            <IconButton aria-label="add to favorites" sx={{ color: 'white' }} onClick={handleHeartClick}>
                                {heartClicked ? <ProfileIcon clicked height={32} width={32} /> : <ProfileIcon height={32} width={32} />}
                            </IconButton>
                            <Typography variant="body2" color="white" textAlign={'center'} display={'inline'} zIndex={1}>
                                10.9K
                            </Typography>
                            <IconButton size="large" color="inherit" aria-label="menu">
                                <CommentIcon height={32} width={32} />
                            </IconButton>
                            <Typography variant="body2" color="white" textAlign={'center'} display={'inline'} zIndex={1}>
                                8.1K
                            </Typography>
                            <IconButton size="large" color="inherit" aria-label="menu">
                                <ShareIcon height={32} width={32} />
                            </IconButton>
                            <Typography variant="body2" color="white" textAlign={'center'} display={'inline'} zIndex={1}>
                                3.1K
                            </Typography>
                            <IconButton size="large" color="inherit" aria-label="menu">
                                <MoreVertIcon sx={{
                                    height: 32,
                                    width: 32,
                                }}
                                />
                            </IconButton>
                        </Box>
                    </Box>
                    {mediaDoubleClick && (
                        <Box position={'absolute'} className={'doubleTapIcon'} color={'white'}>
                            <ProfileIcon height={120} width={120} selected />
                        </Box>
                    )}

            </Card>
        </>
    );
};

export default Reel;