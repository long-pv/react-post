// src/pages/JobsPage/JobApplyDialog.jsx
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Stack,
} from '@mui/material';

const JobApplyDialog = ({ open, job, onClose }) => {
    if (!job) return null;

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="sm"
            fullWidth
        >
            <DialogTitle>
                Ứng tuyển: {job.title}
            </DialogTitle>

            <DialogContent>
                <Stack spacing={2} mt={1}>
                    <TextField label="Họ tên" fullWidth />
                    <TextField label="Email" fullWidth />
                    <TextField label="Số điện thoại" fullWidth />
                    <TextField
                        label="Giới thiệu ngắn"
                        multiline
                        rows={4}
                        fullWidth
                    />
                </Stack>
            </DialogContent>

            <DialogActions>
                <Button onClick={onClose}>Hủy</Button>
                <Button variant="contained">
                    Gửi ứng tuyển
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default JobApplyDialog;
