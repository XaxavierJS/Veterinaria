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
  Avatar,
} from "@mui/material";
import { IconPaw, IconUser, IconScale, IconCalendar } from "@tabler/icons-react";

interface Mascota {
  numero_ficha: string;
  nombre: string;
  peso: number;
  enfermedades: string[];
  fechaNacimiento: string;
  especie: string;
  raza: string;
  id_tutor: string;
}

interface VerMascotaModalProps {
  open: boolean;
  mascota: Mascota | null;
  tutorNombre: string;
  onClose: () => void;
}

export default function VerMascotaModal({ open, mascota, tutorNombre, onClose }: VerMascotaModalProps) {
  if (!mascota) return null;

  const calcularEdad = (fechaNacimiento: string): string => {
    const nacimiento = new Date(fechaNacimiento);
    const hoy = new Date();
    let años = hoy.getFullYear() - nacimiento.getFullYear();
    const meses = hoy.getMonth() - nacimiento.getMonth();
    if (meses < 0 || (meses === 0 && hoy.getDate() < nacimiento.getDate())) {
      años--;
    }
    return años === 1 ? "1 año" : `${años} años`;
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <IconPaw size={24} />
          Detalles de la Mascota
        </Box>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12} sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Avatar
              sx={{
                width: 64,
                height: 64,
                bgcolor: "primary.light",
                color: "primary.main",
              }}
            >
              <IconPaw size={32} />
            </Avatar>
            <Box>
              <Typography variant="h5" fontWeight={600}>
                {mascota.nombre}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Ficha: {mascota.numero_ficha}
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Divider />
          </Grid>

          <Grid item xs={6}>
            <Typography variant="subtitle2" color="textSecondary">
              Especie
            </Typography>
            <Chip label={mascota.especie} color="primary" size="small" sx={{ mt: 0.5 }} />
          </Grid>

          <Grid item xs={6}>
            <Typography variant="subtitle2" color="textSecondary">
              Raza
            </Typography>
            <Typography variant="body1">{mascota.raza}</Typography>
          </Grid>

          <Grid item xs={6}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
              <IconScale size={18} color="#5D87FF" />
              <Typography variant="subtitle2" color="textSecondary">
                Peso
              </Typography>
            </Box>
            <Typography variant="body1">{mascota.peso} kg</Typography>
          </Grid>

          <Grid item xs={6}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
              <IconCalendar size={18} color="#5D87FF" />
              <Typography variant="subtitle2" color="textSecondary">
                Edad
              </Typography>
            </Box>
            <Typography variant="body1">{calcularEdad(mascota.fechaNacimiento)}</Typography>
          </Grid>

          <Grid item xs={12}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
              <IconUser size={18} color="#5D87FF" />
              <Typography variant="subtitle2" color="textSecondary">
                Tutor
              </Typography>
            </Box>
            <Typography variant="body1">{tutorNombre}</Typography>
            <Typography variant="caption" color="textSecondary">
              ID: {mascota.id_tutor}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Divider />
          </Grid>

          <Grid item xs={12}>
            <Typography variant="subtitle2" color="textSecondary" sx={{ mb: 1 }}>
              Estado de Salud
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
              {mascota.enfermedades.length > 0 ? (
                mascota.enfermedades.map((enf, idx) => (
                  <Chip key={idx} label={enf} color="error" variant="outlined" />
                ))
              ) : (
                <Chip label="Saludable" color="success" />
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
