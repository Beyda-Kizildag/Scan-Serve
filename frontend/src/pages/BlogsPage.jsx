import { Box, Typography, TextField, Button, Grid, Paper } from '@mui/material';
import { useState } from 'react';

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
                backgroundColor: '#f5f5f5',
            }}
        >
            <Typography
                variant="h4"
                sx={{
                    fontWeight: 'bold',
                    color: '#d81b60',
                    marginBottom: '2rem',
                    textAlign: 'center',
                }}
            >
                Renkli Bloglar
            </Typography>

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
                />
                <Button
                    variant="contained"
                    sx={{ backgroundColor: '#d81b60', color: '#fff' }}
                    onClick={handleAddBlog}
                >
                    Paylaş
                </Button>
            </Box>

            <Grid container spacing={3}>
                {blogs.map((blog, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Paper
                            elevation={3}
                            sx={{
                                padding: '1rem',
                                borderRadius: '10px',
                                textAlign: 'center',
                                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                            }}
                        >
                            <Typography variant="body1" sx={{ color: '#333' }}>
                                {blog}
                            </Typography>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}