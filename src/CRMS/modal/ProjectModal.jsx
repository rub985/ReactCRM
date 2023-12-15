import axios from "axios";
import iziToast from "izitoast";
import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { ImCross } from "react-icons/im";

const ProjectsModal = ({
  showProjectsModal,
  handleProjectsClose,
  projectId,
}) => {
  const [projectdata, setProjectData] = useState("");

  const onprojectSubmit = (ev) => {
    ev.preventDefault();
    const payload = { ...projectdata };
    axios({
      method: "post",
      url: projectId
        ? process.env.REACT_APP_URL + `/update-project/${projectId}`
        : process.env.REACT_APP_URL + `/store-project/`,
      data: payload,
    })
      .then((res) => {
        handleProjectsClose();
        // console.log(res);
        iziToast.success({
          title: "Success",
          message: res.data.message,
          position: "topRight",
          timeout: 3000,
        });
        setProjectData({ ...payload });
      })
      .catch((err) => {
        if (err && err.response) {
          console.log(err, err.response);
        }
      });
  };
  useEffect(() => {
    if (projectId) {
      axios
        .get(process.env.REACT_APP_URL + `/edit-project/${projectId}`)
        .then(({ data }) => {
          // console.log(data);
          setProjectData(data.data);
        })
        .catch((error) => {
          console.error("Error fetching task for edit:", error);
        });
    } else {
      // If it's a new task, you can set default values or leave it as an empty object
      setProjectData("");
    }
  }, [projectId]);

  return (
    <>
      <Modal
        show={showProjectsModal}
        onHide={handleProjectsClose}
        size="lg"
        style={{ padding: "0px" }}
      >
        <Modal.Header>
          <Modal.Title>
            {projectId ? "Update Project" : "Add Project"}
          </Modal.Title>
          <ImCross onClick={handleProjectsClose} />
        </Modal.Header>
        <Modal.Body>
          <form method="post" onSubmit={onprojectSubmit}>
            <h5
              className="font-weight-bold bg-light text-dark"
              style={{ padding: "10px 10px" }}
            >
              Project Detail
            </h5>
            <div className="row">
              <div className="form-floating mb-3 col-md-6">
                <label htmlFor="floatingInput">Project Name*</label>
                <input
                  type="text"
                  className="form-control rounded-3"
                  id="floatingInput"
                  placeholder="Project Name"
                  name="project_name"
                  value={projectdata.project_name || ""}
                  onChange={(ev) =>
                    setProjectData((prevProjectData) => ({
                      ...prevProjectData,
                      project_name: ev.target.value,
                    }))
                  }
                />
              </div>
              <div className="form-floating mb-3 col-md-6">
                <label htmlFor="floatingSelect">Status</label>
                <select
                  className="form-control"
                  aria-label="Default select example"
                  name="status"
                  value={projectdata.status || ""}
                  onChange={(ev) =>
                    setProjectData((prevProjectData) => ({
                      ...prevProjectData,
                      status: ev.target.value,
                    }))
                  }
                >
                  <option value="1">In Progress</option>
                  <option value="2">Started</option>
                  <option value="2">Canceled</option>
                </select>
              </div>
              <div className="form-floating mb-3 col-md-6">
                <label htmlFor="floatingSelect">Category</label>
                <select
                  className="form-control"
                  aria-label="Default select example"
                  name="category"
                  value={projectdata.category || ""}
                  onChange={(ev) =>
                    setProjectData((prevProjectData) => ({
                      ...prevProjectData,
                      category: ev.target.value,
                    }))
                  }
                >
                  <option value="1">Email</option>
                  <option value="2">Follow Up</option>
                  <option value="2">Get Started</option>
                </select>
              </div>
              <div className="form-floating mb-3 col-md-6">
                <label htmlFor="floatingSelect">User Responsible</label>
                <select
                  className="form-control"
                  aria-label="Default select example"
                  name="user_responsible"
                  value={projectdata.user_responsible || ""}
                  onChange={(ev) =>
                    setProjectData((prevProjectData) => ({
                      ...prevProjectData,
                      user_responsible: ev.target.value,
                    }))
                  }
                >
                  <option value="1">Select User</option>
                  <option value="2">John</option>
                  <option value="2">Maggy</option>
                </select>
              </div>
            </div>
            <h5 className="font-weight-bold bg-light text-dark">
              Pipeline & Stage
            </h5>
            <div className="row">
              <div className="form-floating mb-3 col-md-6">
                <label htmlFor="floatingInput">Pipeline</label>
                <select
                  className="form-control"
                  aria-label="Default select example"
                  name="pipeline"
                  value={projectdata.pipeline || ""}
                  onChange={(ev) =>
                    setProjectData((prevProjectData) => ({
                      ...prevProjectData,
                      pipeline: ev.target.value,
                    }))
                  }
                >
                  <option value="1">Nothing Selected</option>
                  <option value="2">Project Pipeline</option>
                </select>
              </div>
              <div className="form-floating mb-3 col-md-6">
                <label htmlFor="floatingInput">Stage</label>
                <select
                  className="form-control"
                  aria-label="Default select example"
                  name="stage"
                  value={projectdata.stage || ""}
                  onChange={(ev) =>
                    setProjectData((prevProjectData) => ({
                      ...prevProjectData,
                      stage: ev.target.value,
                    }))
                  }
                >
                  <option value="1">Nothing Selected</option>
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
                  placeholder="description"
                  name="description"
                  value={projectdata.description || ""}
                  onChange={(ev) =>
                    setProjectData((prevProjectData) => ({
                      ...prevProjectData,
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
                  value={projectdata.tag_list || ""}
                  onChange={(ev) =>
                    setProjectData((prevProjectData) => ({
                      ...prevProjectData,
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
                <label htmlFor="floatingSelect">Visibility</label>
                <select
                  className="form-control"
                  aria-label="Default select example"
                  name="permission"
                  value={projectdata.permission || ""}
                  onChange={(ev) =>
                    setProjectData((prevProjectData) => ({
                      ...prevProjectData,
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
              <Button variant="secondary" onClick={handleProjectsClose}>
                Cancel
              </Button>
            </Modal.Footer>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ProjectsModal;
