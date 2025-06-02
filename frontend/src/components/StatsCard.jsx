import React from 'react';
import { Paper, Typography, Box } from '@mui/material';

const StatsCard = ({ title, value, color, icon }) => {
    return (
        <Paper
            elevation={3}
            sx={{
                p: { xs: 1.5, sm: 2 },
                height: '100%',
                minHeight: { xs: '120px', sm: '140px' },
                maxHeight: { xs: '140px', sm: '160px' },
                borderRadius: 3,
                background: 'rgba(255, 255, 255, 0.95)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
                transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 12px 40px rgba(0,0,0,0.12)',
                }
            }}
        >
            <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                mb: { xs: 0.5, sm: 1 },
                flexDirection: { xs: 'column', sm: 'row' },
                textAlign: { xs: 'center', sm: 'left' }
            }}>
                <Box sx={{ 
                    p: { xs: 0.8, sm: 1 }, 
                    borderRadius: 2, 
                    backgroundColor: color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: { xs: 0.5, sm: 0 },
                    mr: { xs: 0, sm: 1.5 }
                }}>
                    {icon}
                </Box>
                <Typography
                    variant="h6"
                    sx={{
                        color: '#5e3c24',
                        fontWeight: 'medium',
                        fontSize: { xs: '0.9rem', sm: '1rem' }
                    }}
                >
                    {title}
                </Typography>
            </Box>
            <Typography
                variant="h4"
                sx={{
                    color: '#5e3c24',
                    fontWeight: 'bold',
                    textAlign: 'center',
                    fontSize: { xs: '1.25rem', sm: '1.5rem' }
                }}
            >
                {value}
            </Typography>
        </Paper>
    );
};

export default StatsCard;
