import { Link } from "react-router-dom";
import "../styles/navbar.css";

function Navbar() {
  const role = localStorage.getItem("role");

  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <div className="navbar">
      <div className="navbar-left">
        <Link
          to="/dashboard"
          className="navbar-link"
        >
          Dashboard
        </Link>

        <Link
          to="/projects"
          className="navbar-link"
        >
          Projects
        </Link>

        <Link
          to="/tasks"
          className="navbar-link"
        >
          Tasks
        </Link>

        {role === "ADMIN" && (
          <Link
            to="/members"
            className="navbar-link"
          >
            Members
          </Link>
        )}
      </div>

      <div className="navbar-right">
        <span className="role-badge">
          {role}
        </span>

        <button
          className="logout-btn"
          onClick={logout}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Navbar;