// pages/HomePage/HeroSection.jsx
import { Box, Typography, Button, Stack, Container } from '@mui/material';
import { useEffect, useState } from 'react';

const slides = [
    {
        title: 'WP Dev Hub',
        subtitle: 'Chia sẻ kiến thức WordPress cho Developer',
        cta: 'Xem bài viết',
    },
    {
        title: 'Khóa học WordPress',
        subtitle: 'Từ cơ bản đến production thực tế',
        cta: 'Xem khóa học',
    },
    {
        title: 'Việc làm WordPress',
        subtitle: 'Cơ hội remote – freelance – fulltime',
        cta: 'Tìm việc ngay',
    },
];

const HeroSection = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    // auto slide
    useEffect(() => {
        const timer = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % slides.length);
        }, 4000);

        return () => clearInterval(timer);
    }, []);

    const currentSlide = slides[activeIndex];

    return (
        <Box
            sx={{
                bgcolor: 'grey.900',
                color: '#fff',
                py: { xs: 8, md: 14 },
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            <Container maxWidth="lg">
                <Stack spacing={3} maxWidth={600}>
                    <Typography variant="h2" fontWeight={700}>
                        {currentSlide.title}
                    </Typography>

                    <Typography variant="h6" color="grey.300">
                        {currentSlide.subtitle}
                    </Typography>

                    <Button
                        variant="contained"
                        size="large"
                        sx={{ width: 'fit-content' }}
                    >
                        {currentSlide.cta}
                    </Button>
                </Stack>
            </Container>

            {/* Dots */}
            <Stack
                direction="row"
                spacing={1}
                sx={{
                    position: 'absolute',
                    bottom: 24,
                    left: '50%',
                    transform: 'translateX(-50%)',
                }}
            >
                {slides.map((_, index) => (
                    <Box
                        key={index}
                        onClick={() => setActiveIndex(index)}
                        sx={{
                            width: 10,
                            height: 10,
                            borderRadius: '50%',
                            bgcolor:
                                index === activeIndex ? 'primary.main' : 'grey.600',
                            cursor: 'pointer',
                        }}
                    />
                ))}
            </Stack>
        </Box>
    );
};

export default HeroSection;
