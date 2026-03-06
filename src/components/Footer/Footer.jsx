import { Box, Container, Typography } from '@mui/material';

const Footer = () => {
    return (
        <Box
            component="footer"
            sx={{
                borderTop: '1px solid',
                borderColor: 'divider',
                mt: 8,
                py: 3,
            }}
        >
            <Container maxWidth="lg">
                <Typography variant="body2" color="text.secondary">
                    © {new Date().getFullYear()} API App.
                </Typography>
            </Container>
        </Box>
    );
};

export default Footer;
