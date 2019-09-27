import React, { Component } from 'react';
import './UpdateVacation.css';
import Modal from 'react-modal';
const UpdateVacation = (props) => {

    return (
        <Modal isOpen={props.showUpdate}>
            <div className="top">
                <div className="login">
                    <h1>Update Vacation</h1>
                    <form method="post">
                        <input type="text" onChange={props.handleChange} id="LOCATION" name="LOCATION" placeholder="LOCATION" />
                        <input type="text" onChange={props.handleChange} id="PRICE" name="PRICE" placeholder="PRICE" />
                        <input type="text" onChange={props.handleChange} id="IMGE" name="IMGE" placeholder="SRC IMGE" />
                        <input type="date" onChange={props.handleChange} id="START_DATE" name="START_DATE" placeholder="START DATE" />
                        <input type="date" onChange={props.handleChange} id="END_DATE" name="END_DATE" placeholder="END DATE" />
                        {/* <button type="buttom" onClick={() => props.UpdateVacation()} className="btn btn-primary btn-block btn-large">Update</button>
                        <button type="buttom" onClick={() => props.closeUpdate()} className="btn btn-primary btn-block btn-large">Close</button> */}
                        <input defaultValue="Update" onClick={() => props.updateVacations()} className="btn btn-primary btn-block btn-large" />
                        <input defaultValue="Close" onClick={() => props.closeUpdate()} className="btn btn-primary btn-block btn-large" />

                    </form>
                </div>
            </div>
        </Modal>
    );
}
export default UpdateVacation;