// src/pages/JobsPage/JobsList.jsx
import { useState } from 'react';
import { Grid, Box } from '@mui/material';
import JobItem from './JobItem';
import JobApplyDialog from './JobApplyDialog';
import Pagination from '../../components/Common/Pagination';
import { jobsFakeData } from '../../data/jobsFakeData';

const JOBS_PER_PAGE = 9;

const JobsList = () => {
    const [page, setPage] = useState(1);
    const [selectedJob, setSelectedJob] = useState(null);

    const totalPages = Math.ceil(
        jobsFakeData.length / JOBS_PER_PAGE
    );

    const startIndex = (page - 1) * JOBS_PER_PAGE;
    const currentJobs = jobsFakeData.slice(
        startIndex,
        startIndex + JOBS_PER_PAGE
    );

    return (
        <>
            <Grid container spacing={3}>
                {currentJobs.map((job) => (
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

            <Box sx={{ mt: 3 }}>
                <Pagination
                    page={page}
                    totalPages={totalPages}
                    onChange={setPage}
                />
            </Box>

            <JobApplyDialog
                open={Boolean(selectedJob)}
                job={selectedJob}
                onClose={() => setSelectedJob(null)}
            />
        </>
    );
};

export default JobsList;
