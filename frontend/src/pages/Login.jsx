// src/pages/Login.jsx
import React, { useState } from "react";
import { login } from "../services/AuthService";
import { useNavigate } from "react-router-dom";

const Login = () => {

    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
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


            console.log("Login response:", data);

            // Rol bazlı yönlendirme
            if (data.role?.toUpperCase() === "ADMIN") {
                navigate("/admin");
            } else if (data.role?.toUpperCase() === "WAITER") {
                navigate("/waiter");
            }
        } catch (err) {
            setErrorMsg("Giriş başarısız!");
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <form
                onSubmit={handleLogin}
                className="bg-white p-6 rounded shadow-md w-80"
            >
                <h2 className="text-2xl font-bold mb-4 text-center">Giriş Yap</h2>

                {errorMsg && (
                    <p className="text-red-500 text-sm mb-2 text-center">{errorMsg}</p>
                )}

                <input
                    type="text"
                    placeholder="Kullanıcı Adı"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-2 border rounded mb-3"
                    required
                />

                <input
                    type="password"
                    placeholder="Şifre"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-2 border rounded mb-4"
                    required
                />

                <button
                    type="submit"
                    className="bg-blue-500 text-white w-full py-2 rounded hover:bg-blue-600"
                >
                    Giriş Yap
                </button>
            </form>
        </div>
    );
};

export default Login;
