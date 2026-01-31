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

interface EliminarMascotaModalProps {
  open: boolean;
  mascotaNombre: string;
  onClose: () => void;
  onConfirm: () => void;
}

export default function EliminarMascotaModal({
  open,
  mascotaNombre,
  onClose,
  onConfirm,
}: EliminarMascotaModalProps) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>Eliminar Mascota</DialogTitle>
      <DialogContent>
        <Alert severity="warning" sx={{ mb: 2 }}>
          Esta acción no se puede deshacer.
        </Alert>
        <Typography>
          ¿Estás seguro de que deseas eliminar a{" "}
          <strong>{mascotaNombre}</strong>?
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
