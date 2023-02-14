import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { Button, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { RoutePaths } from "../contants";
import { useAtom } from "jotai";
import { currentUserAtom, jwtTokenAtom } from "../state/atoms";

const pages = ["Home", "Projects", "Tasks"];

export const ResponsiveAppBar: React.FC = () => {
  const [currentUser, setCurrentUser] = useAtom(currentUserAtom);
  const [, setJwtToken] = useAtom(jwtTokenAtom);
  const theme = useTheme();

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const navigate = useNavigate();

  if (!currentUser) {
    return <></>;
  }

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (pageName?: string) => {
    setAnchorElNav(null);
    if (pageName && RoutePaths[pageName]) {
      navigate(RoutePaths[pageName]);
    }
  };

  const handleCloseUserMenu = (pageName?: string) => {
    setAnchorElUser(null);
    if (pageName && RoutePaths[pageName]) {
      navigate(RoutePaths[pageName]);
    }
  };
  const logOut = () => {
    setCurrentUser(null);
    setJwtToken(null);
    setAnchorElUser(null);
    navigate(RoutePaths.Home);
  };
  const getUserInitisls = () => {
    let initials = "";
    if (currentUser) {
      const splitName = currentUser.full_name?.split(" ");
      if (splitName) {
        if (splitName.length > 0) {
          initials = (splitName[0].at(0) ?? "").toUpperCase();
          if (splitName.length > 1) {
            initials += (
              splitName[splitName.length - 1].at(0) ?? ""
            ).toUpperCase();
          }
        }
      }
    }
    return initials;
  };
  const profileMenu = (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title={`Logged in as: ${currentUser.full_name}`}>
        <IconButton onClick={handleOpenUserMenu} color="primary" sx={{ p: 0 }}>
          <Avatar sx={{ bgcolor: theme.palette.primary.light }}>
            {getUserInitisls()}
          </Avatar>
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={() => handleCloseUserMenu()}
      >
        <MenuItem onClick={logOut}>
          <Typography textAlign="center">Logout</Typography>
        </MenuItem>
      </Menu>
    </Box>
  );

  const pagesTopMenus = (
    <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
      {pages.map((page) => (
        <Button
          key={page}
          onClick={() => handleCloseNavMenu(page)}
          sx={{
            my: 2,
            color: "white",
            display: "block",
          }}
        >
          {page}
        </Button>
      ))}
    </Box>
  );

  const pagesCondensedMenu = (
    <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleOpenNavMenu}
        color="inherit"
      >
        <MenuIcon />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorElNav}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        open={Boolean(anchorElNav)}
        onClose={() => handleCloseNavMenu()}
        sx={{
          display: { xs: "block", md: "none" },
        }}
      >
        {pages.map((page) => (
          <MenuItem key={page} onClick={() => handleCloseNavMenu(page)}>
            {page}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {pagesCondensedMenu}
          {pagesTopMenus}
          {profileMenu}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
