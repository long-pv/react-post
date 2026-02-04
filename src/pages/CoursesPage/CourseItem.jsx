import {
    Card,
    CardMedia,
    CardContent,
    Typography,
    Stack,
    Button,
    Chip,
} from '@mui/material';

const CourseItem = ({ course, onRegister }) => {
    return (
        <Card sx={{ height: '100%' }}>
            <CardMedia
                component="img"
                height="180"
                image={course.thumbnail}
                alt={course.title}
            />

            <CardContent>
                <Stack spacing={1}>
                    <Typography variant="h6" fontWeight={600}>
                        {course.title}
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                        {course.shortDescription}
                    </Typography>

                    <Stack direction="row" spacing={1}>
                        <Chip size="small" label={course.level} />
                        <Chip size="small" label={course.duration} />
                    </Stack>

                    <Typography fontWeight={600} color="primary">
                        {course.price}
                    </Typography>

                    <Button
                        variant="contained"
                        onClick={() => onRegister(course)}
                    >
                        Đăng ký học
                    </Button>
                </Stack>
            </CardContent>
        </Card>
    );
};

export default CourseItem;
