import { useEffect, useState } from "react";
import axios from "axios";
import PackageCard from "../components/PackageCard";
import { Link } from "react-router-dom";

const Home = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get('https://the-vagabond-tour.onrender.com/packages-featured')
      .then((res) => {
        console.log("Data received from API:", res.data);
        setPackages(Array.isArray(res.data) ? res.data : []);
      })
      .catch((error) => {
        console.error("Error fetching packages:", error);
        setPackages([]);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="text-center py-20 text-xl font-semibold">
        Loading packages...
      </div>
    );
  }

  return (
    <div>
      {/* Hero Banner */}
      <div
        className="hero min-h-[60vh]"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1470&q=80')",
        }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">
              Your Journey Begins Here
            </h1>
            <p className="mb-5">
              Discover unforgettable travel experiences with our expertly
              crafted tour packages. Adventure awaits!
            </p>
            <Link to="/all-packages" className="btn btn-primary">
              Explore All Packages
            </Link>
          </div>
        </div>
      </div>

      {/* Featured Packages Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-center mb-10">
          Featured Packages
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.isArray(packages) && packages.map((item) => (
            <PackageCard key={item._id} item={item} />
          ))}
        </div>
        <div className="text-center mt-10">
          <Link to="/all-packages" className="btn btn-primary">
            Show All Packages
          </Link>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="bg-base-200 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-10">Why Choose TourTrek?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6">
              <h3 className="text-2xl font-semibold mb-2">Expert Guides</h3>
              <p>
                Our knowledgeable guides are passionate about sharing the best
                local secrets.
              </p>
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-semibold mb-2">Tailored Itineraries</h3>
              <p>
                We craft unique travel plans that cater to your interests and
                preferences.
              </p>
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-semibold mb-2">Unbeatable Value</h3>
              <p>
                Get the most out of your travel budget without compromising on
                quality or experience.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Top Destinations Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-center mb-10">Top Destinations</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <img
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80"
            alt="Destination"
            className="rounded-lg shadow-lg h-64 w-full object-cover"
          />
          <img
            src="https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=800&q=80"
            alt="Destination"
            className="rounded-lg shadow-lg h-64 w-full object-cover"
          />
          <img
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"
            alt="Destination"
            className="rounded-lg shadow-lg h-64 w-full object-cover"
          />
          <img
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80"
            alt="Destination"
            className="rounded-lg shadow-lg h-64 w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
