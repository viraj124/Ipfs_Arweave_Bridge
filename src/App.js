import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
import Data from './components/data.component'
import Bridge from './components/uploadata.component';
import Navabar from './components/navbar.component'


class App extends Component {


  render() {
    return (
        <Router>
        <Navabar />
         <Switch>
          <Route path="/" exact component={Bridge} />
          <Route path="/data" component={Data} />
        </Switch>
    </Router>
           );
  }
}

export default App;
