import { useState, useMemo } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

import React, { Suspense, lazy } from "react";
const Dashboard = lazy(() =>
  import("./pages/Dashboard")
);
const Employee = lazy(() =>
  import("./pages/Employee")
);
const Department = lazy(() =>
  import("./pages/Department")
);
const Profile = lazy(() =>
  import("./pages/Profile")
);
const Settings = lazy(() =>
  import("./pages/Settings")
);
import ProtectedRoute from "./components/ProtectedRoute";
import "./App.css";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? "dark" : "light",
          ...(darkMode
            ? {
                background: {
                  default: "#121212",
                  paper: "#1e1e1e",
                },
              }
            : {}),
        },
      }),
    [darkMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <div className={darkMode ? "dark-theme" : "light-theme"}>
          <Sidebar darkMode={darkMode} />
          <Navbar darkMode={darkMode} setDarkMode={setDarkMode}/>
          <Suspense fallback={<h2>Loading...</h2>}>
          <Routes>
            <Route path="/employee" element={
              <ProtectedRoute allowedRoles={["Admin", "Manager"]}>
                <Employee />
              </ProtectedRoute>}
            />
            <Route path="/departments" element={
              <ProtectedRoute allowedRoles={["Admin"]}>
                <Department />
              </ProtectedRoute>}
            />
            <Route path="/" element={
                <ProtectedRoute allowedRoles={["Admin","Manager","Employee",]}>
                  <Dashboard />
                </ProtectedRoute>}
            />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
          </Suspense>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
