import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";
import Projects from "./pages/Projects";
import Members from "./pages/Members";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Login */}
        <Route path="/" element={<Login />} />

        {/* Signup */}
        <Route
          path="/signup"
          element={<Signup />}
        />

        {/* Dashboard */}
        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        {/* Tasks */}
        <Route
          path="/tasks"
          element={<Tasks />}
        />

        {/* Projects */}
        <Route
          path="/projects"
          element={<Projects />}
        />

        {/* Members */}
        <Route
          path="/members"
          element={<Members />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;