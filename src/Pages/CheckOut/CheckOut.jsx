import { useLoaderData } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../AuthProvider/AuthContext";
import axios from "axios";

const Checkout = () => {
  const service = useLoaderData();
  const currentDate = new Date().toISOString().split("T")[0]; // yyyy-mm-dd format for input field
  const { user } = useContext(AuthContext);
  // console.log(user);

  const handleCheckout = (e) => {
    e.preventDefault();
    const form = e.target;
    const customerName = form.customerName.value;
    const phoneNumber = form.phoneNumber.value;
    const email = form.email.value;
    const address = form.address.value;
    const specialInstructions = form.specialInstructions.value;
    const serviceDate = form.serviceDate.value;
    const servicePrice = form.servicePrice.value;
    const serviceName = form.serviceName.value;
    const checkoutData = {
      customerName,
      phoneNumber,
      email,
      address,
      specialInstructions,
      serviceDate,
      servicePrice,
      serviceName,
    };

    axios
      .post("http://localhost:3000/orders", checkoutData)
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.error("Error submitting order:", error);
      });
    // fetch(`http://localhost:3000/orders`, {
    //   method: "POST",
    //   headers: {
    //     "content-type": "application/json",
    //   },
    //   body: JSON.stringify(checkoutData),
    // })
    //   .then((res) => res.json())
    //   .then((data) => {
    //     console.log(data);
    //   });
  };

  return (
    <div className="container mx-auto ">
      {service ? (
        <div>
          {/* <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent py-1 mb-8">
            Service Name: {service?.title}
          </h1> */}

          <form
            onSubmit={handleCheckout}
            className="px-4 py-8 lg:px-8 lg:my-6 bg-base-200 shadow-xl rounded-xl lg:max-w-3xl mx-auto"
          >
            {/* Service Information */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-4 text-center">
                Checkout Information
              </h2>
              <div className="grid grid-cols-1 gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Service Name</span>
                  </label>
                  <input
                    type="text"
                    name="serviceName"
                    defaultValue={service?.title}
                    className="input input-bordered w-full"
                    readOnly
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Service Price</span>
                    </label>
                    <input
                      type="text"
                      name="servicePrice"
                      defaultValue={`$${service?.price}`}
                      className="input input-bordered"
                      readOnly
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Service Date</span>
                    </label>
                    <input
                      type="date"
                      name="serviceDate"
                      defaultValue={currentDate}
                      min={currentDate}
                      className="input input-bordered"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* User Information */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Your Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Full Name</span>
                  </label>
                  <input
                    type="text"
                    name="customerName"
                    placeholder="Your name"
                    className="input input-bordered"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Phone Number</span>
                  </label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    placeholder="Your phone number"
                    className="input input-bordered"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Your email"
                    defaultValue={user?.email}
                    className="input input-bordered"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Address</span>
                  </label>
                  <input
                    type="text"
                    name="address"
                    placeholder="Your address"
                    className="input input-bordered"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="form-control mt-6">
              <textarea
                name="specialInstructions"
                className="textarea textarea-bordered"
                placeholder="Special Instructions (Optional)"
              ></textarea>
            </div>

            <div className="form-control mt-6">
              <button className="btn btn-primary">Confirm Checkout</button>
            </div>
          </form>
        </div>
      ) : (
        <div>
          <h1>Service not found</h1>
        </div>
      )}
    </div>
  );
};

export default Checkout;
