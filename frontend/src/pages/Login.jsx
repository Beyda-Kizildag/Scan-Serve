import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/AuthService";
import HomeIcon from "@mui/icons-material/Home";
import { Link } from "react-router-dom";
import { Box, Paper, Typography, TextField, Button, InputAdornment, IconButton } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import PersonIcon from "@mui/icons-material/Person";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const Login = () => {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setErrorMsg("");
        try {
            const data = await login(name, password);
            localStorage.setItem("user", JSON.stringify(data));

            if (!data.role) {
                setErrorMsg("Rol bilgisi eksik!");
                return;
            }

            localStorage.setItem("userRole", data.role.toLowerCase());

            if (data.role.toUpperCase() === "ADMIN") {
                navigate("/admin");
            } else if (data.role.toUpperCase() === "WAITER") {
                navigate("/waiter");
            }
        } catch (err) {
            setErrorMsg("Giriş başarısız!");
        }
    };

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "linear-gradient(135deg, #fffde4 0%, #ffd6e0 100%)",
            }}
        >
            <Paper
                elevation={10}
                sx={{
                    p: 5,
                    borderRadius: 5,
                    maxWidth: 400,
                    width: "100%",
                    boxShadow: "0 8px 32px rgba(216,27,96,0.15)",
                    position: "relative",
                }}
            >
                <Box sx={{ position: "absolute", top: 16, left: 16 }}>
                    <Link to="/">
                        <IconButton>
                            <HomeIcon fontSize="large" sx={{ color: "#d81b60" }} />
                        </IconButton>
                    </Link>
                </Box>
                <Typography
                    variant="h4"
                    fontWeight="bold"
                    color="#d81b60"
                    textAlign="center"
                    mb={2}
                    sx={{ letterSpacing: 1 }}
                >
                    Kafe Giriş
                </Typography>
                <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    textAlign="center"
                    mb={3}
                >
                    Lütfen giriş bilgilerinizi giriniz
                </Typography>
                <form onSubmit={handleLogin}>
                    <TextField
                        fullWidth
                        label="Kullanıcı Adı"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        margin="normal"
                        variant="outlined"
                        required
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <PersonIcon color="action" />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <TextField
                        fullWidth
                        label="Şifre"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        margin="normal"
                        variant="outlined"
                        required
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <LockIcon color="action" />
                                </InputAdornment>
                            ),
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={handleClickShowPassword}
                                        edge="end"
                                        aria-label="toggle password visibility"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    {errorMsg && (
                        <Typography color="error" textAlign="center" mt={1} fontSize={14}>
                            {errorMsg}
                        </Typography>
                    )}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{
                            mt: 3,
                            py: 1.5,
                            background: "linear-gradient(90deg, #d81b60 0%, #ffb74d 100%)",
                            fontWeight: "bold",
                            fontSize: "1.1rem",
                            letterSpacing: 1,
                            boxShadow: "0 4px 16px rgba(216,27,96,0.12)",
                            '&:hover': {
                                background: "linear-gradient(90deg, #ffb74d 0%, #d81b60 100%)",
                            }
                        }}
                    >
                        Giriş Yap
                    </Button>
                </form>
            </Paper>
        </Box>
    );
};

export default Login;