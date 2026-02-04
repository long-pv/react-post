import { Container, Typography, Box } from '@mui/material';
import { useParams } from 'react-router-dom';
import { blogFakeData } from '../../data/blogFakeData';

const BlogDetailPage = () => {
    const { slug } = useParams();

    const post = blogFakeData.find((item) => item.slug === slug);

    if (!post) {
        return (
            <Container sx={{ py: 6 }}>
                <Typography>Không tìm thấy bài viết</Typography>
            </Container>
        );
    }

    return (
        <Container maxWidth="md" sx={{ py: 6 }}>
            <Typography variant="h3" fontWeight={700} mb={4}>
                {post.title}
            </Typography>

            <Box
                sx={{
                    '& p': { mb: 2, lineHeight: 1.8 },
                }}
                dangerouslySetInnerHTML={{ __html: post.content }}
            />
        </Container>
    );
};

export default BlogDetailPage;
