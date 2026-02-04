import { Box, Container, Typography, Stack, Link } from '@mui/material';

const Footer = () => {
    return (
        <Box
            component="footer"
            sx={{
                borderTop: '1px solid',
                borderColor: 'divider',
                mt: 8,
                py: 4,
            }}
        >
            <Container maxWidth="lg">
                <Stack
                    direction={{ xs: 'column', md: 'row' }}
                    spacing={2}
                    justifyContent="space-between"
                    alignItems={{ xs: 'flex-start', md: 'center' }}
                >
                    <Typography variant="body2" color="text.secondary">
                        © {new Date().getFullYear()} WP Dev Hub. Built with React & WordPress.
                    </Typography>

                    <Stack direction="row" spacing={2}>
                        <Link href="#" underline="hover" color="inherit">
                            Blog
                        </Link>
                        <Link href="#" underline="hover" color="inherit">
                            Courses
                        </Link>
                        <Link href="#" underline="hover" color="inherit">
                            Jobs
                        </Link>
                    </Stack>
                </Stack>
            </Container>
        </Box>
    );
};

export default Footer;
