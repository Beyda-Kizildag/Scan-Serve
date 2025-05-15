import React from 'react';
import { Paper, Typography } from '@mui/material';

const StatsCard = ({ title, value, color }) => {
    return (
        <Paper
            elevation={4}
            sx={{
                p: 3,
                borderRadius: 4,
                textAlign: 'center',
                backgroundColor: color || 'rgba(255,255,255,0.85)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                backdropFilter: 'blur(2px)',
            }}
        >
            <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#6b3e26' }}>
                {title}
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 1, color: '#8b4513' }}>
                {value}
            </Typography>
        </Paper>
    );
};

export default StatsCard;
