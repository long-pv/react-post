import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Stack,
    Container,
    IconButton,
    Drawer,
    Box,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

const menuItems = [
    { label: 'Trang chủ', path: '/' },
    { label: 'Blog', path: '/blog' },
    { label: 'Khóa học', path: '/courses' },
    { label: 'Việc làm', path: '/jobs' },
    { label: 'Profile', path: '/profile' },
];

const Header = () => {
    const location = useLocation();
    const [open, setOpen] = useState(false);

    return (
        <>
            <AppBar position="sticky" color="default" elevation={0}>
                <Container maxWidth="lg">
                    <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
                        {/* Logo */}
                        <Typography
                            variant="h6"
                            component={Link}
                            to="/"
                            sx={{
                                textDecoration: 'none',
                                color: 'inherit',
                                fontWeight: 700,
                            }}
                        >
                            WP Dev Hub
                        </Typography>

                        {/* Desktop menu */}
                        <Stack
                            direction="row"
                            spacing={2}
                            sx={{ display: { xs: 'none', md: 'flex' } }}
                        >
                            {menuItems.map((item) => (
                                <Button
                                    key={item.path}
                                    component={Link}
                                    to={item.path}
                                    color={
                                        location.pathname === item.path ? 'primary' : 'inherit'
                                    }
                                >
                                    {item.label}
                                </Button>
                            ))}
                        </Stack>

                        {/* Mobile menu icon */}
                        <IconButton
                            sx={{ display: { xs: 'flex', md: 'none' } }}
                            onClick={() => setOpen(true)}
                        >
                            <MenuIcon />
                        </IconButton>
                    </Toolbar>
                </Container>
            </AppBar>

            {/* Mobile Drawer */}
            <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
                <Box sx={{ width: 250, p: 2 }}>
                    <Stack spacing={1}>
                        {menuItems.map((item) => (
                            <Button
                                key={item.path}
                                component={Link}
                                to={item.path}
                                onClick={() => setOpen(false)}
                                sx={{ justifyContent: 'flex-start' }}
                            >
                                {item.label}
                            </Button>
                        ))}
                    </Stack>
                </Box>
            </Drawer>
        </>
    );
};

export default Header;
