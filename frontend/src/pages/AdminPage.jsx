import React from 'react';
import { Grid, Typography, Paper, Box } from '@mui/material';
import StatsCard from '../components/StatsCard';
import SalesChart from '../components/SalesChart';
import ExpenseTable from '../components/ExpenseTable';
import { useNavigate, Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home'; // Import HomeIcon from MUI icons

const AdminDashboard = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("userRole");
        localStorage.removeItem("user");
        navigate("/");
    };

    return (
        <Box sx={{ px: 3, py: 5 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 4, position: 'relative' }}>
                <Link to="/" style={{ position: 'absolute', left: 0 }}> {/* Ensure Link navigates to HomePage */}
                    <HomeIcon fontSize="large" style={{ cursor: 'pointer', color: '#5e3c24' }} />
                </Link>
                <Typography
                    variant="h4"
                    fontWeight="bold"
                    sx={{
                        color: '#5e3c24',
                        textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
                    }}
                >
                    Admin Panel
                </Typography>
            </Box>

            {/* Kartlar */}
            <Grid container spacing={3} mb={1}>
                <Grid item xs={12} md={4}>
                    <StatsCard title="Bugünkü Ciro" value="₺1200" color="rgba(255, 192, 203, 0.4)" />
                </Grid>
                <Grid item xs={12} md={4}>
                    <StatsCard title="Aylık Gider" value="₺3200" color="rgba(255, 228, 196, 0.4)" />
                </Grid>
                <Grid item xs={12} md={4}>
                    <StatsCard title="Yıllık Kâr" value="₺15.000" color="rgba(173, 216, 230, 0.4)" />
                </Grid>
                <Grid item xs={12} md={4}>
                    <StatsCard title="Bugünün Tarihi" value={new Date().toLocaleDateString('tr-TR')} color="rgba(240, 248, 255, 0.4)" />
                </Grid>
            </Grid>

            {/* Satış Grafiği */}
            <Grid container spacing={0} mb={3}>
                <Grid item xs={12}>
                    <Paper
                        elevation={3}
                        sx={{
                            p: 3,
                            borderRadius: 4,
                            backgroundColor: 'rgba(255, 255, 255, 0.85)',
                        }}
                    >
                        <Typography variant="h6" gutterBottom sx={{ color: '#5e3c24' }}>
                            Satış Grafiği
                        </Typography>
                        <SalesChart />
                    </Paper>
                </Grid>
            </Grid>

            {/* Gider Tablosu */}
            <Grid container spacing={0}>
                <Grid item xs={12}>
                    <Paper
                        elevation={3}
                        sx={{
                            p: 3,
                            borderRadius: 4,
                            backgroundColor: 'rgba(255, 255, 255, 0.85)',
                        }}
                    >
                        <Typography variant="h6" gutterBottom sx={{ color: '#5e3c24' }}>
                            Gider Tablosu
                        </Typography>
                        <ExpenseTable />
                    </Paper>
                </Grid>
            </Grid>

            <button
                onClick={handleLogout}
                style={{
                    marginTop: 20,
                    padding: "10px 20px",
                    background: "#d81b60",
                    color: "#fff",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer"
                }}
            >
                Çıkış Yap
            </button>
        </Box>
    );
};

export default AdminDashboard;
