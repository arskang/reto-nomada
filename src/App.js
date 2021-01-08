import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// Componentes
import Identificador from './componentes/Identificador';
import Listado from './componentes/Listado';

export default function App() {
    return (
        <Router>
            <Switch>
                <Route path="/famoso">
                    <Listado />
                </Route>
                <Route path="/">
                    <Identificador />
                </Route>
            </Switch>
        </Router>
    );
}
