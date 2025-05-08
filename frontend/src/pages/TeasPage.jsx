import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import HomeIcon from '@mui/icons-material/Home';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { motion } from 'framer-motion';
import axios from 'axios';
import './TeasPage.css';
import { useCart } from '../context/CartContext';

export default function TeasPage() {
    const { cart, addToCart, removeFromCart } = useCart();
    const [teas, setTeas] = useState([]);

    useEffect(() => {
        // Backend'den çayları çek
        const categories = ["BLACK_TEA", "HERBAL_TEA"];
        const fetchTeas = async () => {
            try {
                const allTeas = await Promise.all(
                    categories.map(category => axios.get(`http://localhost:8080/api/menu-item/category/${category}`))
                );
                const mergedTeas = allTeas.flatMap(response => response.data);
                setTeas(mergedTeas);
            } catch (error) {
                console.error("Çaylar yüklenirken bir hata oluştu:", error);
            }
        };
        fetchTeas();
    }, []);

    const categorizedTeas = {
        BLACK_TEA: "Siyah Çaylar",
        HERBAL_TEA: "Bitki Çayları"
    };

    return (
        <div className="teas-container" style={{ minHeight: '100vh', padding: '2rem', backgroundColor: '#f5f5f5' }}>
            <div className="page-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
                <Link to="/" className="home-icon">
                    <HomeIcon fontSize="large" style={{ color: '#388e3c' }} />
                </Link>
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#388e3c', textAlign: 'center', flexGrow: 1 }}>
                    Çaylar
                </Typography>
                <Link to="/cart" className="cart-icon">
                    <ShoppingCartIcon fontSize="large" style={{ color: '#388e3c' }} />
                </Link>
            </div>

            {Object.entries(categorizedTeas).map(([category, title]) => (
                <div key={category} style={{ marginBottom: '2rem' }}>
                    <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#333', marginBottom: '1.5rem', textAlign: 'center' }}>
                        {title}
                    </Typography>
                    <Grid container spacing={3} justifyContent="center">
                        {teas
                            .filter(tea => tea.category === category)
                            .map((tea, index) => (
                                <Grid item xs={12} sm={6} md={5} key={tea.id}>
                                    <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.2 }}>
                                        <Paper elevation={3} sx={{ padding: '1rem', borderRadius: '10px', textAlign: 'center', marginBottom: '2rem', height: '100%' }}>
                                            <div className="teas-grid">
                                                <div className="tea-card" key={tea.id}>
                                                    <img src={tea.imageUrl} alt={tea.name} />
                                                    <h3 className="tea-card-title">{tea.name}</h3>
                                                    <p className="tea-card-description">{tea.description}</p>
                                                    <p className="tea-card-price">{tea.price} TL</p>
                                                    <div className="cart-controls">
                                                        <button onClick={() => removeFromCart(tea.name)}>-</button>
                                                        <span>{cart[tea.name]?.quantity || 0}</span>
                                                        <button onClick={() => addToCart(tea)}>+</button>
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
