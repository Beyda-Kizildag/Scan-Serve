import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import HomeIcon from '@mui/icons-material/Home';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { motion } from 'framer-motion';
import axios from 'axios';
import './CoffeesPage.css';
import { useCart } from '../context/CartContext';

export default function CoffeesPage() {
    const { cart, addToCart, removeFromCart } = useCart();
    const [coffees, setCoffees] = useState([]);

    useEffect(() => {
        // Backend'den kahveleri çek
        const categories = ["HOT_COFFEE", "COLD_COFFEE", "SPECIALTY_COFFEE", "TURKISH_COFFEE"];
        const fetchCoffees = async () => {
            try {
                const allCoffees = await Promise.all(
                    categories.map(category => axios.get(`http://localhost:8080/api/menu-item/category/${category}`))
                );
                const mergedCoffees = allCoffees.flatMap(response => response.data);
                setCoffees(mergedCoffees);
            } catch (error) {
                console.error("Kahveler yüklenirken bir hata oluştu:", error);
            }
        };
        fetchCoffees();
    }, []);

    const categorizedCoffees = {
        HOT_COFFEE: "Sıcak Kahveler",
        COLD_COFFEE: "Soğuk Kahveler",
        SPECIALTY_COFFEE: "Özel Kahveler",
        TURKISH_COFFEE: "Türk Kahveleri"
    };

    return (
        <div className="coffees-container" style={{ minHeight: '100vh', padding: '2rem', backgroundColor: '#f5f5f5' }}>
            <div className="page-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
                <Link to="/" className="home-icon">
                    <HomeIcon fontSize="large" style={{ color: '#4e342e' }} />
                </Link>
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#4e342e', textAlign: 'center', flexGrow: 1 }}>
                    Kahveler
                </Typography>
                <Link to="/cart" className="cart-icon">
                    <ShoppingCartIcon fontSize="large" style={{ color: '#4e342e' }} />
                </Link>
            </div>

            {Object.entries(categorizedCoffees).map(([category, title]) => (
                <div key={category} style={{ marginBottom: '2rem' }}>
                    <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#333', marginBottom: '1.5rem', textAlign: 'center' }}>
                        {title}
                    </Typography>
                    <Grid container spacing={3} justifyContent="center">
                        {coffees
                            .filter(coffee => coffee.category === category)
                            .map((coffee, index) => (
                                <Grid item xs={12} sm={6} md={5} key={coffee.id}>
                                    <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.2 }}>
                                        <Paper elevation={3} sx={{ padding: '1rem', borderRadius: '10px', textAlign: 'center', marginBottom: '2rem', height: '100%' }}>
                                            <div className="coffees-grid">
                                                <div className="coffee-card" key={coffee.id}>
                                                    <img src={coffee.imageUrl} alt={coffee.name} />
                                                    <h3 className="coffee-card-title">{coffee.name}</h3>
                                                    <p className="coffee-card-description">{coffee.description}</p>
                                                    <p className="coffee-card-price">{coffee.price} TL</p>
                                                    <div className="cart-controls">
                                                        <button onClick={() => removeFromCart(coffee.name)}>-</button>
                                                        <span>{cart[coffee.name]?.quantity || 0}</span>
                                                        <button onClick={() => addToCart(coffee)}>+</button>
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
