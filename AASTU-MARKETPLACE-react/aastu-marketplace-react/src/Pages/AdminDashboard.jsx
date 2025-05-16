import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../CSS/AdminDashboard.css";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("users");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:8000/get_users.php");
        const data = await response.json();
        if (response.ok) {
          setUsers(data.users);
        } else {
          console.error("Failed to fetch users:", data.message);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter(
    (user) =>
      user.Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.Email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.Role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const deleteUser = async (userId) => {
    try {
      const response = await fetch("http://localhost:8000/delete_user.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: userId }),
      });

      const data = await response.json();
      if (response.ok && data.success) {
        setUsers(users.filter((user) => user.Id !== userId));
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <div className="admin-nav">
          <button
            className={`nav-btn ${activeTab === "users" ? "active" : ""}`}
            onClick={() => setActiveTab("users")}
          >
            Users
          </button>
          <button
            className={`nav-btn ${activeTab === "stats" ? "active" : ""}`}
            onClick={() => setActiveTab("stats")}
          >
            Statistics
          </button>
          <button
            className={`nav-btn ${activeTab === "settings" ? "active" : ""}`}
            onClick={() => setActiveTab("settings")}
          >
            Settings
          </button>
        </div>
      </div>

      {activeTab === "users" && (
        <div className="users-section">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <i className="fas fa-search"></i>
          </div>

          {loading ? (
            <div className="loading-spinner"></div>
          ) : (
            <div className="users-table-container">
              <table className="users-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr key={user.Id} className="user-row">
                      <td>{user.Id}</td>
                      <td>{user.Name}</td>
                      <td>{user.Email}</td>
                      <td>
                        <span className={`role-badge ${user.Role}`}>
                          {user.Role}
                        </span>
                      </td>
                      <td>
                        <button className="action-btn edit-btn">
                          <i className="fas fa-edit"></i>
                        </button>
                        <button
                          className="action-btn delete-btn"
                          onClick={() => deleteUser(user.Id)}
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {activeTab === "stats" && (
        <div className="stats-section">
          <div className="stats-cards">
            <div className="stat-card">
              <h3>Total Users</h3>
              <p>{users.length}</p>
            </div>
            <div className="stat-card">
              <h3>Buyers</h3>
              <p>{users.filter((u) => u.Role === "buyer").length}</p>
            </div>
            <div className="stat-card">
              <h3>Sellers</h3>
              <p>{users.filter((u) => u.Role === "seller").length}</p>
            </div>
          </div>
          {/* Add charts or other visualizations here */}
        </div>
      )}

      {activeTab === "settings" && (
        <div className="settings-section">
          <h2>Admin Settings</h2>
          {/* Add settings form here */}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
