import { useEffect, useState } from "react";
import ServiceCard from "./ServiceCard";

const Services = () => {
  const [services, setServices] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3000/services")
      .then((res) => res.json())
      .then((data) => setServices(data));
  }, []);
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 my-16 lg:my-48">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-base lg:text-lg text-primary font-bold">Services</p>
        <h1 className="text-3xl lg:text-5xl font-bold">Our Service Area</h1>
        <p className="py-4 lg:py-6 text-sm lg:text-base">
          the majority have suffered alteration in some form, by injected
          humour, or randomised words which don&apos;t look even slightly
          believable.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.length > 0 &&
          services.map((service) => (
            <ServiceCard key={service._id} service={service} />
          ))}
      </div>
    </div>
  );
};

export default Services;
