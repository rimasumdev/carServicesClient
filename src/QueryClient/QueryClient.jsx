import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import PropTypes from "prop-types";
const queryClient = new QueryClient();

const QueryClients = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default QueryClients;

QueryClients.propTypes = {
  children: PropTypes.node.isRequired,
};
