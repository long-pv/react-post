import { useEffect, useMemo, useState } from 'react';
import { Alert, Badge, Button, CircularProgress, Container, Grid, Stack, Typography } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CloudSyncIcon from '@mui/icons-material/CloudSync';
import { useDispatch, useSelector } from 'react-redux';
import ProductCard from '../../components/Products/ProductCard';
import CartDrawer from '../../components/Cart/CartDrawer';
import { fetchProducts } from '../../features/products/productsSlice';
import {
    addToCart,
    clearCart,
    clearSyncMessage,
    fetchMyCarts,
    removeFromCart,
    syncCart,
    updateCartQuantity,
} from '../../features/cart/cartSlice';

const ProductsPage = () => {
    const dispatch = useDispatch();
    const [cartOpen, setCartOpen] = useState(false);

    const { items: products, status, error } = useSelector((state) => state.products);
    const { items: cartItems, syncStatus, syncMessage, serverCarts, error: cartError } = useSelector((state) => state.cart);
    const { user, token } = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    useEffect(() => {
        if (token && user?.id) {
            dispatch(fetchMyCarts(user.id));
        }
    }, [dispatch, token, user?.id]);

    const cartCount = useMemo(() => cartItems.reduce((sum, item) => sum + item.quantity, 0), [cartItems]);

    return (
        <Container maxWidth="lg" sx={{ py: 6 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3} flexWrap="wrap" gap={1}>
                <div>
                    <Typography variant="h4">Danh sách sản phẩm</Typography>
                    <Typography variant="body2" color="text.secondary">
                        GET /ecommerce/api/products
                    </Typography>
                </div>

                <Stack direction="row" spacing={1}>
                    <Button
                        variant="outlined"
                        startIcon={<CloudSyncIcon />}
                        onClick={() => dispatch(syncCart())}
                        disabled={syncStatus === 'loading'}
                    >
                        {syncStatus === 'loading' ? 'Đang sync...' : 'Sync cart API'}
                    </Button>
                    <Button
                        variant="outlined"
                        startIcon={
                            <Badge badgeContent={cartCount} color="primary">
                                <ShoppingCartIcon />
                            </Badge>
                        }
                        onClick={() => setCartOpen(true)}
                    >
                        Giỏ hàng
                    </Button>
                </Stack>
            </Stack>

            {syncMessage && (
                <Alert severity="success" sx={{ mb: 2 }} onClose={() => dispatch(clearSyncMessage())}>
                    {syncMessage}
                </Alert>
            )}

            {cartError && (
                <Alert severity="warning" sx={{ mb: 2 }} onClose={() => dispatch(clearSyncMessage())}>
                    {cartError}
                </Alert>
            )}

            <Alert severity="info" sx={{ mb: 2 }}>
                Server carts hiện có: {serverCarts.length} (endpoint: /ecommerce/api/carts)
            </Alert>

            {status === 'loading' && (
                <Stack alignItems="center" py={8}>
                    <CircularProgress />
                </Stack>
            )}

            {status === 'failed' && <Alert severity="error">Không thể tải sản phẩm: {error}</Alert>}

            {status === 'succeeded' && products.length === 0 && (
                <Alert severity="warning">API trả về rỗng hoặc endpoint chưa đúng. Kiểm tra lại endpoint products.</Alert>
            )}

            <Grid container spacing={2}>
                {products.map((product) => (
                    <Grid item xs={12} sm={6} md={4} key={product.id || `${product.title}-${product.name}`}>
                        <ProductCard product={product} onAddToCart={(item) => dispatch(addToCart(item))} />
                    </Grid>
                ))}
            </Grid>

            <CartDrawer
                open={cartOpen}
                items={cartItems}
                onClose={() => setCartOpen(false)}
                onRemove={(id) => dispatch(removeFromCart(id))}
                onUpdateQuantity={(id, quantity) => dispatch(updateCartQuantity({ id, quantity }))}
                onClear={() => dispatch(clearCart())}
            />
        </Container>
    );
};

export default ProductsPage;
