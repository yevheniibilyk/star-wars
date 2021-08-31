import React from 'react';
import { Provider } from 'react-redux';
import './styles/_app.scss';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import store from '../../store';
import Header from './Header';
import HeroesList from '../HeroesList';
import Hero from '../Hero';
import background from '../../images/space.jpg';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div
          className="app"
          style={{ backgroundImage: `url(${background})` }}
        >
          <Header />
          <Switch>
            <Route exact path="/" component={HeroesList} />
            <Route path="/hero/:id" component={Hero} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
