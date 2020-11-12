import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Dashboard from "./Components/Dashboard";
import Detail from "./Components/Deatil";
export default class App extends React.Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route exact path="/detail/:id" component={Detail} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
