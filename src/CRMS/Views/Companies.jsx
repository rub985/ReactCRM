import React, { useEffect, useState } from "react";
// import { Modal, Form, Button } from "react-bootstrap";
import CompaniesModal from "../modal/CompaniesModel";
import axios from "axios";
import Loader from "../Layouts/Loader";
import iziToast from "izitoast";
const Companies = () => {
  const [showCompanyModal, setCompanyShowModal] = useState(false);
  const [companyStatus, setcompanyStatus] = useState("All Companies");
  const [companyLists, setcompanyLists] = useState({});
  const [selectedCompanyId, setSelectedCompanyId] = useState(null);
  // const [users, setUsers] = useState([]);
  const handleCompanyShow = (id) => {
    // console.log(id);
    setSelectedCompanyId(id);

    if (id) {
      axios
        .get(process.env.REACT_APP_URL + `/edit-company/${id}`)
        .then(({ data }) => {
          setcompanyLists([data.data]);
          // console.log(data)
          setCompanyShowModal(true);
        })
        .catch((error) => {
          console.error("Error fetching contact for edit:", error);
        });
    } else {
      // If id is not present, it's an add operation
      setCompanyShowModal(true);
    }
  };

  // const handleCompanyShow = () => setCompanyShowModal(true);
  const handleCompanyClose = () => setCompanyShowModal(false);
  const handlestatuschange = (event) => {
    setcompanyStatus(event.target.innerText);
  };
  const [isLoading, setIsLoading] = useState(true);
  const fetchCompanyData = async () => {
    try {
      const responseCompany = await axios.get(
        process.env.REACT_APP_URL + `/list-companies/`
      );
      setcompanyLists(responseCompany.data.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching tasks or users:", error);
      setIsLoading(true);
    }
  };
  const refreshCompany = () => {
    fetchCompanyData();
  };
  useEffect(() => {
    setIsLoading(true);
    fetchCompanyData(() => {
      setIsLoading(false);
    });
  }, []);
  const deletecompany = (id) => {
    axios
      .delete(process.env.REACT_APP_URL + `/delete-company/${id}`)
      .then((res) => {
        // console.log("Response:", res);
        iziToast.success({
          title: "Success",
          message: res.data.message,
          position: "topRight",
          timeout: 3000,
        });
        const updateddata = companyLists.filter((item) => item.id !== id);
        setcompanyLists(updateddata);
      })
      .catch((error) => {
        console.error("Error deleting product:", error);
        // Handle error and possibly show an error message
      });
  };
  return (
    <>
      {isLoading && <Loader />}
      <div className="container-fluid">
        {/* <!-- Page Heading --> */}
        <h1 className="h3 mb-2 text-gray-800">Companies</h1>
        <div className="d-flex justify-content-between mb-3">
          <div className="dropdown mt-2">
            <a
              className="dropdown-toggle"
              id="taskDropdown"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {companyStatus}
            </a>
            <ul className="dropdown-menu" aria-labelledby="taskDropdown">
              <li>
                <a
                  className="dropdown-item"
                  href="#"
                  onClick={handlestatuschange}
                >
                  All Companies
                </a>
              </li>
              <li>
                <a
                  className="dropdown-item"
                  href="#"
                  onClick={handlestatuschange}
                >
                  Added Last 24 hr
                </a>
              </li>
              <li>
                <a
                  className="dropdown-item"
                  href="#"
                  onClick={handlestatuschange}
                >
                  Added Last week
                </a>
              </li>
            </ul>
          </div>
          <button
            className="btn btn-info btn-rounded"
            onClick={()=>handleCompanyShow()}
          >
            Add New
          </button>
        </div>

        {/* <!-- DataTales Example --> */}
        <div className="card shadow mb-4">
          <div className="card-header py-3">
            <h6 className="m-0 font-weight-bold text-primary">
              Companies Table
            </h6>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              {!isLoading && (
                <table
                  className="table"
                  id="dataTable"
                  width="100%"
                  cellSpacing="0"
                >
                  <thead>
                    <tr>
                      <th>Company</th>
                      <th>Phone</th>
                      <th>Billing Address</th>
                      <th>Billing City</th>
                      <th>Billing State</th>
                      <th>Billing Country</th>
                      <th className="text-end">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {companyLists.length>0 && companyLists.map((company) => (
                      <tr key={company.id}>
                        <td>{company.organization_name}</td>
                        <td>{company.phone}</td>
                        <td>{company.billing_address}</td>
                        <td>{company.billing_city}</td>
                        <td>{company.billing_state}</td>
                        <td>{company.billing_country}</td>
                        <td className="text-right">
                          <div className="dropdown">
                            <a
                              className="btn"
                              id="actionDropdown"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              {/* Three dots icon */}
                              <i className="fas fa-ellipsis-v"></i>
                            </a>
                            <ul
                              className="dropdown-menu"
                              aria-labelledby="actionDropdown"
                            >
                              <li>
                                <a className="dropdown-item" href="#" onClick={()=>handleCompanyShow(company.id)}>
                                  Edit
                                </a>
                              </li>
                              <li>
                                <a className="dropdown-item" href="#" onClick={()=>deletecompany(company.id)}>
                                  Delete
                                </a>
                              </li>
                            </ul>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>

        <CompaniesModal
          showCompanyModal={showCompanyModal}
          handleCompanyClose={() => {
            handleCompanyClose();
            refreshCompany();
          }}
          companyId={selectedCompanyId}
        />
      </div>
    </>
  );
};
export default Companies;
