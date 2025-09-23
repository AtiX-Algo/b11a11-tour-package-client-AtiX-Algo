import { Link } from "react-router-dom";

const ErrorPage = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-base-200">
            <div className="text-center">
                <img src="https://i.ibb.co/C9N1b68/404-animation.gif" alt="404 Not Found" className="max-w-sm mx-auto"/>
                <h1 className="text-4xl font-bold mt-8">Oops! You seem lost in the Himalayas.</h1>
                <p className="py-6">The page you are looking for does not exist.</p>
                <Link to="/" className="btn btn-primary">Back to Home</Link>
            </div>
        </div>
    );
};

export default ErrorPage;