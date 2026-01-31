import React from "react";
import { Card, CardContent, Typography, Table, TableHead, TableRow, TableCell, TableBody, IconButton } from "@mui/material";
import { IconEye } from "@tabler/icons-react";

// Datos simulados (reemplaza esto con una API o import del JSON)
const tutores = [
  { id_tutor: "T001", nombre: "Juan Pérez", rut: "12.345.678-9", mascotas: 5 },
  { id_tutor: "T002", nombre: "María López", rut: "9.876.543-2", mascotas: 2 },
  { id_tutor: "T003", nombre: "Carlos Soto", rut: "18.654.321-0", mascotas: 1 },
  { id_tutor: "T004", nombre: "Ana Gutiérrez", rut: "21.432.198-5", mascotas: 3 },
  { id_tutor: "T005", nombre: "Laura Silva", rut: "17.123.456-7", mascotas: 4 }
];

const TutoresFrecuentes = () => {
  return (
    <Card>
      <CardContent>
        {/* Título */}
        <Typography variant="h6" fontWeight="600" sx={{ mb: 2 }}>
          Tutores Frecuentes
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Rut</TableCell>
              <TableCell>Nombre del tutor</TableCell>
              <TableCell>Mascotas</TableCell>
              <TableCell>Ver Detalle</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tutores.slice(0, 4).map((tutor, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{tutor.rut}</TableCell>
                <TableCell>{tutor.nombre}</TableCell>
                <TableCell>{tutor.mascotas}</TableCell>
                <TableCell>
                  <IconButton color="primary">
                    <IconEye size={20} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default TutoresFrecuentes;
