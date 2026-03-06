import { Button, Card, CardActions, CardContent, CardMedia, Stack, Typography } from '@mui/material';
import { formatCurrency } from '../../utils/formatCurrency';

const ProductCard = ({ product, onAddToCart }) => {
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
            <CardActions>
                <Button variant="contained" fullWidth onClick={() => onAddToCart(product)}>
                    Thêm vào giỏ
                </Button>
            </CardActions>
        </Card>
    );
};

export default ProductCard;
