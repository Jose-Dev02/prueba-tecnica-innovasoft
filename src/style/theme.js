export const backgroundStyle = {
  backgroundColor: "#f0f0f0",
  minHeight: "100vh",
  width: "100vw",
  display: "flex",
  justifyContent: "center",
  alignItems: "start",
};

export const paperBoxStyle = {
  backgroundColor: "white",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  borderRadius: "4px",
  padding: "16px",
  minHeight: "70%",
  minWidth: "80%",
  maxHeight: "70%",
  maxWidth: "80%",
  marginTop: "80px",
  marginLeft: "17px",
};

export const appBarStyles = {
  toolbar: { flexDirection: { xs: "column", sm: "row" }, alignItems: "center" },
  iconButton: { margin: { xs: 1, sm: 2 } },
  avatar: {
    color: "inherit",
    width: { xs: 40, sm: 60 },
    height: { xs: 40, sm: 60 },
  },
  typography: {
    flexGrow: 1,
    marginLeft: { xs: 0, sm: 1 },
    fontSize: { xs: "1rem", sm: "1.25rem" },
    textAlign: { xs: "center", sm: "left" },
    marginBottom: { xs: 1, sm: 0 },
  },
  button: {
    width: { xs: "100%", sm: "auto" },
    marginTop: { xs: 1, sm: 0 },
    display: "flex",
    justifyContent: "center",
  },
  backButton: {
    marginLeft: { sm: 1 },
    width: { xs: "100%", sm: "auto" },
    marginTop: { xs: 1, sm: 0 },
    display: "flex",
    justifyContent: "center",
  },
};

export const boxStyles = {
  container: {
    mt: 5,
    mx: { xs: 2, md: 20 },
    display: "flex",
    flexDirection: { xs: "column", md: "row" },
    gap: 2,
    alignItems: "center",
    mb: 2,
  },
  textField: {
    width: { xs: "100%", md: "40%" },
  },
  iconButton: {
    backgroundColor: "#f0f0f0",
    border: "2px solid #333",
    borderRadius: "50%",
    width: 50,
    height: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  tableContainer: {
    width: "100%",
    height: "300px",
    overflowY: "auto",
  },
  tableCellHeader: {
    fontWeight: "bold",
    backgroundColor: "#F5F5F5",
  },
  iconButtonSmall: {
    ":hover": { color: "inherit" },
    size: "small",
  },
  deleteButtonSmall: {
    ":hover": { color: "error.main" },
    size: "small",
  },
};

export const loginBoxStyles = {
  container: {
    maxWidth: { xs: 300, sm: 400 },
    mx: "auto",
    mt: 15,
    p: { xs: 2, sm: 3 },
    border: "1px solid #ccc",
    borderRadius: 2,
  },
  titleBox: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  title: {
    variant: "h4",
    mb: 2,
    textAlign: "center",
  },
  formControlLabel: {
    display: "block",
    textAlign: "center",
  },
  submitBox: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "8px",
    minHeight: "52.5px",
  },
  linkBox: {
    marginTop: "5px",
    marginBottom: "-5px",
    textAlign: "center",
  },
};

export const registerBoxStyles = {
  container: {
    maxWidth: { xs: 300, sm: 400 },
    mx: "auto",
    mt: 15,
    p: { xs: 2, sm: 3 },
    border: "1px solid #ccc",
    borderRadius: 2,
  },
  titleBox: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    variant: "h4",
    mb: 2,
    textAlign: "center",
  },
  submitBox: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "8px",
    minHeight: "52.5px",
  },
};

export const dialogStyles = {
  dialog: {
    maxWidth: "md",
    width: "70%",
    margin: "auto",
  },
  dialogTitle: {
    fontSize: "1.5rem",
    fontWeight: "bold",
  },
  dialogContent: {
    fontSize: "1rem",
  },
  dialogActions: {
    display: "flex",
    justifyContent: "space-between",
    padding: "8px 24px",
  },
  cancelButton: {
    color: "inherit",
    "&:hover": {
      backgroundColor: "#e0e0e0",
    },
  },
  acceptButton: {
    color: "#f44336",
    "&:hover": {
      backgroundColor: "#d32f2f",
      color: "white",
    },
  },
};
