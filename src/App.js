import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css"
import Main from "./CRMS/Layouts/Main";
import Dashboard from "./CRMS/Views/Dashboard";
import Table from "./CRMS/Views/Table";
import Tasks from "./CRMS/Views/Tasks";
import Contacts from "./CRMS/Views/Contacts";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  createBrowserRouter,
  Navigate,
} from "react-router-dom";
import Companies from "./CRMS/Views/Companies";
import Leads from "./CRMS/Views/Leads";
import Deals from "./CRMS/Views/Deals";
import Projects from "./CRMS/Views/Projects";
import "izitoast/dist/css/iziToast.min.css";
import Login from "./CRMS/Layouts/Login";
import { useEffect, useState } from "react";

function App() {
  // const {isLoading, isError, data} = useQuery({
  //   queryfn: 'https://apicall',
  //   queryKey: ['userdata']
  // })
  // const queryCLient = useQueryCLient()
  // queryCLient.invalidateQuery(['userdata'])
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check authentication status on component mount
  useEffect(() => {
    const token = localStorage.getItem("apiToken");
    console.log("Token from localStorage:", token);
    setIsAuthenticated(!!token);
    setLoading(false);
  }, []);

  // Function to handle authentication status
  const handleAuthentication = (status) => {
    console.log(status);
    setIsAuthenticated(status);
  };

  // PrivateRoute component for authenticated routes
  const PrivateRoute = ({ element }) => {
    console.log("PrivateRoute - isAuthenticated:", isAuthenticated);
    if (isAuthenticated) {
      console.log("PrivateRoute - Rendering element");
      return element;
    } else {
      console.log("PrivateRoute - Redirecting to /login");
      return (
        <Navigate
          to="/login"
        />
      );
    }
  };
  if (loading) {
    // You can return a loading indicator here
    return <div>Loading...</div>;
  }
  console.log("Main rendering - isAuthenticated:", isAuthenticated);
  return (
    <>
      {/* <!-- Page Wrapper --> */}

      <Router>
        <Routes>
          <Route
            path="/login"
            element={<Login onAuthentication={handleAuthentication} />}
          />
          <Route
            path="*"
            element={
              isAuthenticated ? (
                <Main>
                  <PrivateRoute path="/" element={<Dashboard />} />
                  <PrivateRoute path="/table" element={<Table />} />
                  <PrivateRoute path="/tasks" element={<Tasks />} />
                  <PrivateRoute path="/contacts" element={<Contacts />} />
                  <PrivateRoute path="/companies" element={<Companies />} />
                  <PrivateRoute path="/leads" element={<Leads />} />
                  <PrivateRoute path="/deals" element={<Deals />} />
                  <PrivateRoute path="/projects" element={<Projects />} />
                </Main>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
      </Router>
     

      {/* <!-- End of Page Wrapper --> */}
    </>
  );
}

export default App;
