import React from "react";
import "../styles/Settings.css";

import {
  Card,
  CardContent,
  Switch,
  FormControlLabel,
  Divider,
  Button,
} from "@mui/material";

const Settings = () => {
  return (
    <div className="settings">
      <h2>Settings</h2>

      <div className="settings-grid">
        <Card className="settings-card">
          <CardContent>
            <h3>👤 Account</h3>

            <p>Name : Binthia V H</p>
            <p>Email : binthia@gmail.com</p>

            <Button variant="contained">
              Change Password
            </Button>
          </CardContent>
        </Card>

        <Card className="settings-card">
          <CardContent>
            <h3>🔔 Notifications</h3>

            <FormControlLabel
              control={<Switch defaultChecked />}
              label="Email Notifications"
            />

            <FormControlLabel
              control={<Switch />}
              label="SMS Notifications"
            />
          </CardContent>
        </Card>
        
        <Card className="settings-card">
          <CardContent>
            <h3>🌐 Language</h3>

            <p>Language : English</p>
            <p>Time Zone : IST</p>
          </CardContent>
        </Card>

        <Card className="settings-card">
          <CardContent>
            <h3>🔒 Security</h3>

            <Button variant="outlined">
              Enable 2FA
            </Button>
          </CardContent>
        </Card>

        <Card className="settings-card">
          <CardContent>
            <h3>ℹ️ About</h3>

            <p>HR Portal v1.0</p>
            <p>React + Spring Boot + MySQL</p>
          </CardContent>
        </Card>
      </div>

      <Divider sx={{ margin: "25px 0" }} />

      <Button variant="contained" size="large">
        Save Changes
      </Button>
    </div>
  );
};

export default React.memo(Settings);
