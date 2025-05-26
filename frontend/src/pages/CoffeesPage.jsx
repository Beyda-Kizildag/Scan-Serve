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
import FavoriteIcon from '@mui/icons-material/Favorite';
import Badge from '@mui/material/Badge';

export default function CoffeesPage() {
    // Sepet işlemleri ve toplam ürün sayısı için context'ten fonksiyonları alıyoruz
    const { cart, addToCart, removeFromCart, getCartCount } = useCart();
    // Kahveler listesini ve favori durumlarını state olarak tutuyoruz
    const [coffees, setCoffees] = useState([]);
    const [favorited, setFavorited] = useState({});

    // Sayfa yüklendiğinde backend'den kahveleri çekiyoruz
    useEffect(() => {
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

    // Kategorileri Türkçe başlıklarla eşliyoruz
    const categorizedCoffees = {
        HOT_COFFEE: "Sıcak Kahveler",
        COLD_COFFEE: "Soğuk Kahveler",
        SPECIALTY_COFFEE: "Özel Kahveler",
        TURKISH_COFFEE: "Türk Kahveleri"
    };

    // Favori işlemi: Backend'e PATCH isteği atıp favori sayısını güncelliyoruz
    const handleFavorite = async (coffee) => {
        const isFavorited = favorited[coffee.id];
        try {
            const response = await axios.patch(
                `http://localhost:8080/api/menu-item/${coffee.id}/favorite`,
                { increment: !isFavorited }
            );
            setCoffees(prev =>
                prev.map(d =>
                    d.id === coffee.id
                        ? { ...d, favoriteCount: response.data.favoriteCount }
                        : d
                )
            );
            setFavorited(prev => ({ ...prev, [coffee.id]: !isFavorited }));
        } catch (error) {
            console.error("Favorileme sırasında hata oluştu:", error);
        }
    };

    // + ve - butonları için kahve sayfasına uygun, orta tonlu kahverengi seçildi
    const buttonStyle = {
        backgroundColor: '#a1887f',
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
        backgroundColor: '#6d4c41'
    };

    return (
        <div className="coffees-container">
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
                            color: '#4e342e',
                            background: '#fff',
                            borderRadius: '50%',
                            boxShadow: '0 2px 8px #a1887f',
                            padding: '4px'
                        }}
                    />
                </Link>
                {/* Sayfa başlığı */}
                <Typography
                    variant="h4"
                    className="coffees-title"
                    sx={{
                        fontWeight: 'bold',
                        color: '#4e342e',
                        textAlign: 'center',
                        flexGrow: 1,
                        letterSpacing: 2,
                        textShadow: '2px 2px 8px #d7ccc8'
                    }}
                >
                    Kahveler
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
                                color: '#6d4c41',
                                background: '#fff',
                                borderRadius: '50%',
                                boxShadow: '0 2px 8px #a1887f',
                                padding: '4px'
                            }}
                        />
                    </Badge>
                </Link>
            </div>

            {/* Kahve kategorileri ve ürün kartları */}
            {Object.entries(categorizedCoffees).map(([category, title]) => (
                <div key={category} style={{ marginBottom: '2rem', width: '100%' }}>
                    {/* Kategori başlığı */}
                    <Typography
                        variant="h5"
                        className="category-title"
                        sx={{
                            color: '#6d4c41',
                            fontWeight: 'bold',
                            marginBottom: '1.5rem',
                            textAlign: 'center',
                            letterSpacing: 1,
                            textTransform: 'uppercase',
                            textShadow: '1px 1px 6px #d7ccc8'
                        }}
                    >
                        {title}
                    </Typography>

                    <Grid container spacing={3} justifyContent="center">
                        {coffees
                            .filter(coffee => coffee.category === category)
                            .map((coffee, index) => (
                                <Grid item xs={12} sm={6} md={5} key={coffee.id}>
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
                                                background: 'rgba(255,255,255,0.95)',
                                            }}
                                        >
                                            <div className="coffees-grid">
                                                <div className="coffee-card" key={coffee.id}>
                                                    {/* Ürün görseli ve favori ikonu */}
                                                    <div style={{
                                                        width: '100%',
                                                        position: 'relative',
                                                        marginBottom: 8,
                                                        //boxShadow: '0 2px 8px #d7ccc8, 0 0 32px 0 #a1887f44' // kahveye uygun aydınlatma
                                                    }}
                                                    >
                                                        <img
                                                            src={coffee.imageUrl}
                                                            alt={coffee.name}
                                                            style={{
                                                                width: '100%',
                                                                borderRadius: 12,
                                                                display: 'block',
                                                                boxShadow: '0 2px 8px #d7ccc8'
                                                            }}
                                                        />
                                                        {/* Kalp ikonu ve favori sayısı */}
                                                        <div className="favorite-icon-wrapper">
                                                            <FavoriteIcon
                                                                onClick={() => handleFavorite(coffee)}
                                                                sx={{
                                                                    color: favorited[coffee.id] ? '#a1887f' : '#ccc',
                                                                    cursor: 'pointer',
                                                                    fontSize: 26,
                                                                    transition: 'color 0.2s'
                                                                }}
                                                            />
                                                            <span style={{ color: '#6d4c41', fontWeight: 'bold', fontSize: 16 }}>
                                                                {coffee.favoriteCount || 0}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    {/* Ürün adı, açıklama ve fiyat */}
                                                    <h3 className="coffee-card-title" style={{ color: '#4e342e', fontWeight: 700, fontSize: '1.15rem', margin: '0.5rem 0' }}>{coffee.name}</h3>
                                                    <p className="coffee-card-description" style={{ color: '#5d4037', fontSize: '1rem', marginBottom: 8 }}>{coffee.description}</p>
                                                    <p className="coffee-card-price" style={{ color: '#6d4c41', fontWeight: 700, fontSize: '1.05rem', marginBottom: 8 }}>{coffee.price} TL</p>
                                                    {/* Sepete ekle/çıkar butonları */}
                                                    <div className="cart-controls">
                                                        <button
                                                            onClick={() => removeFromCart(coffee.name)}
                                                            style={buttonStyle}
                                                            onMouseOver={e => e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor}
                                                            onMouseOut={e => e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor}
                                                        >-</button>
                                                        <span style={{ fontWeight: 600, fontSize: '1.1rem', color: '#5d4037', minWidth: 24, display: 'inline-block', textAlign: 'center' }}>
                                                            {cart[coffee.name]?.quantity || 0}
                                                        </span>
                                                        <button
                                                            onClick={() => addToCart(coffee)}
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