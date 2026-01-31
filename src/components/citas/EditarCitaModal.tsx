"use client";
import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
} from "@mui/material";
import { useFormik } from "formik";

// Importar utilidades de validación
import { citaEditValidationSchema } from "@/utils/validationSchema";

// Importar tipos centralizados
import type { Cita, EstadoCita } from "@/types";

interface EditarCitaModalProps {
  open: boolean;
  cita: Cita | null; // La cita seleccionada para editar
  onClose: () => void;
  onSave: (citaEditada: Cita) => void;
}

export default function EditarCitaModal({ open, cita, onClose, onSave }: EditarCitaModalProps) {
  const [loading, setLoading] = React.useState(false);

  // Convertir fecha de dd/mm/aaaa a yyyy-mm-dd para input type="date"
  const convertirFechaParaInput = (fecha: string): string => {
    if (!fecha) return "";
    const partes = fecha.split("/");
    if (partes.length === 3) {
      return `${partes[2]}-${partes[1]}-${partes[0]}`;
    }
    return fecha;
  };

  // Usar Formik para manejar el formulario
  const formik = useFormik({
    initialValues: {
      tutorNombre: cita?.tutor.nombre || "",
      tutorRut: cita?.tutor.id_tutor || "",
      mascotaNombre: cita?.mascota.nombre || "",
      mascotaFicha: cita?.mascota.id_mascota || "",
      motivo: cita?.motivo || "",
      fecha: convertirFechaParaInput(cita?.fecha || ""),
      precio: cita?.precio || 0,
    },
    enableReinitialize: true, // Permite actualizar valores cuando cambia la prop cita
    validationSchema: citaEditValidationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        // Convertir fecha de yyyy-mm-dd a dd/mm/aaaa
        const convertirFechaParaGuardar = (fecha: string): string => {
          if (!fecha) return "";
          const partes = fecha.split("-");
          if (partes.length === 3) {
            return `${partes[2]}/${partes[1]}/${partes[0]}`;
          }
          return fecha;
        };

        // Crear la cita editada
        const citaEditada: Cita = {
          id_cita: cita?.id_cita || Date.now(), // Mantener el ID original o generar uno nuevo si no existe
          tutor: {
            id_tutor: values.tutorRut.replace(/\./g, "").replace("-", ""), // Limpiar RUT
            nombre: values.tutorNombre,
          },
          mascota: {
            id_mascota: values.mascotaFicha,
            nombre: values.mascotaNombre,
          },
          motivo: values.motivo,
          estado: (cita?.estado || "Pendiente") as EstadoCita, // Mantener el estado original
          fecha: convertirFechaParaGuardar(values.fecha),
          precio: values.precio,
        };

        // Llamar a la función para guardar la cita editada
        onSave(citaEditada);
      } catch (error) {
        console.error("Error al editar la cita:", error);
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      {/* Título del modal */}
      <DialogTitle>Editar Cita</DialogTitle>

      {/* Contenido del modal */}
      <DialogContent>
        <Box component="form" onSubmit={formik.handleSubmit}>
          {/* Nombre del Tutor */}
          <TextField
            label="Nombre del Tutor"
            name="tutorNombre"
            value={formik.values.tutorNombre}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.tutorNombre && Boolean(formik.errors.tutorNombre)}
            helperText={formik.touched.tutorNombre && formik.errors.tutorNombre}
            fullWidth
            margin="normal"
          />

          {/* RUT del Tutor */}
          <TextField
            label="RUT del Tutor"
            name="tutorRut"
            value={formik.values.tutorRut}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.tutorRut && Boolean(formik.errors.tutorRut)}
            helperText={formik.touched.tutorRut && formik.errors.tutorRut}
            fullWidth
            margin="normal"
          />

          {/* Nombre de la Mascota */}
          <TextField
            label="Nombre de la Mascota"
            name="mascotaNombre"
            value={formik.values.mascotaNombre}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.mascotaNombre && Boolean(formik.errors.mascotaNombre)}
            helperText={formik.touched.mascotaNombre && formik.errors.mascotaNombre}
            fullWidth
            margin="normal"
          />

          {/* Ficha de la Mascota */}
          <TextField
            label="Ficha de la Mascota"
            name="mascotaFicha"
            value={formik.values.mascotaFicha}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.mascotaFicha && Boolean(formik.errors.mascotaFicha)}
            helperText={formik.touched.mascotaFicha && formik.errors.mascotaFicha}
            fullWidth
            margin="normal"
          />

          {/* Motivo de la Cita */}
          <TextField
            label="Motivo de la Cita"
            name="motivo"
            value={formik.values.motivo}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.motivo && Boolean(formik.errors.motivo)}
            helperText={formik.touched.motivo && formik.errors.motivo}
            fullWidth
            margin="normal"
          />

          {/* Fecha de la Cita */}
          <TextField
            label="Fecha de la Cita"
            name="fecha"
            type="date"
            value={formik.values.fecha}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.fecha && Boolean(formik.errors.fecha)}
            helperText={formik.touched.fecha && formik.errors.fecha}
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />

          {/* Precio de la Cita */}
          <TextField
            label="Precio de la Cita (CLP)"
            name="precio"
            type="number"
            value={formik.values.precio}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.precio && Boolean(formik.errors.precio)}
            helperText={formik.touched.precio && formik.errors.precio}
            fullWidth
            margin="normal"
          />
        </Box>
      </DialogContent>

      {/* Acciones del modal */}
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancelar
        </Button>
        <Button type="submit" onClick={() => formik.submitForm()} variant="contained" disabled={loading}>
          {loading ? "Guardando..." : "Guardar Cambios"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}