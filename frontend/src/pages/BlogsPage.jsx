import React, { useState } from 'react';
import {
    Box,
    Typography,
    TextField,
    Button,
    Grid,
    Paper,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function BlogsPage() {
    const [blogs, setBlogs] = useState([]);
    const [newBlog, setNewBlog] = useState('');

    const handleAddBlog = () => {
        if (newBlog.trim()) {
            setBlogs([...blogs, newBlog]);
            setNewBlog('');
        }
    };

    return (
        <Box
            sx={{
                minHeight: '100vh',
                padding: '2rem',
                background: 'linear-gradient(135deg, #ffe0e9 0%, #f5f5f5 100%)',
            }}
        >
            {/* Üst Menü */}
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    mb: 4,
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Link to="/" style={{ textDecoration: 'none' }}>
                        <HomeIcon fontSize="large" sx={{ color: '#d81b60' }} />
                    </Link>
                    <Typography
                        variant="h4"
                        sx={{
                            fontWeight: 'bold',
                            color: '#d81b60',
                            textAlign: 'center',
                        }}
                    >
                        Kafe Blogları
                    </Typography>
                </Box>
            </Box>


            {/* Blog Ekleme Alanı */}
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    marginBottom: '2rem',
                }}
            >
                <TextField
                    label="Yeni Blog Yazısı"
                    variant="outlined"
                    value={newBlog}
                    onChange={(e) => setNewBlog(e.target.value)}
                    sx={{ width: '100%', maxWidth: '600px', marginBottom: '1rem' }}
                    multiline
                    rows={3}
                />
                <Button
                    variant="contained"
                    sx={{
                        backgroundColor: '#d81b60',
                        color: '#fff',
                        '&:hover': {
                            backgroundColor: '#ad1457',
                        },
                    }}
                    onClick={handleAddBlog}
                >
                    Paylaş
                </Button>
            </Box>

            {/* Blog Kartları */}
            <Grid container spacing={3} justifyContent="center">
                {blogs.map((blog, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
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
                                    textAlign: 'center',
                                    backgroundColor: '#ffffff',
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                }}
                            >
                                <Typography variant="body1" sx={{ color: '#333', fontSize: '1rem' }}>
                                    {blog}
                                </Typography>
                            </Paper>
                        </motion.div>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}
