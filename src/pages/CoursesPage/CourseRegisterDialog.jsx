import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Stack,
} from '@mui/material';

const CourseRegisterDialog = ({ open, onClose, course }) => {
    if (!course) return null;

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Đăng ký khóa học: {course.title}</DialogTitle>

            <DialogContent>
                <Stack spacing={2} mt={1}>
                    <TextField label="Họ và tên" fullWidth />
                    <TextField label="Email" fullWidth />
                    <TextField label="Số điện thoại" fullWidth />
                </Stack>
            </DialogContent>

            <DialogActions>
                <Button onClick={onClose}>Hủy</Button>
                <Button variant="contained">Gửi đăng ký</Button>
            </DialogActions>
        </Dialog>
    );
};

export default CourseRegisterDialog;
