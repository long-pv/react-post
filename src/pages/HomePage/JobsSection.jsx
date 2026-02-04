import { Box, Typography, Stack, Paper } from '@mui/material';

const mockJobs = [
    {
        id: 1,
        title: 'WordPress Developer (Remote)',
        salary: '15 – 25 triệu',
    },
    {
        id: 2,
        title: 'Senior WP Developer',
        salary: 'Up to 40 triệu',
    },
    {
        id: 3,
        title: 'Freelance WordPress',
        salary: 'Theo dự án',
    },
];

const JobsSection = () => {
    return (
        <Box>
            <Typography variant="h4" fontWeight={600} mb={3}>
                Việc làm WordPress
            </Typography>

            <Stack spacing={2}>
                {mockJobs.map((job) => (
                    <Paper key={job.id} sx={{ p: 2 }}>
                        <Typography fontWeight={600}>
                            {job.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Lương: {job.salary}
                        </Typography>
                    </Paper>
                ))}
            </Stack>
        </Box>
    );
};

export default JobsSection;
