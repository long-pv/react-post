// src/pages/HomePage/CoursesSection.jsx
import { useState } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import CourseItem from '../CoursesPage/CourseItem';
import CourseRegisterDialog from '../CoursesPage/CourseRegisterDialog';
import { coursesFakeData } from '../../data/coursesFakeData';

const CoursesSection = () => {
    const [selectedCourse, setSelectedCourse] = useState(null);

    // Lấy 3 khóa học mới nhất
    const latestCourses = coursesFakeData.slice(0, 3);

    return (
        <Box>
            <Typography variant="h4" fontWeight={600} mb={3}>
                Khóa học nổi bật
            </Typography>

            {/* LIST – giống hệt CoursesList */}
            <Grid container spacing={3}>
                {latestCourses.map(course => (
                    <Grid
                        key={course.id}
                        size={{ xs: 12, sm: 6, md: 4 }}
                    >
                        <CourseItem
                            course={course}
                            onRegister={setSelectedCourse}
                        />
                    </Grid>
                ))}
            </Grid>

            {/* REGISTER DIALOG – dùng lại */}
            <CourseRegisterDialog
                open={Boolean(selectedCourse)}
                course={selectedCourse}
                onClose={() => setSelectedCourse(null)}
            />
        </Box>
    );
};

export default CoursesSection;
