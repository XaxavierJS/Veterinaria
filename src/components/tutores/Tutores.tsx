"use client";
import React, { useState, useEffect, useMemo } from "react";
import {
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TextField,
  Stack,
  IconButton,
  Tooltip,
  Chip,
  Avatar,
  Button,
} from "@mui/material";
import { 
  IconEye, 
  IconEdit, 
  IconTrash, 
  IconChevronUp, 
  IconChevronDown, 
  IconUser,
  IconPlus 
} from "@tabler/icons-react";

// Importar datos
import tutoresData from "@/data/tutores.json";
import mascotasData from "@/data/mascotas.json";

// Importar modales
import VerTutorModal from "./VerTutorModal";
import EditarTutorModal from "./EditarTutorModal";
import EliminarTutorModal from "./EliminarTutorModal";

interface Tutor {
  id_tutor: string;
  nombre: string;
  rut: string;
  telefono: string;
  email: string;
  direccion: string;
}

interface Mascota {
  numero_ficha: string;
  nombre: string;
  id_tutor: string;
}

export default function Tutores() {
  const [tutores, setTutores] = useState<Tutor[]>([]);
  const [mascotas, setMascotas] = useState<Mascota[]>([]);
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState<keyof Tutor | "">("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Estados de modales
  const [selectedTutor, setSelectedTutor] = useState<Tutor | null>(null);
  const [openVer, setOpenVer] = useState(false);
  const [openEditar, setOpenEditar] = useState(false);
  const [openEliminar, setOpenEliminar] = useState(false);

  useEffect(() => {
    setTutores(tutoresData as Tutor[]);
    setMascotas(mascotasData as Mascota[]);
  }, []);

  // Obtener nombres de mascotas de un tutor
  const getMascotasNombres = (idTutor: string): string[] => {
    return mascotas.filter((m) => m.id_tutor === idTutor).map((m) => m.nombre);
  };

  const handleChangePage = (_e: unknown, newPage: number) => setPage(newPage);
  const handleChangeRowsPerPage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };

  const handleSort = (field: keyof Tutor) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  // Handlers de modales
  const handleOpenVer = (tutor: Tutor) => {
    setSelectedTutor(tutor);
    setOpenVer(true);
  };

  const handleOpenEditar = (tutor: Tutor) => {
    setSelectedTutor(tutor);
    setOpenEditar(true);
  };

  const handleOpenEliminar = (tutor: Tutor) => {
    setSelectedTutor(tutor);
    setOpenEliminar(true);
  };

  const handleSaveEditar = (tutorEditado: Tutor) => {
    setTutores(tutores.map((t) => 
      t.id_tutor === tutorEditado.id_tutor ? tutorEditado : t
    ));
    setOpenEditar(false);
  };

  const handleConfirmEliminar = () => {
    if (selectedTutor) {
      setTutores(tutores.filter((t) => t.id_tutor !== selectedTutor.id_tutor));
    }
    setOpenEliminar(false);
  };

  const sortedAndFiltered = useMemo(() => {
    const filtered = tutores.filter((t) => {
      const txt = search.toLowerCase();
      return (
        t.nombre.toLowerCase().includes(txt) ||
        t.rut.toLowerCase().includes(txt) ||
        t.email.toLowerCase().includes(txt)
      );
    });

    if (!sortField) return filtered;

    return [...filtered].sort((a, b) => {
      const strA = String(a[sortField]).toLowerCase();
      const strB = String(b[sortField]).toLowerCase();
      if (strA < strB) return sortOrder === "asc" ? -1 : 1;
      if (strA > strB) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
  }, [tutores, search, sortField, sortOrder]);

  const SortButton = ({ field, label }: { field: keyof Tutor; label: string }) => (
    <Button
      onClick={() => handleSort(field)}
      size="small"
      sx={{ 
        textTransform: "none", 
        fontWeight: 600,
        color: "inherit",
        minWidth: "auto",
      }}
      endIcon={
        sortField === field ? (
          sortOrder === "asc" ? <IconChevronUp size={16} /> : <IconChevronDown size={16} />
        ) : undefined
      }
    >
      {label}
    </Button>
  );

  return (
    <Card>
      <CardContent>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h5">Gestión de Tutores</Typography>
          <Button
            variant="contained"
            startIcon={<IconPlus size={18} />}
            onClick={() => alert("Función de agregar tutor próximamente")}
          >
            Agregar Tutor
          </Button>
        </Stack>

        <Stack direction="row" spacing={2} mb={2}>
          <TextField
            label="Buscar"
            placeholder="Nombre, RUT o Email"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{ flex: 1, maxWidth: 400 }}
          />
        </Stack>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <SortButton field="id_tutor" label="ID" />
                </TableCell>
                <TableCell>
                  <SortButton field="nombre" label="Nombre" />
                </TableCell>
                <TableCell>
                  <SortButton field="rut" label="RUT" />
                </TableCell>
                <TableCell>Teléfono</TableCell>
                <TableCell>
                  <SortButton field="email" label="Email" />
                </TableCell>
                <TableCell>Mascotas</TableCell>
                <TableCell align="center">Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedAndFiltered.length > 0 ? (
                sortedAndFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((tutor) => {
                    const mascotasNombres = getMascotasNombres(tutor.id_tutor);
                    return (
                      <TableRow key={tutor.id_tutor} hover>
                        <TableCell>
                          <Chip
                            avatar={<Avatar><IconUser size={14} /></Avatar>}
                            label={tutor.id_tutor}
                            size="small"
                            variant="outlined"
                          />
                        </TableCell>
                        <TableCell>
                          <Typography fontWeight={500}>{tutor.nombre}</Typography>
                          <Typography variant="caption" color="textSecondary">
                            {tutor.direccion}
                          </Typography>
                        </TableCell>
                        <TableCell>{tutor.rut}</TableCell>
                        <TableCell>{tutor.telefono}</TableCell>
                        <TableCell>
                          <Typography variant="body2">{tutor.email}</Typography>
                        </TableCell>
                        <TableCell>
                          <Stack direction="row" spacing={0.5} flexWrap="wrap" gap={0.5}>
                            {mascotasNombres.length > 0 ? (
                              mascotasNombres.map((nombre, idx) => (
                                <Chip
                                  key={idx}
                                  label={nombre}
                                  size="small"
                                  color="primary"
                                  variant="outlined"
                                />
                              ))
                            ) : (
                              <Typography variant="caption" color="textSecondary">
                                Sin mascotas
                              </Typography>
                            )}
                          </Stack>
                        </TableCell>
                        <TableCell>
                          <Stack direction="row" spacing={0.5} justifyContent="center">
                            <Tooltip title="Ver detalles">
                              <IconButton 
                                color="primary" 
                                size="small"
                                onClick={() => handleOpenVer(tutor)}
                              >
                                <IconEye size={18} />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Editar">
                              <IconButton 
                                color="secondary" 
                                size="small"
                                onClick={() => handleOpenEditar(tutor)}
                              >
                                <IconEdit size={18} />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Eliminar">
                              <IconButton 
                                color="error" 
                                size="small"
                                onClick={() => handleOpenEliminar(tutor)}
                              >
                                <IconTrash size={18} />
                              </IconButton>
                            </Tooltip>
                          </Stack>
                        </TableCell>
                      </TableRow>
                    );
                  })
              ) : (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    No se encontraron tutores.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={sortedAndFiltered.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Filas por página"
        />
      </CardContent>

      {/* Modales */}
      <VerTutorModal
        open={openVer}
        tutor={selectedTutor}
        mascotas={selectedTutor ? getMascotasNombres(selectedTutor.id_tutor) : []}
        onClose={() => setOpenVer(false)}
      />

      <EditarTutorModal
        open={openEditar}
        tutor={selectedTutor}
        onClose={() => setOpenEditar(false)}
        onSave={handleSaveEditar}
      />

      <EliminarTutorModal
        open={openEliminar}
        tutorNombre={selectedTutor?.nombre || ""}
        onClose={() => setOpenEliminar(false)}
        onConfirm={handleConfirmEliminar}
      />
    </Card>
  );
}
