import React, { useEffect, useState } from "react";
// import { Modal, Form, Button } from "react-bootstrap";
import LeadsModal from "../modal/LeadsModal";
import iziToast from "izitoast";
import axios from "axios";
import Loader from "../Layouts/Loader";

const Leads = () => {
  const [showLeadsModal, setLeadsShowModal] = useState(false);
  const [leadsStatus, setleadsStatus] = useState("All Companies");
  const [leadLists, setleadLists] = useState({});
  const [selectedLeadId, setSelectedLeadId] = useState(null);
  // const [users, setUsers] = useState([]);
  const handleLeadsShow = (id) => {
    // console.log(id);
    setSelectedLeadId(id);

    if (id) {
      axios
        .get(process.env.REACT_APP_URL + `/edit-lead/${id}`)
        .then(({ data }) => {
          setleadLists([data.data]);
          // console.log(data)
          setLeadsShowModal(true);
        })
        .catch((error) => {
          console.error("Error fetching contact for edit:", error);
        });
    } else {
      // If id is not present, it's an add operation
      setLeadsShowModal(true);
    }
  };

  // const handleLeadsShow = () => setLeadsShowModal(true);
  const handleLeadsClose = () => setLeadsShowModal(false);
  const handlestatuschange = (event) => {
    setleadsStatus(event.target.innerText);
  };
  //fetching data
  const [isLoading, setIsLoading] = useState(true);
  const fetchLeadData = async () => {
    try {
      const responseLead = await axios.get(
        process.env.REACT_APP_URL + `/list-leads/`
      );
      setleadLists(responseLead.data.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching tasks or users:", error);
      setIsLoading(true);
    }
  };
  const refreshLead = () => {
    fetchLeadData();
  };
  useEffect(() => {
    setIsLoading(true);
    fetchLeadData(() => {
      setIsLoading(false);
    });
  }, []);
  const deletelead = (id) => {
    axios
      .delete(process.env.REACT_APP_URL + `/delete-lead/${id}`)
      .then((res) => {
        // console.log("Response:", res);
        iziToast.success({
          title: "Success",
          message: res.data.message,
          position: "topRight",
          timeout: 3000,
        });
        const updateddata = leadLists.filter((item) => item.id !== id);
        setleadLists(updateddata);
      })
      .catch((error) => {
        console.error("Error deleting product:", error);
        // Handle error and possibly show an error message
      });
  };
  function formatDate(dateTimeString) {
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };

    const formattedDate = new Date(dateTimeString).toLocaleString(
      undefined,
      options
    );
    return formattedDate;
  }

  return (
    <>
      {isLoading && <Loader />}
      <div className="container-fluid">
        {/* <!-- Page Heading --> */}
        <h1 className="h3 mb-2 text-gray-800">Leads</h1>
        <div className="d-flex justify-content-between mb-3">
          <div className="dropdown mt-2">
            <a
              className="dropdown-toggle"
              id="taskDropdown"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {leadsStatus}
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
            onClick={() => handleLeadsShow()}
          >
            Add New
          </button>
        </div>

        {/* <!-- DataTales Example --> */}
        <div className="card shadow mb-4">
          <div className="card-header py-3">
            <h6 className="m-0 font-weight-bold text-primary">Leads Table</h6>
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
                      <th>Full Name</th>
                      <th>Title</th>
                      <th>Company</th>
                      <th>Phone</th>
                      <th>Email</th>
                      <th>Lead Status</th>
                      <th>Lead Created</th>
                      <th>Lead Owner</th>
                      <th className="text-end">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leadLists.length > 0 &&
                      leadLists.map((lead) => (
                        <tr>
                          <td>
                            {lead.prefix}
                            {lead.first_name} {lead.last_name}
                          </td>
                          <td>{lead.title}</td>
                          <td>{lead.organization}</td>
                          <td>{lead.phone}</td>
                          <td>{lead.email}</td>
                          <td>{lead.lead_status}</td>
                          <td>{formatDate(lead.created_at)}</td>
                          <td>John Doe</td>
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
                                  <a
                                    className="dropdown-item"
                                    href="#"
                                    onClick={() => handleLeadsShow(lead.id)}
                                  >
                                    Edit
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className="dropdown-item"
                                    href="#"
                                    onClick={() => deletelead(lead.id)}
                                  >
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

        <LeadsModal
          showLeadsModal={showLeadsModal}
          handleLeadsClose={() => {
            handleLeadsClose();
            refreshLead();
          }}
          leadId={selectedLeadId}
        />
      </div>
    </>
  );
};
export default Leads;
