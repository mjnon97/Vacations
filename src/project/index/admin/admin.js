import React, { Component } from 'react';
import './admin.css';
import { Route, Link } from 'react-router-dom';
import $ from "jquery";
import axios from 'axios';
import Card from './card/card';
import UpdateVacation from './UpdateVacation/UpdateVacation';
import AddVacation from './Addvacation/Addvacation';
import Graf from './Graf/Graf';
import { timingSafeEqual } from 'crypto';
class admin extends Component {
    state = {
        // id account
        id: "",
        // all vacation
        vacation: [],
        showUpdate: false,
        showAdd: false,
        showGraf: false,
        GrafhPrint: [],
        GrafhPrint2: [],
        data1: [],
        // all change in on change
        LOCATION: "",
        PRICE: "",
        IMGE: "",
        START_DATE: "",
        END_DATE: "",
        HOTEL: "",

    }
    componentDidMount() {
        // find if cokie
        axios.get(`http://localhost:5000/findthesession`, { withCredentials: true })
            .then(response => {
                var idCoke = response.data;
                console.log(idCoke, "idCoke");
                var idFOK = this.props.match.params.id;
                console.log(idFOK, "IDFOK");
                if (idCoke == undefined || idCoke == 0 || idFOK >= 2) { console.log(false); window.location.href = '/'; }
                else if (idCoke == 1) {
                    this.setState({ id: idCoke });
                    this.getAllVacation();
                    this.getGrafh();
                }
            })
    }
    // get all vacation
    getAllVacation = () => {
        axios.get(`http://localhost:5000/vacation`, { withCredentials: true })
            .then(response => {
                this.setState({ vacation: response.data });
            })
    }
    // print all vacation
    printAllVacation = () => {
        var arr = []; var vacation = this.state.vacation; for (let i = 0; i < vacation.length; i++) {
            arr.push(<Card showUpdate={this.showUpdate} i={i} Delete={this.Delete} id={vacation[i].id} key={vacation[i].id} location={vacation[i].location} end_date={vacation[i].end_date} start_date={vacation[i].start_date} hotel={vacation[i].hotel} price={vacation[i].price} imge={vacation[i].imge} />);
        }
        return arr;
    }
    // Log Out
    LogOut = () => {
        axios.get(`http://localhost:5000/removeCookie`, { withCredentials: true })
            .then(response => {
                window.location.href = '/';
            })
    }
    // Add showAdd
    showVacation = () => {
        this.setState({ showAdd: true })
    }
    // Add closeAdd
    closeAdd = () => {
        this.setState({ showAdd: false });
        this.setState({ LOCATION: "" });
        this.setState({ PRICE: "" });
        this.setState({ IMGE: "" });
        this.setState({ START_DATE: "" });
        this.setState({ END_DATE: "" });
    }
    // change this in state
    handleChange = (event) => {
        console.log("--------------"); console.log(event.target.id, " tar");
        if (event.target.id == "LOCATION") { this.setState({ LOCATION: event.target.value }) }
        if (event.target.id == "PRICE") { this.setState({ PRICE: event.target.value }) }
        if (event.target.id == "IMGE") { this.setState({ IMGE: event.target.value }) }
        if (event.target.id == "START_DATE") { this.setState({ START_DATE: event.target.value }) }
        if (event.target.id == "END_DATE") { this.setState({ END_DATE: event.target.value }) }
        if (event.target.id == "HOTEL") { this.setState({ HOTEL: event.target.value }) }
    }
    // add vacation
    AddVacations = () => {
        axios.get(`http://localhost:5000/AddVacation?LOCATION=${this.state.LOCATION}&PRICE=${this.state.PRICE}&IMGE=${this.state.IMGE}&START_DATE=${this.state.START_DATE}&END_DATE=${this.state.END_DATE}&HOTEL=${this.state.HOTEL}`)
            .then(response => {
                this.setState({ LOCATION: "" });
                this.setState({ PRICE: "" });
                this.setState({ IMGE: "" });
                this.setState({ START_DATE: "" });
                this.setState({ END_DATE: "" });
                this.setState({ HOTEL: "" });
                console.log(response.data);
                axios.get(`http://localhost:5000/vacation`, { withCredentials: true })
                    .then(response => {

                        this.setState({ vacation: response.data });
                        this.setState({ showAdd: false });

                    })
                    .catch(error => {
                        console.log("error: ", error);
                    })

            })
            .catch(error => {
                console.log("error: ", error);
            })

    }
    // DELETE vacation
    Delete = (id, i) => {
        console.log(id, " delet ", i)
        var vacation = this.state.vacation;
        vacation.splice(i, 1);
        this.setState({ vacation: vacation });
        axios.get(`http://localhost:5000/DeleteVacation?id=${id}&PRICE=${this.state.PRICE}`)
            .then(response => {
                console.log(response.data);
                axios.get(`http://localhost:5000/vacation`, { withCredentials: true })
                    .then(response => {

                        this.setState({ vacation: response.data });

                    })
                    .catch(error => {
                        console.log("error: ", error);
                    })
            })
            .catch(error => {
                console.log("error: ", error);
            })
    }
    //show Update
    showUpdate = (id, i) => {
        console.log(id);
        this.setState({ showUpdate: true });
        this.setState({ idUpdate: id });
    }
    // close update
    closeUpdate = () => {
        this.setState({ showUpdate: false });
        this.setState({ LOCATION: "" });
        this.setState({ PRICE: "" });
        this.setState({ IMGE: "" });
        this.setState({ START_DATE: "" });
        this.setState({ END_DATE: "" });
    }
    // update the vacation
    updateVacations = () => {

        var id = this.state.idUpdate;
        console.log("cosole", id);
        axios.get(`http://localhost:5000/updateVacation?id=${id}&LOCATION=${this.state.LOCATION}&HOTEL=${this.state.HOTEL}&PRICE=${this.state.PRICE}&IMGE=${this.state.IMGE}&START_DATE=${this.state.START_DATE}&END_DATE=${this.state.END_DATE}`)
            .then(response => {
                this.setState({ LOCATION: "" });
                this.setState({ PRICE: "" });
                this.setState({ IMGE: "" });
                this.setState({ START_DATE: "" });
                this.setState({ END_DATE: "" });
                this.setState({ HOTEL: "" });
                console.log(response.data);
                axios.get(`http://localhost:5000/vacation`, { withCredentials: true })
                    .then(response => {

                        this.setState({ vacation: response.data });
                        this.setState({ showUpdate: false });

                    })
                    .catch(error => {
                        console.log("error: ", error);
                    })
            }).catch(error => {
                console.log("error: ", error);
            })
    }
    // the GRAFGH

