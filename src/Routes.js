import React from "react";
import {
  BrowserRouter,
  Route,
  Switch,
} from "react-router-dom";
import Movimentacoes from "./Movimentacoes";
import Home from "./pages/Home";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/movimentacoes/:dataMov" exact component={Movimentacoes} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
