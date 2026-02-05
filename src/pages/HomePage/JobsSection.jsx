import { useState } from 'react';
import { Box, Typography, Grid } from '@mui/material';
import JobItem from '../JobsPage/JobItem';
import JobApplyDialog from '../JobsPage/JobApplyDialog';
import { jobsFakeData } from '../../data/jobsFakeData';

const JobsSection = () => {
    const [selectedJob, setSelectedJob] = useState(null);
    const latestJobs = jobsFakeData.slice(0, 3);

    return (
        <Box>
            <Typography variant="h4" fontWeight={600} mb={3}>
                Việc làm WordPress
            </Typography>

            <Grid container spacing={3}>
                {latestJobs.map((job) => (
                    <Grid
                        key={job.id}
                        size={{ xs: 12, sm: 6, md: 4 }}
                    >
                        <JobItem
                            job={job}
                            onApply={setSelectedJob}
                        />
                    </Grid>
                ))}
            </Grid>

            <JobApplyDialog
                open={Boolean(selectedJob)}
                job={selectedJob}
                onClose={() => setSelectedJob(null)}
            />
        </Box>
    );
};

export default JobsSection;
