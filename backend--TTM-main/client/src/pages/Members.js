import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import "../styles/members.css";

function Members() {
  const [members, setMembers] =
    useState([]);

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/users`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      setMembers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />

      <div className="members-container">
        <h1 className="members-title">
          Team Members
        </h1>

        <div className="members-grid">
          {members.map((member) => (
            <div
              key={member.id}
              className="member-card"
            >
              <h2 className="member-name">
                {member.name}
              </h2>

              <p className="member-email">
                {member.email}
              </p>

              <span
                className={`member-role ${
                  member.role === "ADMIN"
                    ? "admin-role"
                    : "member-role-badge"
                }`}
              >
                {member.role}
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Members;