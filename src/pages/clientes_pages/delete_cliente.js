import React, { useState, useContext, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Grid,
  Typography,
  Box,
  AppBar,
  Toolbar,
  Avatar,
  Divider,
  Snackbar,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

import { backgroundStyle, paperBoxStyle } from "../../style/theme";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Delete, Refresh } from "@mui/icons-material";

import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import "dayjs/locale/es";
import "dayjs/plugin/customParseFormat";
import customParseFormat from "dayjs/plugin/customParseFormat";

import Layout from "../../layout/layout";
import { AuthContext } from "../../context/auth_context";
import { userEditar } from "../../models/user";

import config from "../../config";
import { save_LS } from "../../utils/local_storage";

import axios from "axios";

const urlListado = `${config.apiUrl}${config.interesListadoUrl}`;

const ClientesBorrar = () => {
  dayjs.locale("es");
  dayjs.extend(customParseFormat);
  const [previewUrl, setPreviewUrl] = useState(null);
  const history = useHistory();
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState(userEditar);
  const [intereses, setIntereses] = useState([]);
  const [errores, setErros] = useState(false);
  const [message, setMessage] = useState(null);
  const [open, setOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(true);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const { id } = useParams();
  const urlGetClientById = `${config.apiUrl}${config.cienteObtenerUrl}${id}`;
  const urlBorrar = `${config.apiUrl}${config.clienteEliminarUrl}${id}`;
  axios.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;

  const fetchClientData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(urlGetClientById);
      if (response && response.data) {
        const copydata = JSON.parse(JSON.stringify(response.data));
        copydata.fNacimiento = dayjs(copydata.fNacimiento);
        copydata.fAfiliacion = dayjs(copydata.fAfiliacion);
        setFormData(copydata);
        setPreviewUrl(copydata.imagen);

        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      setErros(true);
      setMessage(`${error.message}. Transaccion no realizada intente de nuevo`);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(urlListado);
      if (response.data.length > 0) {
        setIntereses(response.data);
      }
    } catch (error) {}
  };
  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const handleCloseSnackbar = () => {
    setOpen(false);
  };
  const handleBackButton = () => {
    history.push(config.clientes.listado);
  };

  const handleDeleteButton = async () => {
    setOpenDialog(false);
    setMessage("");
    try {
      setLoading(true);
      const response = await axios.delete(urlBorrar);
      if (response) {
        save_LS(
          "message_to_show",
          `Usuario ${formData.nombre} ${formData.apellidos} eliminado correctamente.`
        );
        setLoading(false);
        history.push(config.clientes.listado);
      }
    } catch (error) {
      setLoading(false);
      setMessage(
        `${error.message}. Transaccion no realizada.Intente de nuevo.`
      );
    }
  };

  const handleRefresh = () => {
    window.location.reload(true);
  };

  useEffect(() => {
    if (message) {
      setOpen(true);
    }
  }, [message]);
  useEffect(() => {
    if (user.userid) {
      fetchData();
      fetchClientData();
    }
  }, [user]);
  if (errores) {
    return (
      <>
        <Layout />
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}>
          <Button
            variant='contained'
            color='inherit'
            onClick={handleRefresh}
            startIcon={<Refresh />}>
            Refrescar
          </Button>
        </Box>
      </>
    );
  }
  if (loading) {
    return (
      <>
        <Layout />
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}>
          <CircularProgress color='inherit' />
        </Box>
      </>
    );
  }

  return (
    <>
      <Layout />

      <Box sx={backgroundStyle}>
        <Box sx={paperBoxStyle}>
          <AppBar position='static' color='transparent' elevation={0}>
            <Toolbar>
              <Avatar
                alt='Remy Sharp'
                src={previewUrl ? previewUrl : ""}
                sx={{ color: "inherit", width: 60, height: 60, m: 2 }}
              />
              <Typography variant='h6' sx={{ flexGrow: 1, marginLeft: 1 }}>
                Mantenimiento de clientes
              </Typography>
              <Button
                variant='contained'
                onClick={handleClickOpen}
                color='error'
                startIcon={<Delete />}>
                Eliminar
              </Button>
              <Button
                onClick={handleBackButton}
                variant='contained'
                color='inherit'
                startIcon={<ArrowBackIcon />}
                sx={{ marginLeft: 1 }}>
                Regresar
              </Button>
            </Toolbar>
          </AppBar>
          <Divider sx={{ width: "100%", mb: 2 }} />
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                InputProps={{ readOnly: true }}
                label='Identificación'
                name='identificacion'
                value={formData.identificacion}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label='Nombre'
                name='nombre'
                value={formData.nombre}
                InputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label='Apellidos'
                name='apellidos'
                value={formData.apellidos}
                InputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <InputLabel id='genero-label'>Género*</InputLabel>
                <Select
                  labelId='genero-label'
                  readOnly
                  label='Género*'
                  name='sexo'
                  value={formData.sexo}>
                  <MenuItem value='F'>Femenino</MenuItem>
                  <MenuItem value='M'>Masculino</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  sx={{ width: "100%" }}
                  readOnly
                  label='Fecha de nacimiento*'
                  name='fechaNacimiento'
                  value={dayjs(formData.fNacimiento)}
                  format='DD/MM/YYYY'
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} sm={4}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  sx={{ width: "100%" }}
                  readOnly
                  label='Fecha de afiliación'
                  name='fechaAfiliacion'
                  value={formData.fAfiliacion}
                  format='DD/MM/YYYY'
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                InputProps={{ readOnly: true }}
                label='Teléfono Celular'
                name='celular'
                value={formData.telefonoCelular}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                InputProps={{ readOnly: true }}
                label='Teléfono Otro'
                name='otroTelefono'
                value={formData.otroTelefono}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <InputLabel id='intereses-label'>Intereses*</InputLabel>
                <Select
                  labelId='intereses-label'
                  label='Intereses*'
                  readOnly
                  name='interesesId'
                  value={formData.interesesId}>
                  {intereses.length > 0 ? (
                    intereses.map((item, key) => {
                      return (
                        <MenuItem key={key} value={item.id}>
                          {item.descripcion}
                        </MenuItem>
                      );
                    })
                  ) : (
                    <MenuItem> No Hay Intereses</MenuItem>
                  )}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                InputProps={{ readOnly: true }}
                label='Dirección'
                name='direccion'
                value={formData.direccion}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                InputProps={{ readOnly: true }}
                label='Reseña'
                name='resennaPersonal'
                multiline
                value={formData.resenaPersonal}
              />
            </Grid>
            <Grid item xs={12} sm={1}></Grid>
          </Grid>
          <Dialog
            fullScreen={fullScreen}
            open={openDialog}
            onClose={handleCloseDialog}>
            <DialogTitle>{"ALERTA"}</DialogTitle>
            <DialogContent>
              <DialogContentText>¿Desea eliminar al cliente?</DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button color='inherit' autoFocus onClick={handleCloseDialog}>
                Cancelar
              </Button>
              <Button
                color='error'
                onClick={handleDeleteButton}
                sx={{ "&:hover": { backgroundColor: "red", color: "white" } }}
                autoFocus>
                Aceptar
              </Button>
            </DialogActions>
          </Dialog>
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
    </>
  );
};

export default ClientesBorrar;
