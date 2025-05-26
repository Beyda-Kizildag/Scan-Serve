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
import FavoriteIcon from '@mui/icons-material/Favorite';
import Badge from '@mui/material/Badge';

export default function DessertsPage() {
    // Sepet işlemleri ve toplam ürün sayısı için context'ten fonksiyonları alıyoruz
    const { cart, addToCart, removeFromCart, getCartCount } = useCart();
    // Tatlılar listesini ve favori durumlarını state olarak tutuyoruz
    const [desserts, setDesserts] = useState([]);
    const [favorited, setFavorited] = useState({});

    // Sayfa yüklendiğinde backend'den tatlıları çekiyoruz
    useEffect(() => {
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

    // Kategorileri Türkçe başlıklarla eşliyoruz
    const categorizedDesserts = {
        CAKE: "Pastalar",
        TRADITIONAL_DESSERT: "Geleneksel Tatlılar",
        COLD_DESSERT: "Soğuk Tatlılar",
        SPECIALTY_DESSERT: "Özel Tatlılar"
    };

    // Favori işlemi: Backend'e PATCH isteği atıp favori sayısını güncelliyoruz
    const handleFavorite = async (dessert) => {
        const isFavorited = favorited[dessert.id];
        try {
            const response = await axios.patch(
                `http://localhost:8080/api/menu-item/${dessert.id}/favorite`,
                { increment: !isFavorited }
            );
            setDesserts(prev =>
                prev.map(d =>
                    d.id === dessert.id
                        ? { ...d, favoriteCount: response.data.favoriteCount }
                        : d
                )
            );
            setFavorited(prev => ({ ...prev, [dessert.id]: !isFavorited }));
        } catch (error) {
            console.error("Favorileme sırasında hata oluştu:", error);
        }
    };

    // + ve - butonları için pembe ile uyumlu, orta tonlu bir lila/mor seçildi
    const buttonStyle = {
        backgroundColor: '#b39ddb', // orta lila, pembe ve mor ile uyumlu
        color: '#fff',
        border: 'none',
        borderRadius: '6px',
        padding: '0.4rem 1.1rem',
        fontSize: '1.2rem',
        fontWeight: 700,
        cursor: 'pointer',
        margin: '0 0.3rem',
        transition: 'background 0.2s'
    };

    const buttonHoverStyle = {
        backgroundColor: '#9575cd' // hover için biraz daha koyu lila
    };

    return (
        <div className="desserts-container">
            {/* Sayfa üst başlığı ve ikonlar */}
            <div className="page-header"
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '2rem',
                    width: '100%',
                    maxWidth: '1000px'
                }}
            >
                {/* Ana sayfa ikonu */}
                <Link to="/" className="home-icon"
                    style={{
                        display: 'flex',
                        alignItems: 'center'
                    }}
                >
                    <HomeIcon fontSize="large"
                        sx={{
                            color: '#ad1457',
                            background: '#fff',
                            borderRadius: '50%',
                            boxShadow: '0 2px 8px #f8bbd0',
                            padding: '4px'
                        }}
                    />
                </Link>
                {/* Sayfa başlığı */}
                <Typography
                    variant="h4"
                    className="desserts-title"
                    sx={{
                        fontWeight: 'bold',
                        color: '#ad1457',
                        textAlign: 'center',
                        flexGrow: 1,
                        letterSpacing: 2,
                        textShadow: '2px 2px 8px #f8bbd0'
                    }}
                >
                    Tatlılar
                </Typography>

                {/* Sepet ikonu ve ürün sayısı */}
                <Link to="/cart" className="cart-icon"
                    style={{
                        display: 'flex',
                        alignItems: 'center'
                    }}
                >
                    <Badge badgeContent={getCartCount()} color="secondary" overlap="circular">
                        <ShoppingCartIcon fontSize="large"
                            sx={{
                                color: '#ad1457',
                                background: '#fff',
                                borderRadius: '50%',
                                boxShadow: '0 2px 8px #f8bbd0',
                                padding: '4px'
                            }}
                        />
                    </Badge>
                </Link>
            </div>

            {/* Tatlı kategorileri ve ürün kartları */}
            {Object.entries(categorizedDesserts).map(([category, title]) => (
                <div key={category} style={{ marginBottom: '2rem', width: '100%' }}>
                    {/* Kategori başlığı */}
                    <Typography
                        variant="h5"
                        className="category-title"
                        sx={{
                            color: '#d81b60',
                            fontWeight: 'bold',
                            marginBottom: '1.5rem',
                            textAlign: 'center',
                            letterSpacing: 1,
                            textTransform: 'uppercase',
                            textShadow: '1px 1px 6px #f8bbd0'
                        }}
                    >
                        {title}
                    </Typography>

                    <Grid container spacing={3} justifyContent="center">
                        {desserts
                            .filter(dessert => dessert.category === category)
                            .map((dessert, index) => (
                                <Grid item xs={12} sm={6} md={5} key={dessert.id}>
                                    {/* Kart animasyonu */}
                                    <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.2 }}>
                                        <Paper
                                            elevation={3}
                                            sx={{
                                                padding: '1rem',
                                                borderRadius: '15px',
                                                textAlign: 'center',
                                                marginBottom: '2rem',
                                                height: '100%',
                                                position: 'relative',
                                                background: 'rgba(255,255,255,0.95)'
                                            }}
                                        >
                                            <div className="desserts-grid">
                                                <div className="dessert-card" key={dessert.id}>
                                                    {/* Ürün görseli ve favori ikonu */}
                                                    <div style={{
                                                        width: '100%',
                                                        position: 'relative', marginBottom: 8
                                                    }}
                                                    >
                                                        <img
                                                            src={dessert.imageUrl}
                                                            alt={dessert.name}
                                                            style={{ width: '100%', borderRadius: 12, display: 'block', boxShadow: '0 2px 8px #f8bbd0' }}
                                                        />
                                                        {/* Kalp ikonu ve favori sayısı */}
                                                        <div className="favorite-icon-wrapper">
                                                            <FavoriteIcon
                                                                onClick={() => handleFavorite(dessert)}
                                                                sx={{
                                                                    color: favorited[dessert.id] ? '#d81b60' : '#ccc',
                                                                    cursor: 'pointer',
                                                                    fontSize: 26,
                                                                    transition: 'color 0.2s'
                                                                }}
                                                            />
                                                            <span style={{ color: '#d81b60', fontWeight: 'bold', fontSize: 16 }}>
                                                                {dessert.favoriteCount || 0}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    {/* Ürün adı, açıklama ve fiyat */}
                                                    <h3 className="dessert-card-title" style={{ color: '#ad1457', fontWeight: 700, fontSize: '1.25rem', margin: '0.5rem 0' }}>{dessert.name}</h3>
                                                    <p className="dessert-card-description" style={{ color: '#6d214f', fontSize: '1rem', marginBottom: 8 }}>{dessert.description}</p>
                                                    <p className="dessert-card-price" style={{ color: '#d81b60', fontWeight: 700, fontSize: '1.1rem', marginBottom: 8 }}>{dessert.price} TL</p>
                                                    {/* Sepete ekle/çıkar butonları */}
                                                    <div className="cart-controls">
                                                        <button
                                                            onClick={() => removeFromCart(dessert.name)}
                                                            style={buttonStyle}
                                                            onMouseOver={e => e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor}
                                                            onMouseOut={e => e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor}
                                                        >-</button>
                                                        <span style={{ fontWeight: 600, fontSize: '1.1rem', color: '#6d214f', minWidth: 24, display: 'inline-block', textAlign: 'center' }}>
                                                            {cart[dessert.name]?.quantity || 0}
                                                        </span>
                                                        <button
                                                            onClick={() => addToCart(dessert)}
                                                            style={buttonStyle}
                                                            onMouseOver={e => e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor}
                                                            onMouseOut={e => e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor}
                                                        >+</button>
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