"use client";
import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  Alert,
} from "@mui/material";
import type { CancelarCitaModalProps } from "@/types";

export default function CancelarCitaModal({
  open,
  citaId,
  onClose,
  onConfirm,
}: CancelarCitaModalProps) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      {/* Título del modal */}
      <DialogTitle>Cancelar Cita</DialogTitle>

      {/* Contenido del modal */}
      <DialogContent>
        <Alert severity="warning" sx={{ mb: 2 }}>
          Esta acción no se puede deshacer.
        </Alert>
        <Typography>
          ¿Estás seguro de que deseas cancelar la cita con ID{" "}
          <strong>{citaId}</strong>?
        </Typography>
      </DialogContent>

      {/* Acciones del modal */}
      <DialogActions>
        {/* Botón para cancelar la acción */}
        <Button onClick={onClose} color="secondary">
          No, Volver
        </Button>

        {/* Botón para confirmar la cancelación */}
        <Button
          onClick={onConfirm}
          variant="contained"
          color="error" // Color rojo para acciones críticas
        >
          Sí, Cancelar Cita
        </Button>
      </DialogActions>
    </Dialog>
  );
}