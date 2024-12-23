const env = {
  PRUEBA_TECNICA_BASE_URL: "https://pruebareactjs.test-class.com/Api/",

  LOGIN_URL: "api/Authenticate/login",
  REGISTER_URL: "api/Authenticate/register",

  LISTADO_CLIENTE_URL: "api/Cliente/Listado",
  CREAR_CLIENTE_URL: "api/Cliente/Crear",
  ACTUALIZAR_CLIENTE_URL: "api/Cliente/Actualizar",
  OBTENER_CLIENTE_URL: "api/Cliente/Obtener/",
  ELIMINAR_CLIENTE_URL: "api/Cliente/Eliminar/",

  INTERESES_LISTADO_URL: "api/Intereses/Listado",

  // Rutas de mi app

  LOGIN_ROUTE: "/",
  REGISTRO_ROUTE: "/registro",
  HOME_ROUTE: "/home",
  CLIENTES_ROUTE_BASE: "/clientes",
  CLIENTES_ROUTE_CREAR: "/crear",
  CLIENTES_ROUTE_EDITAR: "/editar",
  CLIENTES_ROUTE_BORRAR: "/borrar",
  ERROR_ROUTE: "*",
};

const config = {
  apiUrl: env.PRUEBA_TECNICA_BASE_URL,

  //Autenticate
  loginUrl: env.LOGIN_URL,
  registroUrl: env.REGISTER_URL,

  //Cliente
  clienteCrearUrl: env.CREAR_CLIENTE_URL,
  clienteActualizarUrl: env.ACTUALIZAR_CLIENTE_URL,
  clienteEliminarUrl: env.ELIMINAR_CLIENTE_URL,
  cienteObtenerUrl: env.OBTENER_CLIENTE_URL,
  clienteListadoUrl: env.LISTADO_CLIENTE_URL,

  //Interes Listado
  interesListadoUrl: env.INTERESES_LISTADO_URL,

  //Rutas mi app
  login: env.LOGIN_ROUTE,
  registro: env.REGISTRO_ROUTE,
  home: env.HOME_ROUTE,
  clientes: {
    listado: env.CLIENTES_ROUTE_BASE,
    crear: `${env.CLIENTES_ROUTE_BASE}${env.CLIENTES_ROUTE_CREAR}`,
    editar: `${env.CLIENTES_ROUTE_BASE}${env.CLIENTES_ROUTE_EDITAR}`,
    borrar: `${env.CLIENTES_ROUTE_BASE}${env.CLIENTES_ROUTE_BORRAR}`,
  },
  error: env.ERROR_ROUTE,
};

export default config;
