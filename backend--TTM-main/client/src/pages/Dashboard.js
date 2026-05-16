import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import "../styles/dashboard.css";

function Dashboard() {
  const [stats, setStats] = useState({
    totalTasks: 0,
    completedTasks: 0,
    pendingTasks: 0,
    overdueTasks: 0,
  });

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://localhost:5000/dashboard",
        {
          headers: {
            Authorization: token,
          },
        }
      );

      setStats(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />

      <div className="dashboard-container">
        <h1 className="dashboard-title">
          Team Task Manager Dashboard
        </h1>

        <div className="stats-grid">
          <div className="stat-card total">
            <p className="stat-title">
              Total Tasks
            </p>

            <h2 className="stat-number">
              {stats.totalTasks}
            </h2>
          </div>

          <div className="stat-card completed">
            <p className="stat-title">
              Completed Tasks
            </p>

            <h2 className="stat-number">
              {stats.completedTasks}
            </h2>
          </div>

          <div className="stat-card pending">
            <p className="stat-title">
              Pending Tasks
            </p>

            <h2 className="stat-number">
              {stats.pendingTasks}
            </h2>
          </div>

          <div className="stat-card overdue">
            <p className="stat-title">
              Overdue Tasks
            </p>

            <h2 className="stat-number">
              {stats.overdueTasks}
            </h2>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;