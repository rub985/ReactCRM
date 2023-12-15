import React, { useEffect, useState } from "react";
// import { Modal, Form, Button } from "react-bootstrap";
import TaskModal from "../modal/TaskModal";
import axios from "axios";
import Loader from "../Layouts/Loader";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import TaskUser from "../modal/TaskUser";
import TaskDetailModal from "../modal/TaskDetailModal";

const Tasks = () => {
  const [showModal, setShowModal] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showTaskDetailModal, setShowTaskDetailModal] = useState(false);
  const [taskStatus, settaskStatus] = useState("All Task");
  const [taskLists, setTaskLists] = useState([]);
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  // const [users, setUsers] = useState([]);

  // const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);
  const handleTaskClose = () => setShowTaskModal(false);
  const handleTaskShow = () => setShowTaskModal(true);
  const handleTaskDetailClose = () => setShowTaskDetailModal(false);
  const handleTaskDetailShow = () => setShowTaskDetailModal(true);

  // If id is present, it's an edit operation, so fetch data
  const handleShow = (id) => {
    // console.log(id);
    setSelectedTaskId(id);

    if (id) {
      axios
        .get(process.env.REACT_APP_URL + `/edit-task/${id}`)
        .then(({ data }) => {
          setTaskLists([data.data]);
          // console.log(data)
          setShowModal(true);
        })
        .catch((error) => {
          console.error("Error fetching task for edit:", error);
        });
    } else {
      // If id is not present, it's an add operation
      setShowModal(true);
    }
  };
  const handlestatuschange = (event) => {
    settaskStatus(event.target.innerText);
  };

  //list tasks
  const [isLoading, setIsLoading] = useState(true);
  const fetchData = async () => {
    try {
      const responseTask = await axios.get(
        process.env.REACT_APP_URL + `/list-task/`
      );
      setTaskLists(responseTask.data.data);
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
  const refreshData = () => {
    fetchData(); // You can customize this if needed
  };

  useEffect(() => {
    setIsLoading(true);
    fetchData(() => {
      setIsLoading(false);
    });
  }, []);

  //delete data
  const deleteproduct = (id) => {
    axios
      .delete(process.env.REACT_APP_URL + `/delete-task/${id}`)
      .then((res) => {
        // console.log("Response:", res);
        iziToast.success({
          title: "Success",
          message: res.data.message,
          position: "topRight",
          timeout: 3000,
        });
        const updateddata = taskLists.filter((item) => item.id !== id);
        setTaskLists(updateddata);
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
        <h1 className="h3 mb-2 text-gray-800">Tasks</h1>
        <div className="d-flex justify-content-between mb-3">
          <div className="dropdown mt-2">
            <a
              className="dropdown-toggle"
              id="taskDropdown"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {taskStatus}
            </a>
            <ul className="dropdown-menu" aria-labelledby="taskDropdown">
              <li>
                <a
                  className="dropdown-item"
                  href="#"
                  onClick={handlestatuschange}
                >
                  All Task
                </a>
              </li>
              <li>
                <a
                  className="dropdown-item"
                  href="#"
                  onClick={handlestatuschange}
                >
                  Completed
                </a>
              </li>
              <li>
                <a
                  className="dropdown-item"
                  href="#"
                  onClick={handlestatuschange}
                >
                  Pending
                </a>
              </li>
            </ul>
          </div>
          <button
            className="btn btn-info btn-rounded"
            onClick={() => handleShow()}
          >
            Add New
          </button>
        </div>

        {/* <!-- DataTales Example --> */}
        <div className="card shadow mb-4">
          <div className="card-header py-3">
            <h6 className="m-0 font-weight-bold text-primary">Tasks Table</h6>
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
                      <th>Task Name</th>
                      <th>Percent Complete Indicator</th>
                      <th>Responsible User</th>
                      <th>Due Date</th>
                      <th>Task Owner</th>
                      <th>Status</th>
                      <th className="text-end">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {taskLists.length > 0 &&
                      taskLists.map((taskLists) => (
                        <tr key={taskLists.id}>
                          <td>
                            <a href="#" onClick={handleTaskShow}>
                              {taskLists.task_name}
                            </a>
                          </td>
                          <td>
                            <div className="progress" style={{ height: "8px" }}>
                              <div
                                className="progress-bar bg-danger"
                                role="progressbar"
                                style={{ width: "100%" }}
                                aria-valuenow="25"
                                aria-valuemin="0"
                                aria-valuemax="100"
                              ></div>
                            </div>
                          </td>
                          <td>
                            <a href="#" onClick={() => handleTaskDetailShow()}>
                              {taskLists.user ? taskLists.user.name : ""}
                            </a>
                          </td>
                          <td>{taskLists.due_date}</td>
                          <td>{/*taskLists*/}</td>
                          <td>
                            <button className="btn btn-warning btn-sm">
                              {taskLists.status}
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
                                    onClick={() => handleShow(taskLists.id)}
                                  >
                                    Edit
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className="dropdown-item"
                                    href="#"
                                    onClick={() => deleteproduct(taskLists.id)}
                                  >
                                    Delete
                                  </a>
                                  <a className="dropdown-item" href="#">
                                    Completed
                                  </a>
                                  <a className="dropdown-item" href="#">
                                    Clone Task
                                  </a>
                                  <a className="dropdown-item" href="#">
                                    Change Responsible User
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

        <TaskModal
          showModal={showModal}
          handleClose={() => {
            handleClose();
            refreshData();
          }}
          taskId={selectedTaskId}
        />
        <TaskUser
          showTaskModal={showTaskModal}
          handleTaskClose={handleTaskClose}
        />
        <TaskDetailModal
          handleTaskDetailClose={handleTaskDetailClose}
          showTaskDetailModal={showTaskDetailModal}
        />
      </div>
    </>
  );
};
export default Tasks;
