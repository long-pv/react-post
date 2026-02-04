// src/pages/CoursesPage/index.jsx
import { Container, Typography } from '@mui/material';
import CoursesList from './CoursesList';

const CoursesPage = () => {
    return (
        <Container sx={{ py: 6 }}>
            <Typography variant="h4" fontWeight={700} mb={4}>
                Khóa học WordPress
            </Typography>

            <CoursesList />
        </Container>
    );
};

export default CoursesPage;
