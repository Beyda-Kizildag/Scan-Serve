import React, { useState } from 'react';
import { Box, Typography, Button, IconButton, Grid, Paper, TextField } from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import HomeIcon from '@mui/icons-material/Home';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './CartPage.css';
import { useLocation } from 'react-router-dom';

export default function CartPage() {
    const { cart, addToCart, removeFromCart, clearCart } = useCart();
    const [note, setNote] = useState('');

    const calculateTotal = () => {
        return Object.values(cart).reduce((total, item) => total + item.price * item.quantity, 0);
    };
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const tableNumber = params.get('tableName') ? Number(params.get('tableName')) : 5; // fallback to 5 if not present

    const handleConfirmOrder = () => {
        const order = {
            userId: "user123", // Replace with actual user ID if available
            tableNumber: tableNumber,    // Replace with actual table number if available
            items: Object.values(cart),
            totalPrice: Object.values(cart).reduce((total, item) => total + item.price * item.quantity, 0),
            note: note,
            timestamp: Date.now()
        };

        fetch('http://localhost:8080/api/orders', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(order)
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error("Sunucudan hata kodu geldi!");
                }
                return res.json();
            })
            .then(() => {
                alert('Siparişiniz alındı ve hazırlanıyor!');
                clearCart();
                setNote('');
            })
            .catch((err) => {
                console.error("Hata:", err);
                alert('Sipariş gönderilemedi!');
            });

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

            {/* Eklemek istedikleriniz kutusu */}
            <Box sx={{ marginTop: '2.5rem', marginBottom: '1.5rem', textAlign: 'center' }}>
                <TextField
                    label="Eklemek istedikleriniz"
                    placeholder="Örneğin: Süt, limon, şeker, ekstra peçete..."
                    multiline
                    minRows={2}
                    maxRows={4}
                    value={note}
                    onChange={e => setNote(e.target.value)}
                    variant="outlined"
                    sx={{
                        width: '100%',
                        maxWidth: 500,
                        background: '#fff',
                        borderRadius: 2,
                        boxShadow: '0 2px 8px #f8bbd0',
                    }}
                />
            </Box>

            <Box sx={{ marginTop: '1rem', textAlign: 'center' }}>
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