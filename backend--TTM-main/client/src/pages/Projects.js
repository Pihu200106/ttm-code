import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import "../styles/projects.css";

function Projects() {
  const [projects, setProjects] =
    useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] =
    useState("");

  const role = localStorage.getItem("role");

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/projects`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      setProjects(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const createProject = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await axios.post(
        `${process.env.REACT_APP_API_URL}/projects`,
        {
          title,
          description,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      setTitle("");
      setDescription("");

      fetchProjects();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteProject = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `${process.env.REACT_APP_API_URL}/projects/${id}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      fetchProjects();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />

      <div className="projects-container">
        <h1 className="projects-title">
          Projects
        </h1>

        {role === "ADMIN" && (
          <form
            onSubmit={createProject}
            className="project-form"
          >
            <input
              type="text"
              placeholder="Project Title"
              className="project-input"
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
            />

            <input
              type="text"
              placeholder="Project Description"
              className="project-input"
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
            />

            <button
              type="submit"
              className="project-button"
            >
              Create Project
            </button>
          </form>
        )}

        <div className="projects-grid">
          {projects.map((project) => (
            <div
              key={project.id}
              className="project-card"
            >
              <h2>{project.title}</h2>

              <p>{project.description}</p>

              <p>
                Created By:{" "}
                {project.createdBy.name}
              </p>

              {role === "ADMIN" && (
                <button
                  className="delete-project-btn"
                  onClick={() =>
                    deleteProject(project.id)
                  }
                >
                  Delete Project
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Projects;