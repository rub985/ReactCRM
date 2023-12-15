import React, { useEffect, useState } from "react";
// import { Modal, Form, Button } from "react-bootstrap";
import ContactModal from "../modal/ContactModal";
import Loader from "../Layouts/Loader";
import axios from "axios";
import iziToast from "izitoast";
const Contacts = () => {
  const [showContactModal, setContactShowModal] = useState(false);
  const [contactStatus, setContactStatus] = useState("All Contacts");
  const [contactLists, setContactLists] = useState([]);
  const [selectedContactId, setSelectedContactId] = useState(null);
  // const [users, setUsers] = useState([]);
  const handleContactShow = (id) => {
    // console.log(id);
    setSelectedContactId(id);

    if (id) {
      axios
        .get(process.env.REACT_APP_URL + `/edit-contact/${id}`)
        .then(({ data }) => {
          setContactLists([data.data]);
          // console.log(data)
          setContactShowModal(true);
        })
        .catch((error) => {
          console.error("Error fetching contact for edit:", error);
        });
    } else {
      // If id is not present, it's an add operation
      setContactShowModal(true);
    }
  };
  // const handleContactShow = () => setContactShowModal(true);
  const handleContactClose = () => setContactShowModal(false);
  const handlestatuschange = (event) => {
    setContactStatus(event.target.innerText);
  };
  //fetch api to list contacts
  const [isLoading, setIsLoading] = useState(true);
  const fetchData = async () => {
    try {
      const responseContact = await axios.get(
        process.env.REACT_APP_URL + `/list-contact/`
      );
      setContactLists(responseContact.data.data);
      // Fetch users
      // const responseUsers = await axios.get(
      //   process.env.REACT_APP_URL + "/list-user"
      // );
      // setUsers(responseUsers.data.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching tasks or users:", error);
      setIsLoading(true);
    }
  };
  const refreshContactlist = () => {
    fetchData(); // You can customize this if needed
  };

  useEffect(() => {
    setIsLoading(true);
    fetchData(() => {
      setIsLoading(false);
    });
  }, []);

  //Delete Contacts
  const deletecontact = (id) => {
    axios
      .delete(process.env.REACT_APP_URL + `/delete-contact/${id}`)
      .then((res) => {
        // console.log("Response:", res);
        iziToast.success({
          title: "Success",
          message: res.data.message,
          position: "topRight",
          timeout: 3000,
        });
        const updateddata = contactLists.filter((item) => item.id !== id);
        setContactLists(updateddata);
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
        <h1 className="h3 mb-2 text-gray-800">Contacts</h1>
        <div className="d-flex justify-content-between mb-3">
          <div className="dropdown mt-2">
            <a
              className="dropdown-toggle"
              id="taskDropdown"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {contactStatus}
            </a>
            <ul className="dropdown-menu" aria-labelledby="taskDropdown">
              <li>
                <a
                  className="dropdown-item"
                  href="#"
                  onClick={handlestatuschange}
                >
                  All Contacts
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
            onClick={() => handleContactShow()}
          >
            Add New
          </button>
        </div>

        {/* <!-- DataTales Example --> */}
        <div className="card shadow mb-4">
          <div className="card-header py-3">
            <h6 className="m-0 font-weight-bold text-primary">
              Contacts Table
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
                      <th>Full Name</th>
                      <th>Title</th>
                      <th>Phone</th>
                      <th>Email</th>
                      <th>Organization</th>
                      <th className="text-end">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    
                    {contactLists.length > 0 && contactLists.map((contacts) => (
                      <tr key={contacts.id}>
                        <td>
                          {contacts.prefix}
                          {contacts.first_name} {contacts.last_name}
                        </td>
                        <td>{contacts.title}</td>
                        <td>{contacts.phone}</td>
                        <td>{contacts.email}</td>
                        <td>
                          <button className="btn btn-warning btn-sm">
                            {contacts.organization}
                          </button>
                        </td>
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
                                  onClick={() => handleContactShow(contacts.id)}
                                >
                                  Edit
                                </a>
                              </li>
                              <li>
                                <a
                                  className="dropdown-item"
                                  href="#"
                                  onClick={() => {
                                    deletecontact(contacts.id);
                                  }}
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

        <ContactModal
          showContactModal={showContactModal}
          handleContactClose={() => {
            handleContactClose();
            refreshContactlist();
          }}
          contactId={selectedContactId}
        />
      </div>
    </>
  );
};
export default Contacts;
