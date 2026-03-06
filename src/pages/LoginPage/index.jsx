import { Alert, Box, Button, Container, Paper, Stack, TextField, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { login } from '../../features/auth/authSlice';
import { createYupResolver } from '../../utils/yupResolver';

const loginSchema = yup.object({
    email: yup.string().trim().required('Vui lòng nhập email').email('Email không hợp lệ'),
    password: yup.string().required('Vui lòng nhập mật khẩu').min(6, 'Mật khẩu tối thiểu 6 ký tự'),
});

const LoginPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { status, error } = useSelector((state) => state.auth);

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            email: '',
            password: '',
        },
        resolver: createYupResolver(loginSchema),
    });

    const onSubmit = async (values) => {
        const resultAction = await dispatch(login(values));

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

                <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                    <Stack spacing={2}>
                        {error && <Alert severity="error">{error}</Alert>}

                        <Controller
                            name="email"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    type="email"
                                    label="Email"
                                    fullWidth
                                    required
                                    error={Boolean(errors.email)}
                                    helperText={errors.email?.message}
                                />
                            )}
                        />

                        <Controller
                            name="password"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    type="password"
                                    label="Mật khẩu"
                                    fullWidth
                                    required
                                    error={Boolean(errors.password)}
                                    helperText={errors.password?.message}
                                />
                            )}
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
