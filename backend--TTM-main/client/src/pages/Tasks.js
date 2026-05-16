import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import "../styles/tasks.css";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [projects, setProjects] = useState([]);

  const [title, setTitle] = useState("");

  const [description, setDescription] =
    useState("");

  const [priority, setPriority] =
    useState("LOW");

  const [dueDate, setDueDate] =
    useState("");

  const [assignedTo, setAssignedTo] =
    useState("");

  const [projectId, setProjectId] =
    useState("");

  const role = localStorage.getItem("role");

  useEffect(() => {
    fetchTasks();
    fetchUsers();
    fetchProjects();
  }, []);

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://localhost:5000/tasks",
        {
          headers: {
            Authorization: token,
          },
        }
      );

      setTasks(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://localhost:5000/users",
        {
          headers: {
            Authorization: token,
          },
        }
      );

      setUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchProjects = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://localhost:5000/projects",
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

  const createTask = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:5000/tasks",
        {
          title,
          description,
          status: "TODO",
          priority,
          dueDate,
          projectId: parseInt(projectId),
          assignedTo: parseInt(assignedTo),
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      setTitle("");

      setDescription("");

      setPriority("LOW");

      setDueDate("");

      setAssignedTo("");

      setProjectId("");

      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `http://localhost:5000/tasks/${id}`,
        {
          status,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTask = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `http://localhost:5000/tasks/${id}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />

      <div className="tasks-container">
        <h1 className="tasks-title">
          Tasks
        </h1>

        {role === "ADMIN" && (
          <form
            onSubmit={createTask}
            className="task-form"
          >
            <input
              type="text"
              placeholder="Task Title"
              className="task-input"
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
            />

            <input
              type="text"
              placeholder="Description"
              className="task-input"
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
            />

            <select
              className="task-input"
              value={priority}
              onChange={(e) =>
                setPriority(e.target.value)
              }
            >
              <option value="LOW">
                LOW Priority
              </option>

              <option value="MEDIUM">
                MEDIUM Priority
              </option>

              <option value="HIGH">
                HIGH Priority
              </option>
            </select>

            <input
              type="date"
              className="task-input"
              value={dueDate}
              onChange={(e) =>
                setDueDate(e.target.value)
              }
            />

            <select
              className="task-input"
              value={projectId}
              onChange={(e) =>
                setProjectId(e.target.value)
              }
            >
              <option value="">
                Select Project
              </option>

              {projects.map((project) => (
                <option
                  key={project.id}
                  value={project.id}
                >
                  {project.title}
                </option>
              ))}
            </select>

            <select
              className="task-input"
              value={assignedTo}
              onChange={(e) =>
                setAssignedTo(e.target.value)
              }
            >
              <option value="">
                Assign User
              </option>

              {users.map((user) => (
                <option
                  key={user.id}
                  value={user.id}
                >
                  {user.name} ({user.role})
                </option>
              ))}
            </select>

            <button
              type="submit"
              className="task-button"
            >
              Create Task
            </button>
          </form>
        )}

        <div className="tasks-grid">
          {tasks.map((task) => (
            <div
              key={task.id}
              className={`task-card ${
                new Date(task.dueDate) <
                  new Date() &&
                task.status !== "DONE"
                  ? "overdue"
                  : ""
              }`}
            >
              <h2>{task.title}</h2>

              <p>{task.description}</p>

              <p className="task-status">
                Status: {task.status}
              </p>

              <div
                className={`priority-badge ${
                  task.priority === "HIGH"
                    ? "high-priority"
                    : task.priority ===
                      "MEDIUM"
                    ? "medium-priority"
                    : "low-priority"
                }`}
              >
                {task.priority} Priority
              </div>

              <p>
                Assigned To:{" "}
                {task.user.name}
              </p>

              <p>
                Project:{" "}
                {task.project.title}
              </p>

              <p>
                Due Date:{" "}
                {new Date(
                  task.dueDate
                ).toLocaleDateString()}
              </p>

              {role === "MEMBER" && (
                <div>
                  <button
                    className="progress-btn"
                    onClick={() =>
                      updateStatus(
                        task.id,
                        "IN_PROGRESS"
                      )
                    }
                  >
                    In Progress
                  </button>

                  <button
                    className="done-btn"
                    onClick={() =>
                      updateStatus(
                        task.id,
                        "DONE"
                      )
                    }
                  >
                    Done
                  </button>
                </div>
              )}

              {role === "ADMIN" && (
                <button
                  className="delete-btn"
                  onClick={() =>
                    deleteTask(task.id)
                  }
                >
                  Delete Task
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Tasks;