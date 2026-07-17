import "../styles/Dashboard.css";
import React from "react";
import { useEffect, useMemo, lazy, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDepartments } from "../redux/slice/DepartmentSlice";
import GroupsIcon from "@mui/icons-material/Groups";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import BusinessIcon from "@mui/icons-material/Business";
import Avatar from "react-avatar";
const EmployeeChart = lazy(() => import("../components/chart/EmployeeChart"));
const DepartmentChart = lazy(
  () => import("../components/chart/DepartmentChart"),
);

function Dashboard({ collapsed }) {
  const employees = useSelector((state) => state.employee.employees);
  const departments = useSelector((state) => state.department.departments);

  const cards = [
    {
      title: "Total Employees",
      key: "employees",
      color: "#2563eb",
      icon: GroupsIcon,
    },
    {
      title: "Departments",
      key: "departments",
      color: "#ec4899",
      icon: BusinessIcon,
    },
    {
      title: "Present Today",
      value: 190,
      color: "#22c55e",
      icon: EventAvailableIcon,
    },
    {
      title: "On Leave",
      value: 18,
      color: "#f97316",
      icon: BeachAccessIcon,
    },
    {
      title: "WFH",
      value: 24,
      color: "#8b5cf6",
      icon: HomeWorkIcon,
    },
    {
      title: "New Employees",
      value: 16,
      color: "#14b8a6",
      icon: PersonAddAltIcon,
    },
  ];

  const recentEmployees = [
    {
      name: "Sarah Johnson",
      role: "UI/UX Designer",
      date: "May 06, 2024",
      // image: "https://i.pravatar.cc/40?img=1",
    },
    {
      name: "Michael Brown",
      role: "Frontend Developer",
      date: "May 05, 2024",
      // image: "https://i.pravatar.cc/40?img=2",
    },
    {
      name: "Emily Davis",
      role: "HR Executive",
      date: "May 04, 2024",
      // image: "https://i.pravatar.cc/40?img=3",
    },
    {
      name: "David Wilson",
      role: "Backend Developer",
      date: "May 03, 2024",
      // image: "https://i.pravatar.cc/40?img=4",
    },
  ];

  const birthdays = [
    {
      name: "Olivia Taylor",
      date: "May 10",
      // image: "https://i.pravatar.cc/40?img=5",
    },
    {
      name: "James Anderson",
      date: "May 12",
      // image: "https://i.pravatar.cc/40?img=6",
    },
    {
      name: "Sophia Martinez",
      date: "May 15",
      // image: "https://i.pravatar.cc/40?img=7",
    },
    {
      name: "Daniel Thomas",
      date: "May 18",
      // image: "https://i.pravatar.cc/40?img=8",
    },
  ];

  const dashboardCards = useMemo(
    () =>
      cards.map((card) => ({
        ...card,
        value:
          card.key === "employees"
            ? employees.length
            : card.key === "departments"
              ? departments.length
              : card.value,
      })),
    [employees, departments],
  );

  const dispatch = useDispatch();

  useEffect(() => {
  if (!departments.length) {
    dispatch(fetchDepartments());
  }
}, [dispatch, departments.length]);

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div>
          <h3>Dashboard</h3>
          <p className="welcome">
            Welcome back, <strong>Binthia 👋</strong>
          </p>
        </div>
      </div>

      <div className="stats-grid">
        {dashboardCards.map((card) => {
          const Icon = card.icon;

          return (
            <div className="stat-card" key={card.title}>
              <div className="circle" style={{ background: card.color }}>
                <Icon />
              </div>

              <div className="card-info">
                <h4>{card.title}</h4>
                <h2>{card.value}</h2>
              </div>
            </div>
          );
        })}
      </div>

      <div className="dashboard-top">
        <div className="chart-card employee-card employee-overview-section">
          <h3>Employee Overview</h3>

          <div className="chart-content employee-chart">
            <Suspense fallback={<div>Loading Chart...</div>}>
              <EmployeeChart />
            </Suspense>
          </div>
        </div>

        <div className="bottom-card">
          <div className="card-header">
            <h3>Recent Employees</h3>
            <span>View all</span>
          </div>

          {recentEmployees.map((emp) => (
            <div className="employee-item" key={emp.name}>
              <div className="employee-left">
                <Avatar
                  name={emp.name}
                  size="40"
                  round={true}
                  color="#1976d2"
                />

                <div>
                  <h4>{emp.name}</h4>
                  <p>{emp.role}</p>
                </div>
              </div>

              <small>{emp.date}</small>
            </div>
          ))}
        </div>
      </div>

      <div className="dashboard-bottom">
        <div className="bottom-card">
          <div className="card-header">
            <h3>Leave Summary</h3>
            <span>View all</span>
          </div>

          <div className="leave-item">
            <div>
              <span className="green"></span>
              Approved
            </div>
            <strong>12</strong>
          </div>

          <div className="leave-item">
            <div>
              <span className="orange"></span>
              Pending
            </div>
            <strong>6</strong>
          </div>

          <div className="leave-item">
            <div>
              <span className="red"></span>
              Rejected
            </div>
            <strong>2</strong>
          </div>

          <div className="leave-item total">
            <div>
              <span className="blue"></span>
              Total Leaves
            </div>
            <strong>20</strong>
          </div>
        </div>

        <div className="bottom-card">
          <div className="card-header">
            <h3>Upcoming Birthdays</h3>
            <span>View all</span>
          </div>

          {birthdays.map((emp) => (
            <div className="employee-item" key={emp.name}>
              <div className="employee-left">
                <Avatar
                  name={emp.name}
                  size="40"
                  round={true}
                  color="#ec4899"
                />

                <div>
                  <h4>{emp.name}</h4>
                </div>
              </div>

              <div className="birthday-right">
                <small>{emp.date}</small>
                <span className="gift">🎁</span>
              </div>
            </div>
          ))}
        </div>

        <div className="chart-card department-section">
          <h3>Department Distribution</h3>

          <div className="chart-content department-chart">
            <Suspense fallback={<div>Loading Chart...</div>}>
              <DepartmentChart data={departments} />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(Dashboard);
