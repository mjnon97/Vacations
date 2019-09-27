import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import axios from 'axios';
import './project.css';
import Index from './index/index';
import Home from './index/home/home';
import Admin from './index/admin/admin';
class Employees extends Component {

    state = {}


    render() {

        return (
            <div className="row">
                <div>

                </div>
                <Route path="/" exact component={Index} />
                <Route path="/home/:id" exact component={Home} />
                <Route path="/admin/:id" exact component={Admin} />

            </div>
        );
    }
}

export default Employees;