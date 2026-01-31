import React from "react";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useTheme } from "@mui/material/styles";

interface NavItemProps {
  item: {
    href: string;
    title: string;
    icon?: React.ElementType;
  };
  pathDirect: string;
  onClick?: () => void;
}

const NavItem = ({ item, pathDirect, onClick }: NavItemProps) => {
  const theme = useTheme();
  const isSelected = pathDirect === item.href;

  return (
    <ListItem disablePadding sx={{ mb: 0.5 }}>
      <ListItemButton
        component={Link}
        href={item.href}
        selected={isSelected}
        onClick={onClick}
        sx={{
          borderRadius: "10px",
          padding: "10px 14px",
          transition: "all 0.2s ease-in-out",
          backgroundColor: isSelected
            ? theme.palette.primary.light
            : "transparent",
          color: isSelected
            ? theme.palette.primary.dark
            : theme.palette.text.primary,
          border: isSelected
            ? `1px solid ${theme.palette.primary.main}`
            : "1px solid transparent",
          "&:hover": {
            backgroundColor: theme.palette.primary.light,
            color: theme.palette.primary.dark,
            transform: "translateX(4px)",
          },
          "&.Mui-selected": {
            "&:hover": {
              backgroundColor: theme.palette.primary.light,
            },
          },
        }}
      >
        <ListItemIcon
          sx={{
            color: isSelected ? theme.palette.primary.dark : theme.palette.primary.main,
            minWidth: "40px",
          }}
        >
          {item.icon && <item.icon size={22} stroke={1.8} />}
        </ListItemIcon>
        <ListItemText
          primary={
            <Typography
              variant="body1"
              sx={{
                fontWeight: isSelected ? 600 : 500,
                fontSize: "0.9rem",
              }}
            >
              {item.title}
            </Typography>
          }
        />
      </ListItemButton>
    </ListItem>
  );
};

export default NavItem;
