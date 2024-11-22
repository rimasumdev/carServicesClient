import { FaFacebook, FaEnvelope, FaLock } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import { Link, useNavigate, useLocation } from "react-router-dom";
import AuthContext from "../../AuthProvider/AuthContext";
import { useContext, useState } from "react";
import axiosInstance from "../../AxiosConfig/axios";
const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    // const user = { email, password };
    // console.log(user);
    login(email, password)
      .then((result) => {
        // console.log(result.user);
        const loggedUser = {
          email: result.user.email,
          name: result.user.displayName,
        };
        axiosInstance
          .post("/jwt", loggedUser)
          .then((res) => {
            console.log(res.data);
            navigate(location?.state?.from || "/orders");
          })
          .catch((error) => {
            console.log(error.message);
          });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div className="flex flex-col items-center justify-center px-4 lg:px-0 py-4 lg:py-10">
      <div className="card w-full max-w-lg bg-base-100 shadow-gray-500/10 border border-primary/20">
        <div className="card-body">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent py-1">
              Login
            </h1>
            <p className="text-sm md:text-base text-gray-600 mt-2 px-4 md:px-0">
              Login to your account
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="input input-bordered w-full pl-10"
                  required
                />
                <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  className="input input-bordered w-full pl-10"
                  required
                />
                <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <span
                  className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <BsFillEyeFill className="text-red-500" />
                  ) : (
                    <BsFillEyeSlashFill />
                  )}
                </span>
              </div>
              <label className="label">
                <Link
                  to="/forgot-password"
                  className="label-text-alt link link-hover"
                >
                  Forgot password?
                </Link>
              </label>
            </div>

            <div className="form-control mt-6">
              <button className="btn btn-primary">Login</button>
            </div>
          </form>

          <div className="divider">OR</div>

          <div className="space-y-3">
            <button className="btn btn-outline w-full">
              <FcGoogle className="mr-2" /> Login with Google
            </button>
            <button className="btn btn-outline w-full">
              <FaFacebook className="mr-2 text-blue-500" /> Login with Facebook
            </button>
          </div>

          <p className="text-center mt-4">
            Don&apos;t have an account?{" "}
            <Link to="/register" className="link link-primary">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
