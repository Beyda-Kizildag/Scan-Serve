import React, { useState, useEffect } from 'react';
import { authService } from '../services/AuthService';
import { waiterService } from '../services/waiterService';
import { waiterPerformanceService } from '../services/waiterPerformanceService';
import {
    Box,
    Container,
    Typography,
    Paper,
    Button,
    TextField,
    List,
    ListItem,
    ListItemText,
    Divider,
    Alert
} from '@mui/material';

const ServiceTestPage = () => {
    const [testResults, setTestResults] = useState([]);
    const [error, setError] = useState(null);
    const [loginData, setLoginData] = useState({ name: '', password: '' });
    const [waiterData, setWaiterData] = useState({ name: '', email: '' });

    const addTestResult = (service, method, result) => {
        setTestResults(prev => [...prev, { service, method, result, timestamp: new Date() }]);
    };

    const testAuthService = async () => {
        try {
            // Login testi
            const loginResult = await authService.login(loginData.name, loginData.password);
            addTestResult('AuthService', 'login', 'Başarılı');
            
            // Logout testi
            const logoutResult = await authService.logout();
            addTestResult('AuthService', 'logout', 'Başarılı');
        } catch (error) {
            setError(error.message);
            addTestResult('AuthService', 'login/logout', 'Başarısız');
        }
    };

    const testWaiterService = async () => {
        try {
            // Tüm garsonları getir
            const waiters = await waiterService.getAllWaiters();
            addTestResult('WaiterService', 'getAllWaiters', 'Başarılı');
            
            if (waiters.length > 0) {
                // İlk garsonun detaylarını getir
                const waiter = await waiterService.getWaiterById(waiters[0].id);
                addTestResult('WaiterService', 'getWaiterById', 'Başarılı');
            }
        } catch (error) {
            setError(error.message);
            addTestResult('WaiterService', 'getAllWaiters/getWaiterById', 'Başarısız');
        }
    };

    const testWaiterPerformanceService = async () => {
        try {
            const today = new Date().toISOString().split('T')[0];
            const performance = await waiterPerformanceService.getWaiterPerformance('1', today);
            addTestResult('WaiterPerformanceService', 'getWaiterPerformance', 'Başarılı');
        } catch (error) {
            setError(error.message);
            addTestResult('WaiterPerformanceService', 'getWaiterPerformance', 'Başarısız');
        }
    };

    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <Typography variant="h4" gutterBottom>
                Servis Test Sayfası
            </Typography>

            {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
            )}

            <Paper sx={{ p: 3, mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                    Auth Service Test
                </Typography>
                <Box sx={{ mb: 2 }}>
                    <TextField
                        label="Kullanıcı Adı"
                        value={loginData.name}
                        onChange={(e) => setLoginData({ ...loginData, name: e.target.value })}
                        sx={{ mr: 2 }}
                    />
                    <TextField
                        label="Şifre"
                        type="password"
                        value={loginData.password}
                        onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                        sx={{ mr: 2 }}
                    />
                    <Button variant="contained" onClick={testAuthService}>
                        Auth Service Test
                    </Button>
                </Box>
            </Paper>

            <Paper sx={{ p: 3, mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                    Waiter Service Test
                </Typography>
                <Box sx={{ mb: 2 }}>
                    <Button variant="contained" onClick={testWaiterService}>
                        Waiter Service Test
                    </Button>
                </Box>
            </Paper>

            <Paper sx={{ p: 3, mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                    Waiter Performance Service Test
                </Typography>
                <Box sx={{ mb: 2 }}>
                    <Button variant="contained" onClick={testWaiterPerformanceService}>
                        Performance Service Test
                    </Button>
                </Box>
            </Paper>

            <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                    Test Sonuçları
                </Typography>
                <List>
                    {testResults.map((result, index) => (
                        <React.Fragment key={index}>
                            <ListItem>
                                <ListItemText
                                    primary={`${result.service} - ${result.method}`}
                                    secondary={`Sonuç: ${result.result} - ${result.timestamp.toLocaleTimeString()}`}
                                />
                            </ListItem>
                            {index < testResults.length - 1 && <Divider />}
                        </React.Fragment>
                    ))}
                </List>
            </Paper>
        </Container>
    );
};

export default ServiceTestPage; 