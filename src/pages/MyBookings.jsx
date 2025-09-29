import { useContext, useEffect, useState, useCallback } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { AuthContext } from "../contexts/AuthContext";
import toast from "react-hot-toast";

const MyBookings = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Memoized fetchBookings
  const fetchBookings = useCallback(() => {
    if (!user?.email) return;

    setLoading(true); // start loading

    axiosSecure
      .get(`https://the-vagabond-tour.onrender.com/my-bookings/${user.email}`)
      .then((res) => {
        // ✅ Ensure we only set an array
        if (Array.isArray(res.data)) {
          setBookings(res.data);
        } else {
          console.warn("API returned non-array data:", res.data);
          setBookings([]); // fallback to empty array
        }
      })
      .catch((err) => {
        console.error("Error fetching bookings:", err);
        setBookings([]); // fallback to empty array on error
      })
      .finally(() => setLoading(false)); // stop loading in all cases
  }, [user?.email, axiosSecure]);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  const handleConfirm = (id) => {
    setLoading(true); // show spinner while updating
    axiosSecure
      .patch(`https://the-vagabond-tour.onrender.com/my-bookings/${user.email}/${id}`, { status: "completed" })
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          toast.success("Booking marked as completed!");
          fetchBookings(); // refresh list
        }
      })
      .catch((err) => console.error("Error updating booking:", err))
      .finally(() => setLoading(false));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold text-center mb-8">My Bookings</h1>
      <div className="overflow-x-auto">
        {bookings.length === 0 ? (
          <p className="text-center text-lg">No bookings found.</p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Tour Name</th>
                <th>Guide</th>
                <th>Departure Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking._id}>
                  <td>{booking.tour_name}</td>
                  <td>{booking.guide_name}</td>
                  <td>{booking.departure_date}</td>
                  <td>
                    <span
                      className={`badge ${
                        booking.status === "pending"
                          ? "badge-warning"
                          : "badge-success"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </td>
                  <td>
                    {booking.status === "pending" && (
                      <button
                        onClick={() => handleConfirm(booking._id)}
                        className="btn btn-primary btn-sm"
                      >
                        Confirm
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default MyBookings;
