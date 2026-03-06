import { useEffect, useMemo, useState } from 'react';
import {
    Alert,
    Badge,
    Button,
    Chip,
    CircularProgress,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CloudSyncIcon from '@mui/icons-material/CloudSync';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch, useSelector } from 'react-redux';
import ProductCard from '../../components/Products/ProductCard';
import CartDrawer from '../../components/Cart/CartDrawer';
import Pagination from '../../components/Common/Pagination';
import {
    addCustomCategory,
    createProduct,
    deleteProduct,
    fetchProductCategories,
    fetchProducts,
    removeCustomCategory,
    updateProduct,
} from '../../features/products/productsSlice';
import {
    addToCart,
    clearCart,
    clearSyncMessage,
    fetchMyCarts,
    removeFromCart,
    syncCart,
    updateCartQuantity,
} from '../../features/cart/cartSlice';

const initialFormValues = {
    title: '',
    price: '',
    description: '',
    category: '',
};

const ITEMS_PER_PAGE = 5;

const ProductsPage = () => {
    const dispatch = useDispatch();
    const [cartOpen, setCartOpen] = useState(false);
    const [productDialogOpen, setProductDialogOpen] = useState(false);
    const [editingProductId, setEditingProductId] = useState(null);
    const [productForm, setProductForm] = useState(initialFormValues);
    const [productFormError, setProductFormError] = useState('');
    const [newCategory, setNewCategory] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [page, setPage] = useState(1);

    const { items: products, status, error, mutationStatus, mutationError, categories, customCategories } =
        useSelector((state) => state.products);
    const { items: cartItems, syncStatus, syncMessage, serverCarts, error: cartError } = useSelector(
        (state) => state.cart
    );
    const { user, token } = useSelector((state) => state.auth);

    const isAuthenticated = Boolean(token);

    useEffect(() => {
        dispatch(fetchProducts());
        dispatch(fetchProductCategories());
    }, [dispatch]);

    useEffect(() => {
        if (token && user?.id) {
            dispatch(fetchMyCarts(user.id));
        }
    }, [dispatch, token, user?.id]);

    const cartCount = useMemo(
        () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
        [cartItems]
    );

    const mergedCategories = useMemo(() => {
        const fromProducts = products
            .map((item) => item.category)
            .filter(Boolean)
            .map((item) => String(item));

        return [...new Set([...categories.map(String), ...fromProducts, ...customCategories])];
    }, [categories, customCategories, products]);

    const filteredProducts = useMemo(() => {
        if (selectedCategory === 'all') return products;
        return products.filter((item) => String(item.category || '') === selectedCategory);
    }, [products, selectedCategory]);

    const totalPages = Math.max(1, Math.ceil(filteredProducts.length / ITEMS_PER_PAGE));

    useEffect(() => {
        if (page > totalPages) {
            setPage(totalPages);
        }
    }, [page, totalPages]);

    const paginatedProducts = useMemo(() => {
        const start = (page - 1) * ITEMS_PER_PAGE;
        return filteredProducts.slice(start, start + ITEMS_PER_PAGE);
    }, [filteredProducts, page]);

    const openAddDialog = () => {
        setEditingProductId(null);
        setProductForm(initialFormValues);
        setProductFormError('');
        setProductDialogOpen(true);
    };

    const openEditDialog = (product) => {
        setEditingProductId(product.id);
        setProductForm({
            title: product.title || product.name || '',
            price: String(product.price || product.cost || ''),
            description: product.description || '',
            category: product.category || '',
        });
        setProductFormError('');
        setProductDialogOpen(true);
    };

    const closeDialog = () => {
        setProductDialogOpen(false);
    };

    const handleProductFormChange = (event) => {
        const { name, value } = event.target;
        setProductForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmitProduct = async (event) => {
        event.preventDefault();
        setProductFormError('');

        if (!productForm.title || !productForm.price) {
            setProductFormError('Vui lòng nhập title và price');
            return;
        }

        const payload = {
            title: productForm.title,
            price: Number(productForm.price),
            description: productForm.description,
            category: productForm.category,
        };

        const resultAction = editingProductId
            ? await dispatch(updateProduct({ productId: editingProductId, payload }))
            : await dispatch(createProduct(payload));

        if (createProduct.fulfilled.match(resultAction) || updateProduct.fulfilled.match(resultAction)) {
            setProductDialogOpen(false);
            setEditingProductId(null);
            setProductForm(initialFormValues);
            dispatch(fetchProducts());
        }
    };

    const handleDeleteProduct = async (productId) => {
        await dispatch(deleteProduct(productId));
        dispatch(fetchProducts());
    };

    const handleAddCategory = () => {
        const value = newCategory.trim();
        if (!value) return;
        dispatch(addCustomCategory(value));
        setNewCategory('');
    };

    const handleDeleteCategory = (category) => {
        dispatch(removeCustomCategory(category));
        if (selectedCategory === category) {
            setSelectedCategory('all');
            setPage(1);
        }
    };

    return (
        <Container maxWidth="lg" sx={{ py: 6 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3} flexWrap="wrap" gap={1}>
                <div>
                    <Typography variant="h4">Danh sách sản phẩm</Typography>
                    <Typography variant="body2" color="text.secondary">
                        GET /ecommerce/api/products • Hiển thị 5 sản phẩm / trang
                    </Typography>
                </div>

                <Stack direction="row" spacing={1}>
                    {isAuthenticated && (
                        <Button variant="contained" startIcon={<AddIcon />} onClick={openAddDialog}>
                            Thêm sản phẩm
                        </Button>
                    )}
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

            <Stack spacing={1} mb={2}>
                <Typography variant="subtitle1">Danh mục sản phẩm</Typography>
                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                    <Chip
                        label="Tất cả"
                        color={selectedCategory === 'all' ? 'primary' : 'default'}
                        onClick={() => {
                            setSelectedCategory('all');
                            setPage(1);
                        }}
                    />
                    {mergedCategories.map((category) => (
                        <Chip
                            key={category}
                            label={category}
                            color={selectedCategory === category ? 'primary' : 'default'}
                            onClick={() => {
                                setSelectedCategory(category);
                                setPage(1);
                            }}
                            onDelete={isAuthenticated ? () => handleDeleteCategory(category) : undefined}
                        />
                    ))}
                </Stack>

                {isAuthenticated && (
                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
                        <TextField
                            size="small"
                            label="Thêm danh mục mới"
                            value={newCategory}
                            onChange={(event) => setNewCategory(event.target.value)}
                        />
                        <Button variant="outlined" onClick={handleAddCategory}>
                            Thêm danh mục
                        </Button>
                    </Stack>
                )}
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

            {mutationError && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {mutationError}
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

            {status === 'succeeded' && filteredProducts.length === 0 && (
                <Alert severity="warning">
                    Không có sản phẩm phù hợp danh mục đang chọn hoặc API trả về rỗng.
                </Alert>
            )}

            <Grid container spacing={2}>
                {paginatedProducts.map((product) => (
                    <Grid item xs={12} md={6} key={product.id || `${product.title}-${product.name}`}>
                        <ProductCard
                            product={product}
                            onAddToCart={(item) => dispatch(addToCart(item))}
                            canManage={isAuthenticated}
                            onEdit={openEditDialog}
                            onDelete={handleDeleteProduct}
                        />
                    </Grid>
                ))}
            </Grid>

            <Stack mt={3}>
                <Pagination page={page} totalPages={totalPages} onChange={setPage} />
            </Stack>

            <CartDrawer
                open={cartOpen}
                items={cartItems}
                onClose={() => setCartOpen(false)}
                onRemove={(id) => dispatch(removeFromCart(id))}
                onUpdateQuantity={(id, quantity) => dispatch(updateCartQuantity({ id, quantity }))}
                onClear={() => dispatch(clearCart())}
            />

            <Dialog open={productDialogOpen} onClose={closeDialog} maxWidth="sm" fullWidth>
                <DialogTitle>{editingProductId ? 'Chỉnh sửa sản phẩm' : 'Thêm sản phẩm'}</DialogTitle>
                <DialogContent>
                    <Stack spacing={2} mt={1} component="form" onSubmit={handleSubmitProduct}>
                        {productFormError && <Alert severity="error">{productFormError}</Alert>}

                        <TextField
                            name="title"
                            label="Title"
                            value={productForm.title}
                            onChange={handleProductFormChange}
                            required
                            fullWidth
                        />
                        <TextField
                            name="price"
                            label="Price"
                            type="number"
                            value={productForm.price}
                            onChange={handleProductFormChange}
                            required
                            fullWidth
                        />
                        <TextField
                            name="description"
                            label="Description"
                            value={productForm.description}
                            onChange={handleProductFormChange}
                            multiline
                            rows={3}
                            fullWidth
                        />
                        <TextField
                            name="category"
                            label="Category"
                            value={productForm.category}
                            onChange={handleProductFormChange}
                            fullWidth
                        />

                        <DialogActions sx={{ px: 0 }}>
                            <Button onClick={closeDialog}>Hủy</Button>
                            <Button type="submit" variant="contained" disabled={mutationStatus === 'loading'}>
                                {mutationStatus === 'loading' ? 'Đang lưu...' : 'Lưu'}
                            </Button>
                        </DialogActions>
                    </Stack>
                </DialogContent>
            </Dialog>
        </Container>
    );
};

export default ProductsPage;
