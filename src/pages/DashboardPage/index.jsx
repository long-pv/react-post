import { useEffect, useState } from 'react';
import { Alert, Box, Card, CardContent, CircularProgress, Container, Stack, Typography } from '@mui/material';
import { fetchDashboardData } from '../../features/dashboard/dashboardApi';

const DashboardPage = () => {
    const [sections, setSections] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            const response = await fetchDashboardData();
            setSections(response);
            setLoading(false);
        };

        loadData();
    }, []);

    if (loading) {
        return (
            <Container maxWidth="lg" sx={{ py: 8 }}>
                <Stack alignItems="center" spacing={2}>
                    <CircularProgress />
                    <Typography>Đang tải dữ liệu từ API...</Typography>
                </Stack>
            </Container>
        );
    }

    return (
        <Container maxWidth="lg" sx={{ py: 6 }}>
            <Typography variant="h4" mb={1}>
                API Dashboard
            </Typography>
            <Typography color="text.secondary" mb={4}>
                Dữ liệu được lấy trực tiếp từ API cấu hình trong biến môi trường.
            </Typography>

            <Stack spacing={3}>
                {sections.map((section) => (
                    <Card key={section.key} variant="outlined">
                        <CardContent>
                            <Typography variant="h6" mb={1}>
                                {section.label}
                            </Typography>

                            {section.error ? (
                                <Alert severity="warning">{section.error}</Alert>
                            ) : (
                                <>
                                    <Typography variant="body2" color="text.secondary" mb={2}>
                                        Tổng bản ghi: {section.items.length}
                                    </Typography>
                                    <Stack spacing={1}>
                                        {section.items.slice(0, 5).map((item, index) => (
                                            <Box key={item.id || `${section.key}-${index}`} sx={{ p: 1, borderRadius: 1, bgcolor: 'grey.100' }}>
                                                <Typography variant="body2" sx={{ wordBreak: 'break-word' }}>
                                                    {item.title?.rendered || item.title || item.name || item.email || JSON.stringify(item)}
                                                </Typography>
                                            </Box>
                                        ))}
                                    </Stack>
                                </>
                            )}
                        </CardContent>
                    </Card>
                ))}
            </Stack>
        </Container>
    );
};

export default DashboardPage;
