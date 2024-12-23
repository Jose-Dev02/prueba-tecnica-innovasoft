import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Snackbar,
  InputAdornment,
  IconButton,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import config from "../../config";
import { useHistory } from "react-router-dom";

import Email from "@mui/icons-material/Email";
import AccountCircle from "@mui/icons-material/AccountCircle";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { save_LS } from "../../utils/local_storage";

const Registro = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [visibility, setVisibility] = useState(false);
  const [cargando, setCargando] = useState(false);
  const history = useHistory();

  const handleVisibility = () => {
    setVisibility(!visibility);
  };

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d!@#$%^&*(),.?":{}|<>]{9,20}$/;

    if (!formData.username) {
      newErrors.username = "El nombre de usuario es obligatorio";
    }
    if (!formData.email) {
      newErrors.email = "El correo electrónico es obligatorio";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Debe ingresar un correo válido";
    }
    if (!formData.password) {
      newErrors.password = "La contraseña es obligatoria";
    } else if (!passwordRegex.test(formData.password)) {
      newErrors.password =
        "La contraseña debe tener mas de 8 y menos 20 caracteres, incluir al menos una mayúscula, una minúscula y un número.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setCargando(true);
      const url = `${config.apiUrl}${config.registroUrl}`;

      const response = await axios.post(url, formData);
      if (response.data.status === "Success") {
        setCargando(false);
        save_LS("message_to_show", "Usuario registrado con éxito.");
        setSuccess(true);
        history.push(config.login);
      }
    } catch (error) {
      setCargando(false);
      if (error.response && error.response.data.message) {
        setMessage(error.response.data.message);
      } else {
        setMessage(
          `${error.message}.Transaccion no realizada. Intenta nuevamente.`
        );
      }
      setSuccess(false);
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 400,
        mx: "auto",
        mt: 15,
        p: 3,
        border: "1px solid #ccc",
        borderRadius: 2,
      }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}>
        <Typography variant='h4' mb={2}>
          Registro
        </Typography>
      </Box>
      <form onSubmit={handleSubmit}>
        <TextField
          label='Usuario*'
          fullWidth
          margin='normal'
          value={formData.username}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <AccountCircle />
              </InputAdornment>
            ),
          }}
          onChange={(e) =>
            setFormData({ ...formData, username: e.target.value })
          }
          error={!!errors.username}
          helperText={errors.username}
        />
        <TextField
          label='Correo Electrónico*'
          fullWidth
          margin='normal'
          value={formData.email}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <Email />
              </InputAdornment>
            ),
          }}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          error={!!errors.email}
          helperText={errors.email}
        />
        <TextField
          label='Contraseña*'
          type={visibility ? "" : "password"}
          fullWidth
          margin='normal'
          value={formData.password}
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton onClick={handleVisibility}>
                  {visibility ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          error={!!errors.password}
          helperText={errors.password}
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "8px",
            minHeight: "52.5px",
          }}>
          {cargando ? (
            <CircularProgress />
          ) : (
            <Button
              color='info'
              type='submit'
              variant='contained'
              fullWidth
              sx={{ mt: 2 }}>
              Registrarse
            </Button>
          )}
        </Box>
      </form>
      <Snackbar
        open={!!message}
        onClose={() => setMessage("")}
        message={message}
        autoHideDuration={6000}
        severity={success ? "success" : "error"}
      />
    </Box>
  );
};

export default Registro;
