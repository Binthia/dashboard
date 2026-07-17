import "../styles/Profile.css";
import React from "react";
import {
  Card,
  CardContent,
  LinearProgress,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import LockResetIcon from "@mui/icons-material/LockReset";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import HomeIcon from "@mui/icons-material/Home";
import BadgeIcon from "@mui/icons-material/Badge";
import ApartmentIcon from "@mui/icons-material/Apartment";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import WorkIcon from "@mui/icons-material/Work";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Avatar from "@mui/material/Avatar";

function Profile() {
  return (
    <div className="profile">
      <div className="profile-grid">
        {/* Left Profile Card */}
        <Card className="profile-card">
          <CardContent>
            <Avatar
              sx={{
                width: 150,
                height: 150,
                bgcolor: "#2563eb",
                fontSize: 50,
              }}
            >
              B
            </Avatar>
            <h2>Binthia V H</h2>
            <p className="designation">HR Manager</p>
            <span className="status">Active Employee</span>

            <div className="profile-buttons">
              <button className="edit-btn">
                <EditIcon />
                Edit Profile
              </button>

              <button className="password-btn">
                <LockResetIcon />
                Change Password
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Right Section */}
        <div className="details-container">
          {/* Personal Details */}
          <Card className="details-card">
            <CardContent>
              <h3>Personal Details</h3>

              <div className="details-grid">
                <div className="detail-item">
                  <PersonIcon />
                  <div>
                    <span>Full Name</span>
                    <h4>Binthia V H</h4>
                  </div>
                </div>

                <div className="detail-item">
                  <PersonIcon />
                  <div>
                    <span>Father's Name</span>
                    <h4>Vijayan</h4>
                  </div>
                </div>

                <div className="detail-item">
                  <EmailIcon />
                  <div>
                    <span>Email</span>
                    <h4>binthia@gmail.com</h4>
                  </div>
                </div>

                <div className="detail-item">
                  <PhoneIcon />
                  <div>
                    <span>Phone</span>
                    <h4>+91 9876543210</h4>
                  </div>
                </div>

                <div className="detail-item">
                  <CalendarMonthIcon />
                  <div>
                    <span>Date of Birth</span>
                    <h4>20 May 2002</h4>
                  </div>
                </div>

                <div className="detail-item">
                  <HomeIcon />
                  <div>
                    <span>Address</span>
                    <h4>Chennai, Tamil Nadu</h4>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Position Details */}
          <Card className="details-card">
            <CardContent>
              <h3>Position Details</h3>

              <div className="details-grid">
                <div className="detail-item">
                  <BadgeIcon />
                  <div>
                    <span>Employee ID</span>
                    <h4>EMP001</h4>
                  </div>
                </div>

                <div className="detail-item">
                  <ApartmentIcon />
                  <div>
                    <span>Department</span>
                    <h4>Human Resources</h4>
                  </div>
                </div>

                <div className="detail-item">
                  <BusinessCenterIcon />
                  <div>
                    <span>Designation</span>
                    <h4>HR Manager</h4>
                  </div>
                </div>

                <div className="detail-item">
                  <WorkIcon />
                  <div>
                    <span>Employment Type</span>
                    <h4>Full Time</h4>
                  </div>
                </div>

                <div className="detail-item">
                  <CalendarMonthIcon />
                  <div>
                    <span>Joining Date</span>
                    <h4>15 Jan 2024</h4>
                  </div>
                </div>

                <div className="detail-item">
                  <LocationOnIcon />
                  <div>
                    <span>Work Location</span>
                    <h4>Chennai Office</h4>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Bottom Section */}
          <div className="bottom-grid">
            <Card className="details-card">
              <CardContent>
                <h3>Company Details</h3>

                <table className="company-table">
                  <tbody>
                    <tr>
                      <td>Company</td>
                      <td>ABC Technologies</td>
                    </tr>
                    <tr>
                      <td>Branch</td>
                      <td>Chennai</td>
                    </tr>
                    <tr>
                      <td>Employee Code</td>
                      <td>ABC1025</td>
                    </tr>
                    <tr>
                      <td>Shift</td>
                      <td>General</td>
                    </tr>
                    <tr>
                      <td>Status</td>
                      <td>Active</td>
                    </tr>
                  </tbody>
                </table>
              </CardContent>
            </Card>

            <Card className="details-card">
              <CardContent>
                <h3>Skills</h3>

                <div className="skill">
                  <span>React.js</span>
                  <LinearProgress variant="determinate" value={95} />
                </div>

                <div className="skill">
                  <span>Spring Boot</span>
                  <LinearProgress variant="determinate" value={85} />
                </div>

                <div className="skill">
                  <span>Java</span>
                  <LinearProgress variant="determinate" value={90} />
                </div>

                <div className="skill">
                  <span>SQL</span>
                  <LinearProgress variant="determinate" value={80} />
                </div>

                <div className="skill">
                  <span>HTML & CSS</span>
                  <LinearProgress variant="determinate" value={98} />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(Profile);
