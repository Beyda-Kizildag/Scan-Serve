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
import FavoriteIcon from '@mui/icons-material/Favorite';
import Badge from '@mui/material/Badge';

export default function TeasPage() {
    // Sepet işlemleri ve toplam ürün sayısı için context'ten fonksiyonları alıyoruz
    const { cart, addToCart, removeFromCart, getCartCount } = useCart();
    // Çaylar listesini ve favori durumlarını state olarak tutuyoruz
    const [teas, setTeas] = useState([]);
    const [favorited, setFavorited] = useState({});

    // Sayfa yüklendiğinde backend'den çayları çekiyoruz
    useEffect(() => {
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

    // Kategorileri Türkçe başlıklarla eşliyoruz
    const categorizedTeas = {
        BLACK_TEA: "Siyah Çaylar",
        HERBAL_TEA: "Bitki Çayları"
    };

    // Favori işlemi: Backend'e PATCH isteği atıp favori sayısını güncelliyoruz
    const handleFavorite = async (tea) => {
        const isFavorited = favorited[tea.id];
        try {
            const response = await axios.patch(
                `http://localhost:8080/api/menu-item/${tea.id}/favorite`,
                { increment: !isFavorited }
            );
            setTeas(prev =>
                prev.map(d =>
                    d.id === tea.id
                        ? { ...d, favoriteCount: response.data.favoriteCount }
                        : d
                )
            );
            setFavorited(prev => ({ ...prev, [tea.id]: !isFavorited }));
        } catch (error) {
            console.error("Favorileme sırasında hata oluştu:", error);
        }
    };

    // + ve - butonları için çay sayfasına uygun, yeşil tonları seçildi
    const buttonStyle = {
        backgroundColor: '#66bb6a', // orta yeşil, sayfa ile uyumlu
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
        backgroundColor: '#388e3c' // hover için daha koyu yeşil
    };

    return (
        <div className="teas-container">
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
                            color: '#388e3c',
                            background: '#fff',
                            borderRadius: '50%',
                            boxShadow: '0 2px 8px #a5d6a7',
                            padding: '4px'
                        }}
                    />
                </Link>
                {/* Sayfa başlığı */}
                <Typography
                    variant="h4"
                    className="teas-title"
                    sx={{
                        fontWeight: 'bold',
                        color: '#2e7d32',
                        textAlign: 'center',
                        flexGrow: 1,
                        letterSpacing: 2,
                        textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                    }}
                >
                    Çaylar
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
                                color: '#388e3c',
                                background: '#fff',
                                borderRadius: '50%',
                                boxShadow: '0 2px 8px #a5d6a7',
                                padding: '4px'
                            }}
                        />
                    </Badge>
                </Link>
            </div>

            {/* Çay kategorileri ve ürün kartları */}
            {Object.entries(categorizedTeas).map(([category, title]) => (
                <div key={category} style={{ marginBottom: '2rem', width: '100%' }}>
                    {/* Kategori başlığı */}
                    <Typography
                        variant="h5"
                        className="category-title"
                        sx={{
                            color: '#4e342e', // kahverengi, yeşille uyumlu
                            fontWeight: 'bold',
                            marginBottom: '1.5rem',
                            textAlign: 'center',
                            letterSpacing: 1,
                            textTransform: 'uppercase',
                            textShadow: '1px 1px 6px #c8e6c9'
                        }}
                    >
                        {title}
                    </Typography>
                    <Grid container spacing={3} justifyContent="center">
                        {teas
                            .filter(tea => tea.category === category)
                            .map((tea, index) => (
                                <Grid item xs={12} sm={6} md={5} key={tea.id}>
                                    {/* Kart animasyonu */}
                                    <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.2 }}>
                                        <Paper elevation={3}
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
                                            <div className="teas-grid">
                                                <div className="tea-card" key={tea.id}>
                                                    {/* Ürün görseli ve favori ikonu */}
                                                    <div style={{
                                                        width: '100%',
                                                        position: 'relative', marginBottom: 8
                                                    }}
                                                    >
                                                        <img
                                                            src={tea.imageUrl}
                                                            alt={tea.name}
                                                            style={{ width: '100%', borderRadius: 12, display: 'block', boxShadow: '0 2px 8px #c8e6c9' }}
                                                        />
                                                        {/* Kalp ikonu ve favori sayısı */}
                                                        <div className="favorite-icon-wrapper">
                                                            <FavoriteIcon
                                                                onClick={() => handleFavorite(tea)}
                                                                sx={{
                                                                    color: favorited[tea.id] ? '#388e3c' : '#ccc',
                                                                    cursor: 'pointer',
                                                                    fontSize: 26,
                                                                    transition: 'color 0.2s'
                                                                }}
                                                            />
                                                            <span style={{ color: '#388e3c', fontWeight: 'bold', fontSize: 16 }}>
                                                                {tea.favoriteCount || 0}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    {/* Ürün adı, açıklama ve fiyat */}
                                                    <h3 className="tea-card-title" style={{ color: '#4e342e', fontWeight: 700, fontSize: '1.15rem', margin: '0.5rem 0' }}>{tea.name}</h3>
                                                    <p className="tea-card-description" style={{ color: '#388e3c', fontSize: '1rem', marginBottom: 8 }}>{tea.description}</p>
                                                    <p className="tea-card-price" style={{ color: '#6d4c41', fontWeight: 700, fontSize: '1.05rem', marginBottom: 8 }}>{tea.price} TL</p>
                                                    {/* Sepete ekle/çıkar butonları */}
                                                    <div className="cart-controls">
                                                        <button
                                                            onClick={() => removeFromCart(tea.name)}
                                                            style={{
                                                                backgroundColor: '#a5d6a7', // açık yeşil
                                                                color: '#2e7d32',
                                                                border: 'none',
                                                                borderRadius: '6px',
                                                                padding: '0.4rem 1.1rem',
                                                                fontSize: '1.2rem',
                                                                fontWeight: 700,
                                                                cursor: 'pointer',
                                                                margin: '0 0.3rem',
                                                                transition: 'background 0.2s'
                                                            }}
                                                            onMouseOver={e => e.currentTarget.style.backgroundColor = '#388e3c'}
                                                            onMouseOut={e => e.currentTarget.style.backgroundColor = '#a5d6a7'}
                                                        >-</button>
                                                        <span style={{ fontWeight: 600, fontSize: '1.1rem', color: '#388e3c', minWidth: 24, display: 'inline-block', textAlign: 'center' }}>
                                                            {cart[tea.name]?.quantity || 0}
                                                        </span>
                                                        <button
                                                            onClick={() => addToCart(tea)}
                                                            style={{
                                                                backgroundColor: '#a5d6a7',
                                                                color: '#2e7d32',
                                                                border: 'none',
                                                                borderRadius: '6px',
                                                                padding: '0.4rem 1.1rem',
                                                                fontSize: '1.2rem',
                                                                fontWeight: 700,
                                                                cursor: 'pointer',
                                                                margin: '0 0.3rem',
                                                                transition: 'background 0.2s'
                                                            }}
                                                            onMouseOver={e => e.currentTarget.style.backgroundColor = '#388e3c'}
                                                            onMouseOut={e => e.currentTarget.style.backgroundColor = '#a5d6a7'}
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