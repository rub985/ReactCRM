import React, { useEffect, useState } from "react";
// import { Modal, Form, Button } from "react-bootstrap";
import TaskModal from "../modal/TaskModal";
import ProjectsModal from "../modal/ProjectModal";
import axios from "axios";
import iziToast from "izitoast";
import Loader from "../Layouts/Loader";

const Projects = () => {
  const [showProjectsModal, setProjectsShowModal] = useState(false);
  const [projectsStatus, setProjectsStatus] = useState("All Companies");
  const [projectLists, setProjectLists] = useState({});
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  // const [users, setUsers] = useState([]);
  const handleProjectsShow = (id) => {
    // console.log(id);
    setSelectedProjectId(id);

    if (id) {
      axios
        .get(process.env.REACT_APP_URL + `/edit-project/${id}`)
        .then(({ data }) => {
          setProjectLists([data.data]);
          // console.log(data)
          setProjectsShowModal(true);
        })
        .catch((error) => {
          console.error("Error fetching contact for edit:", error);
        });
    } else {
      // If id is not present, it's an add operation
      setProjectsShowModal(true);
    }
  };
  //fetching data
  const [isLoading, setIsLoading] = useState(true);
  const fetchProjectData = async () => {
    try {
      const responseProjects = await axios.get(
        process.env.REACT_APP_URL + `/list-projects/`
      );
      setProjectLists(responseProjects.data.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching tasks or users:", error);
      setIsLoading(true);
    }
  };
  const refreshProject = () => {
    fetchProjectData();
  };
  useEffect(() => {
    setIsLoading(true);
    fetchProjectData(() => {
      setIsLoading(false);
    });
  }, []);
  const deleteProject = (id) => {
    axios
      .delete(process.env.REACT_APP_URL + `/delete-project/${id}`)
      .then((res) => {
        // console.log("Response:", res);
        iziToast.success({
          title: "Success",
          message: res.data.message,
          position: "topRight",
          timeout: 3000,
        });
        const updateddata = projectLists.filter((item) => item.id !== id);
        setProjectLists(updateddata);
      })
      .catch((error) => {
        console.error("Error deleting product:", error);
        // Handle error and possibly show an error message
      });
  };

  // const handleProjectsShow = () => setProjectsShowModal(true);
  const handleProjectsClose = () => setProjectsShowModal(false);
  const handlestatuschange = (event) => {
    setProjectsStatus(event.target.innerText);
  };
  function formatDate(dateTimeString) {
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };

    const formattedDate = new Date(dateTimeString).toLocaleString(
      undefined,
      options
    );
    return formattedDate;
  }
  return (
    <>
      {isLoading && <Loader />}
      <div className="container-fluid">
        {/* <!-- Page Heading --> */}
        <h1 className="h3 mb-2 text-gray-800">Projects</h1>
        <div className="d-flex justify-content-between mb-3">
          <div className="dropdown mt-2">
            <a
              className="dropdown-toggle"
              id="taskDropdown"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {projectsStatus}
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
            onClick={() => handleProjectsShow()}
          >
            Add New
          </button>
        </div>

        {/* <!-- DataTales Example --> */}
        <div className="card shadow mb-4">
          <div className="card-header py-3">
            <h6 className="m-0 font-weight-bold text-primary">
              Projects Table
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
                      <th>Project Name</th>
                      <th>Project Status</th>
                      <th>User Responsible</th>
                      <th>Project Category</th>
                      <th>Pipeline</th>
                      <th>Project Created</th>
                      <th className="text-end">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {projectLists.length > 0 &&
                      projectLists.map((project) => (
                        <tr key={project.id }>
                          <td>{project.project_name}</td>
                          <td>{project.status}</td>
                          <td>{project.user_responsible}</td>
                          <td>{project.category}</td>
                          <td>{project.pipeline}</td>
                          <td>{formatDate(project.created_at)}</td>
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
                                    onClick={() =>
                                      handleProjectsShow(project.id)
                                    }
                                  >
                                    Edit
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className="dropdown-item"
                                    href="#"
                                    onClick={() => deleteProject(project.id)}
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

        <ProjectsModal
          showProjectsModal={showProjectsModal}
          handleProjectsClose={() => {
            handleProjectsClose();
            refreshProject();
          }}
          projectId={selectedProjectId}
        />
      </div>
    </>
  );
};
export default Projects;
