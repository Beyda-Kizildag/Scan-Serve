import { Typography, Grid, Paper, Divider } from '@mui/material';
import { Tooltip, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import CakeIcon from '@mui/icons-material/Cake';
import CoffeeIcon from '@mui/icons-material/Coffee';
import LocalCafeIcon from '@mui/icons-material/LocalCafe';
import LoginIcon from '@mui/icons-material/Login'; // Giriş ikonu eklendi
import './HomePage.css';

export default function HomePage() {
    return (
        <div className="home-container">
            {/* Giriş ikonu sağ üst köşe */}
            <div style={{ position: 'absolute', top: 20, right: 30 }}>
                <Tooltip title="Kurumsal Giriş">
                    <Link to="/login"><IconButton size="large" sx={{ color: '#d81b60' }}><LoginIcon fontSize="large" /></IconButton></Link>
                </Tooltip>
            </div>
            <Typography
                variant="h3"
                sx={{
                    fontWeight: 'bold',
                    color: '#d81b60',
                    marginBottom: '2rem',
                    textAlign: 'center',
                }}
            >
                Renkli Rüyalar Kafesine Hoş Geldiniz
            </Typography>
            <Grid container spacing={3} justifyContent="center">
                <Grid item xs={12} sm={6} md={4}>
                    <Link to="/desserts" style={{ textDecoration: 'none' }}>
                        <Paper
                            elevation={6}
                            sx={{
                                padding: '2rem',
                                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                                borderRadius: '15px',
                                textAlign: 'center',
                                boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.15)',
                            }}
                        >
                            <CakeIcon sx={{ fontSize: 50, color: '#d81b60', marginBottom: '1rem' }} />
                            <Typography variant="h5" sx={{ color: '#d81b60', fontWeight: 'bold' }}>
                                Tatlılar
                            </Typography>
                        </Paper>
                    </Link>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Link to="/coffees" style={{ textDecoration: 'none' }}>
                        <Paper
                            elevation={6}
                            sx={{
                                padding: '2rem',
                                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                                borderRadius: '15px',
                                textAlign: 'center',
                                boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.15)',
                            }}
                        >
                            <CoffeeIcon sx={{ fontSize: 50, color: '#d81b60', marginBottom: '1rem' }} />
                            <Typography variant="h5" sx={{ color: '#d81b60', fontWeight: 'bold' }}>
                                Kahveler
                            </Typography>
                        </Paper>
                    </Link>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Link to="/teas" style={{ textDecoration: 'none' }}>
                        <Paper
                            elevation={6}
                            sx={{
                                padding: '2rem',
                                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                                borderRadius: '15px',
                                textAlign: 'center',
                                boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.15)',
                            }}
                        >
                            <LocalCafeIcon sx={{ fontSize: 50, color: '#d81b60', marginBottom: '1rem' }} />
                            <Typography variant="h5" sx={{ color: '#d81b60', fontWeight: 'bold' }}>
                                Çaylar
                            </Typography>
                        </Paper>
                    </Link>
                </Grid>
            </Grid>
            <Divider sx={{ marginY: '2rem', width: '100%', borderColor: '#d81b60' }} />
            <Link to="/blogs" style={{ textDecoration: 'none' }}>
                <Paper
                    elevation={6}
                    sx={{
                        padding: '2rem',
                        backgroundColor: '#d81b60',
                        borderRadius: '15px',
                        textAlign: 'center',
                        color: '#fff',
                        fontWeight: 'bold',
                        boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.15)',
                    }}
                >
                    <Typography variant="h5">Renkli Bloglar</Typography>
                </Paper>
            </Link>
        </div>
    );
}
