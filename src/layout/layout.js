import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  IconButton,
  Icon,
  Avatar,
  Box,
  Divider,
  Link,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import { Close, Logout } from "@mui/icons-material";
import { makeStyles } from "@material-ui/core/styles";
import { AuthContext } from "../context/auth_context";
import config from "../config";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: 240,
    flexShrink: 0,
    marginTop: theme.mixins.toolbar.minHeight + 16,
  },
  drawerPaper: {
    width: 240,
    marginTop: theme.mixins.toolbar.minHeight + 16,
  },
}));

const Layout = () => {
  const classes = useStyles();
  const history = useHistory();
  const [image, setImage] = useState("");
  const { user, logout } = useContext(AuthContext);
  const [open, setOpen] = useState(false);

  const fetchData = () => {
    const urlGetClientById = `${config.apiUrl}${config.cienteObtenerUrl}${user.userid}`;
    axios.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;
    try {
      const response = axios.get(urlGetClientById);
      if (response && response.data) {
        setImage(response.data.imagen);
      }
    } catch (error) {}
  };

  const handleDrawer = () => setOpen(!open);

  const handleLogout = () => {
    logout();
    history.push("/");
  };
  useEffect(() => {
    if (user.userid) {
      fetchData();
    }
  }, [user]);

  return (
    <>
      <div className={classes.root}>
        <AppBar
          position='fixed'
          className={classes.appBar}
          sx={{ backgroundColor: "#002855" }}>
          <Toolbar>
            <IconButton
              onClick={handleDrawer}
              sx={{
                padding: 2,
                color: "white",
                ":hover": { color: "black", backgroundColor: "inherit" },
              }}>
              {open ? <Close /> : <MenuIcon />}
            </IconButton>
            <Typography variant='h5' style={{ flexGrow: 1 }}>
              COMPANIA PRUEBA
            </Typography>
            <Typography variant='body1' sx={{ fontWeight: "bold" }}>
              {user.username}
            </Typography>
            <IconButton
              sx={{
                margin: 2,
                ":hover": { color: "black", backgroundColor: "inherit" },
              }}
              color='inherit'
              onClick={handleLogout}>
              <Logout />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer
          anchor='left'
          open={open}
          onClose={handleDrawer}
          className={classes.drawer}
          //variant='permanent'
          sx={{
            "& .MuiDrawer-paper": {
              width: 240,
              padding: 2,
            },
          }}
          classes={{
            paper: classes.drawerPaper,
          }}>
          <List>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}>
              <Avatar
                alt='Remy Sharp'
                src={image ? image : ""}
                sx={{ width: 120, height: 120, mb: 2 }}
              />
              <Typography variant='body1' sx={{ fontWeight: "bold" }}>
                {user.username}
              </Typography>
              <Divider sx={{ width: "100%", m: 2 }} />
              <Typography
                variant='h7'
                sx={{ fontWeight: "bold", marginBottom: 2 }}>
                MENÚ
              </Typography>
              <Divider sx={{ width: "100%", mb: 2 }} />
            </Box>

            <Link
              href={config.home}
              variant='body1'
              underline='none'
              sx={{
                alignItems: "self-start",
                color: "black",
                fontWeight: "bold",
                marginBottom: 1,
                height: 22,
              }}>
              <Icon
                sx={{
                  opacity: 0.5,
                  ml: 2,
                  mr: 1,
                  fontSize: 17,
                  width: 25,
                }}>
                IN
              </Icon>
              INICIO
            </Link>
            <Divider sx={{ m: 1, width: "0%" }} />
            <Link
              href={config.clientes.listado}
              underline='none'
              variant='body1'
              sx={{
                alignItems: "start",
                color: "black",
                fontWeight: "bold",
                marginBottom: 1,
                height: 22,
              }}>
              <Icon
                sx={{
                  opacity: 0.5,
                  ml: 2,
                  mr: 1,
                  fontSize: 17,
                  width: 22,
                  height: 18,
                }}>
                CC
              </Icon>
              Consulta Clientes
            </Link>
          </List>
        </Drawer>
      </div>
    </>
  );
};

export default Layout;
