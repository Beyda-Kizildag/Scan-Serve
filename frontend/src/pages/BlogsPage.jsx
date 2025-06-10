import React, { useState, useEffect } from 'react';
import {
    Box, Typography, TextField, Button, Grid, Paper, Select, MenuItem, InputLabel, FormControl
} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import { motion } from 'framer-motion';
import axios from 'axios';

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

    // Filter blogs by selected topic
    const filteredBlogs = filterTopic
        ? blogs.filter(blog => blog.topic === filterTopic)
        : blogs;

    return (
        <Box sx={{
            minHeight: '100vh',
            padding: '2rem',
            background: 'linear-gradient(135deg, #ffe0e9 0%, #f5f5f5 100%)'
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
                        background: 'linear-gradient(90deg, #d81b60 30%, #ffb74d 90%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        textAlign: 'center'
                    }}
                >
                    Renkli Bloglar
                </Typography>
                <FormControl sx={{ minWidth: 250, ml: 3 }}>
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
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 4 }}>
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
                        backgroundColor: '#d81b60',
                        color: '#fff',
                        '&:hover': { backgroundColor: '#ad1457' }
                    }}
                    onClick={handleAddBlog}
                    disabled={!username.trim() || !newBlog.trim() || !topic}
                >
                    Paylaş
                </Button>
            </Box>
            {/* Blogs List */}
            <Grid container spacing={3} direction="column" alignItems="center">
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
                        <Grid item xs="auto" key={blog.id || index}>
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
                                        background: 'linear-gradient(90deg, #fffde4 0%, #ffe0e9 100%)',
                                        maxWidth: '600px',
                                        margin: '0 auto',
                                        textAlign: 'center',
                                        position: 'relative'
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
                                        sx={{ color: '#333', fontSize: '1rem', whiteSpace: 'pre-line' }}
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
        </Box>
    );
}