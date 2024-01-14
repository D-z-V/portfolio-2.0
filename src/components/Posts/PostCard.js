import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';    
import Image from 'next/image';

import MoreVertIcon from '@mui/icons-material/MoreVert';
import ProfileIcon from '@/icons/ProfileIcon';
import CommentIcon from '@/icons/CommentIcon';
import ShareIcon from '@/icons/ShareIcon';
import BookmarkIcon from '@/icons/BookmarkIcon';

const PostCard = (props) => {
    const [expanded, setExpanded] = useState(false);
    const [heartClicked, setHeartClicked] = useState(false);
    const [bookmarkSelected, setBookmarkSelected] = useState(false);
    const [mediaDoubleClick, setMediaDoubleClick] = useState(false);
    const [lastTap, setLastTap] = useState(0);
    const [liked, setLiked] = useState(false);
    const [likes, setLikes] = useState(0);

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

    const handleBookmarkClick = () => {
        setBookmarkSelected(!bookmarkSelected);
    }

    return (
        <Card sx={{maxWidth: 600, backgroundColor: 'black', color: 'white', width: '100%'}}>
            <CardHeader
                avatar={
                    <Avatar sx={{height: 37, width: 37 }}>
                        <Image src = { props.profilePicture } alt = "profile picture" width = { 34 } height = { 34 } />
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon sx={{ color: 'white' }}/>
                    </IconButton>
                }
                title={ props.username }
                titleTypographyProps={{ fontWeight: 500, variant: 'body2', textAlign: 'left', fontSize: '1rem' }}
                sx={{ px: 1, py: '0.75rem' }}
            />
            <Button onDoubleClick={handleCardMediaDoubleClick} onTouchStart={handleTouchStart} sx={{ width: '100%', p: 0 }} disableFocusRipple={true} disableRipple={true} disableTouchRipple={true}>
                <CardMedia
                    component="img"
                    sx={{ maxHeight: 500 }}
                    image={ props.postPicture }
                    alt="Paella dish"
                />
                {mediaDoubleClick && (
                    <Box position={'absolute'} className={'doubleTapIcon'} color={'white'}>
                        <ProfileIcon height={120} width={120} selected />
                    </Box>
                )}
            </Button>
            <CardContent sx={{ px: 1, py: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                    <IconButton aria-label="add to favorites" sx={{ color: 'white', pl: 0, pr: 1 }} onClick={handleHeartClick}>
                        {heartClicked ? <ProfileIcon clicked height={27} width={27} /> : <ProfileIcon height={27} width={27} />}
                    </IconButton>
                    <IconButton aria-label="comment" sx={{ color: 'white', pr: 1, '&:hover': { color: 'grey' } }}>
                        <CommentIcon height={27} width={27} />
                    </IconButton>
                    <IconButton aria-label="share" sx={{ color: 'white', pr: 1, '&:hover': { color: 'grey' } }}>
                        <ShareIcon height={27} width={27} />
                    </IconButton>
                </Box>
                <Box>
                    <IconButton aria-label="share" sx={{ color: 'white', pr: 1, '&:hover': { color: 'grey' } }} onClick={handleBookmarkClick}>
                        {bookmarkSelected ? <BookmarkIcon selected height={27} width={27} /> : <BookmarkIcon height={27} width={27} />}
                    </IconButton>
                </Box>
            </CardContent>
            <CardActions disableSpacing sx={{ p: 0 }}>
                <CardContent sx={{ p: 0 }}>
                    <Typography variant="body2" color="white" fontWeight={600} textAlign={'left'} sx={{ px: 1, py: 0 }}>
                        {likes} likes
                    </Typography>
                    <Button
                        expand={expanded.toString()}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                        sx={{ color: 'white', textTransform: 'none', px: 1, py: 0 }}
                        disableFocusRipple={true}
                        disableRipple={true}
                        disableTouchRipple={true}
                    >
                        <Typography variant="body2" color="white" textAlign={'left'} display={'inline'}>
                            {
                                props.caption.length > 50 ? (
                                    expanded ? props.caption : (
                                        <><>{props.caption.substring(0, 100)}</>  <span style={{ color: 'grey' }}>{expanded ? '' : '... more'}</span></>
                                    )
                                ) : props.caption
                            }
                            <Collapse in={expanded} timeout="auto" unmountOnExit>
                                {props.caption.substring(100)}
                            </Collapse>
                        </Typography>
                    </Button>
                </CardContent>
            </CardActions>
        </Card>
    );
}

export default PostCard;