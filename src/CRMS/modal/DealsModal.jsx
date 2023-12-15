import axios from "axios";
import iziToast from "izitoast";
import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { ImCross } from "react-icons/im";

const DealsModal = ({ showDealsModal, handleDealsClose, dealId }) => {
  const [dealdata, setDealData] = useState("");

  const ondealSubmit = (ev) => {
    ev.preventDefault();
    const payload = { ...dealdata };
    axios({
      method: "post",
      url: dealId
        ? process.env.REACT_APP_URL + `/update-deal/${dealId}`
        : process.env.REACT_APP_URL + `/store-deal/`,
      data: payload,
    })
      .then((res) => {
        handleDealsClose();
        // console.log(res);
        iziToast.success({
          title: "Success",
          message: res.data.message,
          position: "topRight",
          timeout: 3000,
        });
        setDealData({ ...payload });
      })
      .catch((err) => {
        if (err && err.response) {
          console.log(err, err.response);
        }
      });
  };
  useEffect(() => {
    if (dealId) {
      axios
        .get(process.env.REACT_APP_URL + `/edit-deal/${dealId}`)
        .then(({ data }) => {
          // console.log(data);
          setDealData(data.data);
        })
        .catch((error) => {
          console.error("Error fetching task for edit:", error);
        });
    } else {
      // If it's a new task, you can set default values or leave it as an empty object
      setDealData("");
    }
  }, [dealId]);

  return (
    <>
      <Modal
        show={showDealsModal}
        onHide={handleDealsClose}
        size="lg"
        style={{ padding: "0px" }}
      >
        <Modal.Header>
          <Modal.Title>{dealId ? "Update Deal" : "Add Deal"}</Modal.Title>
          <ImCross onClick={handleDealsClose} />
        </Modal.Header>
        <Modal.Body>
          <form method="post" onSubmit={ondealSubmit}>
            <h5
              className="font-weight-bold bg-light text-dark"
              style={{ padding: "10px 10px" }}
            >
              Task Detail
            </h5>
            <div className="row">
              <div className="form-floating mb-3 col-md-6">
                <label htmlFor="floatingInput">Deal Name*</label>
                <input
                  type="text"
                  className="form-control rounded-3"
                  id="floatingInput"
                  placeholder="Deal Name"
                  name="deal_name"
                  value={dealdata.deal_name || ""}
                  onChange={(ev) =>
                    setDealData((prevDealData) => ({
                      ...prevDealData,
                      deal_name: ev.target.value,
                    }))
                  }
                />
              </div>
              <div className="form-floating mb-3 col-md-6">
                <label htmlFor="floatingSelect">Company</label>
                <select
                  className="form-control"
                  aria-label="Default select example"
                  name="company"
                  value={dealdata.company || ""}
                  onChange={(ev) =>
                    setDealData((prevDealData) => ({
                      ...prevDealData,
                      company: ev.target.value,
                    }))
                  }
                >
                  <option value="1">Select</option>
                  <option value="2">Select</option>
                </select>
              </div>
            </div>
            <h5 className="font-weight-bold bg-light text-dark">
              Additional Information
            </h5>
            <div className="row">
              <div className="form-floating mb-3 col-md-6">
                <label htmlFor="floatingInput">Category</label>
                <select
                  className="form-control"
                  aria-label="Default select example"
                  name="category"
                  value={dealdata.category || ""}
                  onChange={(ev) =>
                    setDealData((prevDealData) => ({
                      ...prevDealData,
                      category: ev.target.value,
                    }))
                  }
                >
                  <option value="1">Email</option>
                  <option value="2">Follow up</option>
                  <option value="2">GetStarted</option>
                </select>
              </div>
              <div className="form-floating mb-3 col-md-6">
                <label htmlFor="floatingInput">Probability Of Winning</label>
                <input
                  type="text"
                  className="form-control rounded-3"
                  id="floatingInput"
                  placeholder="Probability Of Winning"
                  name="probability_of_winning"
                  value={dealdata.probability_of_winning || ""}
                  onChange={(ev) =>
                    setDealData((prevDealData) => ({
                      ...prevDealData,
                      probability_of_winning: ev.target.value,
                    }))
                  }
                />
              </div>
              <div className="form-floating mb-3 col-md-6">
                <label htmlFor="floatingInput">Forecast Close Date *</label>
                <input
                  type="date"
                  className="form-control rounded-3"
                  id="floatingInput"
                  name="forecast_close_date"
                  value={dealdata.forecast_close_date || ""}
                  onChange={(ev) =>
                    setDealData((prevDealData) => ({
                      ...prevDealData,
                      forecast_close_date: ev.target.value,
                    }))
                  }
                />
              </div>

              <div className="form-floating mb-3 col-md-6">
                <label htmlFor="floatingInput">Actual Close Date *</label>
                <input
                  type="date"
                  className="form-control rounded-3"
                  id="floatingInput"
                  name="actual_close_date"
                  value={dealdata.actual_close_date || ""}
                  onChange={(ev) =>
                    setDealData((prevDealData) => ({
                      ...prevDealData,
                      actual_close_date: ev.target.value,
                    }))
                  }
                />
              </div>
              <div className="form-floating mb-3 col-md-6">
                <label htmlFor="floatingInput">User Responsible</label>
                <select
                  className="form-control"
                  aria-label="Default select example"
                  name="user_responsible"
                  value={dealdata.user_responsible || ""}
                  onChange={(ev) =>
                    setDealData((prevDealData) => ({
                      ...prevDealData,
                      user_responsible: ev.target.value,
                    }))
                  }
                >
                  <option value="1">John Doe</option>
                  <option value="2">Phone Inquiry</option>
                </select>
              </div>
              <div className="form-floating mb-3 col-md-6">
                <label htmlFor="floatingInput">Deal Value</label>
                <div className="row">
                  <div className="col-md-4">
                    <select
                      className="form-control"
                      aria-label="Default select example"
                      name="deal_value"
                      value={dealdata.deal_value || ""}
                      onChange={(ev) =>
                        setDealData((prevDealData) => ({
                          ...prevDealData,
                          deal_value: ev.target.value,
                        }))
                      }
                    >
                      <option value="1">US $</option>
                      <option value="2">NPR</option>
                    </select>
                  </div>
                  <div className="col-md-4">
                    <input
                      type="number"
                      className="form-control rounded-3"
                      id="floatingInput"
                      placeholder="Bid Amount"
                      name="bid_amount"
                      value={dealdata.bid_amount || ""}
                      onChange={(ev) =>
                        setDealData((prevDealData) => ({
                          ...prevDealData,
                          bid_amount: ev.target.value,
                        }))
                      }
                    />
                  </div>
                  <div className="col-md-4">
                    <select
                      className="form-control"
                      aria-label="Default select example"
                      name="deal_value_type"
                      value={dealdata.deal_value_type || ""}
                      onChange={(ev) =>
                        setDealData((prevDealData) => ({
                          ...prevDealData,
                          deal_value_type: ev.target.value,
                        }))
                      }
                    >
                      <option value="1">Fixed Bid</option>
                      <option value="2">Per Hour</option>
                      <option value="2">Per Day</option>
                    </select>
                  </div>
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
                  value={dealdata.description || ""}
                  onChange={(ev) =>
                    setDealData((prevDealData) => ({
                      ...prevDealData,
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
                  value={dealdata.tag_list || ""}
                  onChange={(ev) =>
                    setDealData((prevDealData) => ({
                      ...prevDealData,
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
                  value={dealdata.permission || ""}
                  onChange={(ev) =>
                    setDealData((prevDealData) => ({
                      ...prevDealData,
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
              <Button variant="secondary" onClick={handleDealsClose}>
                Cancel
              </Button>
            </Modal.Footer>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default DealsModal;
