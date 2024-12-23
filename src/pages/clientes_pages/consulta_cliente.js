import React, { useContext, useState, useEffect } from "react";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  IconButton,
  Paper,
  Snackbar,
  AppBar,
  Toolbar,
  Typography,
  Divider,
  CircularProgress,
} from "@mui/material";
import { Edit, Delete, Add, ArrowBack, Search } from "@mui/icons-material";
import axios from "axios";

import Layout from "../../layout/layout";
import { AuthContext } from "../../context/auth_context";
import config from "../../config";
import { useHistory } from "react-router-dom";
import { backgroundStyle, paperBoxStyle } from "../../style/theme";
import { delete_LS, read_LS } from "../../utils/local_storage";
import { handleOnlyNumber, handleOnlyText } from "../../utils/only_one";
import { userEditar } from "../../models/user";

const url = `${config.apiUrl}${config.clienteListadoUrl}`;

const ClienteConsulta = () => {
  const { user } = useContext(AuthContext);
  const history = useHistory();
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [clientes, setClientes] = useState([]);

  const [formFind, setFormFind] = useState({
    nombre: "",
    identificacion: "",
    usuarioId: "",
  });

  axios.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;

  const fetchData = async () => {
    try {
      setLoading(true);
      const formFindCopy = JSON.parse(JSON.stringify(formFind));

      formFindCopy.usuarioId = user.userid;

      if (!formFindCopy.nombre && formFindCopy.identificacion) {
        delete formFindCopy.nombre;
      }

      if (!formFindCopy.identificacion && formFind.nombre) {
        delete formFindCopy.identificacion;
      }

      const response = await axios.post(url, formFindCopy);

      if (response.data && response.data.length > 0) {
        setClientes(response.data);
        setLoading(false);
      } else {
        setLoading(false);
        setMessage("No hay datos resultantes");
      }
    } catch (error) {
      if (error.respose && error.response.data.message) {
        setMessage(
          `${error.response.data.message}. Transaccion no realizada. Intenta de nuevo`
        );
      } else {
        setMessage(
          `${error.code}. Transaccion no realizada. Intenta de nuevo.`
        );
      }
      setLoading(false);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormFind({ ...formFind, [name]: value });
  };
  const handleCloseSnackbar = () => {
    setOpen(false);
    setMessage(null);
  };
  const handleClickAddButton = () => {
    history.push(config.clientes.crear);
  };
  const handleBackButton = () => {
    history.push(config.home);
  };

  const handleFind = () => {
    fetchData();
  };
  const handleEditButton = (id) => {
    history.push(`${config.clientes.editar}/${id}`);
  };
  const handleDeleteButton = (id) => {
    history.push(`${config.clientes.borrar}/${id}`);
  };
  useEffect(() => {
    if (user.userid) {
      setMessage(read_LS("message_to_show"));
      delete_LS("message_to_show");
      fetchData();
    }
  }, [user]);

  useEffect(() => {
    if (message) {
      setOpen(true);
    }
  }, [message]);

  return (
    <>
      <Layout />
      <Box sx={backgroundStyle}>
        <Box sx={paperBoxStyle}>
          <AppBar position='static' color='transparent' elevation={0}>
            <Toolbar>
              <Typography
                variant='h6'
                fontWeight={"bold"}
                sx={{ flexGrow: 1, marginLeft: 1 }}>
                Consulta de clientes
              </Typography>
              <Button
                variant='contained'
                type='submit'
                color='inherit'
                startIcon={<Add />}
                onClick={handleClickAddButton}>
                Agregar
              </Button>
              <Button
                variant='contained'
                color='inherit'
                startIcon={<ArrowBack />}
                onClick={handleBackButton}
                sx={{ marginLeft: 1 }}>
                Regresar
              </Button>
            </Toolbar>
          </AppBar>
          <Divider sx={{ width: "100%", mb: 2 }} />
          <Box
            sx={{
              mt: 5,
              marginLeft: 20,
              display: "flex",
              gap: 2,
              alignItems: "center",
              marginBottom: 2,
            }}>
            <TextField
              label='Nombre'
              onInput={handleOnlyText}
              onChange={handleChange}
              name='nombre'
              value={formFind.name}
              variant='outlined'
              size='small'
              sx={{ width: "40%" }}
            />
            <TextField
              label='Identificación'
              onInput={handleOnlyNumber}
              onChange={handleChange}
              name='identificacion'
              value={formFind.identificacion}
              variant='outlined'
              size='small'
              sx={{ width: "40%" }}
            />
            {loading ? (
              <CircularProgress
                color='inherit'
                size='50'
                sx={{
                  width: 50,
                  height: 50,
                }}
              />
            ) : (
              <IconButton
                onClick={handleFind}
                sx={{
                  backgroundColor: "#f0f0f0",
                  border: "2px solid #333",
                  borderRadius: "50%",
                  width: 50,
                  height: 50,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}>
                <Search sx={{ color: "#333", fontSize: 30 }} />
              </IconButton>
            )}
          </Box>
          <Box sx={{ width: "100%", height: "300px", overflowY: "auto" }}>
            <TableContainer
              component={Paper}
              elevation={3}
              sx={{ maxHeight: "100%" }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell
                      sx={{ fontWeight: "bold", backgroundColor: "#F5F5F5" }}>
                      Identificación
                    </TableCell>
                    <TableCell
                      sx={{ fontWeight: "bold", backgroundColor: "#F5F5F5" }}>
                      Nombre
                    </TableCell>
                    <TableCell
                      sx={{ fontWeight: "bold", backgroundColor: "#F5F5F5" }}>
                      Apellidos
                    </TableCell>
                    <TableCell
                      sx={{ fontWeight: "bold", backgroundColor: "#F5F5F5" }}>
                      Acciones
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {clientes.map((client) => (
                    <TableRow key={client.id}>
                      <TableCell>{client.identificacion}</TableCell>
                      <TableCell>{client.nombre}</TableCell>
                      <TableCell>{client.Apellidos}</TableCell>
                      <TableCell>
                        <IconButton
                          disableRipple
                          onClick={() => handleEditButton(client.id)}
                          sx={{ ":hover": { color: "inherit" } }}
                          size='small'>
                          <Edit />
                        </IconButton>
                        <IconButton
                          disableRipple
                          onClick={() => handleDeleteButton(client.id)}
                          sx={{ ":hover": { color: "error.main" } }}
                          size='small'>
                          <Delete />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
          {message && (
            <Snackbar
              open={open}
              message={message}
              onClose={handleCloseSnackbar}
              autoHideDuration={6000}
            />
          )}
        </Box>
      </Box>
    </>
  );
};

export default ClienteConsulta;