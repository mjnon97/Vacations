import React, { Component } from 'react';
import './AddVacation.css'
import Modal from 'react-modal';
const AddVacation = (props) => {

    return (
        <Modal isOpen={props.showAdd}>
            <div className="top">
                <div className="login">
                    <h1>Add Vacation</h1>
                    <form method="post">
                        <input type="text" onChange={props.handleChange} id="LOCATION" name="LOCATION" placeholder="LOCATION" />
                        <input type="text" onChange={props.handleChange} id="HOTEL" name="HOTEL" placeholder="HOTEL" />
                        <input type="text" onChange={props.handleChange} id="PRICE" name="PRICE" placeholder="PRICE" />
                        <input type="text" onChange={props.handleChange} id="IMGE" name="IMGE" placeholder="SRC IMGE" />
                        <input type="date" onChange={props.handleChange} id="START_DATE" name="START_DATE" placeholder="START DATE" />
                        <input type="date" onChange={props.handleChange} id="END_DATE" name="END_DATE" placeholder="END DATE" />
                        <input defaultValue="Add" onClick={() => props.AddVacations()} className="btn btn-primary btn-block btn-large" />

                        <button type="buttom" onClick={() => props.closeAdd()} className="btn btn-primary btn-block btn-large">Close</button>
                    </form>
                </div>
            </div>
        </Modal>
    );
}
export default AddVacation;