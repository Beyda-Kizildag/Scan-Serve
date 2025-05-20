import React, { useState, useEffect } from 'react';
import { Button, Paper, Typography, Box } from '@mui/material';

export default function WaiterPage() {
    const [orders, setOrders] = useState([]);

    const fetchOrders = () => {
        fetch('http://localhost:8080/api/orders/pending')
            .then(res => res.json())
            .then(data => setOrders(data));
    };

    useEffect(() => {
        fetchOrders(); // Initial fetch
        const interval = setInterval(fetchOrders, 5000); // Poll every 5 seconds
        return () => clearInterval(interval); // Cleanup
    }, []);

    const handleApprove = (orderId) => {
        fetch(`http://localhost:8080/api/orders/${orderId}/approve`, {
            method: 'POST'
        })
            .then(res => res.json())
            .then(() => {
                setOrders(prevOrders =>
                    prevOrders.filter(order => order.id !== orderId)
                );
                alert('Sipariş alındı!');
            });
    };

    return (
        <Box sx={{ p: 4 }}>
            <Typography variant="h4" gutterBottom>Bekleyen Siparişler</Typography>
            {orders.length === 0 && <Typography>Bekleyen sipariş yok.</Typography>}
            {orders.map(order => (
                <Paper key={order.id} sx={{ p: 2, mb: 2 }}>
                    <Typography>Masa No: {order.tableNumber}</Typography>
                    <Typography>Ürünler: {order.items.map(item => item.name).join(', ')}</Typography>
                    <Button
                        variant="contained"
                        color="success"
                        onClick={() => handleApprove(order.id)}
                    >
                        Onayla
                    </Button>
                </Paper>
            ))}
        </Box>
    );
}