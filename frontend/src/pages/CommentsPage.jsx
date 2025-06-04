import React, { useState, useEffect } from 'react';
import {
    Box, Typography, TextField, Button, Grid, Paper, Select, MenuItem, InputLabel, FormControl
} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import { motion } from 'framer-motion';
import axios from 'axios';

export default function CommentsPage() {
    const [comments, setComments] = useState([]);
    const [username, setUsername] = useState('');
    const [product, setProduct] = useState('');
    const [comment, setComment] = useState('');
    const [products, setProducts] = useState([]);
    const [filterProduct, setFilterProduct] = useState('');

    useEffect(() => {
        axios.get('http://localhost:8080/api/comments')
            .then(res => setComments(res.data))
            .catch(() => setComments([]));
        axios.get('http://localhost:8080/api/menu')
            .then(res => setProducts(res.data))
            .catch(() => setProducts([]));
    }, []);

    // Filter comments by selected product
    const filteredComments = filterProduct
        ? comments.filter(item => item.product === filterProduct)
        : comments;

    // Show newest comments first (assuming MongoDB _id is increasing)
    const sortedComments = [...filteredComments].sort((a, b) => (b.id || '').localeCompare(a.id || ''));

    const handleAddComment = async () => {
        if (username.trim() && product && comment.trim()) {
            const commentData = { username, product, comment };
            try {
                const res = await axios.post('http://localhost:8080/api/comments', commentData);
                setComments([res.data, ...comments]); // Add new comment to top
                setUsername('');
                setProduct('');
                setComment('');
            } catch {
                // handle error
            }
        }
    };

    return (
        <Box sx={{
            minHeight: '100vh',
            padding: '2rem',
            background: 'linear-gradient(135deg, #f3e5f5 0%, #fffde4 100%)'
        }}>
            {/* Title and Filter Row */}
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mb: 4,
                gap: 2
            }}>
                <Typography
                    variant="h3"
                    sx={{
                        fontWeight: 'bold',
                        background: 'linear-gradient(90deg, #8e24aa 30%, #d81b60 90%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        textAlign: 'center'
                    }}
                >
                    Ürün Yorumları
                </Typography>
                <FormControl sx={{ minWidth: 200, ml: 3 }}>
                    <InputLabel>
                        <FilterListIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                        Yalnızca Bu Ürünü Göster
                    </InputLabel>
                    <Select
                        value={filterProduct}
                        label="Yalnızca Bu Ürünü Göster"
                        onChange={e => setFilterProduct(e.target.value)}
                        startAdornment={<FilterListIcon sx={{ color: '#8e24aa', mr: 1 }} />}
                    >
                        <MenuItem value="">Tüm Ürünler</MenuItem>
                        {products.map(item => (
                            <MenuItem key={item.id} value={item.name}>{item.name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>
            {/* Comment Form */}
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 4 }}>
                <TextField
                    label="Kullanıcı Adı"
                    variant="outlined"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    sx={{ width: '100%', maxWidth: 400, mb: 2 }}
                />
                <FormControl sx={{ width: '100%', maxWidth: 400, mb: 2 }}>
                    <InputLabel>Ürün Seç</InputLabel>
                    <Select
                        value={product}
                        label="Ürün Seç"
                        onChange={e => setProduct(e.target.value)}
                    >
                        {products.map(item => (
                            <MenuItem key={item.id} value={item.name}>{item.name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <TextField
                    label="Yorum"
                    variant="outlined"
                    value={comment}
                    onChange={e => setComment(e.target.value)}
                    sx={{ width: '100%', maxWidth: 400, mb: 2 }}
                    multiline
                    rows={3}
                />
                <Button
                    variant="contained"
                    sx={{
                        backgroundColor: '#8e24aa',
                        color: '#fff',
                        '&:hover': { backgroundColor: '#d81b60' }
                    }}
                    onClick={handleAddComment}
                >
                    Yorum Yap
                </Button>
            </Box>
            {/* Comments List */}
            <Grid container spacing={3} direction="column" alignItems="center">
                {sortedComments.length === 0 ? (
                    <Typography
                        variant="h6"
                        sx={{ color: '#8e24aa', mt: 4, textAlign: 'center' }}
                    >
                        {filterProduct
                            ? `"${filterProduct}" için henüz hiç yorum yapılmadı. Dene ve ilk yorumlayan sen ol!`
                            : 'No comments yet.'}
                    </Typography>
                ) : (
                    sortedComments.map((item, index) => (
                        <Grid item xs="auto" key={item.id || index}>
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <Paper
                                    elevation={4}
                                    sx={{
                                        padding: '1.5rem',
                                        borderRadius: '15px',
                                        backgroundColor: '#fff',
                                        maxWidth: '600px',
                                        margin: '0 auto'
                                    }}
                                >
                                    <Typography variant="subtitle2" sx={{ color: '#8e24aa', fontWeight: 'bold' }}>
                                        {item.username}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: '#d81b60', fontWeight: 'bold', mb: 1 }}>
                                        {item.product}
                                    </Typography>
                                    <Typography variant="body1" sx={{ color: '#333', fontSize: '1rem' }}>
                                        {item.comment}
                                    </Typography>
                                </Paper>
                            </motion.div>
                        </Grid>
                    ))
                )}
            </Grid>
        </Box>
    );
}