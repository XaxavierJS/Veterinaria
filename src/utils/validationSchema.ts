import * as Yup from "yup";

/**
 * @fileoverview Esquemas de validación para formularios de la aplicación
 * @description Utiliza Yup para definir reglas de validación robustas
 */

/**
 * Valida formato de fecha "dd/mm/aaaa"
 */
const validateDateDDMMYYYY = (value?: string): boolean => {
  if (!value) return false;
  const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
  return dateRegex.test(value);
};

/**
 * Valida formato de fecha ISO "yyyy-mm-dd" (usado por input type="date")
 */
const validateDateISO = (value?: string): boolean => {
  if (!value) return false;
  const dateRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
  return dateRegex.test(value);
};

/**
 * Valida formato de hora "hh:mm"
 */
const validateTime = (value?: string): boolean => {
  if (!value) return false;
  const timeRegex = /^([01]?\d|2[0-3]):([0-5]\d)$/;
  return timeRegex.test(value);
};

/**
 * Esquema de validación para crear citas (usa formato dd/mm/aaaa)
 */
export const citaValidationSchema = Yup.object({
  // Tutor
  tutorNombre: Yup.string()
    .trim()
    .min(1, "El nombre del tutor debe tener al menos 1 carácter.")
    .max(200, "El nombre del tutor no puede tener más de 200 caracteres.")
    .required("El nombre del tutor es obligatorio."),
  
  tutorRut: Yup.string()
    .matches(
      /^(\d{1,2}\.\d{3}\.\d{3}-[\dkK])$/,
      'El RUT debe tener el formato "12.345.678-9".'
    )
    .required("El RUT del tutor es obligatorio."),

  // Mascota
  mascotaNombre: Yup.string()
    .trim()
    .min(1, "El nombre de la mascota debe tener al menos 1 carácter.")
    .max(200, "El nombre de la mascota no puede tener más de 200 caracteres.")
    .required("El nombre de la mascota es obligatorio."),
  
  mascotaFicha: Yup.string()
    .matches(/^#[A-Za-z0-9]{6}$/, 'La ficha debe ser 7 caracteres alfanuméricos y empezar con "#".')
    .required("El número de ficha de la mascota es obligatorio."),

  // Motivo
  motivo: Yup.string()
    .trim()
    .min(1, "El motivo debe tener al menos 1 carácter.")
    .max(500, "El motivo no puede tener más de 500 caracteres.")
    .required("El motivo de la cita es obligatorio."),

  // Fecha - acepta ambos formatos
  fecha: Yup.string()
    .test(
      "fecha-formato",
      "La fecha debe ser válida.",
      (value) => validateDateDDMMYYYY(value) || validateDateISO(value)
    )
    .required("La fecha de la cita es obligatoria."),
  
  // Hora (opcional para edición)
  hora: Yup.string()
    .test(
      "hora-formato",
      "La hora debe tener el formato 'hh:mm'.",
      (value) => !value || validateTime(value)
    ),

  // Precio
  precio: Yup.number()
    .min(0, "El precio no puede ser negativo.")
    .typeError("El precio debe ser un número válido.")
    .required("El precio de la cita es obligatorio."),
});

/**
 * Esquema de validación para editar citas (fecha en formato ISO)
 */
export const citaEditValidationSchema = Yup.object({
  tutorNombre: Yup.string()
    .trim()
    .min(1, "El nombre del tutor debe tener al menos 1 carácter.")
    .max(200, "El nombre del tutor no puede tener más de 200 caracteres.")
    .required("El nombre del tutor es obligatorio."),
  
  tutorRut: Yup.string()
    .required("El RUT del tutor es obligatorio."),

  mascotaNombre: Yup.string()
    .trim()
    .min(1, "El nombre de la mascota debe tener al menos 1 carácter.")
    .max(200, "El nombre de la mascota no puede tener más de 200 caracteres.")
    .required("El nombre de la mascota es obligatorio."),
  
  mascotaFicha: Yup.string()
    .required("El número de ficha de la mascota es obligatorio."),

  motivo: Yup.string()
    .trim()
    .min(1, "El motivo debe tener al menos 1 carácter.")
    .max(500, "El motivo no puede tener más de 500 caracteres.")
    .required("El motivo de la cita es obligatorio."),

  fecha: Yup.string()
    .test(
      "fecha-formato",
      "La fecha debe ser válida.",
      (value) => validateDateDDMMYYYY(value) || validateDateISO(value)
    )
    .required("La fecha de la cita es obligatoria."),

  precio: Yup.number()
    .min(0, "El precio no puede ser negativo.")
    .typeError("El precio debe ser un número válido.")
    .required("El precio de la cita es obligatorio."),
});