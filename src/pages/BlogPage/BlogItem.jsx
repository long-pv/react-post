import {
    Card,
    CardMedia,
    CardContent,
    Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';

/**
 * Component hiển thị 1 bài viết
 * Nhận data đã được chuẩn hoá từ Redux Store
 */
const BlogItem = ({ post }) => {
    return (
        <Card sx={{ height: '100%' }}>
            {/* Ảnh đại diện bài viết */}
            <CardMedia
                component="img"
                height="180"
                image={post.thumbnail}
                alt={post.title}
            />

            <CardContent>
                {/* Tiêu đề bài viết */}
                <Typography
                    variant="h6"
                    component={Link}
                    to={`/blog/${post.slug}`}
                    sx={{
                        textDecoration: 'none',
                        color: 'inherit',
                        '&:hover': { color: 'primary.main' },
                    }}
                >
                    {post.title}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default BlogItem;
