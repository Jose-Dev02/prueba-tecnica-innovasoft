import React, { useState, useRef, useContext, useEffect } from "react";
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
  IconButton,
  Input,
  Snackbar,
  CircularProgress,
} from "@mui/material";
import {
  backgroundStyle,
  paperBoxStyle,
  appBarStyles,
} from "../../style/theme";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SaveIcon from "@mui/icons-material/Save";
import { Refresh } from "@mui/icons-material";

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
import { handleOnlyNumber, handleOnlyText } from "../../utils/only_one";
import config from "../../config";
import { save_LS } from "../../utils/local_storage";

import axios from "axios";

const urlListado = `${config.apiUrl}${config.interesListadoUrl}`;

const ClientesEditar = () => {
  dayjs.locale("es");
  dayjs.extend(customParseFormat);
  const [previewUrl, setPreviewUrl] = useState(null);
  const history = useHistory();
  const fileInputRef = useRef(null);
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState(userEditar);
  const [intereses, setIntereses] = useState([]);
  const [errores, setErros] = useState(false);
  const [message, setMessage] = useState(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const { id } = useParams();
  const urlGetClientById = `${config.apiUrl}${config.cienteObtenerUrl}${id}`;
  const urlEditar = `${config.apiUrl}${config.clienteActualizarUrl}`;
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

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  const handleFechas = (e, property) => {
    property = e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formToSend = {
      id: formData.id,
      nombre: formData.nombre,
      apellidos: formData.apellidos,
      identificacion: formData.identificacion,
      celular: formData.telefonoCelular,
      otroTelefono: formData.otroTelefono,
      direccion: formData.direccion,
      fNacimiento: formData.fNacimiento.toISOString(),
      fAfiliacion: formData.fAfiliacion.toISOString(),
      sexo: formData.sexo,
      resennaPersonal: formData.resenaPersonal,
      imagen: formData.imagen,
      interesFK: formData.interesesId,
      usuarioId: formData.id,
    };

    try {
      setLoading(true);
      const response = await axios.post(urlEditar, formToSend);

      if (response) {
        save_LS("message_to_show", "Cliente Actualizado Satisfactoriamente");
        setLoading(false);
        history.push(config.clientes.listado);
      }
    } catch (error) {
      setMessage(`${error.message}.Transaccion no realizada. Intente de nuevo`);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setFormData({ ...formData, imagen: reader.result });
        setPreviewUrl(reader.result);
      };
    }
  };
  const handleAvatarClick = () => {
    fileInputRef.current.click();
  };
  const handleCloseSnackbar = () => {
    setOpen(false);
  };
  const handleBackButton = () => {
    history.push(config.clientes.listado);
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
          <form onSubmit={handleSubmit}>
            <AppBar position='static' color='transparent' elevation={0}>
              <Toolbar sx={appBarStyles.toolbar}>
                <IconButton disableRipple onClick={handleAvatarClick}>
                  <Avatar
                    alt='Remy Sharp'
                    src={previewUrl ? previewUrl : ""}
                    sx={appBarStyles.avatar}
                  />
                  <Input
                    sx={{ display: "none" }}
                    accept='image/*'
                    type='file'
                    inputRef={fileInputRef}
                    onChange={handleImageChange}
                  />
                </IconButton>
                <Typography variant='h6' sx={appBarStyles.typography}>
                  Mantenimiento de clientes
                </Typography>
                <Button
                  variant='contained'
                  type='submit'
                  color='inherit'
                  startIcon={<SaveIcon />}
                  sx={appBarStyles.button}>
                  Guardar
                </Button>
                <Button
                  onClick={handleBackButton}
                  variant='contained'
                  color='inherit'
                  startIcon={<ArrowBackIcon />}
                  sx={appBarStyles.backButton}>
                  Regresar
                </Button>
              </Toolbar>
            </AppBar>
            <Divider sx={{ width: "100%", mb: 2 }} />
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  required
                  label='Identificación'
                  name='identificacion'
                  value={formData.identificacion}
                  onInput={handleOnlyNumber}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  required
                  onInput={handleOnlyText}
                  label='Nombre'
                  name='nombre'
                  value={formData.nombre}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  required
                  label='Apellidos'
                  name='apellidos'
                  value={formData.apellidos}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormControl fullWidth>
                  <InputLabel id='genero-label'>Género*</InputLabel>
                  <Select
                    labelId='genero-label'
                    required
                    label='Género*'
                    name='sexo'
                    value={formData.sexo}
                    onChange={handleChange}>
                    <MenuItem value='F'>Femenino</MenuItem>
                    <MenuItem value='M'>Masculino</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={4}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    sx={{ width: "100%" }}
                    label='Fecha de nacimiento*'
                    name='fechaNacimiento'
                    value={dayjs(formData.fNacimiento)}
                    onChange={(e) => handleFechas(e, formData.fNacimiento)}
                    minDate={dayjs("1950-01-01")}
                    maxDate={dayjs()}
                    format='DD/MM/YYYY'
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} sm={4}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    sx={{ width: "100%" }}
                    label='Fecha de afiliación'
                    name='fechaAfiliacion'
                    value={formData.fAfiliacion}
                    onChange={(e) => handleFechas(e, formData.fAfiliacion)}
                    minDate={dayjs("1950-01-01")}
                    maxDate={dayjs()}
                    format='DD/MM/YYYY'
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  required
                  label='Teléfono Celular'
                  name='celular'
                  value={formData.telefonoCelular}
                  onInput={handleOnlyNumber}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  required
                  label='Teléfono Otro'
                  name='otroTelefono'
                  onInput={handleOnlyNumber}
                  value={formData.otroTelefono}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormControl fullWidth>
                  <InputLabel id='intereses-label'>Intereses*</InputLabel>
                  <Select
                    labelId='intereses-label'
                    label='Intereses*'
                    required
                    name='interesesId'
                    value={formData.interesesId}
                    onChange={handleChange}>
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
                  required
                  label='Dirección'
                  name='direccion'
                  value={formData.direccion}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required
                  label='Reseña'
                  name='resennaPersonal'
                  multiline
                  value={formData.resenaPersonal}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={1}></Grid>
            </Grid>
          </form>
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

export default ClientesEditar;
