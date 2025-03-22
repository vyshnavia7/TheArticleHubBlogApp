import React, { useEffect, useState } from "react";
import { useAuth, useUser } from "@clerk/clerk-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function AdminProfile() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const { getToken, signOut } = useAuth();
  const { user } = useUser();
  const navigate = useNavigate();
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  // useEffect(() => {
  //     if(currentUser?.isBlocked)
  //      {
  //         navigate("/blocked",{replace:true});
  //      }
  //     else if (!currentUser || currentUser.role !== "admin") {
  //       navigate("/");
  //     }
  //   }, [currentUser, navigate]);
  async function getUserAuthors() {
    try {
      const token = await getToken();
      const res = await axios.get(`${BACKEND_URL}/admin-api/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("API Response:", res.data); // Check response in console

      if (res.data.message === "Users & Authors") {
        setUsers((prev) => {
          console.log("Previous Users:", prev);
          console.log("New Users:", res.data.payload);
          if (JSON.stringify(prev) !== JSON.stringify(res.data.payload)) {
            return res.data.payload;
          }
          return prev;
        });
      } else {
        setError(res.data.message);
      }
    } catch (err) {
      console.error("Error fetching users:", err);
      setError("Failed to fetch users. Please try again later.");
    }
  }

  useEffect(() => {
    getUserAuthors();
  }, []);

  //blocking/unblocking users
  async function blockUnblockUser(id, isBlocked) {
    try {
      const token = await getToken();
      const res = await axios.put(
        `${BACKEND_URL}/admin-api/users/block/${id}`,
        { isBlocked: !isBlocked },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      if (res.data.message === "User status updated") {
        setUsers((prev) =>
          prev.map((u) => (u._id === id ? { ...u, isBlocked: !isBlocked } : u)),
        );
      }
    } catch (err) {
      setError("failed to update user status");
    }
  }

  return (
    <div className="dashboard text-center">
      <h2 className="dashboard-title mb-5 mt-5 fw-bold">
        Users & Authors Dashboard
      </h2>
      {users.length > 0 ? (
        <div className="table-responsive">
          <table
            border="1"
            className="table-striped table-container align-center"
          >
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {users.map((us) =>
                us.role !== "admin" ? (
                  <tr key={us._id}>
                    <td>{us.firstName}</td>
                    <td>{us.email}</td>
                    <td>{us.role}</td>
                    <td
                      style={{ color: us.isBlocked ? "red" : "green" }}
                      className={
                        us.isBlocked ? "status-blocked" : "status-active"
                      }
                    >
                      {us.isBlocked ? "Blocked" : "Active"}
                    </td>
                    <td>
                      <button
                        onClick={() => blockUnblockUser(us._id, us.isBlocked)}
                        style={{
                          backgroundColor: us.isBlocked ? "green" : "red",
                        }}
                        className={us.isBlocked ? "unblock-btn" : "block-btn"}
                      >
                        {us.isBlocked ? "Unblock" : "Block"}
                      </button>
                    </td>
                  </tr>
                ) : (
                  console.log()
                ),
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No Users Found</p>
      )}
    </div>
  );
}

export default AdminProfile;
