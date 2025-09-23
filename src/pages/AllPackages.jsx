import { useEffect, useState } from "react";
import axios from "axios";
import PackageCard from "../components/PackageCard";

const AllPackages = () => {
    const [packages, setPackages] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchPackages = async () => {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/packages?search=${searchTerm}`);
            setPackages(response.data);
        };
        fetchPackages();
    }, [searchTerm]);

    const handleSearch = (e) => {
        e.preventDefault();
        setSearchTerm(e.target.search.value);
    }

    return (
        <div className="container mx-auto px-4 py-10">
            <h1 className="text-4xl font-bold text-center mb-8">All Tour Packages</h1>
            
            <div className="text-center mb-8">
                <form onSubmit={handleSearch}>
                    <input type="text" name="search" placeholder="Search by tour name..." className="input input-bordered w-full max-w-xs mr-2" />
                    <button type="submit" className="btn btn-primary">Search</button>
                </form>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {packages.map(item => <PackageCard key={item._id} item={item} />)}
            </div>
        </div>
    );
};

export default AllPackages;