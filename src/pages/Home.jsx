import { useEffect, useState } from "react";
import axios from "axios";
import PackageCard from "../components/PackageCard";
import { Link } from "react-router-dom";

const Home = () => {
    const [packages, setPackages] = useState([]);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/packages-featured`)
            .then(res => {
                setPackages(res.data);
            })
    }, [])

    return (
        <div>
            {/* Hero Banner */}
            <div className="hero min-h-[60vh]" style={{ backgroundImage: 'url(https://i.ibb.co/L5rMhP5/hero-banner.jpg)' }}>
                <div className="hero-overlay bg-opacity-60"></div>
                <div className="hero-content text-center text-neutral-content">
                    <div className="max-w-md">
                        <h1 className="mb-5 text-5xl font-bold">Your Journey Begins Here</h1>
                        <p className="mb-5">Discover unforgettable travel experiences with our expertly crafted tour packages. Adventure awaits!</p>
                        <Link to="/all-packages" className="btn btn-primary">Explore All Packages</Link>
                    </div>
                </div>
            </div>

            {/* Featured Packages Section */}
            <div className="container mx-auto px-4 py-16">
                <h2 className="text-4xl font-bold text-center mb-10">Featured Packages</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {packages.map(item => <PackageCard key={item._id} item={item} />)}
                </div>
                <div className="text-center mt-10">
                    <Link to="/all-packages" className="btn btn-primary">Show All Packages</Link>
                </div>
            </div>
            
            {/* Extra Section 1: Why Choose Us */}
            <div className="bg-base-200 py-16">
                 <div className="container mx-auto px-4 text-center">
                    <h2 className="text-4xl font-bold mb-10">Why Choose TourTrek?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="p-6">
                            <h3 className="text-2xl font-semibold mb-2">Expert Guides</h3>
                            <p>Our knowledgeable guides are passionate about sharing the best local secrets.</p>
                        </div>
                        <div className="p-6">
                            <h3 className="text-2xl font-semibold mb-2">Tailored Itineraries</h3>
                            <p>We craft unique travel plans that cater to your interests and preferences.</p>
                        </div>
                        <div className="p-6">
                            <h3 className="text-2xl font-semibold mb-2">Unbeatable Value</h3>
                            <p>Get the most out of your travel budget without compromising on quality or experience.</p>
                        </div>
                    </div>
                 </div>
            </div>

            {/* Extra Section 2: Top Destinations */}
             <div className="container mx-auto px-4 py-16">
                <h2 className="text-4xl font-bold text-center mb-10">Top Destinations</h2>
                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                     <img src="https://i.ibb.co/k2qQxV7/dest-1.jpg" alt="Destination" className="rounded-lg shadow-lg h-64 w-full object-cover"/>
                     <img src="https://i.ibb.co/hZ2B1sK/dest-2.jpg" alt="Destination" className="rounded-lg shadow-lg h-64 w-full object-cover"/>
                     <img src="https://i.ibb.co/n6v9m9d/dest-3.jpg" alt="Destination" className="rounded-lg shadow-lg h-64 w-full object-cover"/>
                     <img src="https://i.ibb.co/Wc2g1p9/dest-4.jpg" alt="Destination" className="rounded-lg shadow-lg h-64 w-full object-cover"/>
                 </div>
             </div>
        </div>
    );
};

export default Home;