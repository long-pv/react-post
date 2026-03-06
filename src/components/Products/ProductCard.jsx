import { Button, Card, CardActions, CardContent, CardMedia, Stack, Typography } from '@mui/material';
import { formatCurrency } from '../../utils/formatCurrency';

const ProductCard = ({ product, onAddToCart, canManage = false, onEdit, onDelete }) => {
    const title = product.title || product.name || `Product #${product.id}`;
    const description = product.description || 'Không có mô tả';
    const image = product.image || product.thumbnail || 'https://via.placeholder.com/640x360?text=No+Image';
    const price = Number(product.price || product.cost || 0);

    return (
        <Card variant="outlined" sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardMedia component="img" height="180" image={image} alt={title} />
            <CardContent sx={{ flexGrow: 1 }}>
                <Stack spacing={1}>
                    <Typography variant="h6">{title}</Typography>
                    <Typography variant="body2" color="text.secondary">
                        {description}
                    </Typography>
                    <Typography variant="subtitle1" fontWeight={700}>
                        {formatCurrency(price)}
                    </Typography>
                </Stack>
            </CardContent>
            <CardActions sx={{ display: 'flex', flexDirection: 'column', gap: 1, alignItems: 'stretch' }}>
                <Button variant="contained" fullWidth onClick={() => onAddToCart(product)}>
                    Thêm vào giỏ
                </Button>

                {canManage && (
                    <Stack direction="row" spacing={1} width="100%">
                        <Button variant="outlined" fullWidth onClick={() => onEdit(product)}>
                            Chỉnh sửa
                        </Button>
                        <Button color="error" variant="outlined" fullWidth onClick={() => onDelete(product.id)}>
                            Xóa
                        </Button>
                    </Stack>
                )}
            </CardActions>
        </Card>
    );
};

export default ProductCard;
