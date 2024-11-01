import React, { useState } from "react";
import { TextField, Button, Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { login } from "../apiRequests/authRequest";
import { toast } from "react-toastify";

const Login = () => {
    const [credentials, setCredentials] = useState({ email: "", password: "" });

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await login(credentials);
        console.log(response);
        localStorage.setItem("token", response.data.token);
        toast.success("Login successful!");
        window.location.href = "/userlist";
    };

    return (
        <Box sx={{ padding: 2 }}>
            <Typography variant="h4">Login</Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    name="email"
                    label="Email"
                    type="email"
                    value={credentials.email}
                    onChange={handleChange}
                    required
                    fullWidth
                    margin="normal"
                />
                <TextField
                    name="password"
                    label="Password"
                    type="password"
                    value={credentials.password}
                    onChange={handleChange}
                    required
                    fullWidth
                    margin="normal"
                />
                <Button type="submit" variant="contained">
                    Login
                </Button>
            </form>
            <Typography variant="body2" sx={{ marginTop: 2 }}>
                Don't have an account? <Link to="/">Register here</Link>
            </Typography>
        </Box>
    );
};

export default Login;
