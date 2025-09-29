import { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import toast from "react-hot-toast";
import useAxiosSecure from "../hooks/useAxiosSecure";

const PackageDetails = () => {
    const packageData = useLoaderData();
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();

    if (!packageData) {
        return <div className="text-center py-20">Package not found or still loading...</div>;
    }

    const { _id, image, tour_name, price, duration, departure_date, departure_location, destination, package_details, guide_name, guide_photo, guide_contact_no, bookingCount } = packageData;

    const handleBooking = e => {
        e.preventDefault();
        const notes = e.target.notes.value;

        const bookingData = {
            tour_id: _id,
            tour_name,
            guide_name,
            buyer_name: user.displayName,
            buyer_email: user.email,
            booking_date: new Date(),
            departure_date,
            notes,
            status: "pending"
        }

        axiosSecure.post('/bookings', bookingData)
            .then(res => {
                if(res.data.bookingResult.insertedId){
                    toast.success('Booking confirmed!');
                    document.getElementById('booking_modal').close();
                }
            })
            .catch(error => {
                toast.error(error.message);
            })
    }

    return (
        <div className="container mx-auto px-4 py-10">
            <div className="card lg:card-side bg-base-100 shadow-xl">
                <figure className="lg:w-1/2"><img src={image} alt={tour_name} className="w-full h-full object-cover"/></figure>
                <div className="card-body lg:w-1/2">
                    <h2 className="card-title text-3xl">{tour_name}</h2>
                    <p className="mt-4">{package_details}</p>
                    <div className="divider"></div>
                    <div className="space-y-2">
                        <p><span className="font-semibold">Destination:</span> {destination}</p>
                        <p><span className="font-semibold">Departure Location:</span> {departure_location}</p>
                        <p><span className="font-semibold">Duration:</span> {duration}</p>
                        <p><span className="font-semibold">Departure Date:</span> {departure_date}</p>
                        <p><span className="font-semibold">Total Bookings:</span> {bookingCount || 0}</p>
                        <p className="text-2xl font-bold text-primary">Price: ${price}</p>
                    </div>
                    <div className="divider"></div>
                    <div className="flex items-center gap-4">
                        <div className="avatar">
                            <div className="w-16 rounded-full">
                                <img src={guide_photo} />
                            </div>
                        </div>
                        <div>
                            <h3 className="font-bold">Your Guide: {guide_name}</h3>
                            <p>Contact: {guide_contact_no}</p>
                        </div>
                    </div>
                    <div className="card-actions justify-end mt-4">
                        <button className="btn btn-primary" onClick={() => document.getElementById('booking_modal').showModal()}>Book Now</button>
                    </div>
                </div>
            </div>

            {/* Booking Modal */}
            <dialog id="booking_modal" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Confirm Your Booking</h3>
                    <form onSubmit={handleBooking}>
                        <div className="form-control">
                            <label className="label"><span className="label-text">Package Name</span></label>
                            <input type="text" value={tour_name} className="input input-bordered" disabled />
                        </div>
                        <div className="form-control">
                            <label className="label"><span className="label-text">Price</span></label>
                            <input type="text" value={`$${price}`} className="input input-bordered" disabled />
                        </div>
                        <div className="form-control">
                            <label className="label"><span className="label-text">Your Name</span></label>
                            <input type="text" value={user?.displayName} className="input input-bordered" disabled />
                        </div>
                        <div className="form-control">
                            <label className="label"><span className="label-text">Your Email</span></label>
                            <input type="text" value={user?.email} className="input input-bordered" disabled />
                        </div>
                        <div className="form-control">
                            <label className="label"><span className="label-text">Special Note (Optional)</span></label>
                            <textarea name="notes" className="textarea textarea-bordered"></textarea>
                        </div>
                        <div className="modal-action">
                            <button type="button" className="btn" onClick={() => document.getElementById('booking_modal').close()}>Cancel</button>
                            <button type="submit" className="btn btn-primary">Book Now</button>
                        </div>
                    </form>
                </div>
            </dialog>
        </div>
    );
};

export default PackageDetails;