    //SHOW THE GRAF
    showGraf = () => {
        this.getGrafh();
        this.setState({ showGraf: true });

    }
    //SHOW THE GRAF
    hideGraf = () => {
        this.setState({ showGraf: false });

    }
    // get all grafh
    getGrafh = () => {
        axios.get(`http://localhost:5000/MyGrafh`, { withCredentials: true })
            .then(response => {
                console.log(response.data, " da");
                this.setState({ GrafhPrint: response.data });
                this.getGrafh2();
            })
    }
    // this arr  GrafhPrint2
    getGrafh2 = () => {
        for (let i of this.state.vacation) {
            this.state.GrafhPrint2.push({ key: i.id, data: 0, })
        };
        for (let i of this.state.GrafhPrint2) {
            console.log("A1", this.state.GrafhPrint2);
            for (let k of this.state.GrafhPrint) {
                console.log("A2", this.state.GrafhPrint);
                if (i.key == k.idvacation) { i.data++; }
            }
        };
        for (let i = 0; i < this.state.vacation.length; i++) {
            this.state.GrafhPrint2[i].key = this.state.vacation[i].location;
        };
        this.setState({ data1: this.state.GrafhPrint2 });
    }
    render() {

        return (
            <div className="container">
                <UpdateVacation handleChange={this.handleChange} showUpdate={this.state.showUpdate} updateVacations={this.updateVacations} closeUpdate={this.closeUpdate} />
                <AddVacation showAdd={this.state.showAdd} AddVacations={this.AddVacations} handleChange={this.handleChange} closeAdd={this.closeAdd} />
                <Graf showGraf={this.state.showGraf} data1={this.state.data1} hideGraf={this.hideGraf} />

                <div className="row car" >
                    <div className="col-md-3" onClick={this.showGraf}>
                        <div className="card-counter danger">
                            <i className="fa fa-ticket"></i>
                            <span className="count-name">GRAGH</span>
                        </div>
                    </div>

                    <div className="col-md-3" onClick={this.showVacation}>
                        <div className="card-counter success" >
                            <i className="fa fa-database"></i>
                            <span className="count-numbers">{this.state.vacation.length}</span>
                            <span className="count-name">Add vacation</span>
                        </div>
                    </div>
                    <div className="col-md-3" onClick={this.LogOut}>
                        <div className="card-counter primary">
                            <i className="fa fa-code-fork"></i>
                            <span className="count-numbers">Admin</span>
                            <span className="count-name">Log Out</span>
                        </div>
                    </div>


                </div>
                {/* card vacation */}
                <div className="row">
                    {this.printAllVacation()}

                </div>
            </div>



        );
    }
}


export default admin;
