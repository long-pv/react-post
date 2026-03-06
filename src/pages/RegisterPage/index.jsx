import { useState } from 'react';
import { Alert, Box, Button, Container, Paper, Stack, TextField, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../features/auth/authSlice';
import { validateEmail, validatePassword } from '../../utils/validation';

const RegisterPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { status, error } = useSelector((state) => state.auth);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
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

        if (formData.name.trim().length < 2) {
            setFormError('Tên phải có ít nhất 2 ký tự');
            return;
        }

        if (!validateEmail(formData.email)) {
            setFormError('Email không hợp lệ');
            return;
        }

        if (!validatePassword(formData.password)) {
            setFormError('Mật khẩu tối thiểu 6 ký tự');
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setFormError('Xác nhận mật khẩu chưa khớp');
            return;
        }

        const payload = {
            name: formData.name,
            email: formData.email,
            password: formData.password,
        };

        const resultAction = await dispatch(register(payload));

        if (register.fulfilled.match(resultAction)) {
            navigate('/');
        }
    };

    return (
        <Container maxWidth="sm" sx={{ py: 8 }}>
            <Paper elevation={2} sx={{ p: 4 }}>
                <Typography variant="h4" mb={1}>
                    Đăng ký
                </Typography>
                <Typography variant="body2" color="text.secondary" mb={3}>
                    Tạo tài khoản để bắt đầu sử dụng ứng dụng.
                </Typography>

                <Box component="form" onSubmit={handleSubmit}>
                    <Stack spacing={2}>
                        {(formError || error) && <Alert severity="error">{formError || error}</Alert>}

                        <TextField
                            name="name"
                            label="Họ và tên"
                            value={formData.name}
                            onChange={handleChange}
                            fullWidth
                            required
                        />
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
                        <TextField
                            name="confirmPassword"
                            type="password"
                            label="Xác nhận mật khẩu"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            fullWidth
                            required
                        />

                        <Button type="submit" variant="contained" disabled={status === 'loading'}>
                            {status === 'loading' ? 'Đang đăng ký...' : 'Đăng ký'}
                        </Button>

                        <Typography variant="body2">
                            Đã có tài khoản? <Link to="/login">Đăng nhập</Link>
                        </Typography>
                    </Stack>
                </Box>
            </Paper>
        </Container>
    );
};

export default RegisterPage;
