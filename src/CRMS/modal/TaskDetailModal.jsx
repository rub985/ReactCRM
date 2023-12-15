import { useState } from "react";
import image from "../images/system-user.png";
import { Modal, Button } from "react-bootstrap";
import { ImCross } from "react-icons/im";

const TaskDetailModal = ({ showTaskDetailModal, handleTaskDetailClose }) => {
  const [activeTab, setActiveTab] = useState("details");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  return (
    <Modal
      show={showTaskDetailModal}
      onHide={handleTaskDetailClose}
      size="lg"
      style={{ paddingLeft: "0px" }}
    >
      <Modal.Header>
        {/* <Modal.Title>Task</Modal.Title> */}
        <div className="row w-100">
          <div className="col-md-7 account d-flex">
            <div className="company_img">
              <img src={image} alt="User" className="user-image" />
            </div>
            <div>
              <p className="mb-0">System User</p>
              <span className="modal-title">John Doe</span>
              <span className="rating-star">
                <i className="fa fa-star" aria-hidden="true"></i>
              </span>
              <span className="lock">
                <i className="fa fa-lock" aria-hidden="true"></i>
              </span>
            </div>
          </div>
        </div>
        <ImCross onClick={handleTaskDetailClose} />
      </Modal.Header>
      <div className="card due-dates">
        <div className="card-body">
          <div className="row">
            <div className="col">
              <span>Title</span>
              <p>VB of sales</p>
            </div>
            <div className="col">
              <span>Companies</span>
              <p>Solemen tech</p>
            </div>
            <div className="col">
              <span>Phone</span>
              <p>9876764875</p>
            </div>
            <div className="col">
              <span>Email</span>
              <p>johndoe@gmail.com</p>
            </div>
            <div className="col">
              <span>Contact owner</span>
              <p>John Doe</p>
            </div>
          </div>
        </div>
      </div>
      <Modal.Body>
        <ul className="nav nav-tabs nav-tabs-solid nav-tabs-rounded nav-justified mb-4">
          <li className="nav-item">
            <a
              className={`nav-link ${activeTab === "details" && "active"}`}
              href="#details"
              onClick={() => handleTabClick("details")}
            >
              Details
            </a>
          </li>
          <li className="nav-item">
            <a
              className={`nav-link ${activeTab === "related" && "active"}`}
              href="#related"
              onClick={() => handleTabClick("related")}
              data-bs-toggle="tab"
            >
              Related
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#task-activity" data-bs-toggle="tab">
              Activity
            </a>
          </li>
        </ul>
        <div className="accordion accordion-flush" id="accordionFlushExample">
          {activeTab == "details" && (
            <div>
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseOne"
                    aria-expanded="false"
                    aria-controls="flush-collapseOne"
                  >
                    Name & Occupation
                  </button>
                </h2>
                <div
                  id="flush-collapseOne"
                  className="accordion-collapse collapse"
                  data-bs-parent="#accordionFlushExample"
                >
                  <div
                    class="accordion-body js-accordion-body"
                    style={{ display: "block" }}
                  >
                    <div class="accordion-body__contents">
                      <table class="table">
                        <tbody>
                          <tr>
                            <td class="border-0">Record ID</td>
                            <td class="border-0">124192692</td>
                          </tr>
                          <tr>
                            <td class="border-0">Name</td>
                            <td class="border-0">John Doe</td>
                          </tr>
                          <tr>
                            <td>Company</td>
                            <td>Solemen</td>
                          </tr>
                          <tr>
                            <td>Title</td>
                            <td>Phone Enquiry</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>

              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseTwo"
                    aria-expanded="false"
                    aria-controls="flush-collapseTwo"
                  >
                    Task Detail
                  </button>
                </h2>
                <div
                  id="flush-collapseTwo"
                  className="accordion-collapse collapse"
                  data-bs-parent="#accordionFlushExample"
                >
                  <div
                    class="accordion-body js-accordion-body"
                    style={{ display: "block" }}
                  >
                    <div class="accordion-body__contents">
                      <table class="table">
                        <tbody>
                          <tr>
                            <td class="border-0">Record ID</td>
                            <td class="border-0">124192692</td>
                          </tr>
                          <tr>
                            <td class="border-0">Name</td>
                            <td class="border-0">John Doe</td>
                          </tr>
                          <tr>
                            <td>Company</td>
                            <td>Solemen</td>
                          </tr>
                          <tr>
                            <td>Title</td>
                            <td>Phone Enquiry</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseThree"
                    aria-expanded="false"
                    aria-controls="flush-collapseThree"
                  >
                    Additional Information
                  </button>
                </h2>
                <div
                  id="flush-collapseThree"
                  className="accordion-collapse collapse"
                  data-bs-parent="#accordionFlushExample"
                >
                  <div
                    class="accordion-body js-accordion-body"
                    style={{ display: "block" }}
                  >
                    <div
                      class="accordion-body js-accordion-body"
                      style={{ display: "block" }}
                    >
                      <div class="accordion-body__contents">
                        <table class="table">
                          <tbody>
                            <tr>
                              <td>Start Date</td>
                              <td>05/10/2012</td>
                            </tr>
                            <tr>
                              <td>Reminder Date</td>
                              <td>05/01/2012</td>
                            </tr>
                            <tr>
                              <td>Repeats</td>
                              <td>Lorem</td>
                            </tr>
                            <tr>
                              <td>Progress</td>
                              <td>0%</td>
                            </tr>
                            <tr>
                              <td>Priorit</td>
                              <td>Medium</td>
                            </tr>
                            <tr>
                              <td>Status</td>
                              <td>Not Started</td>
                            </tr>
                            <tr>
                              <td>Last Updated</td>
                              <td>04-Jun-20</td>
                            </tr>
                            <tr>
                              <td>Created</td>
                              <td>03-Jun-20 1:14 AM</td>
                            </tr>
                            <tr>
                              <td>Task Created By</td>
                              <td>John Doe</td>
                            </tr>
                            <tr>
                              <td>Task Owner</td>
                              <td>John Doe</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapsefour"
                    aria-expanded="false"
                    aria-controls="flush-collapsefour"
                  >
                    Related To
                  </button>
                </h2>
                <div
                  id="flush-collapsefour"
                  className="accordion-collapse collapse"
                  data-bs-parent="#accordionFlushExample"
                >
                  <div
                    class="accordion-body js-accordion-body"
                    style={{ display: "block" }}
                  >
                    <div class="accordion-body__contents">
                      <table class="table">
                        <tbody>
                          <tr>
                            <td class="border-0">Record ID</td>
                            <td class="border-0">124192692</td>
                          </tr>
                          <tr>
                            <td class="border-0">Name</td>
                            <td class="border-0">John Doe</td>
                          </tr>
                          <tr>
                            <td>Company</td>
                            <td>Solemen</td>
                          </tr>
                          <tr>
                            <td>Title</td>
                            <td>Phone Enquiry</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapsefive"
                    aria-expanded="false"
                    aria-controls="flush-collapsefive"
                  >
                    Description Information
                  </button>
                </h2>
                <div
                  id="flush-collapsefive"
                  className="accordion-collapse collapse"
                  data-bs-parent="#accordionFlushExample"
                >
                  <div className="accordion-body">
                    Placeholder content for this accordion, which is intended to
                    demonstrate the <code>.accordion-flush</code> class. This is
                    the third item's accordion body. Nothing more exciting
                    happening here in terms of content, but just filling up the
                    space to make it look, at least at first glance, a bit more
                    representative of how this would look in a real-world
                    application.
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapsesix"
                    aria-expanded="false"
                    aria-controls="flush-collapsesix"
                  >
                    Permission
                  </button>
                </h2>
                <div
                  id="flush-collapsesix"
                  className="accordion-collapse collapse"
                  data-bs-parent="#accordionFlushExample"
                >
                  <div className="accordion-body">
                    Placeholder content for this accordion, which is intended to
                    demonstrate the <code>.accordion-flush</code> class. This is
                    the third item's accordion body. Nothing more exciting
                    happening here in terms of content, but just filling up the
                    space to make it look, at least at first glance, a bit more
                    representative of how this would look in a real-world
                    application.
                  </div>
                </div>
              </div>
            </div>
          )}
          {activeTab == "related" && (
            <div>
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapse9"
                    aria-expanded="false"
                    aria-controls="flush-collapse9"
                  >
                    Companies
                  </button>
                </h2>
                <div
                  id="flush-collapse9"
                  className="accordion-collapse collapse"
                  data-bs-parent="#accordionFlushExample"
                >
                  <div class="row">
                    <div class="col-sm-12">
                      <table class="table table-striped table-nowrap custom-table mb-0 datatable dataTable no-footer">
                        <thead>
                          <tr role="row">
                            <th>Company Name</th>
                            <th>Phone</th>
                            <th>Billing Country</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr role="row" class="odd">
                            <td class="sorting_1">
                              <a href="#" class="avatar">
                                <img alt="" src="assets/img/c-logo.png" />
                              </a>
                              <a
                                href="#"
                                data-bs-toggle="modal"
                                data-bs-target="#company-details"
                              >
                                Acme Corporation
                              </a>
                            </td>
                            <td>8754554531</td>
                            <td>United States</td>
                          </tr>
                          <tr role="row" class="even">
                            <td class="sorting_1">
                              <a href="#" class="avatar">
                                <img alt="" src="assets/img/c-logo2.png" />
                              </a>
                              <a
                                href="#"
                                data-bs-toggle="modal"
                                data-bs-target="#company-details"
                              >
                                Clampett Oil and Gas Corp.
                              </a>
                            </td>
                            <td>8754554531</td>
                            <td>United States</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapse10"
                    aria-expanded="false"
                    aria-controls="flush-collapse10"
                  >
                    Deals
                  </button>
                </h2>
                <div
                  id="flush-collapse10"
                  className="accordion-collapse collapse"
                  data-bs-parent="#accordionFlushExample"
                >
                  <div
                    class="accordion-body js-accordion-body"
                    style={{ display: "block" }}
                  >
                    <div class="accordion-body__contents">
                      <table class="table table-striped">
                        <thead>
                          <th>Deal name</th>
                          <th>Company</th>
                          <th>User Responsible</th>
                          <th>Deal Value</th>
                        </thead>
                        <tbody>
                          <tr>
                            <td>Record ID</td>
                            <td>ABC</td>
                            <td>john</td>
                            <td>1000</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapse11"
                    aria-expanded="false"
                    aria-controls="flush-collapse11"
                  >
                    Projects
                  </button>
                </h2>
                <div
                  id="flush-collapse11"
                  className="accordion-collapse collapse"
                  data-bs-parent="#accordionFlushExample"
                >
                  <div
                    class="accordion-body js-accordion-body"
                    style={{ display: "block" }}
                  >
                    <div class="accordion-body__contents">
                      <table class="table table-striped">
                        <thead>
                          <th>Deal name</th>
                          <th>Company</th>
                          <th>User Responsible</th>
                          <th>Deal Value</th>
                        </thead>
                        <tbody>
                          <tr>
                            <td>Record ID</td>
                            <td>ABC</td>
                            <td>john</td>
                            <td>1000</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </Modal.Body>
    </Modal>
  );
};
export default TaskDetailModal;
