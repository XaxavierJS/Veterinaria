"use client";
import React, { useState, useEffect, useMemo, useCallback } from "react";
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
  Button,
  TablePagination,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Stack,
  Chip,
} from "@mui/material";
import { IconPlus, IconChevronUp, IconChevronDown } from "@tabler/icons-react";

// Importar datos simulados
import citasData from "@/data/citas.json";

// Importar tipos centralizados
import type { Cita, EstadoCita } from "@/types";
import { ESTADOS_CITA, ESTADO_COLORS } from "@/types";

// Importar subcomponentes/modales
import CitaActions from "./CitaActions";
import VerCitaModal from "./VerCitaModal";
import EditarCitaModal from "./EditarCitaModal";
import CancelarCitaModal from "./CancelarCitaModal";
import AgregarCitaModal from "./AgregarCitaModal";

export default function Citas() {
  const [citas, setCitas] = useState<Cita[]>([]);
  const [search, setSearch] = useState("");
  const [filtroEstado, setFiltroEstado] = useState<EstadoCita | "">("");
  const [sortField, setSortField] = useState<keyof Cita | "">("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Estados de modales
  const [openVer, setOpenVer] = useState(false);
  const [openEditar, setOpenEditar] = useState(false);
  const [openCancelar, setOpenCancelar] = useState(false);
  const [openAgregar, setOpenAgregar] = useState(false);

  // Cita seleccionada para acciones
  const [selectedCita, setSelectedCita] = useState<Cita | null>(null);

  // Cargar citas desde el JSON
  useEffect(() => {
    const data = citasData as Cita[];
    setCitas(data);
  }, []);

  // Función para parsear la fecha "dd/mm/aaaa" a timestamp
  const parseFecha = useCallback((fechaStr: string): number => {
    const [dia, mes, anio] = fechaStr.split("/");
    return new Date(Number(anio), Number(mes) - 1, Number(dia)).getTime();
  }, []);

  // Generar fecha larga: "lunes 24 de octubre"
  const getFechaLarga = useCallback((fechaStr: string): string => {
    const [dia, mes, anio] = fechaStr.split("/");
    const dateObj = new Date(Number(anio), Number(mes) - 1, Number(dia));
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      day: "numeric",
      month: "long",
    };
    return dateObj.toLocaleDateString("es-ES", options);
  }, []);

  // Cambiar de página
  const handleChangePage = (_e: unknown, newPage: number) => setPage(newPage);

  // Cambiar filas por página
  const handleChangeRowsPerPage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };

  // Ordenar
  const handleSort = (field: keyof Cita) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  // Filtrar y ordenar con useMemo para optimizar rendimiento
  const sortedAndFiltered = useMemo(() => {
    // Filtrar
    const filtered = citas.filter((c) => {
      const txt = search.toLowerCase();
      const matchSearch =
        c.tutor.nombre.toLowerCase().includes(txt) ||
        c.mascota.nombre.toLowerCase().includes(txt) ||
        c.motivo.toLowerCase().includes(txt);

      const matchEstado = filtroEstado
        ? c.estado.toLowerCase() === filtroEstado.toLowerCase()
        : true;

      return matchSearch && matchEstado;
    });

    // Ordenar
    if (!sortField) return filtered;
    
    return [...filtered].sort((a, b) => {
      const valueA = a[sortField];
      const valueB = b[sortField];

      // Fecha
      if (sortField === "fecha") {
        return sortOrder === "asc"
          ? parseFecha(a.fecha) - parseFecha(b.fecha)
          : parseFecha(b.fecha) - parseFecha(a.fecha);
      }

      // Numérico (id_cita, precio)
      if (typeof valueA === "number" && typeof valueB === "number") {
        return sortOrder === "asc" ? valueA - valueB : valueB - valueA;
      }

      // String (tutor, estado, etc.)
      const strA = String(valueA).toLowerCase();
      const strB = String(valueB).toLowerCase();
      if (strA < strB) return sortOrder === "asc" ? -1 : 1;
      if (strA > strB) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
  }, [citas, search, filtroEstado, sortField, sortOrder, parseFecha]);

  // Abrir modal de "Ver Cita"
  const handleOpenVer = (cita: Cita) => {
    setSelectedCita(cita);
    setOpenVer(true);
  };

  // Abrir modal de "Editar Cita"
  const handleOpenEditar = (cita: Cita) => {
    setSelectedCita(cita);
    setOpenEditar(true);
  };

  // Abrir modal de "Cancelar Cita"
  const handleOpenCancelar = (cita: Cita) => {
    setSelectedCita(cita);
    setOpenCancelar(true);
  };

  // Confirmar cancelación (cambia estado a "Cancelado")
  const handleConfirmCancelar = () => {
    if (!selectedCita) return;
    const updated = citas.map((c) =>
      c.id_cita === selectedCita.id_cita ? { ...c, estado: "Cancelado" as EstadoCita } : c
    );
    setCitas(updated);
    setOpenCancelar(false);
  };

  // Guardar la cita editada
  const handleSaveEditar = (updated: Cita) => {
    const newList = citas.map((c) => (c.id_cita === updated.id_cita ? updated : c));
    setCitas(newList);
    setOpenEditar(false);
  };

  // Abrir modal de "Agregar Cita"
  const handleAgregarCita = () => {
    setOpenAgregar(true);
  };

  // Recibir cita nueva y agregarla
  const handleSaveAgregar = (nueva: Cita) => {
    setCitas([...citas, nueva]);
    setOpenAgregar(false);
  };

  return (
    <Card>
      <CardContent>
        {/* Encabezado */}
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h5">Gestionar Citas</Typography>
          <Button
            variant="contained"
            startIcon={<IconPlus />}
            onClick={handleAgregarCita}
          >
            Agregar Cita
          </Button>
        </Stack>

        {/* Búsqueda y Filtro */}
        <Stack direction="row" spacing={2} mb={2}>
          <TextField
            label="Buscar"
            placeholder="Tutor, Mascota o Motivo"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{ flex: 1 }}
          />
          <FormControl sx={{ minWidth: 150 }}>
            <InputLabel>Estado</InputLabel>
            <Select
              value={filtroEstado}
              onChange={(e) => {
                setFiltroEstado(e.target.value as EstadoCita | "");
                setPage(0);
              }}
              label="Estado"
            >
              <MenuItem value="">Todos</MenuItem>
              {ESTADOS_CITA.map((estado) => (
                <MenuItem key={estado} value={estado}>{estado}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>

        {/* Tabla */}
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {/* ID con botón para ordenar */}
                <TableCell>
                  <Button
                    onClick={() => handleSort("id_cita")}
                    endIcon={
                      sortField === "id_cita" ? (
                        sortOrder === "asc" ? (
                          <IconChevronUp />
                        ) : (
                          <IconChevronDown />
                        )
                      ) : undefined
                    }
                  >
                    ID
                  </Button>
                </TableCell>

                {/* Tutor con botón para ordenar */}
                <TableCell>
                  <Button
                    onClick={() => handleSort("tutor")}
                    endIcon={
                      sortField === "tutor" ? (
                        sortOrder === "asc" ? (
                          <IconChevronUp />
                        ) : (
                          <IconChevronDown />
                        )
                      ) : undefined
                    }
                  >
                    Tutor
                  </Button>
                </TableCell>

                {/* Motivo */}
                <TableCell>Motivo</TableCell>

                {/* Estado con botón para ordenar */}
                <TableCell>
                  <Button
                    onClick={() => handleSort("estado")}
                    endIcon={
                      sortField === "estado" ? (
                        sortOrder === "asc" ? (
                          <IconChevronUp />
                        ) : (
                          <IconChevronDown />
                        )
                      ) : undefined
                    }
                  >
                    Estado
                  </Button>
                </TableCell>

                {/* Fecha con botón para ordenar */}
                <TableCell>
                  <Button
                    onClick={() => handleSort("fecha")}
                    endIcon={
                      sortField === "fecha" ? (
                        sortOrder === "asc" ? (
                          <IconChevronUp />
                        ) : (
                          <IconChevronDown />
                        )
                      ) : undefined
                    }
                  >
                    Fecha
                  </Button>
                </TableCell>

                {/* Precio con botón para ordenar */}
                <TableCell>
                  <Button
                    onClick={() => handleSort("precio")}
                    endIcon={
                      sortField === "precio" ? (
                        sortOrder === "asc" ? (
                          <IconChevronUp />
                        ) : (
                          <IconChevronDown />
                        )
                      ) : undefined
                    }
                  >
                    Precio
                  </Button>
                </TableCell>

                {/* Mascota */}
                <TableCell>Mascota</TableCell>

                {/* Acciones */}
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedAndFiltered.length > 0 ? (
                sortedAndFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((cita) => {
                    const fechaLarga = getFechaLarga(cita.fecha); // Fecha larga debajo del campo principal
                    return (
                      <TableRow key={cita.id_cita}>
                        <TableCell>{cita.id_cita}</TableCell>
                        <TableCell>
                          {cita.tutor.nombre}
                          <br />
                          <small>{cita.tutor.id_tutor}</small>
                        </TableCell>
                        <TableCell>{cita.motivo}</TableCell>
                        <TableCell>
                          <Chip 
                            label={cita.estado} 
                            color={ESTADO_COLORS[cita.estado as EstadoCita] || "default"}
                            size="small"
                          />
                        </TableCell>
                        <TableCell>
                          {cita.fecha}
                          <br />
                          <small>{fechaLarga}</small>
                        </TableCell>
                        <TableCell>${cita.precio.toLocaleString("es-CL")} CLP</TableCell>
                        <TableCell>
                          {cita.mascota.nombre}
                          <br />
                          <small>{cita.mascota.id_mascota}</small>
                        </TableCell>
                        <TableCell>
                          <CitaActions
                            onView={() => handleOpenVer(cita)}
                            onEdit={() => handleOpenEditar(cita)}
                            onCancel={() => handleOpenCancelar(cita)}
                          />
                        </TableCell>
                      </TableRow>
                    );
                  })
              ) : (
                <TableRow>
                  <TableCell colSpan={8} align="center">
                    No se encontraron citas.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Paginación */}
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={sortedAndFiltered.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </CardContent>

      {/* MODAL VER */}
      <VerCitaModal
        open={openVer}
        cita={selectedCita}
        onClose={() => setOpenVer(false)}
      />

      {/* MODAL EDITAR */}
      <EditarCitaModal
        open={openEditar}
        cita={selectedCita}
        onClose={() => setOpenEditar(false)}
        onSave={handleSaveEditar}
      />

      {/* MODAL CANCELAR */}
      <CancelarCitaModal
        open={openCancelar}
        citaId={selectedCita?.id_cita}
        onClose={() => setOpenCancelar(false)}
        onConfirm={handleConfirmCancelar}
      />

      {/* MODAL AGREGAR CITA */}
      <AgregarCitaModal
        open={openAgregar}
        onClose={() => setOpenAgregar(false)}
        onSave={handleSaveAgregar}
      />
    </Card>
  );
}