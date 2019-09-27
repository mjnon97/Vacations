import React, { Component } from 'react';
import './card.css';
// import { URL } from 'inspector';

const card = (props) => {
    const divStyle = {
        backgroundImage: `url(${props.imge})`,
    };
    return (
        <div className="col-5">
            <div className="card">
                <div className="card__side card__side--front">
                    <div className="card__picture card__picture--1" style={divStyle}>

                    </div>
                    <h4 className="card__heading">
                        <span className="card__heading-span card__heading-span--1">{props.location}</span>

                    </h4>
                    <div className="card__details">
                        <ul>
                            <li>{props.location}</li>
                            <li>{props.start_date}</li>
                            <li>{props.end_date}</li>
                            <li>Sleep in {props.hotel}</li>
                            <li>{props.price}$</li>
                        </ul>
                    </div>
                </div>
                <div className="card__side card__side--back card__side--back-1">
                    <div className="card__cta">
                        <div className="card__price-box">
                            <input defaultValue="Update" className="btn btn--white" onClick={() => props.showUpdate(props.id, props.id)} />

                        </div>
                        <div>
                            <input defaultValue="Delete" className="btn btn--white" onClick={() => props.Delete(props.id, props.id)} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default card;