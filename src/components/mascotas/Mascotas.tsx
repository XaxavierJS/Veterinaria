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
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
} from "@mui/material";
import { 
  IconEye, 
  IconEdit, 
  IconTrash, 
  IconChevronUp, 
  IconChevronDown, 
  IconPaw,
  IconPlus 
} from "@tabler/icons-react";

// Importar datos
import mascotasData from "@/data/mascotas.json";
import tutoresData from "@/data/tutores.json";

// Importar modales
import VerMascotaModal from "./VerMascotaModal";
import EditarMascotaModal from "./EditarMascotaModal";
import EliminarMascotaModal from "./EliminarMascotaModal";

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

interface Tutor {
  id_tutor: string;
  nombre: string;
}

const ESPECIES = ["Perro", "Gato", "Conejo", "Ave", "Otro"];

export default function Mascotas() {
  const [mascotas, setMascotas] = useState<Mascota[]>([]);
  const [tutores, setTutores] = useState<Tutor[]>([]);
  const [search, setSearch] = useState("");
  const [filtroEspecie, setFiltroEspecie] = useState("");
  const [sortField, setSortField] = useState<keyof Mascota | "">("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Estados de modales
  const [selectedMascota, setSelectedMascota] = useState<Mascota | null>(null);
  const [openVer, setOpenVer] = useState(false);
  const [openEditar, setOpenEditar] = useState(false);
  const [openEliminar, setOpenEliminar] = useState(false);

  useEffect(() => {
    setMascotas(mascotasData as Mascota[]);
    setTutores(tutoresData as Tutor[]);
  }, []);

  // Obtener nombre del tutor
  const getTutorNombre = (idTutor: string): string => {
    const tutor = tutores.find((t) => t.id_tutor === idTutor);
    return tutor?.nombre || "Desconocido";
  };

  // Calcular edad
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

  const handleChangePage = (_e: unknown, newPage: number) => setPage(newPage);
  const handleChangeRowsPerPage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };

  const handleSort = (field: keyof Mascota) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  // Handlers de modales
  const handleOpenVer = (mascota: Mascota) => {
    setSelectedMascota(mascota);
    setOpenVer(true);
  };

  const handleOpenEditar = (mascota: Mascota) => {
    setSelectedMascota(mascota);
    setOpenEditar(true);
  };

  const handleOpenEliminar = (mascota: Mascota) => {
    setSelectedMascota(mascota);
    setOpenEliminar(true);
  };

  const handleSaveEditar = (mascotaEditada: Mascota) => {
    setMascotas(mascotas.map((m) => 
      m.numero_ficha === mascotaEditada.numero_ficha ? mascotaEditada : m
    ));
    setOpenEditar(false);
  };

  const handleConfirmEliminar = () => {
    if (selectedMascota) {
      setMascotas(mascotas.filter((m) => m.numero_ficha !== selectedMascota.numero_ficha));
    }
    setOpenEliminar(false);
  };

  const sortedAndFiltered = useMemo(() => {
    const filtered = mascotas.filter((m) => {
      const txt = search.toLowerCase();
      const matchSearch =
        m.nombre.toLowerCase().includes(txt) ||
        m.numero_ficha.toLowerCase().includes(txt) ||
        m.raza.toLowerCase().includes(txt);
      const matchEspecie = filtroEspecie ? m.especie === filtroEspecie : true;
      return matchSearch && matchEspecie;
    });

    if (!sortField) return filtered;

    return [...filtered].sort((a, b) => {
      const valueA = a[sortField];
      const valueB = b[sortField];

      if (typeof valueA === "number" && typeof valueB === "number") {
        return sortOrder === "asc" ? valueA - valueB : valueB - valueA;
      }

      const strA = String(valueA).toLowerCase();
      const strB = String(valueB).toLowerCase();
      if (strA < strB) return sortOrder === "asc" ? -1 : 1;
      if (strA > strB) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
  }, [mascotas, search, filtroEspecie, sortField, sortOrder]);

  const SortButton = ({ field, label }: { field: keyof Mascota; label: string }) => (
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

  const getEspecieColor = (especie: string): "primary" | "secondary" | "success" | "warning" | "error" => {
    switch (especie) {
      case "Perro":
        return "primary";
      case "Gato":
        return "secondary";
      case "Conejo":
        return "success";
      default:
        return "warning";
    }
  };

  return (
    <Card>
      <CardContent>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h5">Gestión de Mascotas</Typography>
          <Button
            variant="contained"
            startIcon={<IconPlus size={18} />}
            onClick={() => alert("Función de agregar mascota próximamente")}
          >
            Agregar Mascota
          </Button>
        </Stack>

        <Stack direction="row" spacing={2} mb={2}>
          <TextField
            label="Buscar"
            placeholder="Nombre, Ficha o Raza"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{ flex: 1, maxWidth: 400 }}
          />
          <FormControl sx={{ minWidth: 150 }}>
            <InputLabel>Especie</InputLabel>
            <Select
              value={filtroEspecie}
              onChange={(e) => {
                setFiltroEspecie(e.target.value);
                setPage(0);
              }}
              label="Especie"
            >
              <MenuItem value="">Todas</MenuItem>
              {ESPECIES.map((esp) => (
                <MenuItem key={esp} value={esp}>
                  {esp}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <SortButton field="numero_ficha" label="Ficha" />
                </TableCell>
                <TableCell>
                  <SortButton field="nombre" label="Nombre" />
                </TableCell>
                <TableCell>
                  <SortButton field="especie" label="Especie" />
                </TableCell>
                <TableCell>
                  <SortButton field="raza" label="Raza" />
                </TableCell>
                <TableCell>
                  <SortButton field="peso" label="Peso (kg)" />
                </TableCell>
                <TableCell>Edad</TableCell>
                <TableCell>Tutor</TableCell>
                <TableCell>Enfermedades</TableCell>
                <TableCell align="center">Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedAndFiltered.length > 0 ? (
                sortedAndFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((mascota) => (
                    <TableRow key={mascota.numero_ficha} hover>
                      <TableCell>
                        <Chip
                          avatar={
                            <Avatar>
                              <IconPaw size={14} />
                            </Avatar>
                          }
                          label={mascota.numero_ficha}
                          size="small"
                          variant="outlined"
                        />
                      </TableCell>
                      <TableCell>
                        <Typography fontWeight={500}>{mascota.nombre}</Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={mascota.especie}
                          size="small"
                          color={getEspecieColor(mascota.especie)}
                        />
                      </TableCell>
                      <TableCell>{mascota.raza}</TableCell>
                      <TableCell>{mascota.peso} kg</TableCell>
                      <TableCell>{calcularEdad(mascota.fechaNacimiento)}</TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {getTutorNombre(mascota.id_tutor)}
                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                          {mascota.id_tutor}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        {mascota.enfermedades.length > 0 ? (
                          <Stack direction="row" spacing={0.5} flexWrap="wrap" gap={0.5}>
                            {mascota.enfermedades.map((enf, idx) => (
                              <Chip
                                key={idx}
                                label={enf}
                                size="small"
                                color="error"
                                variant="outlined"
                              />
                            ))}
                          </Stack>
                        ) : (
                          <Chip label="Saludable" size="small" color="success" variant="outlined" />
                        )}
                      </TableCell>
                      <TableCell>
                        <Stack direction="row" spacing={0.5} justifyContent="center">
                          <Tooltip title="Ver detalles">
                            <IconButton 
                              color="primary" 
                              size="small"
                              onClick={() => handleOpenVer(mascota)}
                            >
                              <IconEye size={18} />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Editar">
                            <IconButton 
                              color="secondary" 
                              size="small"
                              onClick={() => handleOpenEditar(mascota)}
                            >
                              <IconEdit size={18} />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Eliminar">
                            <IconButton 
                              color="error" 
                              size="small"
                              onClick={() => handleOpenEliminar(mascota)}
                            >
                              <IconTrash size={18} />
                            </IconButton>
                          </Tooltip>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))
              ) : (
                <TableRow>
                  <TableCell colSpan={9} align="center">
                    No se encontraron mascotas.
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
      <VerMascotaModal
        open={openVer}
        mascota={selectedMascota}
        tutorNombre={selectedMascota ? getTutorNombre(selectedMascota.id_tutor) : ""}
        onClose={() => setOpenVer(false)}
      />

      <EditarMascotaModal
        open={openEditar}
        mascota={selectedMascota}
        onClose={() => setOpenEditar(false)}
        onSave={handleSaveEditar}
      />

      <EliminarMascotaModal
        open={openEliminar}
        mascotaNombre={selectedMascota?.nombre || ""}
        onClose={() => setOpenEliminar(false)}
        onConfirm={handleConfirmEliminar}
      />
    </Card>
  );
}