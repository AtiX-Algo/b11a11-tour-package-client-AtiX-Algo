// src/pages/ManageMyPackages.jsx

import { useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

const ManageMyPackages = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const [packages, setPackages] = useState([]);
    const [selectedPackage, setSelectedPackage] = useState(null);

    // Fetch packages for the logged-in user
    const fetchPackages = useCallback(() => {
        if (user?.email) {
            axiosSecure.get(`/my-packages/${user.email}`)
                .then(res => setPackages(res.data))
               // .catch(err => console.error(err));
        }
    }, [axiosSecure, user?.email]);

    useEffect(() => {
        fetchPackages();
    }, [fetchPackages]);

    // Delete handler
    const handleDelete = id => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/packages/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            Swal.fire("Deleted!", "Your package has been deleted.", "success");
                            fetchPackages(); // Re-fetch packages
                        }
                    })
                    .catch(error => {
                        toast.error("Delete failed: " + error.message);
                    });
            }
        });
    };

    // Update handler
    const handleUpdate = e => {
        e.preventDefault();
        const form = e.target;

        const updatedPackage = {
            tour_name: form.tour_name.value,
            image: form.image.value,
            duration: form.duration.value,
            price: parseFloat(form.price.value),
            departure_date: form.departure_date.value,
            package_details: form.package_details.value,
            guide_contact_no: form.guide_contact_no.value
        };

        axiosSecure.put(`/packages/${selectedPackage._id}`, updatedPackage)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    toast.success("Package updated successfully!");
                    fetchPackages(); // Refresh data
                    document.getElementById('update_modal').close();
                } else {
                    toast.error("No changes were made.");
                }
            })
            .catch(error => {
                toast.error("Update failed: " + error.message);
            });
    };

    const openUpdateModal = (pkg) => {
        setSelectedPackage(pkg);
        document.getElementById('update_modal').showModal();
    };

    return (
        <div className="container mx-auto px-4 py-10">
            <h1 className="text-4xl font-bold text-center mb-8">Manage My Packages</h1>
            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Tour Name</th>
                            <th>Price</th>
                            <th>Bookings</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {packages.map(pkg => (
                            <tr key={pkg._id}>
                                <td>{pkg.tour_name}</td>
                                <td>${pkg.price}</td>
                                <td>{pkg.bookingCount || 0}</td>
                                <td className="space-x-2">
                                    <button
                                        onClick={() => openUpdateModal(pkg)}
                                        className="btn btn-primary btn-sm"
                                    >
                                        Update
                                    </button>
                                    <button
                                        onClick={() => handleDelete(pkg._id)}
                                        className="btn btn-error btn-sm"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Update Modal */}
            <dialog id="update_modal" className="modal">
                <div className="modal-box w-11/12 max-w-2xl">
                    <h3 className="font-bold text-lg">
                        Update: {selectedPackage?.tour_name}
                    </h3>
                    <form onSubmit={handleUpdate} method="dialog" className="mt-4 space-y-4">
                        {/* Close button */}
                        <button
                            type="button"
                            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                            onClick={() => document.getElementById('update_modal').close()}
                        >
                            ✕
                        </button>

                        {/* Tour Name */}
                        <div className="form-control">
                            <label className="label"><span className="label-text">Tour Name</span></label>
                            <input
                                type="text"
                                name="tour_name"
                                defaultValue={selectedPackage?.tour_name}
                                className="input input-bordered"
                                required
                            />
                        </div>
                        {/* Image URL */}
                        <div className="form-control">
                            <label className="label"><span className="label-text">Image URL</span></label>
                            <input
                                type="text"
                                name="image"
                                defaultValue={selectedPackage?.image}
                                className="input input-bordered"
                                required
                            />
                        </div>
                        {/* Duration */}
                        <div className="form-control">
                            <label className="label"><span className="label-text">Duration</span></label>
                            <input
                                type="text"
                                name="duration"
                                defaultValue={selectedPackage?.duration}
                                className="input input-bordered"
                                required
                            />
                        </div>
                        {/* Price */}
                        <div className="form-control">
                            <label className="label"><span className="label-text">Price</span></label>
                            <input
                                type="number"
                                name="price"
                                defaultValue={selectedPackage?.price}
                                className="input input-bordered"
                                required
                            />
                        </div>
                        {/* Departure Date */}
                        <div className="form-control">
                            <label className="label"><span className="label-text">Departure Date</span></label>
                            <input type="date" name="departure_date" defaultValue={selectedPackage?.departure_date} className="input input-bordered" required />
                        </div>

                        {/* Package Details */}
                        <div className="form-control">
                            <label className="label"><span className="label-text">Package Details</span></label>
                            <textarea name="package_details" defaultValue={selectedPackage?.package_details} className="textarea textarea-bordered" required></textarea>
                        </div>
                        {/* Guide Contact No */}
                        <div className="form-control">
                            <label className="label"><span className="label-text">Your Contact No.</span></label>
                            <input type="text" name="guide_contact_no" defaultValue={selectedPackage?.guide_contact_no} className="input input-bordered" required />
                        </div>

                        {/* Submit Button */}
                        <div className="modal-action">
                            <button type="submit" className="btn btn-primary">Save Changes</button>
                        </div>
                    </form>
                </div>
            </dialog>
        </div>
    );
};

export default ManageMyPackages;
