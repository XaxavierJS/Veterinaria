import { useMediaQuery, Box, Drawer, Typography, IconButton } from "@mui/material";
import SidebarItems from "./SidebarItems";
import { useTheme } from "@mui/material/styles";
import { IconPaw, IconX } from "@tabler/icons-react";

interface SidebarProps {
  isMobileSidebarOpen: boolean;
  onSidebarClose: () => void;
  isSidebarOpen: boolean;
}

const Sidebar = ({
  isMobileSidebarOpen,
  onSidebarClose,
  isSidebarOpen,
}: SidebarProps) => {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.up("md"));

  const sidebarWidth = isMediumScreen ? 260 : 280;

  // Estilos del scrollbar mejorados
  const scrollbarStyles = {
    "&::-webkit-scrollbar": {
      width: "6px",
    },
    "&::-webkit-scrollbar-track": {
      backgroundColor: "transparent",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: theme.palette.grey[300],
      borderRadius: "10px",
      "&:hover": {
        backgroundColor: theme.palette.grey[400],
      },
    },
  };

  const sidebarContent = (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Logo / Branding */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "20px 16px",
          borderBottom: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: "12px",
              background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: `0 4px 14px ${theme.palette.primary.main}40`,
            }}
          >
            <IconPaw size={24} color="#ffffff" />
          </Box>
          <Box>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color: theme.palette.text.primary,
                lineHeight: 1.2,
              }}
            >
              VetClinic
            </Typography>
            <Typography
              variant="caption"
              sx={{ color: theme.palette.text.secondary }}
            >
              Sistema de Gestión
            </Typography>
          </Box>
        </Box>
        {/* Botón cerrar solo en móvil */}
        {!isLargeScreen && (
          <IconButton
            onClick={onSidebarClose}
            sx={{
              color: theme.palette.text.secondary,
              "&:hover": {
                backgroundColor: theme.palette.error.light,
                color: theme.palette.error.main,
              },
            }}
          >
            <IconX size={20} />
          </IconButton>
        )}
      </Box>

      {/* Menu Items */}
      <Box
        sx={{
          flex: 1,
          padding: "16px 12px",
          overflowY: "auto",
          ...scrollbarStyles,
        }}
      >
        <SidebarItems onItemClick={!isLargeScreen ? onSidebarClose : undefined} />
      </Box>

      {/* Footer */}
      <Box
        sx={{
          textAlign: "center",
          padding: "16px",
          borderTop: `1px solid ${theme.palette.divider}`,
          backgroundColor: theme.palette.grey[100],
        }}
      >
        <Typography
          variant="caption"
          sx={{ color: theme.palette.text.secondary }}
        >
          © 2026 - VetClinic MVP
        </Typography>
      </Box>
    </Box>
  );

  return (
    <Box
      component="nav"
      sx={{
        width: { lg: sidebarWidth },
        flexShrink: { lg: 0 },
      }}
    >
      <Drawer
        anchor="left"
        open={isLargeScreen ? isSidebarOpen : isMobileSidebarOpen}
        onClose={!isLargeScreen ? onSidebarClose : undefined}
        variant={isLargeScreen ? "permanent" : "temporary"}
        ModalProps={{
          keepMounted: true, // Mejor rendimiento en móvil
        }}
        PaperProps={{
          sx: {
            boxSizing: "border-box",
            width: sidebarWidth,
            backgroundColor: theme.palette.background.paper,
            borderRight: `1px solid ${theme.palette.divider}`,
            boxShadow: isLargeScreen ? "none" : theme.shadows[8],
          },
        }}
      >
        {sidebarContent}
      </Drawer>
    </Box>
  );
};

export default Sidebar;
