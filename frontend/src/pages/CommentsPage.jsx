// pages/CommentsPage.jsx
import React from 'react';
import { Box, Typography, Paper, Divider } from '@mui/material';

const sampleComments = [
    {
        username: 'ayse_k',
        product: 'Çilekli Cheesecake',
        comment: 'Gerçekten efsane bir lezzet! Her lokması ayrı güzel 😋',
    },
    {
        username: 'mehmet_barista',
        product: 'Mocha',
        comment: 'Tatlı ve kahve dengesi mükemmel! Tavsiye ederim ☕',
    },
    {
        username: 'zeynep34',
        product: 'Matcha Latte',
        comment: 'Biraz acı geldi ama seveni sever 💚',
    },
];

export default function CommentsPage() {
    return (
        <Box sx={{ mt: 6, px: 4 }}>
            <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#8e24aa', mb: 3 }}>
                Ürün Yorumları
            </Typography>

            {sampleComments.map((item, index) => (
                <Paper
                    key={index}
                    elevation={3}
                    sx={{
                        p: 3,
                        mb: 2,
                        backgroundColor: '#f3e5f5',
                        borderRadius: '16px',
                    }}
                >
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#6a1b9a' }}>
                        {item.username}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                        Ürün: {item.product}
                    </Typography>
                    <Divider sx={{ mb: 1 }} />
                    <Typography variant="body1">{item.comment}</Typography>
                </Paper>
            ))}
        </Box>
    );
}
