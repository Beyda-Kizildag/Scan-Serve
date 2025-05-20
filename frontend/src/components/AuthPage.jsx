// import React, { useState } from 'react';
// import axios from 'axios';
// import { TextField, Button, Typography, Paper, Box } from '@mui/material';
// import './AuthPage.css';

// function AuthPage() {
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const [isRegistering, setIsRegistering] = useState(false);

//     const handleLogin = async () => {
//         try {
//             if (isRegistering) {
//                 // Sadece kullanıcı kaydı (rol yok)
//                 await axios.post('http://localhost:8080/api/auth/register', { username, password });
//                 alert('Kayıt başarılı! Lütfen giriş yapın.');
//                 setIsRegistering(false);
//             } else {
//                 // Giriş işlemi
//                 const response = await axios.post('http://localhost:8080/api/auth/login', { username, password });
//                 const { token, userRole } = response.data;
//                 localStorage.setItem('authToken', token); // auth
//                 localStorage.setItem('userRole', userRole); // Kullanıcı rolünü localStorage'a kaydet

//                 // Sadece admin kullanıcı adı ve şifresiyle admin paneline yönlendir
//                 if (userRole === 'admin') {
//                     window.location.href = '/admin';
//                 } else {
//                     window.location.href = '/home';
//                 }
//             }
//         } catch (error) {
//             alert('Giriş/Kayıt başarısız. Bilgilerinizi kontrol edin.');
//         }
//     };

//     return (
//         <Box
//             sx={{
//                 display: 'flex',
//                 justifyContent: 'center',
//                 alignItems: 'center',
//                 height: '100vh',
//                 backgroundColor: '#ffe4e1',
//             }}
//         >
//             <Paper elevation={3} sx={{ padding: 4, maxWidth: 400, width: '100%' }}>
//                 <Typography variant="h4" align="center" gutterBottom>
//                     {isRegistering ? 'Kayıt Ol' : 'Giriş Yap'}
//                 </Typography>
//                 <Box component="form" noValidate autoComplete="off">
//                     <TextField
//                         fullWidth
//                         margin="normal"
//                         label="Kullanıcı Adı"
//                         value={username}
//                         onChange={(e) => setUsername(e.target.value)}
//                     />
//                     <TextField
//                         fullWidth
//                         margin="normal"
//                         type="password"
//                         label="Şifre"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                     />
//                     <Button
//                         fullWidth
//                         variant="contained"
//                         color="primary"
//                         onClick={handleLogin}
//                         sx={{ marginY: 2, backgroundColor: '#ff69b4' }}
//                     >
//                         {isRegistering ? 'Kayıt Ol' : 'Giriş Yap'}
//                     </Button>
//                     <Typography
//                         variant="body2"
//                         align="center"
//                         onClick={() => setIsRegistering(!isRegistering)}
//                         sx={{ cursor: 'pointer', color: '#ff1493' }}
//                     >
//                         {isRegistering ? 'Zaten hesabın var mı? Giriş Yap' : "Hesabın yok mu? Kayıt Ol"}
//                     </Typography>
//                 </Box>
//             </Paper>
//         </Box>
//     );
// }

// export default AuthPage;