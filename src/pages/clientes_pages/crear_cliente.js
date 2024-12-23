import React, { useState, useRef, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
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
} from "@mui/material";
import {
  backgroundStyle,
  paperBoxStyle,
  appBarStyles,
} from "../../style/theme";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SaveIcon from "@mui/icons-material/Save";

import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import "dayjs/locale/es";
import "dayjs/plugin/customParseFormat";
import customParseFormat from "dayjs/plugin/customParseFormat";

import Layout from "../../layout/layout";
import { AuthContext } from "../../context/auth_context";
import { userCrear } from "../../models/user";
import { handleOnlyNumber, handleOnlyText } from "../../utils/only_one";
import config from "../../config";
import { save_LS } from "../../utils/local_storage";

import axios from "axios";

const urlListado = `${config.apiUrl}${config.interesListadoUrl}`;
const urlCrear = `${config.apiUrl}${config.clienteCrearUrl}`;

const ClientesCrear = () => {
  const { user } = useContext(AuthContext);
  const history = useHistory();
  dayjs.locale("es");
  dayjs.extend(customParseFormat);
  const [previewUrl, setPreviewUrl] = useState(null);
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState(userCrear);
  const [intereses, setIntereses] = useState([]);
  const [erros, setErros] = useState(null);
  const [open, setOpen] = useState(false);
  axios.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;

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
    formData.usuarioId = user.userid;

    const formToSend = JSON.parse(JSON.stringify(formData));

    formToSend.fNacimiento = formData.fNacimiento.toISOString();
    formToSend.fAfiliacion = formData.fAfiliacion.toISOString();

    try {
      const response = await axios.post(urlCrear, formToSend);

      if (response) {
        save_LS("message_to_show", "Cliente Creado Satisfactoriamente");

        history.push(config.clientes.listado);
      }
    } catch (error) {
      setErros(`${error.message}.Transaccion no realizada. Intente de nuevo`);
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

  useEffect(() => {
    if (erros) {
      setOpen(true);
    }
  }, [erros]);
  useEffect(() => {
    if (user.userid) {
      fetchData();
    }
  }, [user]);

  return (
    <>
      <Layout />

      <Box sx={backgroundStyle}>
        <Box sx={paperBoxStyle}>
          <form onSubmit={handleSubmit}>
            <AppBar position='static' color='transparent' elevation={0}>
              <Toolbar sx={appBarStyles.toolbar}>
                <IconButton
                  disableRipple
                  onClick={handleAvatarClick}
                  sx={appBarStyles.iconButton}>
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
                  Crear
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
                  inputProps={{ maxLength: 20 }}
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
                  inputProps={{ maxLength: 50 }}
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
                  inputProps={{ maxLength: 100 }}
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
                  value={formData.celular}
                  onInput={handleOnlyNumber}
                  inputProps={{ maxLength: 20 }}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  required
                  label='Teléfono Otro'
                  name='otroTelefono'
                  value={formData.otroTelefono}
                  onInput={handleOnlyNumber}
                  inputProps={{ maxLength: 20 }}
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
                    name='interesFK'
                    value={formData.interesFK}
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
                  inputProps={{ maxLength: 200 }}
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
                  value={formData.resennaPersonal}
                  inputProps={{ maxLength: 200 }}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={1}></Grid>
            </Grid>
          </form>
        </Box>
        {erros && (
          <Snackbar
            open={open}
            message={erros}
            onClose={handleCloseSnackbar}
            autoHideDuration={6000}
          />
        )}
      </Box>
    </>
  );
};

export default ClientesCrear;
