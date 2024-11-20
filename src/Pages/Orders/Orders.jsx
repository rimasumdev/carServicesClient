import { useContext, useEffect, useState } from "react";
import AuthContext from "../../AuthProvider/AuthContext";

const Orders = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/orders?email=${user?.email}`)
      .then((res) => res.json())
      .then((data) => {
        setOrders(data);
        // console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
      });
  }, [user?.email]);

  //   // Delete order handler
  const handleDelete = (id) => {
    const proceed = confirm("Are you sure you want to delete?");
    if (proceed) {
      fetch(`http://localhost:3000/orders/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          // console.log(data);
          if (data.deletedCount > 0) {
            alert("Deleted successfully");
            const remaining = orders.filter((order) => order._id !== id);
            setOrders(remaining);
          }
        });
    }
  };

  //   // Update status handler
  const handleStatusUpdate = (id, status) => {
    fetch(`http://localhost:3000/orders/${id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ status }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          const remaining = orders.filter((order) => order._id !== id);
          const updated = orders.find((order) => order._id === id);
          updated.status = status;
          const newOrders = [updated, ...remaining];
          setOrders(newOrders);
          console.log(data);
        }
      });
  };

  return (
    <div className="container mx-auto mt-10 px-4">
      <h1 className="text-2xl font-bold mb-8 text-center">
        Your Orders: {orders.length}
      </h1>

      {/* Large Screen Table View */}
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

      {/* Mobile Card View */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {orders.map((order) => (
          <div key={order._id} className="bg-base-100 shadow-xl rounded-lg p-4">
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
