import { Typography, Box } from "@mui/material";

import WarningAmberIcon from "@mui/icons-material/WarningAmber";

import Layout from "../layout/layout";

const Error404 = () => {
  return (
    <>
      <Layout />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          textAlign: "center",
          backgroundColor: "#f8f9fa",
          padding: 2,
        }}>
        <WarningAmberIcon sx={{ fontSize: 150, color: "#002855", mb: 2 }} />

        <Typography
          variant='h1'
          sx={{ fontSize: 120, fontWeight: "bold", color: "#002855", mb: 1 }}>
          404
        </Typography>

        {/* Mensaje */}
        <Typography variant='h6' sx={{ fontSize: 32, color: "#6c757d" }}>
          Oops... Page Not Found!
        </Typography>
      </Box>
    </>
  );
};

export default Error404;
