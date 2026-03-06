import { useEffect, useMemo, useState } from 'react';
import { Alert, Badge, Button, CircularProgress, Container, Grid, Stack, Typography } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useDispatch, useSelector } from 'react-redux';
import ProductCard from '../../components/Products/ProductCard';
import CartDrawer from '../../components/Cart/CartDrawer';
import { fetchProducts } from '../../features/products/productsSlice';
import { addToCart, clearCart, removeFromCart, updateCartQuantity } from '../../features/cart/cartSlice';

const ProductsPage = () => {
    const dispatch = useDispatch();
    const [cartOpen, setCartOpen] = useState(false);

    const { items: products, status, error } = useSelector((state) => state.products);
    const cartItems = useSelector((state) => state.cart.items);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    const cartCount = useMemo(() => cartItems.reduce((sum, item) => sum + item.quantity, 0), [cartItems]);

    return (
        <Container maxWidth="lg" sx={{ py: 6 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
                <div>
                    <Typography variant="h4">Danh sách sản phẩm</Typography>
                    <Typography variant="body2" color="text.secondary">
                        Nguồn dữ liệu từ Sandbox API
                    </Typography>
                </div>

                <Button variant="outlined" startIcon={<Badge badgeContent={cartCount} color="primary"><ShoppingCartIcon /></Badge>} onClick={() => setCartOpen(true)}>
                    Giỏ hàng
                </Button>
            </Stack>

            {status === 'loading' && (
                <Stack alignItems="center" py={8}>
                    <CircularProgress />
                </Stack>
            )}

            {status === 'failed' && <Alert severity="error">Không thể tải sản phẩm: {error}</Alert>}

            {status === 'succeeded' && products.length === 0 && (
                <Alert severity="warning">API trả về rỗng hoặc endpoint chưa đúng. Bạn kiểm tra `VITE_PRODUCTS_PATH` nhé.</Alert>
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
