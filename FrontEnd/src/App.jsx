import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Container } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserList from "./component/UserList";
import Login from "./component/Login";
import SignUP from "./component/SignUP";
import { getUsersDetailes } from "./apiRequests/authRequest";

const App = () => {
    const token = localStorage.getItem("token");
    const [users, setUsers] = useState([]);

    const fetchData = async () => {
        try {
            const response = await getUsersDetailes();
            setUsers(response.data);
        } catch (error) {
            console.log(error.message);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleSignout = () => {
        localStorage.removeItem("token");
        toast.success("Logout Successfully!!!");
        window.location.href = "/";
    };

    return (
        <Router>
                 {/* Navbar component */}
                 <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" style={{ flexGrow: 1 }}>
                        User Management
                    </Typography>
                    {!token && (
                        <>
                            <Button color="inherit" component={Link} to="/login">
                                Login
                            </Button>
                            <Button color="inherit" component={Link} to="/">
                                Sign UP
                            </Button>
                        </>
                    )}
                    {token && (
                        <>
                            <Button color="inherit" onClick={handleSignout}>
                                Signout
                            </Button>
                            <Button color="inherit" component={Link} to="/userlist">
                                User List
                            </Button>
                        </>
                    )}
                </Toolbar>
            </AppBar>
            {/* Navbar component */}
            <Container style={{ marginTop: 20 }}>
                <Routes>
                    {token && (
                        <Route path="/userlist" element={<UserList users={users} />} />
                    )}
                    <Route path="/login" element={<Login />} />
                    <Route path="/" element={<SignUP />} />
                </Routes>
            </Container>
            <ToastContainer  />
        </Router>
    );
};

export default App;
