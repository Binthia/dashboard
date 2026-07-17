import { ResponsiveContainer, LineChart,Line, CartesianGrid,XAxis, YAxis, Tooltip,} from "recharts";
import { Box, useTheme } from "@mui/material";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchDepartments } from "../../redux/slice/DepartmentSlice";

const lineData = [
  { month: "Jan", employees: 180 },
  { month: "Feb", employees: 195 },
  { month: "Mar", employees: 188 },
  { month: "Apr", employees: 202 },
  { month: "May", employees: 196 },
  { month: "Jun", employees: 205 },
];

export default function EmployeeChart() {
  const theme = useTheme();
  const dark = theme.palette.mode === "dark";
  const axisColor = dark ? "#cbd5e1" : "#475569";
  const gridColor = dark ? "#334155" : "#e2e8f0";

  return (
    <Box sx={{ width: "100%", height: 300, minHeight: 220 }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={lineData}
          margin={{ top: 10, right: 20, bottom: 0, left: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
          <XAxis
            dataKey="month"
            stroke={axisColor}
            tick={{ fill: axisColor }}
          />
          <YAxis stroke={axisColor} tick={{ fill: axisColor }} />
          <Tooltip
            contentStyle={{
              backgroundColor: dark ? "#1e293b" : "#fff",
              border: `1px solid ${gridColor}`,
              color: dark ? "#fff" : "#1e293b",
            }}
            labelStyle={{ color: dark ? "#fff" : "#1e293b" }}
          />
          <Line
            dataKey="employees"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
}
