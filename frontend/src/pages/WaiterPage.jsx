import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    Button,
    Paper,
    Typography,
    Box,
    Grid,
    Divider,
    Alert
} from "@mui/material";

export default function WaiterPage() {
    const [orders, setOrders] = useState([]);
    const [lastApprovedTable, setLastApprovedTable] = useState(null);
    const navigate = useNavigate();

    const fetchOrders = () => {
        fetch("http://localhost:8080/api/orders/pending")
            .then((res) => res.json())
            .then((data) => {
                console.log("Bekleyen siparişler:", data);
                setOrders(data);
            })
            .catch((error) => {
                console.error("Siparişleri çekerken hata oluştu:", error);
            });
    };

    useEffect(() => {
        fetchOrders();
        const interval = setInterval(fetchOrders, 5000);
        return () => clearInterval(interval);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("userRole");
        localStorage.removeItem("user");
        navigate("/");
    };

    const handleApprove = (orderId, tableNumber) => {
        fetch(`http://localhost:8080/api/orders/${orderId}/approve`, {
            method: "POST",
        })
            .then(async (res) => {
                if (!res.ok) {
                    throw new Error("Onaylama işlemi başarısız");
                }
                // JSON değilse sorun olmasın
                const text = await res.text();
                if (text) {
                    console.log("Onay cevabı:", text);
                }

                setOrders((prevOrders) =>
                    prevOrders.filter((order) => order.id !== orderId)
                );
                setLastApprovedTable(tableNumber);
            })
            .catch((error) => {
                console.error("Onaylama hatası:", error);
            });
    };


    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleString("tr-TR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    return (
        <Box sx={{ p: 4 }}>
            <Typography variant="h4" gutterBottom textAlign="center" fontWeight="bold">
                Bekleyen Siparişler
            </Typography>

            {lastApprovedTable && (
                <Alert severity="success" sx={{ mb: 3 }}>
                    Son onaylanan sipariş: <strong>Masa {lastApprovedTable}</strong>
                </Alert>
            )}

            {orders.length === 0 ? (
                <Typography align="center" mt={5}>Bekleyen sipariş yok.</Typography>
            ) : (
                <Grid container spacing={3} justifyContent="center">
                    {orders.map((order) => (
                        <Grid item xs={12} md={6} lg={4} key={order.id}>

                            <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
                                <Typography variant="h6" gutterBottom>
                                    Masa No: {order.tableNumber}
                                </Typography>

                                <Typography variant="body2" color="textSecondary" gutterBottom>
                                    Sipariş Zamanı: {formatDate(order.timestamp)}
                                </Typography>

                                <Divider sx={{ my: 2 }} />

                                <Typography variant="body1" sx={{ mb: 2 }}>
                                    <strong>Ürünler:</strong><br />
                                    {order.items.map((item, index) => (
                                        <span key={index}>
                                            • {item.name} (x{item.quantity || 1})
                                            <br />
                                        </span>
                                    ))}
                                </Typography>

                                <Typography sx={{ mb: 2 }}>
                                    <strong>Toplam Tutar:</strong> {order.totalPrice}₺
                                </Typography>

                                <Button
                                    variant="contained"
                                    color="success"
                                    fullWidth
                                    onClick={() => handleApprove(order.id, order.tableNumber)}

                                >
                                    Onayla
                                </Button>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            )}

            <Box mt={6} textAlign="center">
                <Button
                    variant="contained"
                    color="error"
                    onClick={handleLogout}
                    sx={{ px: 5, py: 1.5, borderRadius: 2 }}
                >
                    Çıkış Yap
                </Button>
            </Box>
        </Box>
    );
}
