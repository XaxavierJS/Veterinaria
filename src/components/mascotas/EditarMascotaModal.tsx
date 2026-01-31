"use client";
import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid,
  Box,
  MenuItem,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";

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

interface EditarMascotaModalProps {
  open: boolean;
  mascota: Mascota | null;
  onClose: () => void;
  onSave: (mascota: Mascota) => void;
}

const ESPECIES = ["Perro", "Gato", "Conejo", "Ave", "Otro"];

const validationSchema = Yup.object({
  nombre: Yup.string()
    .min(1, "Mínimo 1 carácter")
    .max(100, "Máximo 100 caracteres")
    .required("El nombre es obligatorio"),
  peso: Yup.number()
    .min(0.1, "El peso debe ser mayor a 0")
    .required("El peso es obligatorio"),
  especie: Yup.string().required("La especie es obligatoria"),
  raza: Yup.string().required("La raza es obligatoria"),
  fechaNacimiento: Yup.string().required("La fecha de nacimiento es obligatoria"),
});

export default function EditarMascotaModal({ open, mascota, onClose, onSave }: EditarMascotaModalProps) {
  const formik = useFormik({
    initialValues: {
      nombre: mascota?.nombre || "",
      peso: mascota?.peso || 0,
      especie: mascota?.especie || "",
      raza: mascota?.raza || "",
      fechaNacimiento: mascota?.fechaNacimiento || "",
      enfermedades: mascota?.enfermedades.join(", ") || "",
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: (values) => {
      if (mascota) {
        onSave({
          ...mascota,
          nombre: values.nombre,
          peso: values.peso,
          especie: values.especie,
          raza: values.raza,
          fechaNacimiento: values.fechaNacimiento,
          enfermedades: values.enfermedades
            .split(",")
            .map((e) => e.trim())
            .filter((e) => e.length > 0),
        });
      }
      onClose();
    },
  });

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Editar Mascota</DialogTitle>
      <DialogContent>
        <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Nombre"
                name="nombre"
                value={formik.values.nombre}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.nombre && Boolean(formik.errors.nombre)}
                helperText={formik.touched.nombre && formik.errors.nombre}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                select
                label="Especie"
                name="especie"
                value={formik.values.especie}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.especie && Boolean(formik.errors.especie)}
                helperText={formik.touched.especie && formik.errors.especie}
              >
                {ESPECIES.map((esp) => (
                  <MenuItem key={esp} value={esp}>
                    {esp}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Raza"
                name="raza"
                value={formik.values.raza}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.raza && Boolean(formik.errors.raza)}
                helperText={formik.touched.raza && formik.errors.raza}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Peso (kg)"
                name="peso"
                type="number"
                inputProps={{ step: 0.1 }}
                value={formik.values.peso}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.peso && Boolean(formik.errors.peso)}
                helperText={formik.touched.peso && formik.errors.peso}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Fecha de Nacimiento"
                name="fechaNacimiento"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={formik.values.fechaNacimiento}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.fechaNacimiento && Boolean(formik.errors.fechaNacimiento)}
                helperText={formik.touched.fechaNacimiento && formik.errors.fechaNacimiento}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Enfermedades (separadas por coma)"
                name="enfermedades"
                value={formik.values.enfermedades}
                onChange={formik.handleChange}
                placeholder="Ej: Alergia, Artritis"
                helperText="Dejar vacío si no tiene enfermedades"
              />
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancelar
        </Button>
        <Button onClick={() => formik.submitForm()} variant="contained">
          Guardar Cambios
        </Button>
      </DialogActions>
    </Dialog>
  );
}
