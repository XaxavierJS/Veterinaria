/**
 * CitaActions.tsx
 * 
 * Componente que muestra los botones de acciones para cada cita:
 * - Ver detalles
 * - Editar cita
 * - Cancelar cita
 */
import React from "react";
import { IconButton, Tooltip } from "@mui/material";
import { IconEye, IconEdit, IconBan } from "@tabler/icons-react";
import type { CitaActionsProps } from "@/types";

const CitaActions: React.FC<CitaActionsProps> = ({
  onView,
  onEdit,
  onCancel,
}) => {
  return (
    <>
      <Tooltip title="Ver detalles">
        <IconButton color="primary" onClick={onView} aria-label="Ver detalles de la cita">
          <IconEye />
        </IconButton>
      </Tooltip>
      <Tooltip title="Editar cita">
        <IconButton color="secondary" onClick={onEdit} aria-label="Editar cita">
          <IconEdit />
        </IconButton>
      </Tooltip>
      <Tooltip title="Cancelar cita">
        <IconButton color="warning" onClick={onCancel} aria-label="Cancelar cita">
          <IconBan />
        </IconButton>
      </Tooltip>
    </>
  );
};

export default CitaActions;
