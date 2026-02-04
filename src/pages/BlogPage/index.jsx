// src/pages/BlogPage/index.jsx
import { Container, Typography } from '@mui/material';
import BlogList from './BlogList';

const BlogPage = () => {
    return (
        <Container sx={{ py: 6 }}>
            <Typography variant="h4" fontWeight={700} mb={4}>
                Blog WordPress
            </Typography>

            <BlogList />
        </Container>
    );
};

export default BlogPage;
