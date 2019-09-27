import React, { Component } from 'react';
import './index.css';
import axios from 'axios';
// import { Button } from 'react-bootstrap';
// import Modal from 'react-modal';
import { Route, Link } from 'react-router-dom';
// import $ from "jquery";
import { Redirect } from 'react-router-dom';
// import { throws } from 'assert';
// // import Admin from './Admin/Admin';

class Index extends Component {

    state = {
        EmailL: '',
        PasswordL: '',
        EmailR: '',
        PasswordR: '',
        NameR: '',
        data: [],
        data1: [],
        text2: "",
        session: [],
        id: "",
    }

    componentDidMount() {
        // find if you have session
        axios.get(`http://localhost:5000/findthesession`, { withCredentials: true })
            .then(response => {
                var idCoke = response.data;
                if (idCoke == undefined || idCoke == 0) { console.log(false) }
                else if (idCoke == 1) {
                    window.location.href = '/admin/' + idCoke;
                }
                else { window.location.href = '/home/' + idCoke; }

            })
    }
    setSession = (id) => {

        axios.get(`http://localhost:5000/setthesession?id=${id}`, { withCredentials: true })
            .then(response => {
                console.log(response.data, " data session ");
            })
    }

    // ON CHANGE THE STATE
    handleChangeL = (event) => {
        console.log(event.target.value);
        console.log(event.target.id);
        console.log("--------------");
        if (event.target.id == "EmailL") { this.setState({ EmailL: event.target.value }); }
        if (event.target.id == "PasswordL") { this.setState({ PasswordL: event.target.value }); }
    }
    // PUT AND FIND IF USER IN DB
    handleSumbet = () => {
        console.log(this.state.EmailL, " ok ", this.state.PasswordL);
        axios.get(`http://localhost:5000/Login?Email=${this.state.EmailL}&Password=${this.state.PasswordL}`)
            .then(response => {
                console.log(response.data, " data")
                this.setState({ Redirect: true });
                this.setState({ data1: response.data });

                if (response.data == false) { console.log("no seccss"); alert("again"); }
                else if (this.state.data1[0].Admin == 1) {
                    this.setState({ id: this.state.data1[0].id }); this.setState({ Redirect: true }); this.setState({ text2: "/admin/" + this.state.id }); console.log("admin");
                    this.setSession(this.state.data1[0].id);
                }
                else if (this.state.data1[0].Admin == 0) {
                    this.setState({ id: this.state.data1[0].id }); this.setState({ Redirect: true }); this.setState({ text2: "/home/" + this.state.id }); console.log("user");
                    this.setSession(this.state.data1[0].id);
                }
                this.setState({ EmailL: "" });
                this.setState({ PasswordL: "" });
                console.log(response.data, " result react");
            });
    }
    // this register
    handleChangeR = (event) => {
        console.log("--------------"); console.log(event.target.id, " tar");
        if (event.target.id == "EmailR") { this.setState({ EmailR: event.target.value }) }
        if (event.target.id == "NameR") { this.setState({ NameR: event.target.value }) }
        if (event.target.id == "PasswordR") { this.setState({ PasswordR: event.target.value }) }
    }
    Register = () => {
        if (this.state.EmailR.length <= 5 || this.state.NameR.length <= 3 || this.state.PasswordR.length <= 5) {
            alert("YOU HAVE ERROR");
        }
        else
            axios.get(`http://localhost:5000/Register?Email=${this.state.EmailR}&Name=${this.state.NameR}&Password=${this.state.PasswordR}`)
                .then(response => {
                    // All state == ""
                    this.setState({ data1: response.data });
                    this.setState({ EmailR: "" });
                    this.setState({ NameR: "" });
                    this.setState({ passwordR: "" });
                    console.log(response.data);
                });
    }
    // end the regester

