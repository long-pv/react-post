import { Box, Typography, Grid } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import BlogItem from '../BlogPage/BlogItem';

// Action async dùng để gọi API lấy bài viết
import { fetchLatestPosts } from '../../store/postSlice';

const BlogSection = () => {
    /**
     * dispatch dùng để gửi action lên Redux Store
     * (ví dụ: gọi API, cập nhật state)
     */
    const dispatch = useDispatch();

    /**
     * useSelector dùng để lấy data từ Redux Store
     * state.posts là key đã khai báo trong store/index.js
     */
    const { latest, loading, error } = useSelector(
        (state) => state.posts
    );

    /**
     * useEffect chạy 1 lần khi component mount
     * → dùng để gọi API lấy bài viết
     */
    useEffect(() => {
        dispatch(fetchLatestPosts(4)); // lấy 4 bài mới nhất
    }, [dispatch]);

    return (
        <Box>
            <Typography variant="h4" fontWeight={700} mb={4}>
                Bài viết mới nhất
            </Typography>

            {/* Trạng thái đang tải */}
            {loading && <Typography>Đang tải bài viết...</Typography>}

            {/* Trạng thái lỗi */}
            {error && (
                <Typography color="error">
                    Có lỗi xảy ra khi tải bài viết
                </Typography>
            )}

            {/* Khi đã có data */}
            <Grid container spacing={2}>
                {!loading &&
                    latest.map((post) => (
                        <Grid
                            key={post.id}
                            xs={12}
                            sm={6}
                            md={3}
                        >
                            <BlogItem post={post} />
                        </Grid>
                    ))}
            </Grid>
        </Box>
    );
};

export default BlogSection;
