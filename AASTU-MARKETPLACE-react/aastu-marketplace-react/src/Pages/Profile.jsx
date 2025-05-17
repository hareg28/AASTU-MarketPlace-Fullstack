import React, { useEffect, useState } from "react";
import "../CSS/user-dashboard.css";
import ItemSales from "../Components/home/item";
import { Phone, ArrowUpRight } from "lucide-react";

const UserProfilePanel = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(
          "http://localhost/AASTU-MarketPlace-Fullstack/AASTU-MARKETPLACE-react/backend/profile.php"
        );
        const data = await response.json();
        if (Array.isArray(data) && data.length > 0) {
          setProfile(data[0]); // Use the first profile for now
        }
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <p>Loading profile...</p>;

  if (!profile) return <p>No profile data found.</p>;

  return (
    <div className="user-profile-panel">
      {/* Profile Section */}
      <div className="profile-section">
        <div className="profile-card">
          <div className="logo-container">
            <div className="logo-circle">
              <Phone className="phone-icon" />
            </div>
            <h2 className="company-name">{profile.fullname || "User Name"}</h2>
            <p className="user-role">{profile.role || "Buyer"}</p>
          </div>
        </div>

        <div className="about-card">
          <h3 className="section-title">About Us</h3>
          <p className="about-text">
            {profile.description ||
              "No description provided. Please update your profile."}
          </p>
        </div>
      </div>

      {/* Info & Settings Section */}
      <div className="bottom">
        <div className="info-settings-section">
          <div className="info-card">
            <h3 className="info-title">Information</h3>
            {[
              `Email: ${profile.email}`,
              `Address: ${profile.address || "Not set"}`,
              `Phone: ${profile.phone || "N/A"}`,
            ].map((info, index) => (
              <div className="info-item" key={index}>
                <span>{info}</span>
                <ArrowUpRight className="arrow-icon" />
              </div>
            ))}
          </div>

          <div className="settings-card">
            <h3 className="settings-title">Settings</h3>
            {["Edit Profile", "Security", "Notifications", "Logout"].map(
              (setting, index) => (
                <div className="settings-item" key={index}>
                  <butto>{setting}</butto>
                  <ArrowUpRight className="arrow-icon" />
                </div>
              )
            )}
          </div>
        </div>

        <div className="items-container-pro">
          <ItemSales />
        </div>
      </div>
    </div>
  );
};

export default UserProfilePanel;
