import PropTypes from "prop-types";
import { useContext } from "react";
import AuthContext from "../AuthProvider/AuthContext";
import { Navigate } from "react-router-dom";
const PrivateRoutes = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
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
    return <Navigate to="/login" />;
  }
  return children;
};

export default PrivateRoutes;

PrivateRoutes.propTypes = {
  children: PropTypes.node.isRequired,
};
