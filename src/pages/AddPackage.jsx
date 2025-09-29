// src/pages/AddPackage.jsx

import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import useAxiosSecure from "../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form"; // Using react-hook-form for consistency

const AddPackage = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const { register, handleSubmit, reset } = useForm();

    const onSubmit = (data) => {
        const newPackage = {
            tour_name: data.tour_name,
            image: data.image,
            duration: data.duration,
            departure_location: data.departure_location,
            destination: data.destination,
            price: parseFloat(data.price),
            departure_date: data.departure_date,
            package_details: data.package_details,
            guide_contact_no: data.guide_contact_no,
            guide_name: user.displayName,
            guide_email: user.email,
            guide_photo: user.photoURL,
            bookingCount: 0,
            created_at: new Date()
        };

        axiosSecure.post('/packages', newPackage)
            .then(res => {
                if (res.data.insertedId) {
                    toast.success('Package added successfully!');
                    reset(); // Clears the form after submission
                }
            })
            .catch(error => {
                toast.error("Failed to add package. " + error.message);
            });
    };

    return (
        <div className="container mx-auto px-4 py-10">
            <h1 className="text-4xl font-bold text-center mb-8">Add a New Tour Package</h1>
            <div className="max-w-4xl mx-auto bg-base-100 p-8 rounded-lg shadow-lg">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* --- Row 1: Tour Name & Image URL --- */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="form-control">
                            <label className="label"><span className="label-text">Tour Name</span></label>
                            <input type="text" {...register("tour_name", { required: true })} className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label"><span className="label-text">Image URL</span></label>
                            <input type="text" {...register("image", { required: true })} className="input input-bordered" />
                        </div>
                    </div>
                    {/* --- Row 2: Duration & Departure Location --- */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="form-control">
                            <label className="label"><span className="label-text">Duration (e.g., 3 Days 2 Nights)</span></label>
                            <input type="text" {...register("duration", { required: true })} className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label"><span className="label-text">Departure Location</span></label>
                            <input type="text" {...register("departure_location", { required: true })} className="input input-bordered" />
                        </div>
                    </div>
                    {/* --- Row 3: Destination & Price --- */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="form-control">
                            <label className="label"><span className="label-text">Destination</span></label>
                            <input type="text" {...register("destination", { required: true })} className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label"><span className="label-text">Price ($)</span></label>
                            <input type="number" {...register("price", { required: true })} className="input input-bordered" />
                        </div>
                    </div>
                    {/* --- Row 4: Departure Date & Contact No --- */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="form-control">
                            <label className="label"><span className="label-text">Departure Date</span></label>
                            <input type="date" {...register("departure_date", { required: true })} className="input input-bordered" />
                        </div>
                         <div className="form-control">
                            <label className="label"><span className="label-text">Your Contact No.</span></label>
                            <input type="text" {...register("guide_contact_no", { required: true })} className="input input-bordered" />
                        </div>
                    </div>
                    {/* --- Row 5: Package Details --- */}
                    <div className="form-control">
                        <label className="label"><span className="label-text">Package Details</span></label>
                        <textarea {...register("package_details", { required: true })} className="textarea textarea-bordered h-24"></textarea>
                    </div>

                    <div className="form-control mt-6">
                        <button type="submit" className="btn btn-primary">Add Package</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddPackage;