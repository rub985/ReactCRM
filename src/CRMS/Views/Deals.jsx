import React, { useEffect, useState } from "react";
// import { Modal, Form, Button } from "react-bootstrap";
import DealsModal from "../modal/DealsModal";
import Loader from "../Layouts/Loader";
import axios from "axios";
import iziToast from "izitoast";

const Deals = () => {
  const [showDealsModal, setDealsShowModal] = useState(false);
  const [DealsStatus, setDealsStatus] = useState("All Companies");

  // const handleDealsShow = () => setDealsShowModal(true);
  const handleDealsClose = () => setDealsShowModal(false);
  const handlestatuschange = (event) => {
    setDealsStatus(event.target.innerText);
  };
  const [dealLists, setdealLists] = useState({});
  const [selectedDealId, setSelectedDealId] = useState(null);
  // const [users, setUsers] = useState([]);
  const handleDealsShow = (id) => {
    // console.log(id);
    setSelectedDealId(id);

    if (id) {
      axios
        .get(process.env.REACT_APP_URL + `/edit-deal/${id}`)
        .then(({ data }) => {
          setdealLists([data.data]);
          // console.log(data)
          setDealsShowModal(true);
        })
        .catch((error) => {
          console.error("Error fetching contact for edit:", error);
        });
    } else {
      // If id is not present, it's an add operation
      setDealsShowModal(true);
    }
  };
  //fetching data
  const [isLoading, setIsLoading] = useState(true);
  const fetchDealData = async () => {
    try {
      const responseDeal = await axios.get(
        process.env.REACT_APP_URL + `/list-deals/`
      );
      setdealLists(responseDeal.data.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching tasks or users:", error);
      setIsLoading(true);
    }
  };
  const refreshDeal = () => {
    fetchDealData();
  };
  useEffect(() => {
    setIsLoading(true);
    fetchDealData(() => {
      setIsLoading(false);
    });
  }, []);
  const deletedeal = (id) => {
    
    axios
      .delete(process.env.REACT_APP_URL + `/delete-deal/${id}`)
      .then((res) => {
        // console.log("Response:", res);
        iziToast.success({
          title: "Success",
          message: res.data.message,
          position: "topRight",
          timeout: 3000,
        });
        const updateddata = dealLists.filter((item) => item.id !== id);
        setdealLists(updateddata);
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
        <h1 className="h3 mb-2 text-gray-800">Deals</h1>
        <div className="d-flex justify-content-between mb-3">
          <div className="dropdown mt-2">
            <a
              className="dropdown-toggle"
              id="taskDropdown"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {DealsStatus}
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
            onClick={() => handleDealsShow()}
          >
            Add New
          </button>
        </div>

        {/* <!-- DataTales Example --> */}
        <div className="card shadow mb-4">
          <div className="card-header py-3">
            <h6 className="m-0 font-weight-bold text-primary">Deals Table</h6>
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
                      <th>Deal Name</th>
                      <th>Company</th>
                      <th>Pipeline</th>
                      <th>Forecast Close Date</th>
                      <th>User Responsible</th>
                      <th>Deal Value</th>
                      <th className="text-end">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dealLists.length > 0 &&
                      dealLists.map((deal) => (
                        <tr key={deal.id}>
                          <td> {deal.deal_name}</td>
                          <td>{deal.company}</td>
                          <td>{deal.pipeline}</td>
                          <td>{deal.forecast_close_date}</td>
                          <td>{deal.user_responsible}</td>
                          <td>
                            {deal.value}
                            {deal.bill_amount}
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
                                    onClick={() => handleDealsShow(deal.id)}
                                  >
                                    Edit
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className="dropdown-item"
                                    href="#"
                                    onClick={() => deletedeal(deal.id)}
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

        <DealsModal
          showDealsModal={showDealsModal}
          handleDealsClose={() => {
            handleDealsClose();
            refreshDeal();
          }}
          dealId={selectedDealId}
        />
      </div>
    </>
  );
};
export default Deals;
