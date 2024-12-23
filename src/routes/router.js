import React, { useContext } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import Login from "../pages/autenticacion_pages/login";
import Registro from "../pages/autenticacion_pages/registro";
import Home from "../pages/home";
import ClientesConsulta from "../pages/clientes_pages/consulta_cliente";
import Error404 from "../pages/error404";
import ClientesCrear from "../pages/clientes_pages/crear_cliente";

import config from "../config";
import ClientesEditar from "../pages/clientes_pages/editar_cliente";
import ClientesBorrar from "../pages/clientes_pages/delete_cliente";
import ProtectedRoute from "../components/ProtectedRoute";
import { AuthContext } from "../context/auth_context";
const Routes = () => {
  const { user } = useContext(AuthContext);
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={config.login}>
          {user ? <Redirect to={config.home} /> : <Login />}
        </Route>
        <Route exact path={config.registro} component={Registro} />
        <ProtectedRoute exact path={config.home} component={Home} />
        <ProtectedRoute
          exact
          path={config.clientes.listado}
          component={ClientesConsulta}
        />
        <ProtectedRoute
          exact
          path={config.clientes.crear}
          component={ClientesCrear}
        />
        <ProtectedRoute
          exact
          path={`${config.clientes.editar}/:id`}
          component={ClientesEditar}
        />
        <ProtectedRoute
          exact
          path={`${config.clientes.borrar}/:id`}
          component={ClientesBorrar}
        />
        <ProtectedRoute exact path={config.error} component={Error404} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