    // this the index
    cambiar_login = () => {
        document.querySelector('.cont_forms').className = "cont_forms cont_forms_active_login";
        document.querySelector('.cont_form_login').style.display = "block";
        document.querySelector('.cont_form_sign_up').style.opacity = "0";

        setTimeout(function () { document.querySelector('.cont_form_login').style.opacity = "1"; }, 400);

        setTimeout(function () {
            document.querySelector('.cont_form_sign_up').style.display = "none";
        }, 200);
    }
    cambiar_sign_up = (at) => {
        document.querySelector('.cont_forms').className = "cont_forms cont_forms_active_sign_up";
        document.querySelector('.cont_form_sign_up').style.display = "block";
        document.querySelector('.cont_form_login').style.opacity = "0";

        setTimeout(function () {
            document.querySelector('.cont_form_sign_up').style.opacity = "1";
        }, 100);

        setTimeout(function () {
            document.querySelector('.cont_form_login').style.display = "none";
        }, 400);
    }
    ocultar_login_sign_up = () => {

        document.querySelector('.cont_forms').className = "cont_forms";
        document.querySelector('.cont_form_sign_up').style.opacity = "0";
        document.querySelector('.cont_form_login').style.opacity = "0";

        setTimeout(function () {
            document.querySelector('.cont_form_sign_up').style.display = "none";
            document.querySelector('.cont_form_login').style.display = "none";
        }, 500);

    }
    //this end the index
    render() {
        if (this.state.Redirect) {
            return <Redirect push to={this.state.text2} />
        }

        return (
            <div className="cotn_principal" id="banner" id="cloud-scroll">
                <div className="cont_centrar" >

                    <div className="cont_login">
                        <div className="cont_info_log_sign_up">
                            <div className="col_md_login">
                                <div className="cont_ba_opcitiy">

                                    <h2>LOGIN</h2>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                    <button className="btn_login" onClick={this.cambiar_login}>LOGIN</button>
                                </div>
                            </div>
                            <div className="col_md_sign_up">
                                <div className="cont_ba_opcitiy">
                                    <h2>SIGN UP</h2>


                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>

                                    <button className="btn_sign_up" onClick={this.cambiar_sign_up}>SIGN UP</button>
                                </div>
                            </div>
                        </div>


                        <div className="cont_back_info">
                            <div className="cont_img_back_grey">
                                <img src="https://images.unsplash.com/42/U7Fc1sy5SCUDIu4tlJY3_NY_by_PhilippHenzler_philmotion.de.jpg?ixlib=rb-0.3.5&q=50&fm=jpg&crop=entropy&s=7686972873678f32efaf2cd79671673d" alt="" />
                            </div>

                        </div>
                        <div className="cont_forms" >
                            <div className="cont_img_back_">
                                <img src="https://images.unsplash.com/42/U7Fc1sy5SCUDIu4tlJY3_NY_by_PhilippHenzler_philmotion.de.jpg?ixlib=rb-0.3.5&q=50&fm=jpg&crop=entropy&s=7686972873678f32efaf2cd79671673d" alt="" />
                            </div>
                            <div className="cont_form_login">
                                <a href="#" onClick={this.ocultar_login_sign_up} ><i className="material-icons"></i></a>
                                <h2>LOGIN</h2>
                                {/* this email change and on click */}
                                <input type="Email" onChange={this.handleChangeL} name="EmailL" id="EmailL" placeholder="Email" />
                                {/* this password change and on click */}
                                <input type="Password" onChange={this.handleChangeL} name="PasswordL" id="PasswordL" placeholder="Password" />
                                {/* this on click send a password and email in db */}
                                <button onClick={() => this.handleSumbet()} type="button" className="btn_login" >LOGIN</button>
                            </div>

                            <div className="cont_form_sign_up">
                                <a href="#" onClick={this.ocultar_login_sign_up}><i className="material-icons"></i></a>
                                <h2>SIGN UP</h2>
                                <input onChange={this.handleChangeR} type="Email" name="EmailR" id="EmailR" placeholder="Email" />
                                <input onChange={this.handleChangeR} type="Name" name="NameR" id="NameR" placeholder="Name" />
                                <input onChange={this.handleChangeR} type="Password" name="PasswordR" id="PasswordR" placeholder="Password" />
                                <button className="btn_sign_up" onClick={() => this.Register()} type="button">SIGN UP</button>

                            </div>

                        </div>

                    </div>
                </div>
            </div>

        );
    }
}

export default Index;