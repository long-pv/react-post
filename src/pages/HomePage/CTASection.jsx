import { Box, Typography, Button, Stack } from '@mui/material';

const CTASection = () => {
    return (
        <Box
            sx={{
                p: { xs: 4, md: 6 },
                borderRadius: 2,
                bgcolor: 'primary.main',
                color: '#fff',
                textAlign: 'center',
            }}
        >
            <Stack spacing={2} alignItems="center">
                <Typography variant="h4" fontWeight={700}>
                    Bạn là WordPress Developer?
                </Typography>

                <Typography>
                    Tham gia cộng đồng – học – làm – kết nối cùng anh em WP.
                </Typography>

                <Button
                    variant="outlined"
                    sx={{
                        color: '#fff',
                        borderColor: '#fff',
                        '&:hover': {
                            borderColor: '#fff',
                            backgroundColor: 'rgba(255,255,255,0.08)',
                        },
                    }}
                >
                    Tham gia ngay
                </Button>
            </Stack>
        </Box>
    );
};

export default CTASection;
