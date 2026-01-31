/**
 * @fileoverview Tipos e interfaces centralizados para la aplicación Veterinaria MVP
 * @description Este archivo contiene todas las definiciones de tipos TypeScript
 * utilizadas a lo largo de la aplicación para garantizar consistencia y type-safety.
 */

// =============================================================================
// INTERFACES DE ENTIDADES PRINCIPALES
// =============================================================================

/**
 * Representa un tutor (dueño de mascotas)
 */
export interface Tutor {
  /** Identificador único del tutor (generalmente el RUT sin formato) */
  id_tutor: string;
  /** Nombre completo del tutor */
  nombre: string;
  /** RUT formateado del tutor (ej: "12.345.678-9") */
  rut?: string;
}

/**
 * Representa una mascota
 */
export interface Mascota {
  /** Identificador único de la mascota */
  id_mascota: string;
  /** Nombre de la mascota */
  nombre: string;
  /** Número de ficha de la mascota (formato: "#XXXXXX") */
  numero_ficha?: string;
}

/**
 * Estados posibles de una cita
 */
export type EstadoCita = 'Aceptado' | 'Pendiente' | 'Pagado' | 'Cancelado';

/**
 * Representa una cita veterinaria
 */
export interface Cita {
  /** Identificador único de la cita */
  id_cita: number;
  /** Información del tutor asociado a la cita */
  tutor: Tutor;
  /** Información de la mascota para la cita */
  mascota: Mascota;
  /** Motivo o descripción de la cita */
  motivo: string;
  /** Estado actual de la cita */
  estado: EstadoCita;
  /** Fecha de la cita en formato "dd/mm/aaaa" */
  fecha: string;
  /** Hora de la cita en formato "hh:mm" (opcional) */
  hora?: string;
  /** Precio de la consulta en CLP */
  precio: number;
}

// =============================================================================
// INTERFACES PARA FORMULARIOS
// =============================================================================

/**
 * Valores del formulario para crear/editar una cita
 */
export interface CitaFormValues {
  tutorNombre: string;
  tutorRut: string;
  mascotaNombre: string;
  mascotaFicha: string;
  motivo: string;
  fecha: string;
  hora?: string;
  precio: number;
}

// =============================================================================
// INTERFACES PARA COMPONENTES
// =============================================================================

/**
 * Props para el modal de ver cita
 */
export interface VerCitaModalProps {
  /** Controla la visibilidad del modal */
  open: boolean;
  /** Datos de la cita a mostrar */
  cita: Cita | null;
  /** Callback para cerrar el modal */
  onClose: () => void;
}

/**
 * Props para el modal de editar cita
 */
export interface EditarCitaModalProps {
  /** Controla la visibilidad del modal */
  open: boolean;
  /** Datos de la cita a editar */
  cita: Cita | null;
  /** Callback para cerrar el modal */
  onClose: () => void;
  /** Callback para guardar los cambios */
  onSave: (citaEditada: Cita) => void;
}

/**
 * Props para el modal de agregar cita
 */
export interface AgregarCitaModalProps {
  /** Controla la visibilidad del modal */
  open: boolean;
  /** Callback para cerrar el modal */
  onClose: () => void;
  /** Callback para guardar la nueva cita */
  onSave: (nuevaCita: Cita) => void;
}

/**
 * Props para el modal de cancelar cita
 */
export interface CancelarCitaModalProps {
  /** Controla la visibilidad del modal */
  open: boolean;
  /** ID de la cita a cancelar */
  citaId?: number;
  /** Callback para cerrar el modal */
  onClose: () => void;
  /** Callback para confirmar la cancelación */
  onConfirm: () => void;
}

/**
 * Props para las acciones de una cita
 */
export interface CitaActionsProps {
  /** Callback para ver los detalles de la cita */
  onView: () => void;
  /** Callback para editar la cita */
  onEdit: () => void;
  /** Callback para cancelar la cita */
  onCancel: () => void;
}

// =============================================================================
// CONSTANTES
// =============================================================================

/**
 * Estados disponibles para las citas
 */
export const ESTADOS_CITA: EstadoCita[] = ['Aceptado', 'Pendiente', 'Pagado', 'Cancelado'];

/**
 * Colores asociados a cada estado de cita
 */
export const ESTADO_COLORS: Record<EstadoCita, 'success' | 'warning' | 'info' | 'error'> = {
  'Aceptado': 'success',
  'Pendiente': 'warning',
  'Pagado': 'info',
  'Cancelado': 'error',
};
