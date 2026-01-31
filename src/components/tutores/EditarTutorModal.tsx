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
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";

interface Tutor {
  id_tutor: string;
  nombre: string;
  rut: string;
  telefono: string;
  email: string;
  direccion: string;
}

interface EditarTutorModalProps {
  open: boolean;
  tutor: Tutor | null;
  onClose: () => void;
  onSave: (tutor: Tutor) => void;
}

const validationSchema = Yup.object({
  nombre: Yup.string()
    .min(2, "Mínimo 2 caracteres")
    .max(100, "Máximo 100 caracteres")
    .required("El nombre es obligatorio"),
  rut: Yup.string()
    .matches(/^[\d.-]+[kK\d]$/, "Formato de RUT inválido")
    .required("El RUT es obligatorio"),
  telefono: Yup.string()
    .required("El teléfono es obligatorio"),
  email: Yup.string()
    .email("Email inválido")
    .required("El email es obligatorio"),
  direccion: Yup.string()
    .required("La dirección es obligatoria"),
});

export default function EditarTutorModal({ open, tutor, onClose, onSave }: EditarTutorModalProps) {
  const formik = useFormik({
    initialValues: {
      nombre: tutor?.nombre || "",
      rut: tutor?.rut || "",
      telefono: tutor?.telefono || "",
      email: tutor?.email || "",
      direccion: tutor?.direccion || "",
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: (values) => {
      if (tutor) {
        onSave({
          ...tutor,
          ...values,
        });
      }
      onClose();
    },
  });

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Editar Tutor</DialogTitle>
      <DialogContent>
        <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Nombre completo"
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
                label="RUT"
                name="rut"
                value={formik.values.rut}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.rut && Boolean(formik.errors.rut)}
                helperText={formik.touched.rut && formik.errors.rut}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Teléfono"
                name="telefono"
                value={formik.values.telefono}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.telefono && Boolean(formik.errors.telefono)}
                helperText={formik.touched.telefono && formik.errors.telefono}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Dirección"
                name="direccion"
                value={formik.values.direccion}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.direccion && Boolean(formik.errors.direccion)}
                helperText={formik.touched.direccion && formik.errors.direccion}
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
