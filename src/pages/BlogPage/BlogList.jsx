// src/pages/BlogPage/BlogList.jsx
import { useState } from 'react';
import { Grid, Pagination, Stack } from '@mui/material';
import BlogItem from './BlogItem';
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
        <Stack spacing={4}>
            <Grid container spacing={3}>
                {currentPosts.map((post) => (
                    <Grid item xs={12} sm={6} md={4} key={post.id}>
                        <BlogItem post={post} />
                    </Grid>
                ))}
            </Grid>

            <Stack alignItems="center">
                <Pagination
                    count={totalPages}
                    page={page}
                    onChange={(_, value) => setPage(value)}
                    color="primary"
                />
            </Stack>
        </Stack>
    );
};

export default BlogList;
