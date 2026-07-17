import { Box, useTheme } from "@mui/material";
import { PieChart } from "@mui/x-charts/PieChart";
import { legendClasses } from "@mui/x-charts/ChartsLegend";
import { useMemo } from "react";
import React from "react";

function DepartmentChart({data}) {
  const theme = useTheme();
  const dark = theme.palette.mode === "dark";

  const chartData = useMemo(() => {
    return data.map((dept, index) => ({
      id: index,
      value: dept.employees || 1,
      label: dept.department,     
    }));
  }, [data]);

  const total = chartData.reduce(
    (sum, item) => sum + item.value,
    0
  );

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
      }}
    >
      <PieChart
        width={300}
        height={250}
        series={[
          {
            data: chartData,
            innerRadius: 60,
            outerRadius: 90,
            paddingAngle: 2,
            cornerRadius: 5,
            cx: "40%",
            cy: "50%",
          },
        ]}
        slotProps={{
          legend: {
            direction: "row",
            position: {
              vertical: "bottom",
              horizontal: "middle",
            },
          },
        }}
        sx={{
          [`& .${legendClasses.root}`]: {
            transform: "translate(0,0)",
          },
          "& .MuiChartsLegend-label": {
            fill: dark ? "#fff" : "#1e293b",
          },
          "& text": {
            fill: dark ? "#fff" : "#1e293b",
          },
        }}
      />

      <Box
        sx={{
          position: "absolute",
          left: "42%",
          top: "38%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
          color: dark ? "#fff" : "#1e293b",
        }}
      >
        <div style={{ fontSize: 26, fontWeight: 700 }}>
          {total}
        </div>
        <div style={{ fontSize: 13 }}>Total</div>
      </Box>
    </Box>
  );
}

export default React.memo(DepartmentChart)
