import {
    Card,
    CardMedia,
    CardContent,
    Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';

const BlogItem = ({ post }) => {
    return (
        <Card sx={{ height: '100%' }}>
            <CardMedia
                component="img"
                height="180"
                image={post.thumbnail}
                alt={post.title}
            />

            <CardContent>
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
