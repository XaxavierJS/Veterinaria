import React from "react";
import {
  AppBar,
  Toolbar,
  styled,
  Box,
  IconButton,
  Badge,
  Stack,
} from "@mui/material";
import { IconBellRinging, IconMenu } from "@tabler/icons-react";
import PropTypes from "prop-types";

import Profile from "./Profile";

const AppBarStyled = styled(AppBar)(({ theme }) => ({
  boxShadow: "none",
  background: theme.palette.background.paper,
  justifyContent: "center",
  backdropFilter: "blur(4px)",
  [theme.breakpoints.up("lg")]: {
    minHeight: "70px",
  },
}));

const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
  width: "100%",
  color: theme.palette.text.secondary,
}));

interface HeaderProps {
  toggleMobileSidebar: () => void;
}

const Header = ({ toggleMobileSidebar }: HeaderProps) => {
  return (
    <AppBarStyled position="sticky" color="default">
      <ToolbarStyled>
        <IconButton
          color="inherit"
          aria-label="menu"
          onClick={toggleMobileSidebar}
          sx={{
            display: {
              lg: "none",
              xs: "inline",
            },
          }}
        >
          <IconMenu size={20} />
        </IconButton>

        <Box flexGrow={1} />

        <Stack direction="row" spacing={2} alignItems="center">
          <IconButton size="large" aria-label="show notifications" color="inherit">
            <Badge variant="dot" color="primary">
              <IconBellRinging size={21} stroke={1.5} />
            </Badge>
          </IconButton>

          <Profile />
        </Stack>
      </ToolbarStyled>
    </AppBarStyled>
  );
};

Header.propTypes = {
  toggleMobileSidebar: PropTypes.func.isRequired,
};

export default Header;
