import { useState } from 'react';
import { Alert, Box, Button, Container, Paper, Stack, TextField, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../features/auth/authSlice';
import { validateEmail, validatePassword } from '../../utils/validation';

const LoginPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { status, error } = useSelector((state) => state.auth);

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [formError, setFormError] = useState('');

    const handleChange = (event) => {
        setFormData((prev) => ({
            ...prev,
            [event.target.name]: event.target.value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setFormError('');

        if (!validateEmail(formData.email)) {
            setFormError('Email không hợp lệ');
            return;
        }

        if (!validatePassword(formData.password)) {
            setFormError('Mật khẩu tối thiểu 6 ký tự');
            return;
        }

        const resultAction = await dispatch(login(formData));

        if (login.fulfilled.match(resultAction)) {
            navigate('/');
        }
    };

    return (
        <Container maxWidth="sm" sx={{ py: 8 }}>
            <Paper elevation={2} sx={{ p: 4 }}>
                <Typography variant="h4" mb={1}>
                    Đăng nhập
                </Typography>
                <Typography variant="body2" color="text.secondary" mb={3}>
                    Đăng nhập để quản lý tài khoản của bạn.
                </Typography>

                <Box component="form" onSubmit={handleSubmit}>
                    <Stack spacing={2}>
                        {(formError || error) && <Alert severity="error">{formError || error}</Alert>}

                        <TextField
                            name="email"
                            type="email"
                            label="Email"
                            value={formData.email}
                            onChange={handleChange}
                            fullWidth
                            required
                        />
                        <TextField
                            name="password"
                            type="password"
                            label="Mật khẩu"
                            value={formData.password}
                            onChange={handleChange}
                            fullWidth
                            required
                        />

                        <Button type="submit" variant="contained" disabled={status === 'loading'}>
                            {status === 'loading' ? 'Đang đăng nhập...' : 'Đăng nhập'}
                        </Button>

                        <Typography variant="body2">
                            Chưa có tài khoản? <Link to="/register">Đăng ký ngay</Link>
                        </Typography>
                    </Stack>
                </Box>
            </Paper>
        </Container>
    );
};

export default LoginPage;
