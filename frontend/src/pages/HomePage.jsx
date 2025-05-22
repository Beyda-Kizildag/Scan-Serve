import React from 'react';
import { motion } from 'framer-motion';
import { Typography, Grid, Paper, Divider, Tooltip, IconButton, Box, Container } from '@mui/material';
import { Link } from 'react-router-dom';
import CakeIcon from '@mui/icons-material/Cake';
import CoffeeIcon from '@mui/icons-material/Coffee';
import LocalCafeIcon from '@mui/icons-material/LocalCafe';
import LoginIcon from '@mui/icons-material/Login';
import MoodRecommendation from '../components/MoodRecommendation';

export default function HomePage() {
    return (
        <Box
            sx={{
                minHeight: '100vh',
                // Arka plan sabit bırakıldı!
                //background: 'linear-gradient(135deg, #fffde4 0%, #ffd6e0 100%)',
                py: { xs: 2, md: 6 },
                px: { xs: 1, md: 0 },
                position: 'relative'
            }}
        >
            <Container maxWidth="md" sx={{ mt: 6 }}>
                {/* Başlık ve Kurumsal Giriş ikonu yan yana */}
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mb: 5,
                        mt: 4,
                        gap: 2
                    }}
                >
                    <motion.div
                        initial={{ opacity: 0, y: -30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        style={{ display: 'flex', alignItems: 'center', gap: 16 }}
                    >
                        <Typography
                            variant="h2"
                            sx={{
                                fontWeight: 'bold',
                                background: 'linear-gradient(90deg, #d81b60 30%, #ffb74d 90%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                textShadow: '1px 1px 8px rgba(216,27,96,0.08)',
                                mb: 1,
                                letterSpacing: 1
                            }}
                        >
                            Renkli Rüyalar Kafesi
                        </Typography>
                        {/* Kurumsal Giriş ikonu başlığın sağında */}
                        <Tooltip title="Kurumsal Giriş">
                            <Link to="/login">
                                <IconButton size="large" sx={{
                                    ml: 5,
                                    color: '#fff',
                                    background: 'linear-gradient(135deg, #d81b60 0%, #ffb74d 100%)',
                                    boxShadow: '0 4px 16px rgba(216,27,96,0.12)',
                                    '&:hover': { background: 'linear-gradient(135deg, #ffb74d 0%, #d81b60 100%)' }
                                }}>
                                    <LoginIcon fontSize="large" />
                                </IconButton>
                            </Link>
                        </Tooltip>
                    </motion.div>
                </Box>
                <Typography variant="subtitle1" sx={{ color: '#444', fontSize: 20, textAlign: 'center', mb: 3 }}>
                    Tatlı hayaller, sıcak içecekler ve keyifli sohbetler burada başlar!
                </Typography>

                {/* Kartlar */}
                <Grid container spacing={4} justifyContent="center">
                    {[
                        { icon: <CakeIcon />, title: "Tatlılar", link: "/desserts" },
                        { icon: <CoffeeIcon />, title: "Kahveler", link: "/coffees" },
                        { icon: <LocalCafeIcon />, title: "Çaylar", link: "/teas" }
                    ].map((item, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <Link to={item.link} style={{ textDecoration: 'none' }}>
                                <motion.div
                                    whileHover={{ scale: 1.07, boxShadow: "0 12px 36px rgba(216,27,96,0.18)" }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    <Paper
                                        elevation={8}
                                        sx={{
                                            p: '2.5rem',
                                            position: 'relative',
                                            background: 'rgba(255, 255, 255, 0.7)',
                                            borderRadius: '24px',
                                            border: '1px solid rgba(255, 255, 255, 0.3)',
                                            boxShadow: '0 8px 32px rgba(216,27,96,0.08)',
                                            textAlign: 'center',
                                            overflow: 'hidden',
                                            transition: 'box-shadow 0.3s, background 0.3s',
                                            '&:hover': {
                                                boxShadow: '0 16px 48px rgba(216,27,96,0.18)',
                                                background: 'rgba(255, 255, 255, 0.95)',
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
                <Divider sx={{ marginY: '2.5rem', width: '100%', borderColor: '#d81b60' }} />
                <Grid container spacing={4} justifyContent="center" sx={{ mb: 6 }}>
                    <Grid item xs={12} sm={6}>
                        <Link to="/blogs" style={{ textDecoration: 'none' }}>
                            <Paper
                                elevation={8}
                                sx={{
                                    padding: '2rem',
                                    background: 'linear-gradient(90deg, #d81b60 0%, #ffb74d 100%)',
                                    borderRadius: '20px',
                                    textAlign: 'center',
                                    color: '#fff',
                                    fontWeight: 'bold',
                                    boxShadow: '0px 8px 24px rgba(216,27,96,0.13)',
                                    transition: 'transform 0.3s ease',
                                    '&:hover': {
                                        transform: 'scale(1.04)',
                                        background: 'linear-gradient(90deg, #ffb74d 0%, #d81b60 100%)',
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
                                elevation={8}
                                sx={{
                                    padding: '2rem',
                                    background: 'linear-gradient(90deg, #8e24aa 0%, #d81b60 100%)',
                                    borderRadius: '20px',
                                    textAlign: 'center',
                                    color: '#fff',
                                    fontWeight: 'bold',
                                    boxShadow: '0px 8px 24px rgba(142,36,170,0.13)',
                                    transition: 'transform 0.3s ease',
                                    '&:hover': {
                                        transform: 'scale(1.04)',
                                        background: 'linear-gradient(90deg, #d81b60 0%, #8e24aa 100%)',
                                    },
                                }}
                            >
                                <Typography variant="h5">Ürün Yorumları</Typography>
                            </Paper>
                        </Link>
                    </Grid>
                </Grid>

                <MoodRecommendation />

                {/* Alt bilgi */}
                <Box sx={{ textAlign: 'center', mt: 6, color: '#bdbdbd', fontSize: 14 }}>
                    © {new Date().getFullYear()} Renkli Rüyalar Kafesi. Tüm hakları saklıdır.
                </Box>
            </Container>
        </Box>
    );
}