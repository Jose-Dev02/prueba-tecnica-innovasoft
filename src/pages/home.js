import { Typography, Box } from "@mui/material";
import Layout from "../layout/layout";

const Home = () => {
  return (
    <>
      <Layout />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          textAlign: "center",
        }}>
        <Typography variant='h2' sx={{ fontWeight: "bold" }}>
          Bienvenido
        </Typography>
      </Box>
    </>
  );
};

export default Home;
