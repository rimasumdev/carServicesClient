import { useContext, useEffect, useState } from "react";
import AuthContext from "../../AuthProvider/AuthContext";
import axiosInstance from "../../AxiosConfig/axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import useOrdersCart from "../../Hooks/useOrdersCart";
const Orders = () => {
  const { user, logout } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const { refetch } = useOrdersCart();
  const navigate = useNavigate();
  const url = `/orders?email=${user?.email}`;

  useEffect(() => {
    // Axios interceptor setup
    const interceptor = axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401 || error.response?.status === 403) {
          logout()
            .then(() => {
              navigate("/login");
            })
            .catch((error) => {
              console.error("Logout error:", error.message);
            });
        }
        return Promise.reject(error);
      }
    );

    // Fetch orders
    axiosInstance
      .get(url)
      .then((res) => {
        setOrders(res.data);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
      });

    // Cleanup interceptor on component unmount
    return () => {
      axiosInstance.interceptors.response.eject(interceptor);
    };
  }, [url, navigate, logout]);

  //   // Delete order handler
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "question",
      iconColor: "#A6ADBB",
      animation: true,
      showCancelButton: true,
      background: "#191E24",
      color: "#A6ADBB",
      confirmButtonColor: "#2A323C",
      cancelButtonColor: "#FF5757",
      confirmButtonText: "Yes, delete it!",
      confirmButtonTextColor: "#2A323C",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosInstance
          .delete(`/orders/${id}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
                background: "#191E24",
                color: "#A6ADBB",
                confirmButtonColor: "#2A323C",
              });
              const remaining = orders.filter((order) => order._id !== id);
              setOrders(remaining);
              refetch();
            }
          })
          .catch((error) => {
            console.error("Error deleting order:", error);
          });
      }
    });
  };

  //   // Update status handler
  const handleStatusUpdate = (id, status) => {
    axiosInstance
      .patch(`/orders/${id}`, { status })
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          const remaining = orders.filter((order) => order._id !== id);
          const updated = orders.find((order) => order._id === id);
          updated.status = status;
          const newOrders = [updated, ...remaining];
          setOrders(newOrders);
          console.log(res.data);
        }
      })
      .catch((error) => {
        console.error("Error updating status:", error);
      });
  };

  return (
    <div className="container mx-auto mt-10 px-4">
      <h1 className="text-2xl font-bold mb-8 text-center">
        Your Orders: {orders.length}
      </h1>
      {orders.length === 0 && (
        <h2 className="text-xl font-bold mb-8 text-center">No orders found</h2>
      )}

      {/* Large Screen Table View */}
      {orders.length > 0 && (
        <div className="hidden md:block overflow-x-auto max-w-7xl mx-auto">
          <table className="table">
            <thead>
              <tr>
                <th>Service</th>
                <th>Customer Name</th>
                <th>Price</th>
                <th>Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order.serviceName}</td>
                  <td>{order.customerName}</td>
                  <td>${order.servicePrice}</td>
                  <td>{order.serviceDate}</td>
                  <td>
                    <select
                      className={`select select-bordered select-sm w-full max-w-xs ${
                        order.status === "pending"
                          ? "select-warning"
                          : order.status === "approved"
                          ? "select-success"
                          : "select-error"
                      }`}
                      value={order.status}
                      onChange={(e) =>
                        handleStatusUpdate(order._id, e.target.value)
                      }
                    >
                      <option value="pending">Pending</option>
                      <option value="approved">Approved</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </td>
                  <td>
                    <button
                      onClick={() => handleDelete(order._id)}
                      className="btn btn-error btn-xs"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Mobile Card View */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {orders.length > 0 &&
          orders.map((order) => (
            <div
              key={order._id}
              className="bg-base-100 shadow-xl rounded-lg p-4"
            >
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <h3 className="font-bold">{order.serviceName}</h3>
                  <span className="text-sm">${order.servicePrice}</span>
                </div>

                <div className="text-sm">
                  <p>
                    <span className="font-semibold">Customer:</span>{" "}
                    {order.customerName}
                  </p>
                  <p>
                    <span className="font-semibold">Date:</span>{" "}
                    {order.serviceDate}
                  </p>
                </div>

                <div className="space-y-2">
                  <select
                    className={`select select-bordered select-sm w-full ${
                      order.status === "pending"
                        ? "select-warning"
                        : order.status === "approved"
                        ? "select-success"
                        : "select-error"
                    }`}
                    value={order.status}
                    onChange={(e) =>
                      handleStatusUpdate(order._id, e.target.value)
                    }
                  >
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                  </select>

                  <button
                    onClick={() => handleDelete(order._id)}
                    className="btn btn-error btn-sm w-full"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Orders;
