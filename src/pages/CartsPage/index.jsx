import { useEffect } from 'react';
import { Alert, Box, Button, CircularProgress, Container, Stack, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { deleteServerCart, fetchOwnCarts, syncCart } from '../../features/cart/cartSlice';

const CartsPage = () => {
    const dispatch = useDispatch();
    const { serverCarts, status, syncStatus, error, syncMessage } = useSelector((state) => state.cart);

    useEffect(() => {
        dispatch(fetchOwnCarts());
    }, [dispatch]);

    const handleCreateNewCart = async () => {
        const resultAction = await dispatch(syncCart({ forceCreate: true }));
        if (syncCart.fulfilled.match(resultAction)) {
            dispatch(fetchOwnCarts());
        }
    };

    const handleDeleteCart = async (cartId) => {
        const resultAction = await dispatch(deleteServerCart(cartId));
        if (deleteServerCart.fulfilled.match(resultAction)) {
            dispatch(fetchOwnCarts());
        }
    };

    return (
        <Container maxWidth="lg" sx={{ py: 6 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h4">Cart của tôi</Typography>
                <Button variant="contained" onClick={handleCreateNewCart} disabled={syncStatus === 'loading'}>
                    {syncStatus === 'loading' ? 'Đang tạo...' : 'Thêm cart mới'}
                </Button>
            </Stack>

            <Typography variant="body2" color="text.secondary" mb={2}>
                Chỉ hiển thị cart của user đang đăng nhập.
            </Typography>

            {syncMessage && <Alert severity="success" sx={{ mb: 2 }}>{syncMessage}</Alert>}
            {error && <Alert severity="warning" sx={{ mb: 2 }}>{error}</Alert>}

            {status === 'loading' && (
                <Stack alignItems="center" py={8}>
                    <CircularProgress />
                </Stack>
            )}

            <Stack spacing={1.5}>
                {serverCarts.map((cart) => (
                    <Box key={cart.id} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 1, p: 2 }}>
                        <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" spacing={1}>
                            <Box>
                                <Typography variant="subtitle2">Cart #{cart.id}</Typography>
                                <Typography variant="body2" color="text.secondary">
                                    userId: {cart.userId} • date: {cart.date}
                                </Typography>
                                <Stack mt={1} spacing={0.5}>
                                    {(cart.products || []).map((p) => (
                                        <Typography key={`${cart.id}-${p.productId}`} variant="caption" color="text.secondary">
                                            Product ID: {p.productId} • Qty: {p.quantity}
                                        </Typography>
                                    ))}
                                </Stack>
                            </Box>
                            <Button color="error" variant="outlined" onClick={() => handleDeleteCart(cart.id)}>
                                Xóa cart
                            </Button>
                        </Stack>
                    </Box>
                ))}

                {status === 'succeeded' && serverCarts.length === 0 && (
                    <Alert severity="info">Bạn chưa có cart nào trên server.</Alert>
                )}
            </Stack>
        </Container>
    );
};

export default CartsPage;
