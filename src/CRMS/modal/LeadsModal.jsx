import axios from "axios";
import iziToast from "izitoast";
import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { ImCross } from "react-icons/im";

const LeadsModal = ({ showLeadsModal, handleLeadsClose, leadId }) => {
  const [leaddata, setLeadData] = useState("");

  const onleadSubmit = (ev) => {
    ev.preventDefault();
    const payload = { ...leaddata };
    axios({
      method: "post",
      url: leadId
        ? process.env.REACT_APP_URL + `/update-lead/${leadId}`
        : process.env.REACT_APP_URL + `/store-lead/`,
      data: payload,
    })
      .then((res) => {
        handleLeadsClose();
        // console.log(res);
        iziToast.success({
          title: "Success",
          message: res.data.message,
          position: "topRight",
          timeout: 3000,
        });
        setLeadData({ ...payload });
      })
      .catch((err) => {
        if (err && err.response) {
          console.log(err, err.response);
        }
      });
  };
  useEffect(() => {
    if (leadId) {
      axios
        .get(process.env.REACT_APP_URL + `/edit-lead/${leadId}`)
        .then(({ data }) => {
          // console.log(data);
          setLeadData(data.data);
        })
        .catch((error) => {
          console.error("Error fetching task for edit:", error);
        });
    } else {
      // If it's a new task, you can set default values or leave it as an empty object
      setLeadData("");
    }
  }, [leadId]);

  return (
    <>
      <Modal
        show={showLeadsModal}
        onHide={handleLeadsClose}
        size="lg"
        style={{ padding: "0px" }}
      >
        <Modal.Header>
          <Modal.Title>{leadId ? "Update Lead" : "Add Lead"}</Modal.Title>
          <ImCross onClick={handleLeadsClose} />
        </Modal.Header>
        <Modal.Body>
          <form method="post" onSubmit={onleadSubmit}>
            <h5
              className="font-weight-bold bg-light text-dark"
              style={{ padding: "10px 10px" }}
            >
              Lead Information
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
                      value={leaddata.prefix || ""}
                      onChange={(ev) =>
                        setLeadData((prevLeadData) => ({
                          ...prevLeadData,
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
                      value={leaddata.first_name || ""}
                      onChange={(ev) =>
                        setLeadData((prevLeadData) => ({
                          ...prevLeadData,
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
                      name="last_name"
                      value={leaddata.last_name || ""}
                      onChange={(ev) =>
                        setLeadData((prevLeadData) => ({
                          ...prevLeadData,
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
                  name="organization"
                  value={leaddata.organization || ""}
                  onChange={(ev) =>
                    setLeadData((prevLeadData) => ({
                      ...prevLeadData,
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
                  name="title"
                  value={leaddata.title || ""}
                  onChange={(ev) =>
                    setLeadData((prevLeadData) => ({
                      ...prevLeadData,
                      title: ev.target.value,
                    }))
                  }
                />
              </div>
              <div className="form-floating mb-3 col-md-6">
                <label htmlFor="floatingSelect">Lead Status</label>
                <select
                  className="form-control"
                  aria-label="Default select example"
                  name="lead_status"
                  value={leaddata.lead_status || ""}
                  onChange={(ev) =>
                    setLeadData((prevLeadData) => ({
                      ...prevLeadData,
                      lead_status: ev.target.value,
                    }))
                  }
                >
                  <option value="1">Select</option>
                  <option value="2">Select</option>
                </select>
              </div>
              <div className="form-floating mb-3 col-md-6">
                <label htmlFor="floatingSelect">User Responsible</label>
                <select
                  className="form-control"
                  aria-label="Default select example"
                  name="user_responsible"
                  value={leaddata.user_responsible || ""}
                  onChange={(ev) =>
                    setLeadData((prevLeadData) => ({
                      ...prevLeadData,
                      user_responsible: ev.target.value,
                    }))
                  }
                >
                  <option value="1">Select</option>
                  <option value="2">Select</option>
                </select>
              </div>
              <div className="form-floating mb-3 col-md-6">
                <label htmlFor="floatingInput">Lead Rating</label>
                <input
                  type="number"
                  className="form-control rounded-3"
                  id="floatingInput"
                  placeholder="Rating"
                  name="lead_rating"
                  value={leaddata.lead_rating || ""}
                  onChange={(ev) =>
                    setLeadData((prevLeadData) => ({
                      ...prevLeadData,
                      lead_rating: ev.target.value,
                    }))
                  }
                />
              </div>
            </div>
            <h5
              className="font-weight-bold bg-light text-dark"
              style={{ padding: "10px 10px" }}
            >
              Additional Information
            </h5>
            <div className="row">
              <div className="form-floating mb-3 col-md-6">
                <label htmlFor="floatingInput">Email</label>
                <input
                  type="email"
                  className="form-control rounded-3"
                  id="floatingInput"
                  placeholder="email"
                  name="email"
                  value={leaddata.email || ""}
                  onChange={(ev) =>
                    setLeadData((prevLeadData) => ({
                      ...prevLeadData,
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
                  name="phone"
                  value={leaddata.phone || ""}
                  onChange={(ev) =>
                    setLeadData((prevLeadData) => ({
                      ...prevLeadData,
                      phone: ev.target.value,
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
                  name="mobile_phone"
                  value={leaddata.mobile_phone || ""}
                  onChange={(ev) =>
                    setLeadData((prevLeadData) => ({
                      ...prevLeadData,
                      mobile_phone: ev.target.value,
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
                  name="fax"
                  value={leaddata.fax || ""}
                  onChange={(ev) =>
                    setLeadData((prevLeadData) => ({
                      ...prevLeadData,
                      fax: ev.target.value,
                    }))
                  }
                />
              </div>
              <div className="form-floating mb-3 col-md-6">
                <label htmlFor="floatingInput">Website</label>
                <input
                  type="text"
                  className="form-control rounded-3"
                  id="floatingInput"
                  placeholder="Website"
                  name="website"
                  value={leaddata.website || ""}
                  onChange={(ev) =>
                    setLeadData((prevLeadData) => ({
                      ...prevLeadData,
                      website: ev.target.value,
                    }))
                  }
                />
              </div>
              <div className="form-floating mb-3 col-md-6">
                <label htmlFor="floatingInput">Industry</label>
                <input
                  type="text"
                  className="form-control rounded-3"
                  id="floatingInput"
                  placeholder="Industry"
                  name="industry"
                  value={leaddata.industry || ""}
                  onChange={(ev) =>
                    setLeadData((prevLeadData) => ({
                      ...prevLeadData,
                      industry: ev.target.value,
                    }))
                  }
                />
              </div>
              <div className="form-floating mb-3 col-md-6">
                <label htmlFor="floatingInput">Number of Employees</label>
                <input
                  type="number"
                  className="form-control rounded-3"
                  id="floatingInput"
                  placeholder="Employee Number"
                  name="no_of_employee"
                  value={leaddata.no_of_employee || ""}
                  onChange={(ev) =>
                    setLeadData((prevLeadData) => ({
                      ...prevLeadData,
                      no_of_employee: ev.target.value,
                    }))
                  }
                />
              </div>
              <div className="form-floating mb-3 col-md-6">
                <label htmlFor="floatingInput">Lead Source</label>
                <select
                  className="form-control"
                  aria-label="Default select example"
                  name="lead_source"
                  value={leaddata.lead_source || ""}
                  onChange={(ev) =>
                    setLeadData((prevLeadData) => ({
                      ...prevLeadData,
                      lead_source: ev.target.value,
                    }))
                  }
                >
                  <option value="1">Web</option>
                  <option value="2">Phone Inquiry</option>
                </select>
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
                <div className="col-sm-12">
                  <label className="col-form-label">Mailing Address</label>
                  <textarea
                    className="form-control"
                    rows="3"
                    placeholder="Address"
                    name="mailing_address"
                    value={leaddata.mailing_address || ""}
                    onChange={(ev) =>
                      setLeadData((prevLeadData) => ({
                        ...prevLeadData,
                        mailing_address: ev.target.value,
                      }))
                    }
                  ></textarea>
                </div>
                <br />
                <div className="col-sm-6 mt-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="City"
                    name="city"
                    value={leaddata.city || ""}
                    onChange={(ev) =>
                      setLeadData((prevLeadData) => ({
                        ...prevLeadData,
                        city: ev.target.value,
                      }))
                    }
                  />
                </div>
                <div className="col-sm-6 mt-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="State/Province"
                    name="state"
                    value={leaddata.state || ""}
                    onChange={(ev) =>
                      setLeadData((prevLeadData) => ({
                        ...prevLeadData,
                        state: ev.target.value,
                      }))
                    }
                  />
                </div>
                <div className="col-sm-6 mt-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Postal Code"
                    name="postal_code"
                    value={leaddata.postal_code || ""}
                    onChange={(ev) =>
                      setLeadData((prevLeadData) => ({
                        ...prevLeadData,
                        postal_code: ev.target.value,
                      }))
                    }
                  />
                </div>
                <div className="col-sm-6 mt-3">
                  <select
                    className="form-control"
                    aria-label="Default select example"
                    name="country"
                    value={leaddata.country || ""}
                    onChange={(ev) =>
                      setLeadData((prevLeadData) => ({
                        ...prevLeadData,
                        country: ev.target.value,
                      }))
                    }
                  >
                    <option value="1">Nepal</option>
                    <option value="2">India</option>
                    <option value="3">US</option>
                  </select>
                </div>
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
                  name="description"
                  value={leaddata.description || ""}
                  onChange={(ev) =>
                    setLeadData((prevLeadData) => ({
                      ...prevLeadData,
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
                  name="tag_list"
                  value={leaddata.tag_list || ""}
                  onChange={(ev) =>
                    setLeadData((prevLeadData) => ({
                      ...prevLeadData,
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
                  name="permission"
                  value={leaddata.permission || ""}
                  onChange={(ev) =>
                    setLeadData((prevLeadData) => ({
                      ...prevLeadData,
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
              <Button variant="secondary" onClick={handleLeadsClose}>
                Cancel
              </Button>
            </Modal.Footer>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default LeadsModal;
