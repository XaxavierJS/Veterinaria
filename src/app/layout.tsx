"use client";
import React, { useState } from "react";
import { ThemeProvider, CssBaseline, Container, Box } from "@mui/material";
import { baselightTheme } from "@/utils/DefaultColors";

// Importa tus componentes globales
import Header from "@/components/Header";
import Sidebar from "@/components/sidebar/Sidebar";

// Importa estilos globales (globals.css).
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <html lang="es">
      <body>
        <ThemeProvider theme={baselightTheme}>
          <CssBaseline />

          <div style={{ display: "flex", minHeight: "100vh", width: "100%" }}>
            {/* Sidebar */}
            <Sidebar
              isSidebarOpen={isSidebarOpen}
              isMobileSidebarOpen={isMobileSidebarOpen}
              onSidebarClose={() => setMobileSidebarOpen(false)}
            />
            {/* Contenido principal */}
            <div style={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
              {/* Header */}
              <Header
                toggleMobileSidebar={() => setMobileSidebarOpen(true)}
              />

              {/* Contenedor de la página */}
              <Container sx={{ paddingTop: "20px", maxWidth: "1200px" }}>
                <Box sx={{ minHeight: "calc(100vh - 170px)" }}>{children}</Box>
              </Container>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
