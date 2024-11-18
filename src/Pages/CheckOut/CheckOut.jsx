import { useLoaderData } from "react-router-dom";

const Checkout = () => {
  const service = useLoaderData();
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 my-16 lg:my-10">
      <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent py-1">
        Service Name: {service?.title}
      </h1>
    </div>
  );
};

export default Checkout;
