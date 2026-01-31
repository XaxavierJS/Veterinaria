"use client";
import React from "react";
import {
  Timeline,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
  TimelineDot,
  TimelineConnector,
  TimelineContent,
} from "@mui/lab";
import { Typography, Card, CardContent } from "@mui/material";
import { useTheme } from "@mui/material/styles";

// Componente para mostrar la línea de tiempo de próximas citas
const ProximasCitas = () => {
  const theme = useTheme(); // Usa el tema definido en DefaultColors.tsx

  // Datos de ejemplo para las citas
  const citas = [
    {
      hora: "09:30 am",
      mascota: "Firulais",
      descripcion: "Control de vacunas",
      color: "primary",
    },
    {
      hora: "10:00 am",
      mascota: "Pepe",
      descripcion: "Consulta general",
      color: "secondary",
    },
    {
      hora: "11:30 am",
      mascota: "Luna",
      descripcion: "Revisión dental",
      color: "success",
    },
    {
      hora: "01:00 pm",
      mascota: "Max",
      descripcion: "Desparasitación",
      color: "warning",
    },
    {
      hora: "03:00 pm",
      mascota: "Kira",
      descripcion: "Seguimiento postoperatorio",
      color: "error",
    },
  ];

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" fontWeight="600" sx={{ mb: 2 }}>
          Próximas Citas
        </Typography>
        <Timeline
          sx={{
            p: 0,
            "& .MuiTimelineConnector-root": {
              width: "1px",
              backgroundColor: theme.palette.divider,
            },
            "& .MuiTimelineDot-outlined": {
              borderWidth: "2px",
            },
          }}
        >
          {citas.map((cita, index) => (
            <TimelineItem key={index}>
              {/* Hora de la cita */}
              <TimelineOppositeContent
                sx={{ flex: 0.5, paddingLeft: 0, color: theme.palette.text.secondary }}
              >
                {cita.hora}
              </TimelineOppositeContent>
              <TimelineSeparator>
                {/* Punto de color para indicar prioridad */}
                <TimelineDot color={cita.color as "primary" | "secondary" | "success" | "warning" | "error"} variant="outlined" />
                {/* Conector entre elementos */}
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>
                {/* Información de la cita */}
                <Typography fontWeight="600">{cita.mascota}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {cita.descripcion}
                </Typography>
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
      </CardContent>
    </Card>
  );
};

export default ProximasCitas;
