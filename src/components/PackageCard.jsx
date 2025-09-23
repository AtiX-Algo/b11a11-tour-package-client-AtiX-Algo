import { Link } from "react-router-dom";

const PackageCard = ({ item }) => {
    const { _id, image, tour_name, price, duration, departure_date, guide_name } = item;
    return (
        <div className="card card-compact bg-base-100 shadow-xl">
            <figure><img src={image} alt={tour_name} className="h-56 w-full object-cover" /></figure>
            <div className="card-body">
                <h2 className="card-title">{tour_name}</h2>
                <p><span className="font-semibold">Guide:</span> {guide_name}</p>
                <p><span className="font-semibold">Duration:</span> {duration}</p>
                <p><span className="font-semibold">Departs on:</span> {departure_date}</p>
                <div className="card-actions justify-between items-center mt-2">
                    <p className="text-xl font-bold text-primary">${price}</p>
                    <Link to={`/package/${_id}`} className="btn btn-primary">View Details</Link>
                </div>
            </div>
        </div>
    );
};

export default PackageCard;