// src/pages/CoursesPage/CoursesList.jsx
import { useState } from 'react';
import { Box, Grid } from '@mui/material';
import CourseItem from './CourseItem';
import CourseRegisterDialog from './CourseRegisterDialog';
import Pagination from '../../components/Common/Pagination';
import { coursesFakeData } from '../../data/coursesFakeData';

const COURSES_PER_PAGE = 9;

const CoursesList = () => {
    const [page, setPage] = useState(1);
    const [selectedCourse, setSelectedCourse] = useState(null);

    const totalPages = Math.ceil(
        coursesFakeData.length / COURSES_PER_PAGE
    );

    const startIndex = (page - 1) * COURSES_PER_PAGE;
    const currentCourses = coursesFakeData.slice(
        startIndex,
        startIndex + COURSES_PER_PAGE
    );

    return (
        <Box>
            {/* LIST */}
            <Grid container spacing={3}>
                {currentCourses.map(course => (
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

            {/* PAGINATION – dùng chung */}
            <Box sx={{ mt: 3 }}>
                <Pagination
                    page={page}
                    totalPages={totalPages}
                    onChange={setPage}
                />
            </Box>

            {/* REGISTER DIALOG */}
            <Box>
                <CourseRegisterDialog
                    open={Boolean(selectedCourse)}
                    course={selectedCourse}
                    onClose={() => setSelectedCourse(null)}
                />
            </Box>
        </Box>
    );
};

export default CoursesList;
