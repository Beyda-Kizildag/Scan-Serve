import React, { useState, useEffect } from 'react';
import {
    Box,
    Container,
    Typography,
    Paper,
    Grid,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    TextField,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Card,
    CardContent,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    useTheme,
    useMediaQuery
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { tr } from 'date-fns/locale';
import axios from 'axios';
import { format } from 'date-fns';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PeopleIcon from '@mui/icons-material/People';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import ReceiptIcon from '@mui/icons-material/Receipt';

const WaiterPerformancePage = () => {
    const [waiters, setWaiters] = useState([]);
    const [selectedWaiter, setSelectedWaiter] = useState('');
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [performanceData, setPerformanceData] = useState(null);
    const [approvedOrders, setApprovedOrders] = useState([]);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    useEffect(() => {
        fetchWaiters();
        fetchApprovedOrders();
    }, []);

    useEffect(() => {
        if (selectedWaiter) {
            fetchWaiterPerformance();
        }
    }, [selectedWaiter, selectedDate]);

    useEffect(() => {
        fetchApprovedOrders();
    }, [selectedDate]);

    const fetchWaiters = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/waiter-performance/waiters');
            setWaiters(response.data);
        } catch (error) {
            console.error('Garsonlar yüklenirken hata oluştu:', error);
        }
    };

    const fetchWaiterPerformance = async () => {
        try {
            const formattedDate = format(selectedDate, 'yyyy-MM-dd');
            const response = await axios.get(`http://localhost:8080/api/waiter-performance/${selectedWaiter}?date=${formattedDate}`);
            setPerformanceData(response.data);
        } catch (error) {
            console.error('Performans verisi yüklenirken hata oluştu:', error);
            setPerformanceData(null);
        }
    };

    const fetchApprovedOrders = async () => {
        try {
            const formattedDate = format(selectedDate, 'yyyy-MM-dd');
            const response = await axios.get(`http://localhost:8080/api/waiter-performance/approved-orders?date=${formattedDate}`);
            setApprovedOrders(response.data.waiters || []);
        } catch (error) {
            console.error('Onaylanan siparişler yüklenirken hata oluştu:', error);
            setApprovedOrders([]);
        }
    };

    const handleDateChange = (newDate) => {
        setSelectedDate(newDate);
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={tr}>
            <Box sx={{
                minHeight: '100vh',
                background: 'linear-gradient(135deg, #f9f9f9 0%, #f0f0f0 100%)',
                py: { xs: 2, md: 4 }
            }}>
                <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
                    <Typography
                        variant="h4"
                        gutterBottom
                        sx={{
                            color: '#333333',
                            fontWeight: 'bold',
                            mb: { xs: 2, md: 4 },
                            textAlign: 'center',
                            fontSize: { xs: '1.5rem', md: '2rem' }
                        }}
                    >
                        Garson Performans Takibi
                    </Typography>

                    {/* Filtreler */}
                    <Paper sx={{
                        p: { xs: 2, sm: 3 },
                        mb: 4,
                        borderRadius: 4,
                        background: 'rgba(255, 255, 255, 0.95)',
                        boxShadow: '0 8px 32px rgba(0,0,0,0.08)'
                    }}>
                        <Typography variant="h6" gutterBottom sx={{ color: '#333333', mb: { xs: 2, sm: 3 }, fontSize: { xs: '1.1rem', sm: '1.25rem' } }}>
                            Filtreler
                        </Typography>
                        <Grid container spacing={{ xs: 2, sm: 3 }}>
                            <Grid item xs={12} md={9}>
                                <FormControl fullWidth size={isMobile ? 'small' : 'medium'}>
                                    <InputLabel>Garson Seçin</InputLabel>
                                    <Select
                                        value={selectedWaiter}
                                        onChange={(e) => setSelectedWaiter(e.target.value)}
                                        label="Garson Seçin"
                                    >
                                        {waiters.map((waiter) => (
                                            <MenuItem key={waiter.id} value={waiter.id}>
                                                {waiter.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <DatePicker
                                    label="Tarih Seçin"
                                    value={selectedDate}
                                    onChange={handleDateChange}
                                    slotProps={{ textField: { fullWidth: true, size: isMobile ? 'small' : 'medium' } }}
                                />
                            </Grid>
                        </Grid>
                    </Paper>

                    {/* Seçili Garsonun Performans İstatistikleri */}
                    {selectedWaiter && performanceData && (
                        <Paper sx={{
                            p: { xs: 2, sm: 3 },
                            mb: 4,
                            borderRadius: 4,
                            background: 'rgba(255, 255, 255, 0.95)',
                            boxShadow: '0 8px 32px rgba(0,0,0,0.08)'
                        }}>
                            <Typography variant="h6" gutterBottom sx={{ color: '#333333', mb: { xs: 2, sm: 3 }, fontSize: { xs: '1.1rem', sm: '1.25rem' } }}>
                                {performanceData.waiterName} - Performans İstatistikleri
                            </Typography>
                            <Grid container spacing={{ xs: 2, sm: 3 }}>
                                <Grid item xs={12} sm={4}>
                                    <Card elevation={0} sx={{ background: 'rgba(255, 192, 203, 0.4)', borderRadius: 2, p: 2, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                        <ReceiptIcon sx={{ fontSize: 40, color: '#d81b60', mb: 1 }} />
                                        <Typography color="textSecondary" align="center" sx={{ fontSize: isMobile ? '0.8rem' : '0.9rem' }}>
                                            Toplam Sipariş
                                        </Typography>
                                        <Typography variant="h6" align="center" sx={{ fontWeight: 'bold', color: '#333', fontSize: isMobile ? '1.2rem' : '1.5rem' }}>
                                            {performanceData.totalOrders}
                                        </Typography>
                                    </Card>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <Card elevation={0} sx={{ background: 'rgba(173, 216, 230, 0.4)', borderRadius: 2, p: 2, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                        <MonetizationOnIcon sx={{ fontSize: 40, color: '#2196f3', mb: 1 }} />
                                        <Typography color="textSecondary" align="center" sx={{ fontSize: isMobile ? '0.8rem' : '0.9rem' }}>
                                            Toplam Gelir
                                        </Typography>
                                        <Typography variant="h6" align="center" sx={{ fontWeight: 'bold', color: '#333', fontSize: isMobile ? '1.2rem' : '1.5rem' }}>
                                            ₺{performanceData.totalRevenue.toFixed(2)}
                                        </Typography>
                                    </Card>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <Card elevation={0} sx={{ background: 'rgba(255, 228, 196, 0.4)', borderRadius: 2, p: 2, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                        <MonetizationOnIcon sx={{ fontSize: 40, color: '#ff9800', mb: 1 }} />
                                        <Typography color="textSecondary" align="center" sx={{ fontSize: isMobile ? '0.8rem' : '0.9rem' }}>
                                            Ortalama Sipariş Tutarı
                                        </Typography>
                                        <Typography variant="h6" align="center" sx={{ fontWeight: 'bold', color: '#333', fontSize: isMobile ? '1.2rem' : '1.5rem' }}>
                                            ₺{performanceData.averageOrderValue.toFixed(2)}
                                        </Typography>
                                    </Card>
                                </Grid>
                            </Grid>
                        </Paper>
                    )}

                    {/* Onaylanan Siparişler */}
                    <Paper sx={{ p: { xs: 2, sm: 3 }, mb: 3, borderRadius: 4, background: 'rgba(255, 255, 255, 0.95)', boxShadow: '0 8px 32px rgba(0,0,0,0.08)', overflow: 'hidden' }}>
                        <Typography variant="h6" gutterBottom sx={{ color: '#333333', mb: { xs: 2, sm: 3 }, fontSize: { xs: '1.1rem', sm: '1.25rem' } }}>
                            Garsonların Onayladığı Siparişler
                        </Typography>
                        {approvedOrders.length === 0 ? (
                            <Typography variant="body1" color="textSecondary" align="center">
                                Seçili tarihte onaylanmış sipariş bulunmamaktadır.
                            </Typography>
                        ) : (
                            approvedOrders.map((waiter) => (
                                <Accordion key={waiter.waiterId} sx={{ mb: 2, borderRadius: 2, overflow: 'hidden' }}>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        sx={{
                                            background: 'rgba(0, 0, 0, 0.03)',
                                            '&:hover': { background: 'rgba(0, 0, 0, 0.05)' }
                                        }}
                                    >
                                        <Typography variant="subtitle1" sx={{ fontWeight: 'medium', color: '#333' }}>
                                            {waiter.waiterName} - Toplam Sipariş: {waiter.totalOrders} - 
                                            Toplam Gelir: ₺{waiter.totalRevenue.toFixed(2)}
                                        </Typography>
                                    </AccordionSummary>
                                    <AccordionDetails sx={{ p: { xs: 1, sm: 2 }, backgroundColor: '#fefefe' }}>
                                        <TableContainer component={Paper} elevation={0} sx={{ borderRadius: 2, overflowX: 'auto' }}>
                                            <Table size={isMobile ? 'small' : 'medium'}>
                                                <TableHead sx={{ background: '#e0e0e0' }}>
                                                    <TableRow>
                                                        <TableCell sx={{ fontWeight: 'bold', color: '#333', fontSize: { xs: '0.8rem', sm: '0.9rem' } }}>Sipariş Zamanı</TableCell>
                                                        <TableCell sx={{ fontWeight: 'bold', color: '#333', fontSize: { xs: '0.8rem', sm: '0.9rem' } }}>Ürün</TableCell>
                                                        <TableCell sx={{ fontWeight: 'bold', color: '#333', fontSize: { xs: '0.8rem', sm: '0.9rem' } }}>Adet</TableCell>
                                                        <TableCell sx={{ fontWeight: 'bold', color: '#333', fontSize: { xs: '0.8rem', sm: '0.9rem' } }}>Fiyat</TableCell>
                                                        <TableCell sx={{ fontWeight: 'bold', color: '#333', fontSize: { xs: '0.8rem', sm: '0.9rem' } }}>Toplam</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {waiter.performances && waiter.performances.map((performance, index) => (
                                                        performance.orderItems && performance.orderItems.map((item, itemIndex) => (
                                                            <TableRow key={`${index}-${itemIndex}`} sx={{ '&:nth-of-type(odd)': { backgroundColor: '#f9f9f9' } }}>
                                                                <TableCell sx={{ fontSize: { xs: '0.8rem', sm: '0.9rem' } }}>{format(new Date(performance.date), 'dd/MM/yyyy HH:mm')}</TableCell>
                                                                <TableCell sx={{ fontSize: { xs: '0.8rem', sm: '0.9rem' } }}>{item.itemName}</TableCell>
                                                                <TableCell sx={{ fontSize: { xs: '0.8rem', sm: '0.9rem' } }}>{item.quantity}</TableCell>
                                                                <TableCell sx={{ fontSize: { xs: '0.8rem', sm: '0.9rem' } }}>₺{item.price.toFixed(2)}</TableCell>
                                                                <TableCell sx={{ fontWeight: 'medium', fontSize: { xs: '0.8rem', sm: '0.9rem' } }}>₺{(item.price * item.quantity).toFixed(2)}</TableCell>
                                                            </TableRow>
                                                        ))
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </AccordionDetails>
                                </Accordion>
                            ))
                        )}
                    </Paper>
                </Container>
            </Box>
        </LocalizationProvider>
    );
};

export default WaiterPerformancePage; 