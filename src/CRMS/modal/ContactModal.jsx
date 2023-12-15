import axios from "axios";
import iziToast from "izitoast";
import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { ImCross } from "react-icons/im";

const ContactModal = ({ showContactModal, handleContactClose, contactId }) => {
  // console.log(contactId);
  const [contactList, setContactList] = useState({
    prefix: "",
    first_name: "",
    last_name: "",
    organization: "",
    title: "",
    email: "",
    phone: "",
    home_phone: "",
    mobile_phone: "",
    other_phone: "",
    assistant_phone: "",
    assistant_name: "",
    fax: "",
    linkedin: "",
    facebook: "",
    twitter: "",
    mailing_address: "",
    mailing_city: "",
    mailing_state: "",
    mailing_postal_code: "",
    mailing_country: "",
    other_address: "",
    due_date: "",
    date_of_birth: "",
    description: "",
    tag_list: "",
    permission: "",
  });

  //for edit
  useEffect(() => {
    // Fetch the list of users when the component mounts
    // axios
    //   .get(process.env.REACT_APP_URL + "/list-user")
    //   .then(({ data }) => {
    //     setUsers(data.data);
    //   })
    //   .catch((error) => {
    //     console.error("Error fetching users:", error);
    //   });

    if (contactId) {
      axios
        .get(process.env.REACT_APP_URL + `/edit-contact/${contactId}`)
        .then(({ data }) => {
          // console.log(data);
          setContactList(data.data);
        })
        .catch((error) => {
          console.error("Error fetching task for edit:", error);
        });
    } else {
      // If it's a new task, you can set default values or leave it as an empty object
      setContactList({
        prefix: " ",
        first_name: "",
        last_name: "",
        organization: "",
        title: "",
        email: "",
        phone: "",
        home_phone: "",
        mobile_phone: "",
        other_phone: "",
        assistant_phone: "",
        assistant_name: "",
        fax: "",
        linkedin: "",
        facebook: "",
        twitter: "",
        mailing_address: "",
        mailing_city: "",
        mailing_state: "",
        mailing_postal_code: "",
        mailing_country: "",
        other_address: "",
        due_date: "",
        date_of_birth: "",
        description: "",
        tag_list: "",
        permission: "",
      });
    }
  }, [contactId]);

  const onSubmitContact = (ev) => {
    ev.preventDefault();
    const payload = { ...contactList };
    axios({
      method: "post",
      url: contactId
        ? process.env.REACT_APP_URL + `/update-contact/${contactId}`
        : process.env.REACT_APP_URL + `/store-contact/`,
      data: payload,
    })
      .then((res) => {
        handleContactClose();
        // console.log(res);
        iziToast.success({
          title: "Success",
          message: res.data.message,
          position: "topRight",
          timeout: 3000,
        });
        setContactList({ ...payload });
      })
      .catch((err) => {
        if (err && err.response) {
          console.log(err, err.response);
        }
      });
  };

  return (
    <>
      <Modal
        show={showContactModal}
        onHide={handleContactClose}
        size="lg"
        style={{ padding: "0px" }}
      >
        <Modal.Header>
          <Modal.Title>
            {contactId ? "Update Contact" : "Add Contact"}
          </Modal.Title>
          <ImCross onClick={handleContactClose} />
        </Modal.Header>
        <Modal.Body>
          <form method="post" onSubmit={onSubmitContact}>
            <h5
              className="font-weight-bold bg-light text-dark"
              style={{ padding: "10px 10px" }}
            >
              Name & Occupation
            </h5>
            <div className="row">
              <div className="form-floating mb-3 col-md-12">
                <label htmlFor="floatingInput">Name*</label>
                <div className="row">
                  <div className="col-md-4">
                    <input
                      type="text"
                      className="form-control rounded-3"
                      id="floatingInput"
                      placeholder="Prefix"
                      name="prefix"
                      value={contactList.prefix || ""}
                      onChange={(ev) =>
                        setContactList((prevContactList) => ({
                          ...prevContactList,
                          prefix: ev.target.value,
                        }))
                      }
                    />
                  </div>
                  <div className="col-md-4">
                    <input
                      type="text"
                      className="form-control rounded-3"
                      id="floatingInput"
                      placeholder="First Name"
                      name="first_name"
                      value={contactList.first_name || ""}
                      onChange={(ev) =>
                        setContactList((prevContactList) => ({
                          ...prevContactList,
                          first_name: ev.target.value,
                        }))
                      }
                    />
                  </div>
                  <div className="col-md-4">
                    <input
                      type="text"
                      className="form-control rounded-3"
                      id="floatingInput"
                      placeholder="Last Name"
                      value={contactList.last_name || ""}
                      onChange={(ev) =>
                        setContactList((prevContactList) => ({
                          ...prevContactList,
                          last_name: ev.target.value,
                        }))
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="form-floating mb-3 col-md-6">
                <label htmlFor="floatingSelect">Organization</label>
                <select
                  className="form-control"
                  aria-label="Default select example"
                  value={contactList.organization || ""}
                  onChange={(ev) =>
                    setContactList((prevContactList) => ({
                      ...prevContactList,
                      organization: ev.target.value,
                    }))
                  }
                >
                  <option value="1">Select</option>
                  <option value="2">Select</option>
                </select>
              </div>
              <div className="form-floating mb-3 col-md-6">
                <label htmlFor="floatingInput">Title</label>
                <input
                  type="text"
                  className="form-control rounded-3"
                  id="floatingInput"
                  placeholder="Title"
                  value={contactList.title || ""}
                  onChange={(ev) =>
                    setContactList((prevContactList) => ({
                      ...prevContactList,
                      title: ev.target.value,
                    }))
                  }
                />
              </div>
            </div>
            <h5
              className="font-weight-bold bg-light text-dark"
              style={{ padding: "10px 10px" }}
            >
              Contact Details
            </h5>
            <div className="row">
              <div className="form-floating mb-3 col-md-6">
                <label htmlFor="floatingInput">Email</label>
                <input
                  type="email"
                  className="form-control rounded-3"
                  id="floatingInput"
                  placeholder="email"
                  value={contactList.email || ""}
                  onChange={(ev) =>
                    setContactList((prevContactList) => ({
                      ...prevContactList,
                      email: ev.target.value,
                    }))
                  }
                />
              </div>
              <div className="form-floating mb-3 col-md-6">
                <label htmlFor="floatingInput">Phone</label>
                <input
                  type="number"
                  className="form-control rounded-3"
                  id="floatingInput"
                  placeholder="phone"
                  value={contactList.phone || ""}
                  onChange={(ev) =>
                    setContactList((prevContactList) => ({
                      ...prevContactList,
                      phone: ev.target.value,
                    }))
                  }
                />
              </div>
              <div className="form-floating mb-3 col-md-6">
                <label htmlFor="floatingInput">Home Phone</label>
                <input
                  type="number"
                  className="form-control rounded-3"
                  id="floatingInput"
                  placeholder="Home Phone"
                  value={contactList.home_phone || ""}
                  onChange={(ev) =>
                    setContactList((prevContactList) => ({
                      ...prevContactList,
                      home_phone: ev.target.value,
                    }))
                  }
                />
              </div>
              <div className="form-floating mb-3 col-md-6">
                <label htmlFor="floatingInput">Mobile Phone</label>
                <input
                  type="number"
                  className="form-control rounded-3"
                  id="floatingInput"
                  placeholder="Mobile Phone"
                  value={contactList.mobile_phone || ""}
                  onChange={(ev) =>
                    setContactList((prevContactList) => ({
                      ...prevContactList,
                      mobile_phone: ev.target.value,
                    }))
                  }
                />
              </div>
              <div className="form-floating mb-3 col-md-6">
                <label htmlFor="floatingInput">Other Phone</label>
                <input
                  type="number"
                  className="form-control rounded-3"
                  id="floatingInput"
                  placeholder="Other Phone"
                  value={contactList.other_phone || ""}
                  onChange={(ev) =>
                    setContactList((prevContactList) => ({
                      ...prevContactList,
                      other_phone: ev.target.value,
                    }))
                  }
                />
              </div>
              <div className="form-floating mb-3 col-md-6">
                <label htmlFor="floatingInput">Assitant Phone</label>
                <input
                  type="number"
                  className="form-control rounded-3"
                  id="floatingInput"
                  name="assistant_phone"
                  placeholder="Assitant Phone"
                  value={contactList.assitant_phone || ""}
                  onChange={(ev) =>
                    setContactList((prevContactList) => ({
                      ...prevContactList,
                      assistant_phone: ev.target.value,
                    }))
                  }
                />
              </div>
              <div className="form-floating mb-3 col-md-6">
                <label htmlFor="floatingInput">Assitant Name</label>
                <input
                  type="text"
                  className="form-control rounded-3"
                  id="floatingInput"
                  placeholder="Assitant Name"
                  value={contactList.assistant_name || ""}
                  onChange={(ev) =>
                    setContactList((prevContactList) => ({
                      ...prevContactList,
                      assistant_name: ev.target.value,
                    }))
                  }
                />
              </div>
              <div className="form-floating mb-3 col-md-6">
                <label htmlFor="floatingInput">Fax</label>
                <input
                  type="text"
                  className="form-control rounded-3"
                  id="floatingInput"
                  placeholder="Fax"
                  value={contactList.fax || ""}
                  onChange={(ev) =>
                    setContactList((prevContactList) => ({
                      ...prevContactList,
                      fax: ev.target.value,
                    }))
                  }
                />
              </div>
              <div className="form-floating mb-3 col-md-6">
                <label htmlFor="floatingInput">LinkedIn</label>
                <input
                  type="text"
                  className="form-control rounded-3"
                  id="floatingInput"
                  placeholder="LinkedIn"
                  value={contactList.linkedin || ""}
                  onChange={(ev) =>
                    setContactList((prevContactList) => ({
                      ...prevContactList,
                      linkedin: ev.target.value,
                    }))
                  }
                />
              </div>
              <div className="form-floating mb-3 col-md-6">
                <label htmlFor="floatingInput">Facebook</label>
                <input
                  type="text"
                  className="form-control rounded-3"
                  id="floatingInput"
                  placeholder="Facebook"
                  value={contactList.facebook || ""}
                  onChange={(ev) =>
                    setContactList((prevContactList) => ({
                      ...prevContactList,
                      facebook: ev.target.value,
                    }))
                  }
                />
              </div>
              <div className="form-floating mb-3 col-md-6">
                <label htmlFor="floatingInput">Twitter</label>
                <input
                  type="text"
                  className="form-control rounded-3"
                  id="floatingInput"
                  placeholder="Twitter"
                  value={contactList.twitter || ""}
                  onChange={(ev) =>
                    setContactList((prevContactList) => ({
                      ...prevContactList,
                      twitter: ev.target.value,
                    }))
                  }
                />
              </div>
            </div>
            <h5
              className="font-weight-bold bg-light text-dark"
              style={{ padding: "10px 10px" }}
            >
              Address Information
            </h5>
            <div className="form-group">
              <div className="row form-floating mb-3 col-md-12">
                <div className="col-sm-6">
                  <label className="col-form-label">Mailing Address</label>
                  <textarea
                    className="form-control"
                    rows="3"
                    name="mailing-address"
                    placeholder="Address"
                    value={contactList.mailing_address || ""}
                    onChange={(ev) =>
                      setContactList((prevContactList) => ({
                        ...prevContactList,
                        mailing_address: ev.target.value,
                      }))
                    }
                  ></textarea>
                </div>
                <div className="col-sm-6 mt-3">
                  <label className="col-form-label"></label>
                  <br />
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Mailing City"
                    name="mailing-city"
                    value={contactList.mailing_city || ""}
                    onChange={(ev) =>
                      setContactList((prevContactList) => ({
                        ...prevContactList,
                        mailing_city: ev.target.value,
                      }))
                    }
                  />
                </div>
                <br />
                <div className="col-sm-6 mt-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Mailing State"
                    name="mailing-state"
                    value={contactList.mailing_state || ""}
                    onChange={(ev) =>
                      setContactList((prevContactList) => ({
                        ...prevContactList,
                        mailing_state: ev.target.value,
                      }))
                    }
                  />
                </div>
                <div className="col-sm-6 mt-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Mailing Postal code"
                    name="mailing-postal-code"
                    value={contactList.mailing_postal_code || ""}
                    onChange={(ev) =>
                      setContactList((prevContactList) => ({
                        ...prevContactList,
                        mailing_postal_code: ev.target.value,
                      }))
                    }
                  />
                </div>
                <div className="col-sm-6 mt-3">
                  <label htmlFor="floatingInput">Mailing Country</label>
                  <select
                    className="form-control"
                    aria-label="Default select example"
                    value={contactList.mailing_country || ""}
                    onChange={(ev) =>
                      setContactList((prevContactList) => ({
                        ...prevContactList,
                        mailing_country: ev.target.value,
                      }))
                    }
                  >
                    <option value="1">Nepal</option>
                    <option value="2">India</option>
                    <option value="3">US</option>
                  </select>
                </div>
                <div className="col-sm-6 mt-3">
                  <label htmlFor="floatingInput">Other Address</label>
                  <textarea
                    type="text"
                    className="form-control"
                    placeholder="Other Address"
                    rows={3}
                    value={contactList.other_address || ""}
                    onChange={(ev) =>
                      setContactList((prevContactList) => ({
                        ...prevContactList,
                        other_address: ev.target.value,
                      }))
                    }
                  ></textarea>
                </div>
              </div>
            </div>
            <div className="form-group row"></div>
            <h5
              className="font-weight-bold bg-light text-dark"
              style={{ padding: "10px 10px" }}
            >
              Dates To Remember
            </h5>
            <div className="row">
              <div className="form-floating mb-3 col-md-6">
                <label htmlFor="floatingSelect">Due Date*</label>
                <input
                  type="date"
                  className="form-control"
                  rows="3"
                  value={contactList.due_date || ""}
                  onChange={(ev) =>
                    setContactList((prevContactList) => ({
                      ...prevContactList,
                      due_date: ev.target.value,
                    }))
                  }
                />
              </div>
              <div className="form-floating mb-3 col-md-6">
                <label htmlFor="floatingSelect">Date Of Birth*</label>
                <input
                  type="date"
                  className="form-control"
                  rows="3"
                  value={contactList.date_of_birth || ""}
                  onChange={(ev) =>
                    setContactList((prevContactList) => ({
                      ...prevContactList,
                      date_of_birth: ev.target.value,
                    }))
                  }
                />
              </div>
            </div>
            <h5
              className="font-weight-bold bg-light text-dark"
              style={{ padding: "10px 10px" }}
            >
              Description Information
            </h5>
            <div className="row">
              <div className="form-floating mb-3 col-md-12">
                <label htmlFor="floatingSelect">Description</label>
                <textarea
                  className="form-control"
                  rows="3"
                  placeholder="description"
                  value={contactList.description || ""}
                  onChange={(ev) =>
                    setContactList((prevContactList) => ({
                      ...prevContactList,
                      description: ev.target.value,
                    }))
                  }
                ></textarea>
              </div>
            </div>
            <h5
              className="font-weight-bold bg-light text-dark"
              style={{ padding: "10px 10px" }}
            >
              Tag Information
            </h5>
            <div className="row">
              <div className="form-floating mb-3 col-md-12">
                <label htmlFor="floatingSelect">Tag List</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Tag List"
                  value={contactList.tag_list || ""}
                  onChange={(ev) =>
                    setContactList((prevContactList) => ({
                      ...prevContactList,
                      tag_list: ev.target.value,
                    }))
                  }
                />
              </div>
            </div>

            <h5
              className="font-weight-bold bg-light text-dark"
              style={{ padding: "10px 10px" }}
            >
              Permissions
            </h5>
            <div className="row">
              <div className="form-floating mb-3 col-md-6">
                <label htmlFor="floatingSelect">Permission</label>
                <select
                  className="form-control"
                  aria-label="Default select example"
                  value={contactList.permission || ""}
                  onChange={(ev) =>
                    setContactList((prevContactList) => ({
                      ...prevContactList,
                      permission: ev.target.value,
                    }))
                  }
                >
                  <option value="1">Task</option>
                  <option value="2">Select</option>
                  <option value="3">High</option>
                </select>
              </div>
            </div>
            <Modal.Footer className="d-flex justify-content-center">
              <Button variant="primary" type="submit">
                Save
              </Button>
              <Button variant="secondary" onClick={handleContactClose}>
                Cancel
              </Button>
            </Modal.Footer>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ContactModal;
