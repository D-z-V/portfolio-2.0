import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';    

import MoreVertIcon from '@mui/icons-material/MoreVert';
import ProfileIcon from '@/Icons/ProfileIcon';
import CommentIcon from '@/Icons/CommentIcon';
import ShareIcon from '@/Icons/ShareIcon';
import BookmarkIcon from '@/Icons/BookmarkIcon';



const PostCard = () => {
    const [expanded, setExpanded] = React.useState(false);

    const [heartClicked, setHeartClicked] = React.useState(false);
    const [BookmarkSelected, setBookmarkSelected] = React.useState(false);

    const [likes, setLikes] = React.useState(0);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const handleHeartClick = () => {

        if (heartClicked) {
            setLikes(likes - 1);
        } else {
            setLikes(likes + 1);
        }

        setHeartClicked(!heartClicked);
    }
    
    const handleBookmarkClick = () => {
        setBookmarkSelected(!BookmarkSelected);
    }

    return (
        <Card sx={{
            maxWidth: 900,
            backgroundColor: 'black',
            color: 'white',
        }}

        >
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500], height: 37, width: 37
                    }} aria-label="recipe">
                        R
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon sx={{color: 'white' }}/>
                    </IconButton>
                }
                title="Shrimp and Chorizo Paella"
                titleTypographyProps={{fontWeight: 500, variant: 'body2', textAlign: 'left', fontSize: '1rem'}}
                sx={{ px: 1, py: '0.75rem' } }
            />
            <CardMedia
                component="img"
                sx={
                    {
                        maxHeight: 500,
                    }
                }
                image="https://thepreviewapp.com/wp-content/uploads/2022/01/first-instagram-post-ideas-introduce-business.jpg"
                alt="Paella dish"
            />
            <CardContent sx={{ px: 1, py: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                
            >

                <Box>

                    <IconButton aria-label="add to favorites" sx={{color: 'white', pl: 0, pr: 1, }} onClick={handleHeartClick} >
                        {heartClicked ? <ProfileIcon clicked height={27} width={27}/> : <ProfileIcon height={27} width={27}/>}
                    </IconButton>

                    <IconButton aria-label="comment" sx={{color: 'white', pr: 1,  '&:hover': {color: 'grey'}}}>
                        <CommentIcon height={27} width={27} />
                    </IconButton>
                    
                    <IconButton aria-label="share" sx={{color: 'white', pr: 1,  '&:hover': {color: 'grey'}}}>
                        <ShareIcon height={27} width={27} />
                    </IconButton>
                </Box>

                <Box>
                    <IconButton aria-label="share" sx={{color: 'white', pr: 1,  '&:hover': {color: 'grey'}}} onClick={handleBookmarkClick}>
                        {BookmarkSelected ? <BookmarkIcon selected height={27} width={27} /> : <BookmarkIcon height={27} width={27} />}
                    </IconButton>
                </Box>


            </CardContent>
            <CardActions disableSpacing
                sx={
                    {
                        p: 0
                    }
                }
            >
                <CardContent

                    sx={
                        {
                            p: 0
                        }
                    }
                >
                       <Typography variant="body2" color="white" fontWeight={600} textAlign={'left'} sx={{ px: 1, py: 0 }}>
                            {likes} likes
                        </Typography>
                    <Button
                        expand={expanded.toString()}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                        sx={
                            {
                                color: 'white',
                                textTransform: 'none',
                                px: 1,
                                py: 0

                            }
                        }
                        disableFocusRipple={true}
                        disableRipple={true}
                        disableTouchRipple={true}
                    >
                        <Typography variant="body2" color="white"
                            textAlign={'left'}   
                            display={'inline'}                       
                        >
                            This impressive paella is a perfect party dish and a fun meal to cook
                            together with your guests. Add 1 cup of frozen peas along with the mussels,
                            if you like <span style={{ color: 'grey' }}>{expanded ? '' : '... more'}</span>. 
                            <Collapse in={expanded} timeout="auto" unmountOnExit
                                
                            >
                                Heat 1/2 cup of the broth in a pot until simmering, add saffron and set
                                aside for 10 minutes.

                                Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over
                                medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring
                                occasionally until lightly browned, 6 to 8 minutes. Transfer shrimp to a
                                large plate and set aside, leaving chicken and chorizo in the pan. Add
                                pimentón, bay leaves, garlic, tomatoes, onion, salt and pepper, and cook,
                                stirring often until thickened and fragrant, about 10 minutes. Add
                                saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
       
                                Add rice and stir very gently to distribute. Top with artichokes and
                                peppers, and cook without stirring, until most of the liquid is absorbed,
                                15 to 18 minutes. Reduce heat to medium-low, add reserved shrimp and
                                mussels, tucking them down into the rice, and cook again without
                                stirring, until mussels have opened and rice is just tender, 5 to 7
                                minutes more. (Discard any mussels that don&apos;t open.)
                                Set aside off of the heat to let rest for 10 minutes, and then serve.
                    </Collapse>

                        </Typography>
                    </Button>

                    
                </CardContent>




            </CardActions>
        </Card>
    );
}

export default PostCard;

