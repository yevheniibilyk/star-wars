import React from 'react';
import './styles/_app.scss';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Header from "./Header";
import HeroesList from "../HeroesList";

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <Switch>
          <Route exact path="/" component={HeroesList} />
          <Route path="/hero" />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
