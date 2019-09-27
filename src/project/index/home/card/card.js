import React, { Component } from 'react';
import './card.css';
import { read } from 'fs';
// import { URL } from 'inspector';

const card = (props) => {
    const divStyle = {
        backgroundImage: `url(${props.obg.imge})`,
    };
    const Not = {
        color: "red",
    }
    console.log(props.stateOn, " card")
    if (props.stateOn == true) {
        return (
            <div className="col-5">
                <div className="card">
                    <div className="card__side card__side--front">
                        <div className="card__picture card__picture--1" style={divStyle}>

                        </div>
                        <h4 className="card__heading">
                            <span className="card__heading-span card__heading-span--1">{props.obg.location}</span>

                        </h4>
                        <div className="card__details">
                            <ul>
                                <li>{props.obg.location}</li>
                                <li>{props.obg.start_date}</li>
                                <li>{props.obg.end_date}</li>
                                <li>Sleep in {props.obg.hotel}</li>
                                <li>Difficulty: easy</li>
                            </ul>
                        </div>
                    </div>
                    <div className="card__side card__side--back card__side--back-1">
                        <div className="card__cta">
                            <div className="card__price-box">
                                <p className="card__price-only" style={Not}>ON FOLOW</p>
                                <p className="card__price-value" style={Not}>{props.obg.price}$</p>
                            </div>
                            <input defaultValue="Book Now" className="btn btn--white" onClick={() => props.clickFollow(props.obg.id, props.obg.location)} />
                        </div>
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div className="col-5">
                <div className="card">
                    <div className="card__side card__side--front">
                        <div className="card__picture card__picture--1" style={divStyle}>

                        </div>
                        <h4 className="card__heading">
                            <span className="card__heading-span card__heading-span--1">{props.obg.location}</span>

                        </h4>
                        <div className="card__details">
                            <ul>
                                <li>{props.obg.location}</li>
                                <li>{props.obg.start_date}</li>
                                <li>{props.obg.end_date}</li>
                                <li>Sleep in {props.obg.hotel}</li>
                                <li>Difficulty: easy</li>
                            </ul>
                        </div>
                    </div>
                    <div className="card__side card__side--back card__side--back-1">
                        <div className="card__cta">
                            <div className="card__price-box">
                                <p className="card__price-only">FOLOW</p>
                                <p className="card__price-value">{props.obg.price}$</p>
                            </div>
                            <input defaultValue="Book Now" className="btn btn--white" onClick={() => props.clickFollow(props.obg.id, props.obg.location)} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default card;