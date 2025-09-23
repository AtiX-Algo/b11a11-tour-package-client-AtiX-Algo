import { useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import useAxiosSecure from "../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const AddPackage = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();

    const handleAddPackage = e => {
        e.preventDefault();
        const form = e.target;
        const tour_name = form.tour_name.value;
        const image = form.image.value;
        const duration = form.duration.value;
        const departure_location = form.departure_location.value;
        const destination = form.destination.value;
        const price = parseFloat(form.price.value);
        const departure_date = form.departure_date.value;
        const package_details = form.package_details.value;
        const guide_contact_no = form.guide_contact_no.value;

        const newPackage = {
            tour_name, image, duration, departure_location, destination, price, departure_date, package_details,
            guide_name: user.displayName,
            guide_email: user.email,
            guide_photo: user.photoURL,
            guide_contact_no,
            bookingCount: 0,
            created_at: new Date()
        }

        axiosSecure.post('/packages', newPackage)
            .then(res => {
                if(res.data.insertedId){
                    toast.success('Package added successfully!');
                    form.reset();
                }
            })
    }

    return (
        <div className="container mx-auto px-4 py-10">
            <h1 className="text-4xl font-bold text-center mb-8">Add a New Tour Package</h1>
            <div className="max-w-4xl mx-auto bg-base-100 p-8 rounded-lg shadow-lg">
                <form onSubmit={handleAddPackage} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="form-control">
                            <label className="label"><span className="label-text">Tour Name</span></label>
                            <input type="text" name="tour_name" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label"><span className="label-text">Image URL</span></label>
                            <input type="text" name="image" className="input input-bordered" required />
                        </div>
                    </div>
                     {/* ... Add all other form fields similarly ... */}
                     <div className="form-control">
                        <label className="label"><span className="label-text">Package Details</span></label>
                        <textarea name="package_details" className="textarea textarea-bordered" required></textarea>
                    </div>
                    <div className="form-control mt-6">
                        <button className="btn btn-primary">Add Package</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddPackage;