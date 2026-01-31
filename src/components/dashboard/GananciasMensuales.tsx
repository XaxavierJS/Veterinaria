"use client";
import React from "react";
import dynamic from "next/dynamic";
import { useTheme } from "@mui/material/styles";
import { Stack, Typography, Avatar, Fab } from "@mui/material";
import { IconArrowDownRight, IconCurrencyDollar } from "@tabler/icons-react";
import { Card, CardContent } from "@mui/material";

// Carga dinámica del gráfico ApexCharts
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

// Componente de Ganancias Mensuales
const GananciasMensuales = () => {
  const theme = useTheme(); // Obtiene el tema definido en DefaultColors.tsx
  const secondary = theme.palette.secondary.main; // Color secundario principal
  const secondarylight = theme.palette.secondary.light; // Color secundario claro
  const errorlight = theme.palette.error.light; // Color para errores (disminución)

  // Opciones del gráfico
  const opcionesGrafico: ApexCharts.ApexOptions = {
    chart: {
      type: "area",
      fontFamily: "'Plus Jakarta Sans', sans-serif;",
      foreColor: theme.palette.text.secondary,
      toolbar: {
        show: false,
      },
      height: 60,
      sparkline: {
        enabled: true,
      },
      group: "sparklines",
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    fill: {
      colors: [secondarylight],
      type: "solid",
      opacity: 0.05,
    },
    markers: {
      size: 0,
    },
    tooltip: {
      theme: "light",
    },
  };

  // Datos del gráfico
  const seriesGrafico: ApexAxisChartSeries = [
    {
      name: "Ganancias",
      color: secondary,
      data: [500, 700, 400, 800, 600, 900, 700],
    },
  ];

  return (
    <Card>
      <CardContent>
        {/* Título y botón decorativo */}
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6" fontWeight="600">
            Ganancias Mensuales
          </Typography>
          <Fab color="secondary" size="medium" sx={{ color: "#ffffff" }}>
            <IconCurrencyDollar width={24} />
          </Fab>
        </Stack>

        {/* Total de ganancias */}
        <Typography variant="h3" fontWeight="700">
          $6,820
        </Typography>

        {/* Indicadores de aumento/disminución */}
        <Stack direction="row" spacing={1} my={1} alignItems="center">
          <Avatar sx={{ bgcolor: errorlight, width: 27, height: 27 }}>
            <IconArrowDownRight width={20} color="#FA896B" />
          </Avatar>
          <Typography variant="subtitle2" fontWeight="600">
            +9%
          </Typography>
          <Typography variant="subtitle2" color="textSecondary">
            comparado al mes pasado
          </Typography>
        </Stack>

        {/* Gráfico */}
        <Chart
          options={opcionesGrafico}
          series={seriesGrafico}
          type="area"
          height={60}
          width="100%"
        />
      </CardContent>
    </Card>
  );
};

export default GananciasMensuales;
