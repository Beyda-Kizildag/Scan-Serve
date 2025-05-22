import React from 'react';
import { motion } from 'framer-motion';
import { Typography, Grid, Paper, Divider, Tooltip, IconButton, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import CakeIcon from '@mui/icons-material/Cake';
import CoffeeIcon from '@mui/icons-material/Coffee';
import LocalCafeIcon from '@mui/icons-material/LocalCafe';
import LoginIcon from '@mui/icons-material/Login';
import './HomePage.css';
import MoodRecommendation from '../components/MoodRecommendation';

export default function HomePage() {
    return (
        <div className="home-container">
            {/* Giriş ikonu sağ üst köşe */}
            <div style={{ position: 'absolute', top: 20, right: 30 }}>
                <Tooltip title="Kurumsal Giriş">
                    <Link to="/login">
                        <IconButton size="large" sx={{ color: '#d81b60' }}>
                            <LoginIcon fontSize="large" />
                        </IconButton>
                    </Link>
                </Tooltip>
            </div>

            {/* Başlık - Framer Motion ile animasyonlu */}
            <Box sx={{ textAlign: 'center', marginBottom: '3rem' }}>
                <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <Typography
                        variant="h2"
                        sx={{
                            fontWeight: 'bold',
                            color: '#d81b60',
                            textShadow: '1px 1px 4px rgba(0,0,0,0.2)',
                            mb: 1,
                        }}
                    >
                        Renkli Rüyalar Kafesi
                    </Typography>
                    <Typography variant="subtitle1" sx={{ color: '#444' }}>
                        Tatlı hayaller, sıcak içecekler ve keyifli sohbetler burada başlar!
                    </Typography>
                </motion.div>
            </Box>

            {/* Kartlar */}
            <Grid container spacing={3} justifyContent="center">
                {[
                    { icon: <CakeIcon />, title: "Tatlılar", link: "/desserts" },
                    { icon: <CoffeeIcon />, title: "Kahveler", link: "/coffees" },
                    { icon: <LocalCafeIcon />, title: "Çaylar", link: "/teas" }
                ].map((item, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Link to={item.link} style={{ textDecoration: 'none' }}>
                            <motion.div
                                whileHover={{ scale: 1.06 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                <Paper
                                    elevation={6}
                                    sx={{
                                        p: '2.5rem',
                                        position: 'relative',
                                        background: 'rgba(255, 255, 255, 0.15)',
                                        backdropFilter: 'blur(12px)',
                                        borderRadius: '20px',
                                        border: '1px solid rgba(255, 255, 255, 0.3)',
                                        boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                                        textAlign: 'center',
                                        overflow: 'hidden',
                                        '&:hover': {
                                            boxShadow: '0 12px 36px rgba(0,0,0,0.2)',
                                            background: 'rgba(255, 255, 255, 0.25)',
                                        },
                                    }}
                                >
                                    {/* Glow arka plan efekti */}
                                    <Box
                                        sx={{
                                            position: 'absolute',
                                            top: '50%',
                                            left: '50%',
                                            transform: 'translate(-50%, -50%)',
                                            width: 120,
                                            height: 120,
                                            borderRadius: '50%',
                                            background: 'radial-gradient(circle, #d81b6066 0%, transparent 80%)',
                                            zIndex: 0,
                                        }}
                                    />
                                    {/* İkon ve Başlık */}
                                    <Box sx={{ position: 'relative', zIndex: 1 }}>
                                        {React.cloneElement(item.icon, {
                                            sx: { fontSize: 60, color: '#d81b60', mb: 2 }
                                        })}
                                        <Typography
                                            variant="h5"
                                            sx={{
                                                color: '#d81b60',
                                                fontWeight: 'bold',
                                                zIndex: 1,
                                                position: 'relative'
                                            }}
                                        >
                                            {item.title}
                                        </Typography>
                                    </Box>
                                </Paper>
                            </motion.div>
                        </Link>
                    </Grid>
                ))}
            </Grid>


            {/* Blog ve Yorum Kutucukları */}
            <Divider sx={{ marginY: '2rem', width: '100%', borderColor: '#d81b60' }} />
            <Grid container spacing={3} justifyContent="center" sx={{ mb: 6 }}>
                <Grid item xs={12} sm={6}>
                    <Link to="/blogs" style={{ textDecoration: 'none' }}>
                        <Paper
                            elevation={6}
                            sx={{
                                padding: '2rem',
                                backgroundColor: '#d81b60',
                                borderRadius: '20px',
                                textAlign: 'center',
                                color: '#fff',
                                fontWeight: 'bold',
                                boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.2)',
                                transition: 'transform 0.3s ease',
                                '&:hover': {
                                    transform: 'scale(1.03)',
                                },
                            }}
                        >
                            <Typography variant="h5">Renkli Bloglar</Typography>
                        </Paper>
                    </Link>
                </Grid>

                <Grid item xs={12} sm={6}>
                    <Link to="/comments" style={{ textDecoration: 'none' }}>
                        <Paper
                            elevation={6}
                            sx={{
                                padding: '2rem',
                                backgroundColor: '#8e24aa',
                                borderRadius: '20px',
                                textAlign: 'center',
                                color: '#fff',
                                fontWeight: 'bold',
                                boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.2)',
                                transition: 'transform 0.3s ease',
                                '&:hover': {
                                    transform: 'scale(1.03)',
                                },
                            }}
                        >
                            <Typography variant="h5">Ürün Yorumları</Typography>
                        </Paper>
                    </Link>
                </Grid>
            </Grid>


            <MoodRecommendation />
        </div>
    );
}
