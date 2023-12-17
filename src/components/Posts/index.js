import PostCard from '@/components/Posts/PostCard';
import Box from '@mui/material/Box';

const Posts = () => {
    return (
        <Box
        sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            pb: '3rem',
        }}
        >
        <PostCard />
        <PostCard />
        </Box>
    );
    }

    export default Posts;