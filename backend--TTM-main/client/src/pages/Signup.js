import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "../styles/auth.css";

function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] =
    useState("");
  const [role, setRole] =
    useState("MEMBER");

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/signup`,
        {
          name,
          email,
          password,
          role,
        }
      );

      alert("Signup Successful");

      navigate("/");
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="auth-title">
          Create Account
        </h1>

        <form
          onSubmit={handleSignup}
          className="auth-form"
        >
          <input
            type="text"
            placeholder="Enter Name"
            className="auth-input"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
          />

          <input
            type="email"
            placeholder="Enter Email"
            className="auth-input"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />

          <input
            type="password"
            placeholder="Enter Password"
            className="auth-input"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

          <select
            className="auth-input"
            value={role}
            onChange={(e) =>
              setRole(e.target.value)
            }
          >
            <option value="MEMBER">
              Member
            </option>

            <option value="ADMIN">
              Admin
            </option>
          </select>

          <button
            type="submit"
            className="auth-button"
          >
            Signup
          </button>

          <p className="auth-link">
            Already have an account?{" "}
            <Link to="/">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;