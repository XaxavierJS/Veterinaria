"use client";
import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  Box,
  Chip,
  Divider,
  Grid,
} from "@mui/material";
import type { VerCitaModalProps, EstadoCita } from "@/types";
import { ESTADO_COLORS } from "@/types";

export default function VerCitaModal({ open, cita, onClose }: VerCitaModalProps) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      {/* Título del modal */}
      <DialogTitle>Detalles de la Cita</DialogTitle>

      {/* Contenido del modal */}
      <DialogContent>
        {cita ? (
          <Box>
            <Grid container spacing={2}>
              {/* ID de la cita */}
              <Grid item xs={6}>
                <Typography variant="subtitle2" color="textSecondary">
                  ID de la Cita
                </Typography>
                <Typography variant="body1" fontWeight="500">
                  #{cita.id_cita}
                </Typography>
              </Grid>

              {/* Estado */}
              <Grid item xs={6}>
                <Typography variant="subtitle2" color="textSecondary">
                  Estado
                </Typography>
                <Chip 
                  label={cita.estado} 
                  color={ESTADO_COLORS[cita.estado as EstadoCita] || "default"}
                  size="small"
                />
              </Grid>

              <Grid item xs={12}>
                <Divider sx={{ my: 1 }} />
              </Grid>

              {/* Tutor */}
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="textSecondary">
                  Tutor
                </Typography>
                <Typography variant="body1" fontWeight="500">
                  {cita.tutor.nombre}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  ID: {cita.tutor.id_tutor}
                </Typography>
              </Grid>

              {/* Mascota */}
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="textSecondary">
                  Mascota
                </Typography>
                <Typography variant="body1" fontWeight="500">
                  {cita.mascota.nombre}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Ficha: {cita.mascota.id_mascota}
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Divider sx={{ my: 1 }} />
              </Grid>

              {/* Motivo */}
              <Grid item xs={12}>
                <Typography variant="subtitle2" color="textSecondary">
                  Motivo
                </Typography>
                <Typography variant="body1">
                  {cita.motivo}
                </Typography>
              </Grid>

              {/* Fecha */}
              <Grid item xs={6}>
                <Typography variant="subtitle2" color="textSecondary">
                  Fecha
                </Typography>
                <Typography variant="body1" fontWeight="500">
                  {cita.fecha}
                </Typography>
              </Grid>

              {/* Precio */}
              <Grid item xs={6}>
                <Typography variant="subtitle2" color="textSecondary">
                  Precio
                </Typography>
                <Typography variant="body1" fontWeight="500" color="primary">
                  ${cita.precio.toLocaleString("es-CL")} CLP
                </Typography>
              </Grid>
            </Grid>
          </Box>
        ) : (
          <Typography variant="body1" color="textSecondary">
            No se encontraron detalles de la cita.
          </Typography>
        )}
      </DialogContent>

      {/* Acciones del modal */}
      <DialogActions>
        {/* Botón para cerrar el modal */}
        <Button onClick={onClose} color="primary">
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
}