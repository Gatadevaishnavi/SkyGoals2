import React from "react";
import { useForm } from "react-hook-form";
import { TextField, Button, Typography } from "@mui/material";
import { signup } from "../apiRequests/authRequest";
import { toast } from "react-toastify";

const SignUP = ({ onRegister }) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        await signup(data);
        toast.success("User registered successfully!");
        reset(); // Clear the form on successful submission
    };

    return (
        <div>
            <Typography variant="h4" gutterBottom>
                Register
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    label="First Name"
                    fullWidth
                    margin="normal"
                    {...register("first_name", {
                        required: "First Name is required",
                    })}
                    error={!!errors.firstName}
                    helperText={errors.firstName?.message}
                />
                <TextField
                    label="Last Name"
                    fullWidth
                    margin="normal"
                    {...register("last_name", {
                        required: "Last Name is required",
                    })}
                    error={!!errors.lastName}
                    helperText={errors.lastName?.message}
                />
                <TextField
                    label="Email"
                    type="email"
                    fullWidth
                    margin="normal"
                    {...register("email", {
                        required: "Email is required",
                        pattern: {
                            value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                            message: "Invalid email format",
                        },
                    })}
                    error={!!errors.email}
                    helperText={errors.email?.message}
                />
                <TextField
                    label="Password"
                    type="password"
                    fullWidth
                    margin="normal"
                    {...register("password", {
                        required: "Password is required",
                        minLength: {
                            value: 6,
                            message: "Password must be at least 6 characters",
                        },
                    })}
                    error={!!errors.password}
                    helperText={errors.password?.message}
                />
                <TextField
                    label="Mobile No"
                    fullWidth
                    margin="normal"
                    {...register("mobileNo", {
                        required: "Mobile No is required",
                        pattern: {
                            value: /^\d{10}$/,
                            message: "Mobile No must be 10 digits",
                        },
                    })}
                    error={!!errors.mobileNo}
                    helperText={errors.mobileNo?.message}
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                >
                    Register
                </Button>
            </form>
        </div>
    );
};

export default SignUP;
