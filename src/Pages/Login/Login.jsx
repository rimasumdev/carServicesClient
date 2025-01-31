import { FaFacebook, FaEnvelope, FaLock } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import { Link, useNavigate, useLocation } from "react-router-dom";
import AuthContext from "../../AuthProvider/AuthContext";
import { useContext, useState } from "react";
import axiosInstance from "../../AxiosConfig/axios";
import { useForm } from "react-hook-form";

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (data) => {
    try {
      setLoginError("");
      const result = await login(data.email, data.password);
      const loggedUser = {
        email: result.user.email,
        name: result.user.displayName,
      };

      const response = await axiosInstance.post("/jwt", loggedUser);
      console.log(response.data);
      navigate(location?.state?.from || "/dashboard/my-bookings/");
    } catch (error) {
      console.log(error.message);
      if (error.code === "auth/invalid-credential") {
        setLoginError("Invalid email or password. Please try again.");
      } else {
        setLoginError("An error occurred during login. Please try again.");
      }
    }
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

          {loginError && (
            <div className="alert alert-error text-white mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <div className="relative">
                <input
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                  placeholder="Email"
                  className="input input-bordered w-full pl-10"
                />
                <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
              {errors.email && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </span>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                  placeholder="Password"
                  className="input input-bordered w-full pl-10"
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
              {errors.password && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </span>
              )}
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
