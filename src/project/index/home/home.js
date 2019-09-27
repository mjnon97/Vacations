import React, { Component } from 'react';
import './home.css';
import { Route, Link } from 'react-router-dom';
import $ from "jquery";
import axios from 'axios';
import Card from './card/card';
import socketIOClient from "socket.io-client";

class home extends Component {
    state = {
        // id account
        id: "",
        // all vacation
        vacation: [],
        // My Vacation
        MyVacation: [],
        userVacation: [],
        pero: [],
        MyTest: [],
        AllPrice: 0,
        endpoint: "localhost:5000",
        infouser: "",
    }
    componentDidMount() {
        // find if cokie
        axios.get(`http://localhost:5000/findthesession`, { withCredentials: true })
            .then(response => {
                var idCoke = response.data;
                console.log(idCoke, "idCoke");
                var idFOK = this.props.match.params.id;
                console.log(idFOK, "IDFOK");

                if (idCoke == undefined || idCoke == 0) { console.log(false); window.location.href = '/'; }
                else if (idCoke == idFOK) {
                    this.setState({ id: idCoke });
                    this.getAllVacation();
                    this.MyVacation();
                    this.userVacations();

                } else {
                    console.log(false); window.location.href = '/home/' + idCoke;
                }
            })

    }

    // get all users vacation
    userVacations = () => {
        axios.get(`http://localhost:5000/findthesession`, { withCredentials: true })
            .then(response => {
                this.setState({ userVacation: response.data });

            })
        axios.get(`http://localhost:5000/infouser?id=${this.state.id}`, { withCredentials: true })
            .then(response => {
                this.setState({ infouser: response.data });
                console.log(response.data)
            })
    }
    // get My Vacation
    MyVacation = () => {
        axios.get(`http://localhost:5000/MyVacation?id=${this.state.id}`, { withCredentials: true })
            .then(response => {
                this.setState({ MyVacation: response.data });
                console.log(response.data, " ss")
            })

    }
    // get all vacation
    getAllVacation = () => {
        axios.get(`http://localhost:5000/vacation`, { withCredentials: true })
            .then(response => {
                this.setState({ vacation: response.data });
                console.log(this.state.vacation);
            })

    }
    // print all vacation
    printAllVacation = () => {
        let arr = [];
        var vacation = this.state.vacation;
        var MyVacation = this.state.MyVacation;
        console.log(MyVacation, "MyVacation")
        let x = 0;
        for (let i of vacation) {
            x = 0;
            for (let k of MyVacation) {
                if (k.id == i.id)
                    x++;
                console.log("x", x);
            }
            if (x == 0)
                arr.push(<Card obg={i} stateOn={false} clickFollow={this.clickFollow}></Card>);
            else
                arr.push(<Card obg={i} stateOn={true} clickFollow={this.clickFollow}></Card>);
        }
        return arr;
        // arr.push(<Card i={i} ch={true} clickFollow={this.clickFollow} id={vacation[i].id} key={vacation[i].id} location={vacation[i].location} end_date={vacation[i].end_date} start_date={vacation[i].start_date} hotel={vacation[i].hotel} price={vacation[i].price} imge={vacation[i].imge} />);
    }
    //click Follow
    clickFollow = (id, i) => {
        axios.get('http://localhost:5000/CheckVaction?id=' + this.props.match.params.id + '&idvacation=' + id)
            .then(response => {
                this.setState({ MyTest: response.data });
                //--if follow Not exist Add to table-------------------------->
                if (response.data.length === 0) {
                    axios.get('http://localhost:5000/AddFollow?iduser=' + this.props.match.params.id + '&idvacation=' + id + '&location=' + i)
                        .then(response => {
                        })
                        .catch(error => {
                            console.log("error: ", error);
                        })
                }
                //--if exist delete from table----------------------->
                else {
                    axios.get('http://localhost:5000/deletFollow?id=' + this.props.match.params.id + '&idvacation=' + id)
                        .then(response => {
                        })
                        .catch(error => {
                            console.log("error: ", error);
                        })
                }
                //-------Call Again------------------------------->>
                axios.get(`http://localhost:5000/MyVacation?id=${this.state.id}`, { withCredentials: true })
                    .then(response => {
                        var num = 0;
                        for (let i = 0; i < response.data.length; i++) {
                            num += response.data[i].price;
                            console.log(num, " num")

                        }
                        console.log(response.data, num, " ss")
                        this.setState({ AllPrice: num });

                        this.setState({ MyVacation: response.data });

                    })
                    .catch(error => {
                        console.log("error: ", error);
                    })
            })
            .catch(error => {
                console.log("error: ", error);
            })

    }
    // Log Out and remove a cokie
    LogOut = () => {
        axios.get(`http://localhost:5000/removeCookie`, { withCredentials: true })
            .then(response => {
                window.location.href = '/';
            })
    }
    render() {

        return (
            <div className="container">
                <div className="row car">
                    <div class="col-md-3">
                        <div class="card-counter primary">
                            <i class="fa fa-code-fork"></i>
                            <span class="count-numbers">{this.state.MyVacation.length}</span>
                            <span class="count-name">Flowz</span>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="card-counter success">
                            <i className="fa fa-database"></i>
                            <span className="count-numbers">{this.state.AllPrice}$</span>
                            <span className="count-name">All Price</span>
                        </div>
                    </div>
                    <div class="col-md-3" onClick={this.LogOut}>
                        <div class="card-counter danger">
                            <i class="fa fa-ticket"></i>
                            <span class="count-numbers"></span>
                            <span class="count-name">Log Out</span>
                        </div>
                    </div>
                </div>
                <section className="section-tours">
                    <div className=" text-center  u-margin-bottom-medium">
                        <br />  <br />  <h2 className="heading-secondary">
                            Most Popular Tours</h2>
                        <br /><br />


                    </div>
                    <div className="row">
                        {this.printAllVacation()}
                    </div>
                    <div className="text-center u-margin-top-big">
                        <a href="#0" className="btn btn--blue">Discover All Tour</a>
                    </div>
                </section>
            </div>



        );
    }
}


export default home;
