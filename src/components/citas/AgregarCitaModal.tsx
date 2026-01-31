"use client";
import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Typography,
  Grid,
  IconButton,
} from "@mui/material";
import { useFormik } from "formik";
import { IconUserPlus, IconDogBowl } from "@tabler/icons-react";

// Importar validaciones desde validationSchema
import { citaValidationSchema } from "@/utils/validationSchema";

// Importar tipos centralizados
import type { Cita, EstadoCita } from "@/types";

interface AgregarCitaModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (nuevaCita: Cita) => void;
}

export default function AgregarCitaModal({ open, onClose, onSave }: AgregarCitaModalProps) {
  const [loading, setLoading] = React.useState(false);

  // Función para formatear el RUT
  // Función para formatear el RUT con límite
const formatRut = (rut: string): string => {
  // Limpiar el RUT de puntos y guiones
  const cleaned = rut.replace(/\./g, "").replace("-", "");

  // Aplicar el límite máximo de caracteres (216104824)
  if (cleaned.length > 9) {
    return formatRut(cleaned.slice(0, 9)); // Recursivamente trunca al límite
  }

  // Validar longitud mínima para evitar errores
  if (cleaned.length < 2) return cleaned;

  // Dividir el RUT en partes
  const body = cleaned.slice(0, -1); // Todo menos el último dígito
  const dv = cleaned.slice(-1).toUpperCase(); // Último dígito o carácter

  // Formatear el cuerpo del RUT con puntos
  const formattedBody = body
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".") // Agrega puntos cada 3 dígitos
    .padStart(1, "0"); // Asegura que siempre haya al menos un dígito

  // Retornar el RUT formateado
  return `${formattedBody}-${dv}`;
};

  // Usar Formik para manejar el formulario
  const formik = useFormik({
    initialValues: {
      tutorNombre: "",
      tutorRut: "",
      mascotaNombre: "",
      mascotaFicha: "",
      motivo: "",
      fecha: "",
      hora: "",
      precio: 0,
    },
    validationSchema: citaValidationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        // Crear nueva cita
        const nuevaCita: Cita = {
          id_cita: Date.now(), // Generar un ID único temporal
          tutor: {
            id_tutor: values.tutorRut.replace(/\./g, "").replace("-", ""), // Limpiar RUT
            nombre: values.tutorNombre,
          },
          mascota: {
            id_mascota: values.mascotaFicha,
            nombre: values.mascotaNombre,
          },
          motivo: values.motivo,
          estado: "Aceptado" as EstadoCita, // Estado inicial según MVP
          fecha: values.fecha,
          hora: values.hora,
          precio: values.precio,
        };

        // Llamar a la función para agregar la cita
        onSave(nuevaCita);

        // Resetear el formulario
        formik.resetForm();
      } catch (error) {
        console.error("Error al agregar la cita:", error);
      } finally {
        setLoading(false);
      }
    },
  });

  // Botón "Agregar tutor" si no existe el rut => MVP-5-1-10
  const handleAgregarTutor = () => {
    alert(
      "Abrir flujo de MVP-6 para crear un nuevo tutor.\nLuego volver a este modal con los datos."
    );
  };

  // Botón "Agregar mascota" => MVP-5-1-11
  const handleAgregarMascota = () => {
    alert(
      "Abrir flujo de MVP-6 para crear una nueva mascota.\nLuego volver a este modal con los datos."
    );
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      {/* Título del modal */}
      <DialogTitle>Agregar Nueva Cita</DialogTitle>

      {/* Contenido del modal */}
      <DialogContent>
        {formik.errors && Object.keys(formik.errors).length > 0 && (
          <Typography color="error" sx={{ mb: 2 }}>
            Por favor, corrija los errores en el formulario.
          </Typography>
        )}

        {/* Nombre tutor */}
        <TextField
          label="Nombre del Tutor"
          name="tutorNombre"
          value={formik.values.tutorNombre}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.tutorNombre && Boolean(formik.errors.tutorNombre)}
          helperText={formik.touched.tutorNombre && formik.errors.tutorNombre}
          fullWidth
          variant="outlined"
          sx={{ mb: 2 }}
        />

        {/* Rut tutor + botón "Agregar tutor" */}
        <Grid container spacing={2} alignItems="center" sx={{ mb: 2 }}>
          <Grid item xs={10}>
            <TextField
              label='Rut Tutor (formato "12.345.678-9")'
              name="tutorRut"
              value={formik.values.tutorRut}
              onChange={(e) => {
                const rawValue = e.target.value; // Valor sin formato
                const formattedValue = formatRut(rawValue); // Formatear RUT
                formik.setFieldValue("tutorRut", formattedValue); // Actualizar Formik
              }}
              onBlur={formik.handleBlur}
              error={formik.touched.tutorRut && Boolean(formik.errors.tutorRut)}
              helperText={formik.touched.tutorRut && formik.errors.tutorRut}
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={2}>
            <IconButton color="primary" onClick={handleAgregarTutor}>
              <IconUserPlus />
            </IconButton>
          </Grid>
        </Grid>

        {/* Motivo */}
        <TextField
          label="Motivo (hasta 500 caracteres)"
          name="motivo"
          value={formik.values.motivo}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.motivo && Boolean(formik.errors.motivo)}
          helperText={formik.touched.motivo && formik.errors.motivo}
          fullWidth
          variant="outlined"
          multiline
          maxRows={4}
          sx={{ mb: 2 }}
        />

        {/* Fecha y Hora */}
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={6}>
            <TextField
              label="Fecha (dd/mm/aaaa)"
              name="fecha"
              type="date"
              value={formik.values.fecha}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.fecha && Boolean(formik.errors.fecha)}
              helperText={formik.touched.fecha && formik.errors.fecha}
              fullWidth
              variant="outlined"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Hora (hh:mm hrs.)"
              name="hora"
              type="time"
              value={formik.values.hora}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.hora && Boolean(formik.errors.hora)}
              helperText={formik.touched.hora && formik.errors.hora}
              fullWidth
              variant="outlined"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
        </Grid>

        {/* Precio */}
        <TextField
          label="Precio (CLP)"
          name="precio"
          type="number"
          value={formik.values.precio}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.precio && Boolean(formik.errors.precio)}
          helperText={formik.touched.precio && formik.errors.precio}
          fullWidth
          variant="outlined"
          sx={{ mb: 2 }}
        />

        {/* Nombre mascota + botón "Agregar" */}
        <Grid container spacing={2} alignItems="center" sx={{ mb: 2 }}>
          <Grid item xs={10}>
            <TextField
              label="Nombre Mascota"
              name="mascotaNombre"
              value={formik.values.mascotaNombre}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.mascotaNombre && Boolean(formik.errors.mascotaNombre)}
              helperText={formik.touched.mascotaNombre && formik.errors.mascotaNombre}
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={2}>
            <IconButton color="primary" onClick={handleAgregarMascota}>
              <IconDogBowl />
            </IconButton>
          </Grid>
        </Grid>

        {/* Número Ficha */}
        <TextField
          label='Número Ficha (7 alfanum., ej: "#1F5P6AK")'
          name="mascotaFicha"
          value={formik.values.mascotaFicha}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.mascotaFicha && Boolean(formik.errors.mascotaFicha)}
          helperText={formik.touched.mascotaFicha && formik.errors.mascotaFicha}
          fullWidth
          variant="outlined"
          sx={{ mb: 2 }}
        />
      </DialogContent>

      {/* Acciones del modal */}
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancelar
        </Button>
        <Button
          variant="contained"
          onClick={() => formik.submitForm()}
          disabled={loading}
        >
          {loading ? "Guardando..." : "Guardar"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}