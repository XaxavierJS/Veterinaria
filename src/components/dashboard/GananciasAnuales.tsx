"use client";
import React from "react";
import dynamic from "next/dynamic";
import { useTheme } from "@mui/material/styles";
import { Grid, Stack, Typography, Avatar } from "@mui/material";
import { IconArrowUpLeft } from "@tabler/icons-react";
import { Card, CardContent } from "@mui/material";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const GananciasAnuales = () => {
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const primarylight = theme.palette.primary.light;
  const successlight = theme.palette.success.light;

  const opcionesGrafico: ApexCharts.ApexOptions = {
    chart: {
      type: "donut",
      fontFamily: "'Plus Jakarta Sans', sans-serif;",
      foreColor: theme.palette.text.secondary,
      toolbar: {
        show: false,
      },
      height: 155,
    },
    colors: [primary, primarylight, "#F9F9FD"],
    plotOptions: {
      pie: {
        startAngle: 0,
        endAngle: 360,
        donut: {
          size: "75%",
          background: "transparent",
        },
      },
    },
    tooltip: {
      theme: theme.palette.mode === "dark" ? "dark" : "light",
      fillSeriesColor: false,
    },
    stroke: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    responsive: [
      {
        breakpoint: 991,
        options: {
          chart: {
            width: 120,
          },
        },
      },
    ],
  };

  const seriesGrafico: ApexNonAxisChartSeries = [50, 35, 15];

  return (
    <Card>
      <CardContent>
        {/* Título del componente */}
        <Typography variant="h6" fontWeight="600" sx={{ mb: 2 }}>
          Ganancias Anuales
        </Typography>
        <Grid container spacing={3}>
          {/* Información principal */}
          <Grid item xs={7}>
            <Typography variant="h3" fontWeight="700">
              $45,230
            </Typography>
            <Stack direction="row" spacing={1} mt={1} alignItems="center">
              <Avatar sx={{ bgcolor: successlight, width: 27, height: 27 }}>
                <IconArrowUpLeft width={20} color="#39B69A" />
              </Avatar>
              <Typography variant="subtitle2" fontWeight="600">
                +12%
              </Typography>
              <Typography variant="subtitle2" color="textSecondary">
                comparado al año pasado
              </Typography>
            </Stack>
            <Stack spacing={3} mt={5} direction="row">
              <Stack direction="row" spacing={1} alignItems="center">
                <Avatar
                  sx={{ width: 9, height: 9, bgcolor: primary }}
                ></Avatar>
                <Typography variant="subtitle2" color="textSecondary">
                  2022
                </Typography>
              </Stack>
              <Stack direction="row" spacing={1} alignItems="center">
                <Avatar
                  sx={{ width: 9, height: 9, bgcolor: primarylight }}
                ></Avatar>
                <Typography variant="subtitle2" color="textSecondary">
                  2023
                </Typography>
              </Stack>
            </Stack>
          </Grid>
          {/* Gráfico */}
          <Grid item xs={5}>
            <Chart
              options={opcionesGrafico}
              series={seriesGrafico}
              type="donut"
              height={150}
              width="100%"
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default GananciasAnuales;
