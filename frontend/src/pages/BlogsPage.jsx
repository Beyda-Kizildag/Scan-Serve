import React, { useState, useEffect } from 'react';
import {
    Box, Typography, TextField, Button, Grid, Paper, Select, MenuItem, InputLabel, FormControl, IconButton, Container
} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import HomeIcon from '@mui/icons-material/Home';
import { motion } from 'framer-motion';
import axios from 'axios';
import { Link } from 'react-router-dom';

const TOPICS = [
    { value: 'İşletme & Girişimcilik', label: '💼 İşletme & Girişimcilik' },
    { value: 'Gezi & Mekan Önerileri', label: '🌍 Gezi & Mekan Önerileri' },
    { value: 'Sağlık & Beslenme', label: '🥗 Sağlık & Beslenme' },
    { value: 'Teknoloji & Dijital Yaşam', label: '💻 Teknoloji & Dijital Yaşam' }
];

export default function BlogsPage() {
    const [blogs, setBlogs] = useState([]);
    const [newBlog, setNewBlog] = useState('');
    const [username, setUsername] = useState('');
    const [topic, setTopic] = useState('');
    const [filterTopic, setFilterTopic] = useState('');

    useEffect(() => {
        axios.get('http://localhost:8080/api/blogs')
            .then(res => setBlogs(res.data))
            .catch(() => setBlogs([]));
    }, []);

    const handleAddBlog = async () => {
        if (newBlog.trim() && username.trim() && topic) {
            const blogData = { username, content: newBlog, topic };
            try {
                const res = await axios.post('http://localhost:8080/api/blogs', blogData);
                setBlogs([res.data, ...blogs]);
                setNewBlog('');
                setTopic('');
            } catch {
                // handle error
            }
        }
    };

    const filteredBlogs = filterTopic
        ? blogs.filter(blog => blog.topic === filterTopic)
        : blogs;

    return (
        <Box sx={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #f8fafc 0%, #ffe0e9 100%)'
        }}>
            {/* Sabit başlık ve ana sayfa ikonu */}
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mb: 2,
                gap: 2,
                pt: 4,
                position: 'relative'
            }}>
                <Box sx={{
                    position: 'absolute',
                    left: { xs: 8, sm: 48 }, // Daha sola ve uzak
                    top: '50%',
                    transform: 'translateY(-50%)'
                }}>
                    <Link to="/">
                        <IconButton sx={{
                            background: '#f8bbd0',
                            color: '#d81b60',
                            '&:hover': { background: '#f06292' }
                        }}>
                            <HomeIcon fontSize="large" />
                        </IconButton>
                    </Link>
                </Box>
                <Typography
                    variant="h3"
                    sx={{
                        fontWeight: 'bold',
                        background: 'linear-gradient(90deg, #d81b60 30%, #ffb74d 90%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        textAlign: 'center'
                    }}
                >
                    Renkli Bloglar
                </Typography>
            </Box>

            <Container maxWidth="md">
                {/* Filter Row */}
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 4,
                    gap: 2,
                    mt: 4 // başlık ile kutucuk arasını açar
                }}>
                    <FormControl sx={{ minWidth: 250 }}>
                        <InputLabel>
                            <FilterListIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                            Yalnızca Bu Konuyu Göster
                        </InputLabel>
                        <Select
                            value={filterTopic}
                            label="Yalnızca Bu Konuyu Göster"
                            onChange={e => setFilterTopic(e.target.value)}
                            startAdornment={<FilterListIcon sx={{ color: '#d81b60', mr: 1 }} />}
                        >
                            <MenuItem value="">Tüm Konular</MenuItem>
                            {TOPICS.map(item => (
                                <MenuItem key={item.value} value={item.value}>{item.label}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>

                {/* Blog Form */}
                <Paper elevation={6} sx={{
                    p: 4,
                    borderRadius: 4,
                    mb: 5,
                    background: 'linear-gradient(90deg, #fffde4 0%, #ffe0e9 100%)',
                    boxShadow: '0 8px 32px rgba(216,27,96,0.10)'
                }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <TextField
                            label="Kullanıcı Adı"
                            variant="outlined"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            sx={{ width: '100%', maxWidth: 400, mb: 2 }}
                        />
                        <FormControl sx={{ width: '100%', maxWidth: 400, mb: 2 }}>
                            <InputLabel>Konu Seç</InputLabel>
                            <Select
                                value={topic}
                                label="Konu Seç"
                                onChange={e => setTopic(e.target.value)}
                            >
                                {TOPICS.map(item => (
                                    <MenuItem key={item.value} value={item.value}>{item.label}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <TextField
                            label="Yeni Blog Yazısı"
                            variant="outlined"
                            value={newBlog}
                            onChange={e => setNewBlog(e.target.value)}
                            sx={{ width: '100%', maxWidth: 400, mb: 2 }}
                            multiline
                            rows={3}
                        />
                        <Button
                            variant="contained"
                            sx={{
                                background: 'linear-gradient(90deg, #d81b60 0%, #ffb74d 100%)',
                                color: '#fff',
                                fontWeight: 'bold',
                                px: 5,
                                py: 1.5,
                                fontSize: 18,
                                boxShadow: 2,
                                '&:hover': { background: 'linear-gradient(90deg, #ffb74d 0%, #d81b60 100%)' }
                            }}
                            onClick={handleAddBlog}
                            disabled={!username.trim() || !newBlog.trim() || !topic}
                        >
                            Paylaş
                        </Button>
                    </Box>
                </Paper>

                {/* Blogs List */}
                <Grid container spacing={4} direction="column" alignItems="center">
                    {filteredBlogs.length === 0 ? (
                        <Typography
                            variant="h6"
                            sx={{ color: '#d81b60', mt: 4, textAlign: 'center' }}
                        >
                            {filterTopic
                                ? `"${TOPICS.find(t => t.value === filterTopic)?.label}" için henüz hiç blog yazısı yok. İlk sen paylaş!`
                                : 'Henüz hiç blog yazısı yok.'}
                        </Typography>
                    ) : (
                        filteredBlogs.map((blog, index) => (
                            <Grid item xs="auto" key={blog.id || index} sx={{ width: '100%' }}>
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                >
                                    <Paper
                                        elevation={8}
                                        sx={{
                                            padding: '2rem',
                                            borderRadius: '20px',
                                            background: 'linear-gradient(90deg, #fffde4 0%, #ffe0e9 100%)',
                                            maxWidth: '700px',
                                            margin: '0 auto',
                                            textAlign: 'center',
                                            position: 'relative',
                                            boxShadow: '0 8px 32px rgba(216,27,96,0.10)',
                                            transition: 'transform 0.2s, box-shadow 0.2s',
                                            '&:hover': {
                                                transform: 'scale(1.03)',
                                                boxShadow: '0 12px 40px rgba(216,27,96,0.18)'
                                            }
                                        }}
                                    >
                                        <Typography variant="subtitle2" sx={{ color: '#d81b60', fontWeight: 'bold', mb: 1 }}>
                                            {blog.username}
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: '#ffb74d', fontWeight: 'bold', mb: 1, fontSize: 18 }}>
                                            {TOPICS.find(t => t.value === blog.topic)?.label}
                                        </Typography>
                                        <Typography
                                            variant="body1"
                                            sx={{ color: '#333', fontSize: '1.1rem', whiteSpace: 'pre-line', mb: 1.5 }}
                                        >
                                            {blog.content}
                                        </Typography>
                                        {/* Emoji animation */}
                                        <motion.div
                                            animate={{ rotate: [0, 10, -10, 0] }}
                                            transition={{ repeat: Infinity, duration: 2, delay: index * 0.2 }}
                                            style={{
                                                position: 'absolute',
                                                top: 10,
                                                right: 20,
                                                fontSize: 28
                                            }}
                                        >
                                            {blog.topic === 'İşletme & Girişimcilik' && '💼'}
                                            {blog.topic === 'Gezi & Mekan Önerileri' && '🌍'}
                                            {blog.topic === 'Sağlık & Beslenme' && '🥗'}
                                            {blog.topic === 'Teknoloji & Dijital Yaşam' && '💻'}
                                        </motion.div>
                                    </Paper>
                                </motion.div>
                            </Grid>
                        ))
                    )}
                </Grid>
            </Container>
        </Box>
    );
}