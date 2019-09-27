import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom'
import { Route, link } from 'react-router-dom'
import axios from 'axios';
import './App.css';
import Project from './project/project'

class App extends Component {
  state = {
  };



  render() {
    return (
      <BrowserRouter>
        <div className="App mt-5">
          <Project />
        </div>
      </BrowserRouter>
    );
  }

}

export default App;
