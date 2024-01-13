import PostCard from '@/components/Posts/PostCard';
import Box from '@mui/material/Box';

const Posts = () => {
    const props = {
        username: 'username',
        profilePicture: 'https://upload.wikimedia.org/wikipedia/commons/8/8e/Nextjs-logo.svg',
        postPicture: 'https://thepreviewapp.com/wp-content/uploads/2022/01/first-instagram-post-ideas-introduce-business.jpg',
        caption: 'This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like.',
        likes: 0,
        comments: [],
    }
    
    return (
        <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', pb: '3rem', backgroundColor: 'black'}}>
            <PostCard  {...props} />
            <PostCard  {...props} />
            <PostCard  {...props} />
        </Box>
    );
    }

    export default Posts;