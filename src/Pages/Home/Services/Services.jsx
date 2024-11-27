import { useEffect, useState, useRef } from "react";
import ServiceCard from "./ServiceCard";

const Services = () => {
  const [services, setServices] = useState([]);
  const [search, setSearch] = useState("");
  const [clearSearch, setClearSearch] = useState(false);
  const searchInputRef = useRef(null);
  const [inputValue, setInputValue] = useState("");

  const url = search
    ? `http://localhost:3000/services?search=${search}`
    : "http://localhost:3000/services";

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setServices(data));
  }, [url]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    setSearch(inputValue);
    setClearSearch(true);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleClearSearch = () => {
    setSearch("");
    setClearSearch(false);
    setInputValue("");
  };
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
      <div className="flex justify-center md:justify-end items-center mb-6 gap-2">
        <form
          className="flex items-center w-full max-w-sm space-x-2"
          onSubmit={handleSearch}
        >
          <div className="relative w-full">
            <input
              ref={searchInputRef}
              type="text"
              name="search"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Search services"
              className="input input-bordered input-primary w-full"
            />
            <button
              type="submit"
              className="btn btn-primary absolute right-0"
              disabled={!inputValue.trim()}
            >
              Search
            </button>
          </div>
          {clearSearch && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleClearSearch}
            >
              Clear
            </button>
          )}
        </form>
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
