import React, { useContext, useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { AuthContext } from "../../context/auth_context";
import axios from "axios";
import {
  Button,
  TextField,
  Box,
  Typography,
  Snackbar,
  IconButton,
} from "@mui/material";

import AccountCircle from "@mui/icons-material/AccountCircle";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import InputAdornment from "@mui/material/InputAdornment";
import CircularProgress from "@mui/material/CircularProgress";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import FormControlLabel from "@mui/material/FormControlLabel";

import config from "../../config";
import {
  delete_LS,
  read_LS,
  save_LS,
  save_object_LS,
} from "../../utils/local_storage";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: read_LS("usuario_recordar") || "",
    password: "",
  });
  const [error, setError] = useState({});
  const [message, setMessage] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [visibility, setVisibility] = useState(false);

  const [open, setOpen] = useState(false);
  const { login } = useContext(AuthContext);
  const history = useHistory();

  const handlecheckValue = () => {
    let valor;
    if (read_LS("check_choice") === "true") {
      valor = true;
    } else {
      valor = false;
    }
    return valor;
  };
  const [check, setCheck] = useState(handlecheckValue);

  const handleVisibility = () => {
    setVisibility(!visibility);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!credentials.username) {
      newErrors.username = "El nombre de usuario es obligatorio.";
    }
    if (!credentials.password) {
      newErrors.password = "La contraseña es obligatoria.";
    }

    setError(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCheck = (e) => {
    const isCheck = e.target.checked;

    if (isCheck) {
      setCheck(true);
    } else {
      setCheck(false);
    }
  };
  const handleCloseSnackbar = () => {
    setOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setCargando(true);
      const url = `${config.apiUrl}${config.loginUrl}`;
      const response = await axios.post(url, credentials);
      if (check) {
        save_LS("usuario_recordar", credentials.username);
        save_LS("check_choice", check);
      } else {
        delete_LS("usuario_recordar");
        delete_LS("check_choice");
      }
      login(response.data);
      history.push(config.home);
    } catch (error) {
      if (error.response && error.response.data.title === "Unauthorized") {
        setMessage("Usuario o contraseña incorrectos.");
        setOpen(true);
        setCargando(false);
      } else {
        setMessage(
          `${error.message}: Transaccion no realizada. Intenta de nuevo. `
        );
        setOpen(true);
        setCargando(false);
      }
    }
  };
  useEffect(() => {
    setMessage(read_LS("message_to_show"));
    if (message) {
      setOpen(true);
      delete_LS("message_to_show");
    }
  }, [message]);
  useEffect(() => {
    delete_LS("user_data");
  });

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
          Iniciar Sesión
        </Typography>
      </Box>
      <form onSubmit={handleSubmit}>
        <TextField
          label='Usuario'
          fullWidth
          margin='normal'
          value={credentials.username}
          error={!!error.username}
          helperText={error.username}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <AccountCircle />
              </InputAdornment>
            ),
          }}
          onChange={(e) =>
            setCredentials({ ...credentials, username: e.target.value })
          }
        />
        <TextField
          label='Contraseña'
          type={visibility ? "" : "password"}
          fullWidth
          margin='normal'
          value={credentials.password}
          error={!!error.password}
          helperText={error.password}
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton onClick={handleVisibility} edge='end'>
                  {visibility ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          onChange={(e) =>
            setCredentials({ ...credentials, password: e.target.value })
          }
        />
        <FormControlLabel
          control={
            <Checkbox color='info' onChange={handleCheck} checked={check} />
          }
          label='Recuérdame'
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
              type='submit'
              color='info'
              variant='contained'
              fullWidth
              sx={{ mt: 2 }}>
              Iniciar sesión
            </Button>
          )}
        </Box>
        <Box
          sx={{
            marginTop: "5px",
            marginBottom: "-5px",
          }}>
          <Link href={config.registro} underline='hover'>
            {"¿No tienes cuenta? Registrarse"}
          </Link>
        </Box>
      </form>
      {message && (
        <Snackbar
          open={open}
          message={message}
          onClose={handleCloseSnackbar}
          autoHideDuration={4000}
        />
      )}
    </Box>
  );
};

export default Login;
