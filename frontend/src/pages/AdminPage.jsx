import React from 'react';
import { Grid, Typography, Paper, Box, Button, Container, useTheme, useMediaQuery } from '@mui/material';
import StatsCard from '../components/StatsCard';
import SalesChart from '../components/SalesChart';
import ExpenseTable from '../components/ExpenseTable';
import { useNavigate, Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import AssessmentIcon from '@mui/icons-material/Assessment';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LogoutIcon from '@mui/icons-material/Logout';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const handleLogout = () => {
        localStorage.removeItem("userRole");
        localStorage.removeItem("user");
        navigate("/");
    };

    return (
        <Box sx={{ 
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #f9f9f9 0%, #f0f0f0 100%)',
            py: { xs: 2, md: 4 }
        }}>
            <Container maxWidth="xl" sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
                {/* Üst Bar */}
                <Box sx={{ 
                    display: 'flex', 
                    flexDirection: { xs: 'column', sm: 'row' },
                    alignItems: { xs: 'flex-start', sm: 'center' },
                    justifyContent: 'space-between',
                    mb: 4,
                    p: 2,
                    borderRadius: 2,
                    background: 'rgba(255, 255, 255, 0.9)',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                    gap: { xs: 2, sm: 0 }
                }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Link to="/" style={{ textDecoration: 'none' }}>
                            <HomeIcon sx={{ color: '#333333', fontSize: { xs: 28, sm: 32 } }} />
                        </Link>
                        <Typography
                            variant="h4"
                            sx={{
                                color: '#333333',
                                fontWeight: 'bold',
                                letterSpacing: 1,
                                fontSize: { xs: '1.5rem', sm: '2rem' }
                            }}
                        >
                            Admin Panel
                        </Typography>
                    </Box>
                    <Button
                        variant="contained"
                        startIcon={<PeopleIcon />}
                        onClick={() => navigate('/waiter-performance')}
                        sx={{
                            background: 'linear-gradient(45deg, #60a5fa 30%, #3b82f6 90%)',
                            color: 'white',
                            px: { xs: 2, sm: 3 },
                            py: 1,
                            borderRadius: 2,
                            boxShadow: '0 4px 12px rgba(0,123,255,0.2)',
                            width: { xs: '100%', sm: 'auto' },
                            '&:hover': {
                                background: 'linear-gradient(45deg, #3b82f6 30%, #60a5fa 90%)',
                            }
                        }}
                    >
                        Garson Performansı
                    </Button>
                </Box>

                {/* İstatistik Kartları */}
                <Grid container spacing={{ xs: 2, sm: 2.5, md: 3 }} sx={{ mb: 4 }}>
                    <Grid item xs={12} sm={6} md={3} sx={{ display: 'flex' }}>
                        <StatsCard 
                            title="Bugünkü Ciro" 
                            value="₺1,200" 
                            color="rgba(255, 192, 203, 0.4)"
                            icon={<MonetizationOnIcon sx={{ fontSize: { xs: 28, sm: 32 }, color: '#d81b60' }} />}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3} sx={{ display: 'flex' }}>
                        <StatsCard 
                            title="Aylık Gider" 
                            value="₺3,200" 
                            color="rgba(255, 228, 196, 0.4)"
                            icon={<AssessmentIcon sx={{ fontSize: { xs: 28, sm: 32 }, color: '#ff9800' }} />}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3} sx={{ display: 'flex' }}>
                        <StatsCard 
                            title="Yıllık Kâr" 
                            value="₺15,000" 
                            color="rgba(173, 216, 230, 0.4)"
                            icon={<MonetizationOnIcon sx={{ fontSize: { xs: 28, sm: 32 }, color: '#2196f3' }} />}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3} sx={{ display: 'flex' }}>
                        <StatsCard 
                            title="Bugünün Tarihi" 
                            value={new Date().toLocaleDateString('tr-TR')} 
                            color="rgba(240, 248, 255, 0.4)"
                            icon={<CalendarTodayIcon sx={{ fontSize: { xs: 28, sm: 32 }, color: '#4caf50' }} />}
                        />
                    </Grid>
                </Grid>

                {/* Satış Grafiği */}
                <Paper
                    elevation={3}
                    sx={{
                        p: { xs: 2, sm: 3 },
                        mb: 4,
                        borderRadius: 4,
                        background: 'rgba(255, 255, 255, 0.95)',
                        boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
                        overflow: 'hidden'
                    }}
                >
                    <Typography 
                        variant="h5" 
                        gutterBottom 
                        sx={{ 
                            color: '#333333',
                            fontWeight: 'bold',
                            mb: 3,
                            fontSize: { xs: '1.25rem', sm: '1.5rem' }
                        }}
                    >
                        Satış Grafiği
                    </Typography>
                    <Box sx={{ width: '100%', overflowX: 'auto' }}>
                        <SalesChart />
                    </Box>
                </Paper>

                {/* Gider Tablosu */}
                <Paper
                    elevation={3}
                    sx={{
                        p: { xs: 2, sm: 3 },
                        mb: 4,
                        borderRadius: 4,
                        background: 'rgba(255, 255, 255, 0.95)',
                        boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
                        overflow: 'hidden'
                    }}
                >
                    <Typography 
                        variant="h5" 
                        gutterBottom 
                        sx={{ 
                            color: '#333333',
                            fontWeight: 'bold',
                            mb: 3,
                            fontSize: { xs: '1.25rem', sm: '1.5rem' }
                        }}
                    >
                        Gider Tablosu
                    </Typography>
                    <Box sx={{ width: '100%', overflowX: 'auto' }}>
                        <ExpenseTable />
                    </Box>
                </Paper>

                {/* Çıkış Butonu */}
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: { xs: 2, md: 3 } }}>
                    <Button
                        variant="contained"
                        startIcon={<LogoutIcon />}
                        onClick={handleLogout}
                        sx={{
                            background: 'linear-gradient(45deg, #9ca3af 30%, #6b7280 90%)',
                            color: 'white',
                            px: { xs: 3, sm: 4 },
                            py: { xs: 1, sm: 1.5 },
                            borderRadius: 2,
                            boxShadow: '0 4px 12px rgba(107,114,128,0.2)',
                            width: { xs: '100%', sm: 'auto' },
                            '&:hover': {
                                background: 'linear-gradient(45deg, #6b7280 30%, #9ca3af 90%)',
                            }
                        }}
                    >
                        Çıkış Yap
                    </Button>
                </Box>
            </Container>
        </Box>
    );
};

export default AdminDashboard;
