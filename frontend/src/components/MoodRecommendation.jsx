// components/MoodRecommendation.jsx
import React, { useState } from 'react';
import { Box, Typography, Button, Grid, Paper } from '@mui/material';
import { motion } from 'framer-motion';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import HotelIcon from '@mui/icons-material/Hotel';
import FavoriteIcon from '@mui/icons-material/Favorite';
import BoltIcon from '@mui/icons-material/Bolt';
import { useNavigate } from 'react-router-dom';

const moodOptions = [
    {
        label: 'Mutlu 😊',
        icon: <EmojiEmotionsIcon color="secondary" />,
        suggestion: 'Bugün kendini ödüllendir! Bir dilim cheesecake tam sana göre 🎂',
        image: '/images/desserts/cakes/cheesecake.jpg',
        link: '/desserts',
    },
    {
        label: 'Yorgun 😴',
        icon: <HotelIcon color="secondary" />,
        suggestion: 'Bir fincan espresso seni ayağa kaldırır! ☕',
        image: '/images/coffees/hot/espresso.jpg',
        link: '/coffees', // Not: yanlış yazılmış olabilir, 'coffees' mi olmalı?
    },
    {
        label: 'Romantik 💕',
        icon: <FavoriteIcon color="secondary" />,
        suggestion: 'Adaçayı eşliğinde güzel bir sohbet seni bekliyor 🍵',
        image: '/images/teas/herbal/sage.jpg',
        link: '/teas',
    },
    {
        label: 'Enerjik ⚡',
        icon: <BoltIcon color="secondary" />,
        suggestion: 'Brownie seni daha da hızlandırır! 🍫⚡',
        image: '/images/desserts/specialty/brownie.jpg',
        link: '/desserts',
    },
];

export default function MoodRecommendation() {
    const [selectedMood, setSelectedMood] = useState(null);
    const navigate = useNavigate();

    return (
        <Box sx={{ mt: 6, textAlign: 'center' }}>
            <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold', color: '#d81b60' }}>
                Bugün nasıl hissediyorsunuz?
            </Typography>

            <Grid container spacing={2} justifyContent="center">
                {moodOptions.map((mood, index) => (
                    <Grid item xs={6} sm={3} key={index}>
                        <motion.div whileHover={{ scale: 1.05 }}>
                            <Button
                                variant={selectedMood === mood ? 'contained' : 'outlined'}
                                fullWidth
                                sx={{
                                    height: '100%',
                                    p: 2,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 1,
                                    color: '#d81b60',
                                    borderColor: '#d81b60',
                                    '&:hover': {
                                        borderColor: '#d81b60',
                                        backgroundColor: '#ffe6f0',
                                    },
                                }}
                                onClick={() => setSelectedMood(mood)}
                            >
                                {mood.icon}
                                <Typography variant="body1" fontWeight="bold">
                                    {mood.label}
                                </Typography>
                            </Button>
                        </motion.div>
                    </Grid>
                ))}
            </Grid>

            {selectedMood && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Paper
                        elevation={6}
                        sx={{
                            mt: 4,
                            p: 3,
                            maxWidth: 600,
                            mx: 'auto',
                            backgroundColor: '#fff0f5',
                            borderRadius: '20px',
                            boxShadow: '0 6px 20px rgba(100, 161, 218, 0.1)',
                        }}
                    >
                        <Typography variant="h6" sx={{ color: '#d81b60', fontWeight: 'bold', mb: 2 }}>
                            {selectedMood.suggestion}
                        </Typography>

                        <Box
                            component="img"
                            src={selectedMood.image}
                            alt={selectedMood.label}
                            sx={{
                                width: '100%',
                                aspectRatio: '1 / 1', // Kare görünüm
                                objectFit: 'cover',
                                borderRadius: '20px',
                                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
                                marginBottom: 2,
                                transition: 'transform 0.3s ease',
                                '&:hover': {
                                    transform: 'scale(1.02)',
                                },
                            }}
                        />

                        <Button
                            variant="contained"
                            onClick={() => navigate(selectedMood.link)}
                            sx={{ backgroundColor: '#d81b60', mt: 1 }}
                        >
                            Detayları Gör
                        </Button>
                    </Paper>
                </motion.div>
            )}
        </Box>
    );
}
