import { Box, Button, Divider, Drawer, IconButton, Stack, TextField, Typography } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { formatCurrency } from '../../utils/formatCurrency';

const CartDrawer = ({ open, items, onClose, onRemove, onUpdateQuantity, onClear }) => {
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <Drawer anchor="right" open={open} onClose={onClose}>
            <Box sx={{ width: 360, p: 2 }}>
                <Typography variant="h6" mb={2}>
                    Giỏ hàng ({items.length})
                </Typography>

                <Stack spacing={2}>
                    {items.map((item) => (
                        <Box key={item.id} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 1, p: 1.5 }}>
                            <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={1}>
                                <Typography variant="subtitle2" sx={{ flexGrow: 1 }}>
                                    {item.title}
                                </Typography>
                                <IconButton size="small" onClick={() => onRemove(item.id)}>
                                    <DeleteOutlineIcon fontSize="small" />
                                </IconButton>
                            </Stack>

                            <Stack direction="row" spacing={1} alignItems="center" mt={1}>
                                <TextField
                                    size="small"
                                    type="number"
                                    value={item.quantity}
                                    inputProps={{ min: 1 }}
                                    onChange={(event) => onUpdateQuantity(item.id, Number(event.target.value))}
                                    sx={{ width: 90 }}
                                />
                                <Typography variant="body2">{formatCurrency(item.price * item.quantity)}</Typography>
                            </Stack>
                        </Box>
                    ))}
                </Stack>

                <Divider sx={{ my: 2 }} />
                <Typography variant="subtitle1" fontWeight={700} mb={2}>
                    Tổng cộng: {formatCurrency(total)}
                </Typography>

                <Stack spacing={1}>
                    <Button variant="outlined" color="error" onClick={onClear} disabled={items.length === 0}>
                        Xóa giỏ hàng
                    </Button>
                    <Button variant="contained" disabled={items.length === 0}>
                        Thanh toán (demo)
                    </Button>
                </Stack>
            </Box>
        </Drawer>
    );
};

export default CartDrawer;
