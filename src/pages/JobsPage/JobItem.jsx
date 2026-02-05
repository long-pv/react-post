// src/pages/JobsPage/JobItem.jsx
import {
    Card,
    CardContent,
    Typography,
    Stack,
    Button,
    Chip,
} from '@mui/material';

const JobItem = ({ job, onApply }) => {
    return (
        <Card variant="outlined">
            <CardContent>
                <Stack spacing={1.5}>
                    <Typography variant="h6" fontWeight={600}>
                        {job.title}
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                        {job.company} · {job.location}
                    </Typography>

                    <Stack direction="row" spacing={1}>
                        <Chip label={job.level} size="small" />
                        <Chip
                            label={job.salary}
                            size="small"
                            color="success"
                        />
                    </Stack>

                    <Typography variant="body2">
                        {job.description}
                    </Typography>

                    <Button
                        variant="contained"
                        onClick={() => onApply(job)}
                    >
                        Ứng tuyển
                    </Button>
                </Stack>
            </CardContent>
        </Card>
    );
};

export default JobItem;
