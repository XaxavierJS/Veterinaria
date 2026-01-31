"use client";
import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Grid,
  Chip,
  Divider,
} from "@mui/material";
import { IconUser, IconPhone, IconMail, IconMapPin } from "@tabler/icons-react";

interface Tutor {
  id_tutor: string;
  nombre: string;
  rut: string;
  telefono: string;
  email: string;
  direccion: string;
}

interface VerTutorModalProps {
  open: boolean;
  tutor: Tutor | null;
  mascotas: string[];
  onClose: () => void;
}

export default function VerTutorModal({ open, tutor, mascotas, onClose }: VerTutorModalProps) {
  if (!tutor) return null;

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <IconUser size={24} />
          Detalles del Tutor
        </Box>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12}>
            <Typography variant="h5" fontWeight={600}>
              {tutor.nombre}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              ID: {tutor.id_tutor}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Divider />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
              <IconUser size={18} color="#5D87FF" />
              <Typography variant="subtitle2" color="textSecondary">
                RUT
              </Typography>
            </Box>
            <Typography variant="body1">{tutor.rut}</Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
              <IconPhone size={18} color="#5D87FF" />
              <Typography variant="subtitle2" color="textSecondary">
                Teléfono
              </Typography>
            </Box>
            <Typography variant="body1">{tutor.telefono}</Typography>
          </Grid>

          <Grid item xs={12}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
              <IconMail size={18} color="#5D87FF" />
              <Typography variant="subtitle2" color="textSecondary">
                Email
              </Typography>
            </Box>
            <Typography variant="body1">{tutor.email}</Typography>
          </Grid>

          <Grid item xs={12}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
              <IconMapPin size={18} color="#5D87FF" />
              <Typography variant="subtitle2" color="textSecondary">
                Dirección
              </Typography>
            </Box>
            <Typography variant="body1">{tutor.direccion}</Typography>
          </Grid>

          <Grid item xs={12}>
            <Divider />
          </Grid>

          <Grid item xs={12}>
            <Typography variant="subtitle2" color="textSecondary" sx={{ mb: 1 }}>
              Mascotas ({mascotas.length})
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
              {mascotas.length > 0 ? (
                mascotas.map((nombre, idx) => (
                  <Chip key={idx} label={nombre} color="primary" variant="outlined" />
                ))
              ) : (
                <Typography variant="body2" color="textSecondary">
                  No tiene mascotas registradas
                </Typography>
              )}
            </Box>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="contained">
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
