import React, { useState } from 'react';
import { Button, Paper, Typography, Box } from '@mui/material';

// Örnek sipariş verisi (backend olmadan)
const initialOrders = [
    {
        id: '1',
        tableNumber: 17,
        items: ['Latte', 'Cheesecake'],
        status: 'pending'
    },
    {
        id: '2',
        tableNumber: 5,
        items: ['Çay', 'Baklava'],
        status: 'pending'
    }
];

export default function WaiterPage() {
    const [orders, setOrders] = useState(initialOrders);

    const handleApprove = (orderId) => {
        setOrders(prevOrders =>
            prevOrders.map(order =>
                order.id === orderId
                    ? { ...order, status: 'approved' }
                    : order
            )
        );
        alert('Sipariş alındı!');
    };

    return (
        <Box sx={{ p: 4 }}>
            <Typography variant="h4" gutterBottom>Bekleyen Siparişler</Typography>
            {orders.length === 0 && <Typography>Bekleyen sipariş yok.</Typography>}
            {orders.map(order => (
                <Paper key={order.id} sx={{ p: 2, mb: 2 }}>
                    <Typography>Masa No: {order.tableNumber}</Typography>
                    <Typography>Ürünler: {order.items.join(', ')}</Typography>
                    <Button
                        variant="contained"
                        color="success"
                        onClick={() => handleApprove(order.id)}
                        disabled={order.status === 'approved'}
                    >
                        Onayla
                    </Button>
                    {order.status === 'approved' && (
                        <Typography color="green">Sipariş alındı!</Typography>
                    )}
                </Paper>
            ))}
        </Box>
    );
}