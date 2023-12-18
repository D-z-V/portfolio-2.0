import PostCard from '@/components/Posts/PostCard';
import Box from '@mui/material/Box';

const Posts = (props) => {
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
        <PostCard {...props} />
        <PostCard {...props} />
        </Box>
    );
    }

    export default Posts;