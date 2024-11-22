import PropTypes from "prop-types";
import { useContext } from "react";
import AuthContext from "../AuthProvider/AuthContext";
import { Navigate, useLocation } from "react-router-dom";
const PrivateRoutes = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="">
          <span className="loading loading-bars loading-lg"></span>
        </div>
      </div>
    );
  }
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
  }
  return children;
};

export default PrivateRoutes;

PrivateRoutes.propTypes = {
  children: PropTypes.node.isRequired,
};
