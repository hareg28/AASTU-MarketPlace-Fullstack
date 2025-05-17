import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../CSS/AdminDashboard.css";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("users");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:8000/get_users.php");
        const data = await response.json();
        if (response.ok && data.success) {
          // Ensure all users have required fields with fallback values
          const formattedUsers = data.users.map((user) => ({
            user_id: user.user_id || "",
            name: user.name || "",
            email: user.email || "",
            role: user.role || "",
          }));
          setUsers(formattedUsers);
        } else {
          setError(data.message || "Failed to fetch users");
        }
      } catch (error) {
        setError(error.message || "Error fetching users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter((user) => {
    const search = searchTerm.toLowerCase();
    return (
      (user.name || "").toLowerCase().includes(search) ||
      (user.email || "").toLowerCase().includes(search) ||
      (user.role || "").toLowerCase().includes(search)
    );
  });

  const deleteUser = async (userId) => {
    if (!userId) return;

    try {
      const response = await fetch("http://localhost:8000/delete_user.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id: userId }), // Changed from 'id' to 'user_id'
      });

      const data = await response.json();
      if (response.ok && data.success) {
        setUsers(users.filter((user) => user.user_id !== userId));
      } else {
        setError(data.message || "Failed to delete user");
      }
    } catch (error) {
      setError(error.message || "Error deleting user");
    }
  };

  if (loading) {
    return (
      <div className="admin-dashboard">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-dashboard">
        <div className="error-message">{error}</div>
      </div>
    );
  }

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
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <tr key={user.user_id} className="user-row">
                      <td>{user.user_id}</td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>
                        <span className={`role-badge ${user.role}`}>
                          {user.role}
                        </span>
                      </td>
                      <td>
                        <Link
                          to={`/edit-user/${user.user_id}`}
                          className="action-btn edit-btn"
                        >
                          <i className="fas fa-edit"></i>
                        </Link>
                        <button
                          className="action-btn delete-btn"
                          onClick={() => deleteUser(user.user_id)}
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="no-results">
                      No users found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
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
              <p>{users.filter((u) => u.role === "buyer").length}</p>
            </div>
            <div className="stat-card">
              <h3>Sellers</h3>
              <p>{users.filter((u) => u.role === "seller").length}</p>
            </div>
          </div>
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
