import { Container, Stack } from '@mui/material';
import HeroSection from './HeroSection';
import BlogSection from './BlogSection';
import CoursesSection from './CoursesSection';
import JobsSection from './JobsSection';
import CTASection from './CTASection';

const HomePage = () => {
    return (
        <>
            <HeroSection />

            <Container maxWidth="lg" sx={{ py: 6 }}>
                <Stack spacing={8}>
                    <BlogSection />
                    <CoursesSection />
                    <JobsSection />
                    <CTASection />
                </Stack>
            </Container>
        </>
    );
};

export default HomePage;
