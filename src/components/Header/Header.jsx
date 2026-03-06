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
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../features/auth/authSlice';

const menuItems = [
    { label: 'Trang chủ', path: '/' },
    { label: 'Blog', path: '/blog' },
    { label: 'Khóa học', path: '/courses' },
    { label: 'Việc làm', path: '/jobs' },
];

const Header = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);

    const token = useSelector((state) => state.auth.token);
    const user = useSelector((state) => state.auth.user);

    const handleLogout = async () => {
        await dispatch(logout());
        navigate('/login');
    };

    return (
        <>
            <AppBar position="sticky" color="default" elevation={0}>
                <Container maxWidth="lg">
                    <Toolbar disableGutters sx={{ justifyContent: 'space-between', gap: 2 }}>
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

                        <Stack
                            direction="row"
                            spacing={2}
                            sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}
                        >
                            {menuItems.map((item) => (
                                <Button
                                    key={item.path}
                                    component={Link}
                                    to={item.path}
                                    color={location.pathname === item.path ? 'primary' : 'inherit'}
                                >
                                    {item.label}
                                </Button>
                            ))}

                            {token ? (
                                <>
                                    <Typography variant="body2" color="text.secondary">
                                        Xin chào, {user?.name || user?.email || 'bạn'}
                                    </Typography>
                                    <Button variant="outlined" onClick={handleLogout}>
                                        Đăng xuất
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <Button component={Link} to="/login">
                                        Đăng nhập
                                    </Button>
                                    <Button variant="contained" component={Link} to="/register">
                                        Đăng ký
                                    </Button>
                                </>
                            )}
                        </Stack>

                        <IconButton
                            sx={{ display: { xs: 'flex', md: 'none' } }}
                            onClick={() => setOpen(true)}
                        >
                            <MenuIcon />
                        </IconButton>
                    </Toolbar>
                </Container>
            </AppBar>

            <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
                <Box sx={{ width: 260, p: 2 }}>
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

                        {token ? (
                            <Button
                                onClick={() => {
                                    setOpen(false);
                                    handleLogout();
                                }}
                                sx={{ justifyContent: 'flex-start' }}
                            >
                                Đăng xuất
                            </Button>
                        ) : (
                            <>
                                <Button
                                    component={Link}
                                    to="/login"
                                    onClick={() => setOpen(false)}
                                    sx={{ justifyContent: 'flex-start' }}
                                >
                                    Đăng nhập
                                </Button>
                                <Button
                                    component={Link}
                                    to="/register"
                                    onClick={() => setOpen(false)}
                                    sx={{ justifyContent: 'flex-start' }}
                                >
                                    Đăng ký
                                </Button>
                            </>
                        )}
                    </Stack>
                </Box>
            </Drawer>
        </>
    );
};

export default Header;
