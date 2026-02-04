import { Box, Typography, Grid } from '@mui/material';
import BlogItem from '../BlogPage/BlogItem';
import { blogFakeData } from '../../data/blogFakeData';

const BlogSection = () => {
    // Giả lập: 3 bài viết mới nhất
    const latestPosts = blogFakeData.slice(0, 4);

    return (
        <Box>
            <Typography variant="h4" fontWeight={700} mb={4}>
                Bài viết mới nhất
            </Typography>

            <Grid container spacing={3}>
                {latestPosts.map((post) => (
                    <Grid item xs={12} sm={6} md={4} key={post.id}>
                        <BlogItem post={post} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default BlogSection;
