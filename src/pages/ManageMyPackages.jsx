import { useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

const ManageMyPackages = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const [packages, setPackages] = useState([]);
    const [selectedPackage, setSelectedPackage] = useState(null);

    const fetchPackages = useCallback(() => {
        if (user?.email) {
            axiosSecure.get(`/my-packages/${user.email}`)
                .then(res => setPackages(res.data));
        }
    }, [axiosSecure, user?.email]);

    useEffect(() => {
        fetchPackages();
    }, [fetchPackages]);

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
            }
        });
    }

    const handleUpdate = e => {
        e.preventDefault();
        // logic to update package using axiosSecure.put(`/packages/${selectedPackage._id}`, updatedData)
        // after success, close modal and re-fetch data
        toast.success("Package updated (demo)!");
        document.getElementById('update_modal').close();
    }
    
    const openUpdateModal = (pkg) => {
        setSelectedPackage(pkg);
        document.getElementById('update_modal').showModal();
    }

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
                                <td>{pkg.bookingCount}</td>
                                <td className="space-x-2">
                                    <button onClick={() => openUpdateModal(pkg)} className="btn btn-primary btn-sm">Update</button>
                                    <button onClick={() => handleDelete(pkg._id)} className="btn btn-error btn-sm">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

             {/* Update Modal */}
            <dialog id="update_modal" className="modal">
                 <div className="modal-box">
                    <h3 className="font-bold text-lg">Update: {selectedPackage?.tour_name}</h3>
                     <form onSubmit={handleUpdate}>
                        {/* Add pre-filled form fields here for updating */}
                         <div className="form-control">
                             <label className="label"><span className="label-text">Price</span></label>
                             <input type="number" name="price" defaultValue={selectedPackage?.price} className="input input-bordered" required />
                         </div>
                         <div className="modal-action">
                             <button type="button" className="btn" onClick={() => document.getElementById('update_modal').close()}>Cancel</button>
                             <button type="submit" className="btn btn-primary">Save Changes</button>
                         </div>
                     </form>
                 </div>
            </dialog>
        </div>
    );
};

export default ManageMyPackages;