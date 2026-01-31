"use client";
import React from "react";
import { Select, MenuItem, Card, CardContent, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import dynamic from "next/dynamic";

// Carga dinámica de ApexCharts
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

// Componente para el Resumen de Citas
const CitasResumen = () => {
  const [mes, setMes] = React.useState("1"); // Estado para el selector de mes
  const theme = useTheme(); // Usa el tema

  const handleChange = (event: React.ChangeEvent<{ value: unknown }> | { target: { value: string } }) => {
    setMes(event.target.value as string);
  };

  const opcionesGrafico: ApexCharts.ApexOptions = {
    chart: {
      type: "bar",
      fontFamily: "'Plus Jakarta Sans', sans-serif;",
      foreColor: theme.palette.text.secondary,
      toolbar: {
        show: true,
      },
      height: 370,
    },
    colors: [theme.palette.primary.main, theme.palette.secondary.main],
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 6,
        columnWidth: "42%",
      },
    },
    stroke: {
      show: true,
      width: 5,
      colors: ["transparent"],
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    grid: {
      borderColor: theme.palette.divider,
      strokeDashArray: 3,
    },
    yaxis: {
      tickAmount: 4,
    },
    xaxis: {
      categories: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"],
      axisBorder: {
        show: false,
      },
    },
    tooltip: {
      theme: "light",
      fillSeriesColor: false,
    },
  };

  const seriesGrafico: ApexAxisChartSeries = [
    {
      name: "Citas realizadas",
      data: [12, 15, 10, 18, 20],
    },
    {
      name: "Citas canceladas",
      data: [2, 3, 1, 2, 1],
    },
  ];

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" fontWeight="600" sx={{ mb: 2 }}>
          Resumen de Citas
        </Typography>
        <Select
          value={mes}
          size="small"
          onChange={handleChange}
          sx={{ mb: 2 }}
        >
          <MenuItem value="1">Enero 2023</MenuItem>
          <MenuItem value="2">Febrero 2023</MenuItem>
          <MenuItem value="3">Marzo 2023</MenuItem>
        </Select>

        <Chart
          options={opcionesGrafico}
          series={seriesGrafico}
          type="bar"
          height={370}
          width="100%"
        />
      </CardContent>
    </Card>
  );
};

export default CitasResumen;
