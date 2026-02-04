import { Box, Typography, Grid, Card, CardContent, Chip, Stack } from '@mui/material';

const mockCourses = [
    {
        id: 1,
        title: 'WordPress cho Developer',
        desc: 'Custom theme, plugin, REST API.',
    },
    {
        id: 2,
        title: 'Headless WordPress + React',
        desc: 'Xây dựng frontend bằng React + WP backend.',
    },
];

const CoursesSection = () => {
    return (
        <Box>
            <Typography variant="h4" fontWeight={600} mb={3}>
                Khóa học nổi bật
            </Typography>

            <Grid container spacing={3}>
                {mockCourses.map((course) => (
                    <Grid item xs={12} md={6} key={course.id}>
                        <Card>
                            <CardContent>
                                <Stack spacing={1}>
                                    <Chip label="WordPress" size="small" sx={{ width: 'fit-content' }} />
                                    <Typography fontWeight={600}>
                                        {course.title}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {course.desc}
                                    </Typography>
                                </Stack>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default CoursesSection;
