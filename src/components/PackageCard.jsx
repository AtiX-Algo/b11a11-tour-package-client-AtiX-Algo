// src/components/PackageCard.jsx

import { Link } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion"; 

const PackageCard = ({ item }) => {
  const { _id, image, tour_name, price, duration, departure_date, guide_name } = item;

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
      className="card card-compact bg-base-100 shadow-xl"
    >
      <figure>
        <img src={image} alt={tour_name} className="h-56 w-full object-cover" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{tour_name}</h2>
        <p>
          <span className="font-semibold">Guide:</span> {guide_name}
        </p>
        <p>
          <span className="font-semibold">Duration:</span> {duration}
        </p>
        <p>
          <span className="font-semibold">Departs on:</span> {departure_date}
        </p>
        <div className="card-actions justify-between items-center mt-2">
          <p className="text-xl font-bold text-primary">${price}</p>
          <Link to={`/package/${_id}`} className="btn btn-primary">
            View Details
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default PackageCard;
