import { useState } from 'react';
import { Grid, Box } from '@mui/material';
import BlogItem from './BlogItem';
import Pagination from '../../components/Common/Pagination';
import { blogFakeData } from '../../data/blogFakeData';

const POSTS_PER_PAGE = 8;

const BlogList = () => {
    const [page, setPage] = useState(1);

    const totalPages = Math.ceil(blogFakeData.length / POSTS_PER_PAGE);
    const startIndex = (page - 1) * POSTS_PER_PAGE;

    const currentPosts = blogFakeData.slice(
        startIndex,
        startIndex + POSTS_PER_PAGE
    );

    return (
        <Box>
            {/* LIST */}
            <Grid container spacing={3}>
                {currentPosts.map((post) => (
                    <Grid
                        key={post.id}
                        size={{ xs: 12, sm: 6, md: 4 }}
                    >
                        <BlogItem post={post} />
                    </Grid>
                ))}
            </Grid>

            {/* PAGINATION – dùng chung */}
            <Box sx={{ mt: 3 }}>
                <Pagination
                    page={page}
                    totalPages={totalPages}
                    onChange={setPage}
                />
            </Box>
        </Box>
    );
};

export default BlogList;
