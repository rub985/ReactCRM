// TaskModal.js
import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { ImCross } from "react-icons/im";
import axios from "axios";
import iziToast from "izitoast";

const TaskModal = ({ showModal, handleClose, taskId }) => {
  console.log(taskId);
  const [tasklist, setTasklist] = useState({
    task_name: "",
    user_id: "",
    category: "",
    due_date: "",
    start_date: "",
    reminder_date: "",
    priority: "",
    status: "not started",
    related_to: "",
    description: "",
    permission: "",
  });
  // const { id } = useParams();
  const [users, setUsers] = useState([]); // State to store the list of users

  useEffect(() => {
    // Fetch the list of users when the component mounts
    axios
      .get(process.env.REACT_APP_URL + "/list-user")
      .then(({ data }) => {
        setUsers(data.data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });

    if (taskId) {
      axios
        .get(process.env.REACT_APP_URL + `/edit-task/${taskId}`)
        .then(({ data }) => {
          setTasklist(data.data);
          console.log(data);
        })
        .catch((error) => {
          console.error("Error fetching task for edit:", error);
        });
    } else {
      // If it's a new task, you can set default values or leave it as an empty object
      setTasklist({
        task_name: "",
        user_id: "",
        category: "",
        due_date: "",
        start_date: "",
        reminder_date: "",
        priority: "",
        status: "not started",
        related_to: "",
        description: "",
        permission: "",
      });
    }
  }, [taskId]);
  const onSubmit = (ev) => {
    ev.preventDefault();

    const payload = { ...tasklist };
    // let res = null;
    axios({
      method: "post",
      url: taskId
        ? process.env.REACT_APP_URL + `/update-task/${taskId}`
        : process.env.REACT_APP_URL + `/store-task/`,
      data: payload,
    })
      .then((res) => {
        // console.log(res);
        // Navigate("/tasks");
        // Close the modal
        handleClose();
        iziToast.success({
          title: "Success",
          message: res.data.message,
          position: "topRight",
          timeout: 3000,
        });
        // Reset the form data
        setTasklist({ ...payload });
        // Handle success, e.g., navigate to another page
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
        show={showModal}
        onHide={handleClose}
        size="lg"
        style={{ padding: "0px" }}
      >
        <Modal.Header>
          <Modal.Title>{taskId ? "Update Task" : "Add Task"}</Modal.Title>
          <ImCross onClick={handleClose} />
        </Modal.Header>
        <Modal.Body>
          <form method="POST" onSubmit={onSubmit}>
            <h5
              className="font-weight-bold bg-light text-dark"
              style={{ padding: "10px 10px" }}
            >
              Add
            </h5>
            <div className="row">
              <div className="form-floating mb-3 col-md-6">
                <label htmlFor="floatingInput">Task Name*</label>
                <input
                  type="text"
                  className="form-control rounded-3"
                  id="floatingInput"
                  name="task_name"
                  value={tasklist.task_name || ""}
                  onChange={(ev) =>
                    setTasklist((prevTaskList) => ({
                      ...prevTaskList,
                      task_name: ev.target.value,
                    }))
                  }
                  placeholder="Task Name"
                />
              </div>
              <div className="form-floating mb-3 col-md-6">
                <label htmlFor="floatingSelect">Assigned To</label>
                <select
                  className="form-control"
                  name="user_id"
                  aria-label="Default select example"
                  value={tasklist.user_id || ""}
                  onChange={(ev) => {
                    // console.log(ev.target.value);

                    setTasklist({ ...tasklist, user_id: ev.target.value });
                  }}
                >
                  <option value="">Select User</option>
                  {users.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-floating mb-3 col-md-6">
                <label htmlFor="floatingSelect">category</label>
                <select
                  className="form-control"
                  name="category"
                  aria-label="Default select example"
                  value={tasklist.category || ""}
                  onChange={(ev) =>
                    setTasklist({ ...tasklist, category: ev.target.value })
                  }
                >
                  <option value="Email">Email</option>
                  <option value="Follow Up">Follow Up</option>
                  <option value="Get Started">GetStarted</option>
                  <option value="Meeting">Meeting</option>
                </select>
              </div>
              <div className="form-floating mb-3 col-md-6">
                <label htmlFor="floatingInput">Due Date*</label>
                <input
                  type="date"
                  className="form-control rounded-3"
                  id="floatingInput"
                  name="due_date"
                  value={tasklist.due_date || ""}
                  onChange={(ev) =>
                    setTasklist({ ...tasklist, due_date: ev.target.value })
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
                <label htmlFor="floatingInput">Start Date*</label>
                <input
                  type="date"
                  className="form-control rounded-3"
                  id="floatingInput"
                  name="start_date"
                  value={tasklist.start_date || ""}
                  onChange={(ev) =>
                    setTasklist({ ...tasklist, start_date: ev.target.value })
                  }
                />
              </div>
              <div className="form-floating mb-3 col-md-6">
                <label htmlFor="floatingInput">Reminder Date*</label>
                <input
                  type="date"
                  className="form-control rounded-3"
                  id="floatingInput"
                  name="reminder_date"
                  value={tasklist.reminder_date || ""}
                  onChange={(ev) =>
                    setTasklist({ ...tasklist, reminder_date: ev.target.value })
                  }
                />
              </div>
              <div className="form-floating mb-3 col-md-6">
                <label htmlFor="floatingInput">Progress</label>
                <input
                  type="text"
                  className="form-control rounded-3"
                  id="floatingInput"
                  placeholder="Progress"
                />
              </div>
              <div className="form-floating mb-3 col-md-6">
                <label htmlFor="floatingSelect">Priority</label>
                <select
                  className="form-control"
                  aria-label="Default select example"
                  name="priority"
                  value={tasklist.priority || ""}
                  onChange={(ev) =>
                    setTasklist({ ...tasklist, priority: ev.target.value })
                  }
                >
                  <option value="Low">low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
              <div className="form-floating mb-3 col-md-6">
                <label htmlFor="floatingSelect">Status</label>
                <select
                  className="form-control"
                  aria-label="Default select example"
                  name="status"
                  value={tasklist.status || ""}
                  onChange={(ev) =>
                    setTasklist({ ...tasklist, status: ev.target.value })
                  }
                >
                  <option value="Not Started">Not Started</option>
                  <option value="InProgress">InProgress</option>
                  <option value="Deferred">Deferred</option>
                  <option value="Waiting">Waiting</option>
                </select>
              </div>
            </div>
            <h5
              className="font-weight-bold bg-light text-dark"
              style={{ padding: "10px 10px" }}
            >
              Related To
            </h5>
            <div className="row">
              <div className="form-floating mb-3 col-md-6">
                <label htmlFor="floatingSelect">Deal</label>
                <select
                  className="form-control"
                  aria-label="Default select example"
                  name="related_to"
                  value={tasklist.related_to || ""}
                  onChange={(ev) =>
                    setTasklist({ ...tasklist, related_to: ev.target.value })
                  }
                >
                  <option value="Test">Test</option>
                  <option value="Select">Select</option>
                  <option value="High">High</option>
                </select>
              </div>
              <div className="form-floating mb-3 col-md-6">
                <label htmlFor="floatingSelect">Project</label>
                <select
                  className="form-control"
                  aria-label="Default select example"
                  name="related_to"
                  value={tasklist.related_to || ""}
                  onChange={(ev) =>
                    setTasklist({ ...tasklist, related_to: ev.target.value })
                  }
                >
                  <option value="Test">Test</option>
                  <option value="Select">Select</option>
                  <option value="High">High</option>
                </select>
              </div>
              <div className="form-floating mb-3 col-md-6">
                <label htmlFor="floatingSelect">Lead</label>
                <select
                  className="form-control"
                  aria-label="Default select example"
                  name="related_to"
                  value={tasklist.related_to || ""}
                  onChange={(ev) =>
                    setTasklist({ ...tasklist, related_to: ev.target.value })
                  }
                >
                  <option value="Test">Test</option>
                  <option value="Select">Select</option>
                  <option value="High">High</option>
                </select>
              </div>
              <div className="form-floating mb-3 col-md-6">
                <label htmlFor="floatingSelect">Company</label>
                <select
                  className="form-control"
                  aria-label="Default select example"
                  name="related_to"
                  value={tasklist.related_to || ""}
                  onChange={(ev) =>
                    setTasklist({ ...tasklist, related_to: ev.target.value })
                  }
                >
                  <option value="Test">Test</option>
                  <option value="Select">Select</option>
                  <option value="High">High</option>
                </select>
              </div>
              <div className="form-floating mb-3 col-md-6">
                <label htmlFor="floatingSelect">Contact</label>
                <select
                  className="form-control"
                  aria-label="Default select example"
                  name="related_to"
                  value={tasklist.related_to || ""}
                  onChange={(ev) =>
                    setTasklist({ ...tasklist, related_to: ev.target.value })
                  }
                >
                  <option value="Test">Test</option>
                  <option value="Select">Select</option>
                  <option value="High">High</option>
                </select>
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
                  name="description"
                  value={tasklist.description || ""}
                  onChange={(ev) =>
                    setTasklist({ ...tasklist, description: ev.target.value })
                  }
                ></textarea>
              </div>
            </div>
            <h5
              className="font-weight-bold bg-light text-dark"
              style={{ padding: "10px 10px" }}
            >
              Permission
            </h5>
            <div className="row">
              <div className="form-floating mb-3 col-md-6">
                <label htmlFor="floatingSelect">Permission</label>
                <select
                  className="form-control"
                  aria-label="Default select example"
                  name="permission"
                  value={tasklist.permission || ""}
                  onChange={(ev) =>
                    setTasklist({ ...tasklist, permission: ev.target.value })
                  }
                >
                  <option value="Task">Task</option>
                  <option value="Select">Select</option>
                  <option value="High">High</option>
                </select>
              </div>
            </div>
            {/* <button type="submit" className="btn btn-primary">
              Save
            </button> */}
            <Modal.Footer className="d-flex justify-content-center">
              <Button type="submit" variant="primary">
                Save Task
              </Button>
              <Button variant="secondary" onClick={handleClose}>
                Cancel
              </Button>
            </Modal.Footer>
          </form>
        </Modal.Body>
      </Modal>
      s
    </>
  );
};

export default TaskModal;
