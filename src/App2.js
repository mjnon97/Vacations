import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import MyComp from'./Components/Comp1'
import Table from'./Components/Table'

class App extends Component {


  state={
    Color1:'red',
    Color:'black',
    Color2:'yellow',
  };
  render() 
  {
    return (
      <div className="row">
           <MyComp>
               
           </MyComp>
      </div>
    );
  }
 
}

export default App;
