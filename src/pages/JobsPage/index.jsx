// src/pages/JobsPage/index.jsx
import { Container, Typography } from '@mui/material';
import JobsList from './JobsList';

const JobsPage = () => {
    return (
        <Container sx={{ py: 6 }}>
            <Typography
                variant="h4"
                fontWeight={700}
                mb={3}
            >
                Việc làm WordPress / React
            </Typography>

            <JobsList />
        </Container>
    );
};

export default JobsPage;
