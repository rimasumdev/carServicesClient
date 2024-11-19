// import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
  // const error = useRouteError();

  return (
    <div className="text-center mt-20">
      <h1 className="text-3xl font-bold mb-4">Oops!</h1>
      <p className="text-xl mb-4">Something went wrong to load this page</p>
      {/* <p className="text-red-500">
        {error.status} - {error.statusText || error.message}
      </p> */}
    </div>
  );
};

export default ErrorPage;
