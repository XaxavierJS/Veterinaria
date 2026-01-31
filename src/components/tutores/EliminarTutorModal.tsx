"use client";
import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Alert,
} from "@mui/material";

interface EliminarTutorModalProps {
  open: boolean;
  tutorNombre: string;
  onClose: () => void;
  onConfirm: () => void;
}

export default function EliminarTutorModal({
  open,
  tutorNombre,
  onClose,
  onConfirm,
}: EliminarTutorModalProps) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>Eliminar Tutor</DialogTitle>
      <DialogContent>
        <Alert severity="warning" sx={{ mb: 2 }}>
          Esta acción no se puede deshacer.
        </Alert>
        <Typography>
          ¿Estás seguro de que deseas eliminar al tutor{" "}
          <strong>{tutorNombre}</strong>?
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancelar
        </Button>
        <Button onClick={onConfirm} variant="contained" color="error">
          Eliminar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
