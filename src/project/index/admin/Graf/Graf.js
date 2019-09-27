import React, { Component } from 'react';
import './Graf.css'
import { BarChart } from "reaviz";

import Modal from 'react-modal';
const Graf = (props) => {
    return (
        <Modal isOpen={props.showGraf}>
            <div className="container">
                <BarChart width={1000} height={600} data={props.data1} />
                <button type="button" onClick={() => props.hideGraf()} class="btn btn-secondary">Close</button>

            </div>
        </Modal>
    );
}
export default Graf;