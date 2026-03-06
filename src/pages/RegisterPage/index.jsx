import { Alert, Box, Button, Container, Paper, Stack, TextField, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { register } from '../../features/auth/authSlice';
import { createYupResolver } from '../../utils/yupResolver';

const registerSchema = yup.object({
    name: yup
        .string()
        .trim()
        .required('Vui lòng nhập họ và tên')
        .min(2, 'Tên phải có ít nhất 2 ký tự'),
    email: yup.string().trim().required('Vui lòng nhập email').email('Email không hợp lệ'),
    password: yup.string().required('Vui lòng nhập mật khẩu').min(6, 'Mật khẩu tối thiểu 6 ký tự'),
    confirmPassword: yup
        .string()
        .required('Vui lòng xác nhận mật khẩu')
        .oneOf([yup.ref('password')], 'Xác nhận mật khẩu chưa khớp'),
});

const RegisterPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { status, error } = useSelector((state) => state.auth);

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
        resolver: createYupResolver(registerSchema),
    });

    const onSubmit = async (values) => {
        const payload = {
            name: values.name,
            email: values.email,
            password: values.password,
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

                <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                    <Stack spacing={2}>
                        {error && <Alert severity="error">{error}</Alert>}

                        <Controller
                            name="name"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Họ và tên"
                                    fullWidth
                                    required
                                    error={Boolean(errors.name)}
                                    helperText={errors.name?.message}
                                />
                            )}
                        />

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

                        <Controller
                            name="confirmPassword"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    type="password"
                                    label="Xác nhận mật khẩu"
                                    fullWidth
                                    required
                                    error={Boolean(errors.confirmPassword)}
                                    helperText={errors.confirmPassword?.message}
                                />
                            )}
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
