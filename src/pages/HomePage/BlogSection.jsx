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

            <Grid container spacing={2}>
                {latestPosts.map((post) => (
                    <Grid
                        key={post.id}
                        size={{ xs: 12, sm: 6, md: 3 }}
                    >
                        <BlogItem post={post} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default BlogSection;
