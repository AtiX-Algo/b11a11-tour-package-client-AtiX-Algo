// src/pages/Register.jsx

import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form"; // 1. Import useForm
import { AuthContext } from "../contexts/AuthContext";
import toast from "react-hot-toast";

const Register = () => {
    const { createUser, updateUserProfile } = useContext(AuthContext);
    const navigate = useNavigate();

    // 2. Initialize the hook
    const { 
        register,         // Connects inputs to the form
        handleSubmit,     // Wraps your submission handler
        formState: { errors } // Contains validation errors
    } = useForm();

    // 3. The submission logic now receives validated form data directly
    const onSubmit = (data) => {
        const { name, photo, email, password } = data;

        createUser(email, password)
            .then(() => {
                updateUserProfile(name, photo)
                    .then(() => {
                        toast.success('Registration successful!');
                        // Optional: Save user to DB here
                        navigate('/');
                    })
                    .catch(error => toast.error(error.message));
            })
            .catch(error => toast.error(error.message));
    };

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Register now!</h1>
                    <p className="py-6">Join our community of travelers. Create your account to start planning your next journey with us.</p>
                </div>
                <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    {/* 4. Use handleSubmit to wrap your onSubmit function */}
                    <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                        
                        {/* Name */}
                        <div className="form-control">
                            <label className="label"><span className="label-text">Name</span></label>
                            <input 
                                type="text" 
                                {...register("name", { required: "Name is required" })} 
                                placeholder="Your Name" 
                                className="input input-bordered" 
                            />
                            {errors.name && <span className="text-red-500 text-sm mt-1">{errors.name.message}</span>}
                        </div>

                        {/* Photo */}
                        <div className="form-control">
                            <label className="label"><span className="label-text">Photo URL</span></label>
                            <input 
                                type="text" 
                                {...register("photo", { required: "Photo URL is required" })} 
                                placeholder="Photo URL" 
                                className="input input-bordered" 
                            />
                            {errors.photo && <span className="text-red-500 text-sm mt-1">{errors.photo.message}</span>}
                        </div>

                        {/* Email */}
                        <div className="form-control">
                            <label className="label"><span className="label-text">Email</span></label>
                            <input 
                                type="email" 
                                {...register("email", { required: "Email is required" })} 
                                placeholder="email" 
                                className="input input-bordered" 
                            />
                            {errors.email && <span className="text-red-500 text-sm mt-1">{errors.email.message}</span>}
                        </div>

                        {/* Password */}
                        <div className="form-control">
                            <label className="label"><span className="label-text">Password</span></label>
                            <input 
                                type="password" 
                                {...register("password", { 
                                    required: "Password is required",
                                    minLength: { value: 6, message: "Password must be at least 6 characters" },
                                    pattern: { 
                                        value: /^(?=.*[A-Z])(?=.*[a-z]).*$/, 
                                        message: "Password must have an uppercase and a lowercase letter" 
                                    }
                                })} 
                                placeholder="password" 
                                className="input input-bordered" 
                            />
                            {errors.password && <span className="text-red-500 text-sm mt-1">{errors.password.message}</span>}
                        </div>

                        {/* Submit Button */}
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Register</button>
                        </div>
                    </form>

                    <p className="text-center mb-4">
                        Already have an account? <Link to="/login" className="font-bold text-primary">Login</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
