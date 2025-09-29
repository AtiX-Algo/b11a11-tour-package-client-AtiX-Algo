import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import toast from "react-hot-toast";

const Login = () => {
    const { signIn, googleSignIn } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const handleLogin = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        
        signIn(email, password)
            .then(() => {
                toast.success('Login Successful!');
                navigate(from, { replace: true });
            })
            .catch(error => {
                toast.error(error.message);
            });
    }
    
    const handleGoogleSignIn = () => {
        googleSignIn()
        .then(() => {
            toast.success('Login Successful!');
            navigate(from, { replace: true });
        })
        .catch(error => {
            toast.error(error.message);
        });
    }

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                    <p className="py-6">Welcome back! Access your account to manage your bookings and explore new adventures.</p>
                </div>
                <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handleLogin} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" name="email" placeholder="email" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" name="password" placeholder="password" className="input input-bordered" required />
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Login</button>
                        </div>
                    </form>
                    <div className="divider px-8">OR</div>
                    <div className="px-8 pb-8">
                         <button onClick={handleGoogleSignIn} className="btn btn-outline w-full">Continue with Google</button>
                    </div>
                    <p className="text-center mb-4">New to The Vagabond Tour? <Link to="/register" className="font-bold text-primary">Sign Up</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Login;