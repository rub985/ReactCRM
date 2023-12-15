import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css"
// import Main from "./CRMS/Layouts/Main";
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
// import Login from "./CRMS/Layouts/Login";
import { Suspense, lazy, useEffect, useState } from "react";
const Login = lazy(() => import('./CRMS/Layouts/Login.jsx'))
const Main = lazy(() => import('./CRMS/Layouts/Main.jsx'))

function App() {
  // const {isLoading, isError, data} = useQuery({
  //   queryfn: 'https://apicall',
  //   queryKey: ['userdata']
  // })
  // const queryCLient = useQueryCLient()
  // queryCLient.invalidateQuery(['userdata'])
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);


  // Check authentication status on component mount
  useEffect(() => {
    setLoading(true)
    const token = localStorage.getItem("apiToken");
    console.log("Token from localStorage:", token);
    // setIsAuthenticated(!!token);
    if(token){

    setIsAuthenticated(true);
    }
    setLoading(false);
  }, [isAuthenticated]);

  // Function to handle authentication status
  const handleAuthentication = (status) => {
    console.log(status);
    setIsAuthenticated(true);
  };

  if (loading) {
    // You can return a loading indicator here
    return <div>Loading...</div>;
  }
  console.log("Main rendering - isAuthenticated:", isAuthenticated);
  return (
    <>
      {/* <!-- Page Wrapper --> */}

<Suspense fallback={<div>Loading...</div>}>

      <Router>
        <Routes>
          <Route
            path="/login"
            element={<Login onAuthentication={handleAuthentication} setIsLoading={setLoading} />}
          />
                {/* <Main> */}
                <Route path='/' element={<PrivateRoute auth={isAuthenticated}><Main /> </PrivateRoute>}>
                  <Route index element={<PrivateRoute auth={isAuthenticated} ><Dashboard /></PrivateRoute>} />
                  <Route path="/table" element={<PrivateRoute auth={isAuthenticated}>
                        <Table />
                    </PrivateRoute>} />
                  <Route path="/tasks" element={<PrivateRoute auth={isAuthenticated}>
                      <Tasks />
                    </PrivateRoute>} />
                  <Route path="/contacts" element={<PrivateRoute auth={isAuthenticated}><Contacts /> </PrivateRoute>} />
                  <Route path="/companies" element={<PrivateRoute auth={isAuthenticated}><Companies /></PrivateRoute>} />
                  <Route path="/leads" element={<PrivateRoute auth={isAuthenticated}><Leads /></PrivateRoute>} />
                  <Route path="/deals" element={<PrivateRoute auth={isAuthenticated}><Deals /></PrivateRoute>} />
                  <Route path="/projects" element={<PrivateRoute auth={isAuthenticated}><Projects /> </PrivateRoute>} />
                {/* </Main> */}
                </Route>
        </Routes>
      </Router>
</Suspense>


      {/* <!-- End of Page Wrapper --> */}
    </>
  );
}


  // PrivateRoute component for authenticated routes
  const PrivateRoute = ({ auth,children}) => {
    console.log(auth)
    if (auth) {
      console.log("PrivateRoute - Rendering element");
      return children;
    } else {
      console.log("PrivateRoute - Redirecting to /login");
      return (
        <Navigate
          to="/login"
        />
      );
    }
  };

export default App;
