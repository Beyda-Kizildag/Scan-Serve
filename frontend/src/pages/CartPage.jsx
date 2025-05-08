import React from 'react';
import { Box, Typography, Button, IconButton, Grid, Paper } from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import HomeIcon from '@mui/icons-material/Home';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './CartPage.css';

export default function CartPage() {
    const { cart, addToCart, removeFromCart } = useCart();

    const calculateTotal = () => {
        return Object.values(cart).reduce((total, item) => total + item.price * item.quantity, 0);
    };

    const handleConfirmOrder = () => {
        alert('Siparişiniz alındı ve hazırlanıyor!');
    };

    return (
        <Box sx={{ minHeight: '100vh', padding: '2rem', backgroundColor: '#f5f5f5' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '2rem' }}>
                <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <IconButton>
                        <HomeIcon fontSize="large" sx={{ color: '#d81b60' }} />
                    </IconButton>
                </Link>
                <Typography variant="h4" sx={{ marginLeft: '1rem', fontWeight: 'bold', color: '#333' }}>
                    Sepetim
                </Typography>
            </Box>

            <Grid container spacing={3}>
                {Object.values(cart).map((item, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Paper elevation={3} sx={{ padding: '1rem', borderRadius: '10px', textAlign: 'center' }}>
                            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333' }}>
                                {item.name}
                            </Typography>
                            <Typography variant="body1" sx={{ color: '#555', marginBottom: '1rem' }}>
                                {item.price} TL
                            </Typography>
                            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem' }}>
                                <IconButton onClick={() => removeFromCart(item.name)}>
                                    <RemoveIcon sx={{ color: '#d81b60' }} />
                                </IconButton>
                                <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#333' }}>
                                    {item.quantity}
                                </Typography>
                                <IconButton onClick={() => addToCart(item)}>
                                    <AddIcon sx={{ color: '#d81b60' }} />
                                </IconButton>
                            </Box>
                        </Paper>
                    </Grid>
                ))}
            </Grid>

            <Box sx={{ marginTop: '2rem', textAlign: 'center' }}>
                <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#333', marginBottom: '1rem' }}>
                    Toplam: {calculateTotal()} TL
                </Typography>
                <Button
                    variant="contained"
                    sx={{ backgroundColor: '#d81b60', color: '#fff', padding: '0.5rem 2rem', fontSize: '1rem' }}
                    onClick={handleConfirmOrder}
                >
                    Onayla
                </Button>
            </Box>
        </Box>
    );
}