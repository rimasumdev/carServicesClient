import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
const ServiceCard = ({ service }) => {
  return (
    <div className="card bg-base-100 shadow-xl border border-primary/30">
      <figure className="px-10 pt-10">
        <img src={service?.img} alt="Shoes" className="rounded-xl" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{service?.title}</h2>
        <div className="flex justify-between items-center">
          <p className="text-primary font-bold text-xl">
            Price: ${service?.price}
          </p>
          <Link to={`/checkout/${service?._id}`}>
            <button className="btn bg-primary/20 hover:bg-primary/50 text-primary hover:text-white px-8 py-2 rounded-md">
              <FaArrowRight />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;

ServiceCard.propTypes = {
  service: PropTypes.object.isRequired,
};
