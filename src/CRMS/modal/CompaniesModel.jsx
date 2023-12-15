import axios from "axios";
import iziToast from "izitoast";
import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { ImCross } from "react-icons/im";

const CompaniesModal = ({
  showCompanyModal,
  handleCompanyClose,
  companyId,
}) => {
  const [companydata, setCompanyData] = useState({});

  const oncompanySubmit = (ev) => {
    ev.preventDefault();
    const payload = { ...companydata };
    axios({
      method: "post",
      url: companyId
        ? process.env.REACT_APP_URL + `/update-company/${companyId}`
        : process.env.REACT_APP_URL + `/store-company/`,
      data: payload,
    })
      .then((res) => {
        handleCompanyClose();
        // console.log(res);
        iziToast.success({
          title: "Success",
          message: res.data.message,
          position: "topRight",
          timeout: 3000,
        });
        setCompanyData({ });
      })
      .catch((err) => {
        if (err && err.response) {
          console.log(err, err.response);
        }
      });
  };
  useEffect(() => {
    if (companyId) {
      axios
        .get(process.env.REACT_APP_URL + `/edit-company/${companyId}`)
        .then(({ data }) => {
          // console.log(data);
          setCompanyData(data.data);
        })
        .catch((error) => {
          console.error("Error fetching task for edit:", error);
        });
    } else {
      // If it's a new task, you can set default values or leave it as an empty object
      setCompanyData({ });
    }
  }, [companyId]);

  return (
    <>
      <Modal
        show={showCompanyModal}
        onHide={handleCompanyClose}
        size="lg"
        style={{ padding: "0px" }}
      >
        <Modal.Header>
          <Modal.Title>
            {companyId ? "Update Company" : "Add Company"}
          </Modal.Title>
          <ImCross onClick={handleCompanyClose} />
        </Modal.Header>
        <Modal.Body>
          <form method="post" onSubmit={oncompanySubmit}>
            <h5 className="font-weight-bold bg-light text-dark">
              Organization Name
            </h5>
            <div className="row">
              <div className="form-floating mb-3 col-md-12">
                <label htmlFor="floatingInput">Organization Name*</label>
                <input
                  type="text"
                  className="form-control rounded-3"
                  id="floatingInput"
                  placeholder="Organization Name"
                  name="organiation_name"
                  value={companydata.organization_name || ""}
                  onChange={(ev) =>
                    setCompanyData((prevCompanyData) => ({
                      ...prevCompanyData,
                      organization_name: ev.target.value,
                    }))
                  }
                />
              </div>
              <div className="form-floating mb-3 col-md-6">
                <label htmlFor="floatingSelect">Organization</label>
                <select
                  className="form-control"
                  aria-label="Default select example"
                  name="organization"
                  value={companydata.organization || " "}
                  onChange={(ev) =>
                    setCompanyData((prevCompanyData) => ({
                      ...prevCompanyData,
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
                  value={companydata.title || ""}
                  onChange={(ev) =>
                    setCompanyData((prevCompanyData) => ({
                      ...prevCompanyData,
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
              Organization Contact Details
            </h5>
            <div className="row">
              <div className="form-floating mb-3 col-md-6">
                <label htmlFor="floatingInput">Phone</label>
                <input
                  type="number"
                  className="form-control rounded-3"
                  id="floatingInput"
                  placeholder="phone"
                  name="phone"
                  value={companydata.phone || ""}
                  onChange={(ev) =>
                    setCompanyData((prevCompanyData) => ({
                      ...prevCompanyData,
                      phone: ev.target.value,
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
                  value={companydata.fax || ""}
                  onChange={(ev) =>
                    setCompanyData((prevCompanyData) => ({
                      ...prevCompanyData,
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
                  value={companydata.website || ""}
                  onChange={(ev) =>
                    setCompanyData((prevCompanyData) => ({
                      ...prevCompanyData,
                      website: ev.target.value,
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
                  name="linkedin"
                  value={companydata.linkedin || ""}
                  onChange={(ev) =>
                    setCompanyData((prevCompanyData) => ({
                      ...prevCompanyData,
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
                  name="facebook"
                  value={companydata.facebook || ""}
                  onChange={(ev) =>
                    setCompanyData((prevCompanyData) => ({
                      ...prevCompanyData,
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
                  name="twitter"
                  value={companydata.twitter || ""}
                  onChange={(ev) =>
                    setCompanyData((prevCompanyData) => ({
                      ...prevCompanyData,
                      twitter: ev.target.value,
                    }))
                  }
                />
              </div>
              <div className="form-floating mb-3 col-md-6">
                <label htmlFor="floatingInput">Email Domains</label>
                <input
                  type="text"
                  className="form-control rounded-3"
                  id="floatingInput"
                  placeholder="Email Domains"
                  name="email_domains"
                  value={companydata.email_domains || ""}
                  onChange={(ev) =>
                    setCompanyData((prevCompanyData) => ({
                      ...prevCompanyData,
                      email_domains: ev.target.value,
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
                  <label className="col-form-label">Billing Address</label>
                  <textarea
                    className="form-control"
                    rows="3"
                    placeholder="Billing Address"
                    name="billing_address"
                    value={companydata.billing_address || ""}
                    onChange={(ev) =>
                      setCompanyData((prevCompanyData) => ({
                        ...prevCompanyData,
                        billing_address: ev.target.value,
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
                    placeholder="Billing City"
                    name="billing_city"
                    value={companydata.billing_city || ""}
                    onChange={(ev) =>
                      setCompanyData((prevCompanyData) => ({
                        ...prevCompanyData,
                        billing_city: ev.target.value,
                      }))
                    }
                  />
                </div>
                <br />
                <div className="col-sm-6 mt-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Billing State"
                    name="billing_state"
                    value={companydata.billing_state || ""}
                    onChange={(ev) =>
                      setCompanyData((prevCompanyData) => ({
                        ...prevCompanyData,
                        billing_state: ev.target.value,
                      }))
                    }
                  />
                </div>
                <div className="col-sm-6 mt-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Billing Postal code"
                    name="billing_postal_code"
                    value={companydata.billing_postal_code || ""}
                    onChange={(ev) =>
                      setCompanyData((prevCompanyData) => ({
                        ...prevCompanyData,
                        billing_postal_code: ev.target.value,
                      }))
                    }
                  />
                </div>
                <div className="col-sm-6 mt-3">
                  <label htmlFor="floatingInput">Billing Country</label>
                  <select
                    className="form-control"
                    aria-label="Default select example"
                    name="billing_country"
                    value={companydata.billing_country || ""}
                    onChange={(ev) =>
                      setCompanyData((prevCompanyData) => ({
                        ...prevCompanyData,
                        billing_country: ev.target.value,
                      }))
                    }
                  >
                    <option value="1">Nepal</option>
                    <option value="2">India</option>
                    <option value="3">US</option>
                  </select>
                </div>
                <div className="col-sm-6 mt-3">
                  <label htmlFor="floatingInput">Shipping Address</label>
                  <textarea
                    type="text"
                    className="form-control"
                    placeholder="Shipping Address"
                    rows={3}
                    name="shipping_address"
                    value={companydata.shipping_address || ""}
                    onChange={(ev) =>
                      setCompanyData((prevCompanyData) => ({
                        ...prevCompanyData,
                        shipping_address: ev.target.value,
                      }))
                    }
                  ></textarea>
                </div>
                <div className="col-sm-6 mt-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Shipping City"
                    rows={3}
                    name="shipping_city"
                    value={companydata.shipping_city || ""}
                    onChange={(ev) =>
                      setCompanyData((prevCompanyData) => ({
                        ...prevCompanyData,
                        shipping_city: ev.target.value,
                      }))
                    }
                  />
                </div>
                <div className="col-sm-6 mt-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Shipping State"
                    rows={3}
                    name="shipping_state"
                    value={companydata.shipping_state || ""}
                    onChange={(ev) =>
                      setCompanyData((prevCompanyData) => ({
                        ...prevCompanyData,
                        shipping_state: ev.target.value,
                      }))
                    }
                  />
                </div>
                <div className="col-sm-6 mt-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Shipping Postal Code"
                    rows={3}
                    name="shipping_postal_code"
                    value={companydata.shipping_postal_code || ""}
                    onChange={(ev) =>
                      setCompanyData((prevCompanyData) => ({
                        ...prevCompanyData,
                        shipping_postal_code: ev.target.value,
                      }))
                    }
                  />
                </div>
                <div className="col-sm-6 mt-3">
                  <select
                    className="form-control"
                    aria-label="Default select example"
                    placeholder="Shipping Country"
                    name="shipping_country"
                    value={companydata.shipping_country || ""}
                    onChange={(ev) =>
                      setCompanyData((prevCompanyData) => ({
                        ...prevCompanyData,
                        shipping_country: ev.target.value,
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
            <div className="form-group row"></div>
            <h5
              className="font-weight-bold bg-light text-dark"
              style={{ padding: "10px 10px" }}
            >
              Dates To Remember
            </h5>
            <div className="row">
              <div className="form-floating mb-3 col-md-6">
                <label htmlFor="floatingSelect">Dates To Remember</label>
                <input
                  type="date"
                  className="form-control"
                  rows="3"
                  name="date_to_remember"
                  value={companydata.date_to_remember || ""}
                  onChange={(ev) =>
                    setCompanyData((prevCompanyData) => ({
                      ...prevCompanyData,
                      date_to_remember: ev.target.value,
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
                  name="description"
                  value={companydata.description || ""}
                  onChange={(ev) =>
                    setCompanyData((prevCompanyData) => ({
                      ...prevCompanyData,
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
                  value={companydata.tag_list || ""}
                  onChange={(ev) =>
                    setCompanyData((prevCompanyData) => ({
                      ...prevCompanyData,
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
                  value={companydata.permission || ""}
                  onChange={(ev) =>
                    setCompanyData((prevCompanyData) => ({
                      ...prevCompanyData,
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
              <Button variant="secondary" onClick={handleCompanyClose}>
                Cancel
              </Button>
            </Modal.Footer>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default CompaniesModal;
