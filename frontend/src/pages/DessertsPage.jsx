import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import HomeIcon from '@mui/icons-material/Home';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { motion } from 'framer-motion';
import axios from 'axios';
import './DessertsPage.css';
import { useCart } from '../context/CartContext';

export default function DessertsPage() {
    const { cart, addToCart, removeFromCart } = useCart();
    const [desserts, setDesserts] = useState([]);

    useEffect(() => {
        // Backend'den tatlıları çek
        const categories = ["CAKE", "TRADITIONAL_DESSERT", "COLD_DESSERT", "SPECIALTY_DESSERT"];
        const fetchDesserts = async () => {
            try {
                const allDesserts = await Promise.all(
                    categories.map(category => axios.get(`http://localhost:8080/api/menu-item/category/${category}`))
                );
                const mergedDesserts = allDesserts.flatMap(response => response.data);
                setDesserts(mergedDesserts);
            } catch (error) {
                console.error("Tatlılar yüklenirken bir hata oluştu:", error);
            }
        };
        fetchDesserts();
    }, []);

    const categorizedDesserts = {
        CAKE: "Pastalar",
        TRADITIONAL_DESSERT: "Geleneksel Tatlılar",
        COLD_DESSERT: "Soğuk Tatlılar",
        SPECIALTY_DESSERT: "Özel Tatlılar"
    };

    return (
        <div className="desserts-container" style={{ minHeight: '100vh', padding: '2rem', backgroundColor: '#f5f5f5' }}>
            <div className="page-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
                <Link to="/" className="home-icon">
                    <HomeIcon fontSize="large" style={{ color: '#d81b60' }} />
                </Link>
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#d81b60', textAlign: 'center', flexGrow: 1 }}>
                    Tatlılar
                </Typography>
                <Link to="/cart" className="cart-icon">
                    <ShoppingCartIcon fontSize="large" style={{ color: '#d81b60' }} />
                </Link>
            </div>

            {Object.entries(categorizedDesserts).map(([category, title]) => (
                <div key={category} style={{ marginBottom: '2rem' }}>
                    <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#333', marginBottom: '1.5rem', textAlign: 'center' }}>
                        {title}
                    </Typography>
                    <Grid container spacing={3} justifyContent="center">
                        {desserts
                            .filter(dessert => dessert.category === category)
                            .map((dessert, index) => (
                                <Grid item xs={12} sm={6} md={5} key={dessert.id}>
                                    <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.2 }}>
                                        <Paper elevation={3} sx={{ padding: '1rem', borderRadius: '10px', textAlign: 'center', marginBottom: '2rem', height: '100%' }}>
                                            <div className="desserts-grid">
                                                <div className="dessert-card" key={dessert.id}>
                                                    <img src={dessert.imageUrl} alt={dessert.name} />
                                                    <h3 className="dessert-card-title">{dessert.name}</h3>
                                                    <p className="dessert-card-description">{dessert.description}</p>
                                                    <p className="dessert-card-price">{dessert.price} TL</p>
                                                    <div className="cart-controls">
                                                        <button onClick={() => removeFromCart(dessert.name)}>-</button>
                                                        <span>{cart[dessert.name]?.quantity || 0}</span>
                                                        <button onClick={() => addToCart(dessert)}>+</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </Paper>
                                    </motion.div>
                                </Grid>
                            ))}
                    </Grid>
                </div>
            ))}
        </div>
    );
}
