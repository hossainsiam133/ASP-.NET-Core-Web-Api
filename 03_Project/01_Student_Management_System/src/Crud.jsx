import React, { useState, useEffect, Fragment } from "react";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';

function Crud() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const empdata = [
        {
            id: 1,
            name: "Siam",
            age: 21,
            isActive: 1
        },
        {
            id: 2,
            name: "Talha",
            age: 23,
            isActive: 1
        },
        {
            id: 3,
            name: "Asif",
            age: 25,
            isActive: 0
        }
    ];
    const [data, setData] = useState([]);
    useEffect(() => {
        setData(empdata);
    }, []);
    function handleEdit(id) {
        // alert(id);
        handleShow();
    }
    function handleDelete(id) {
        if (window.confirm("Are you sure to delete") == true)
            alert(id);
    }
    const handleUpdate = () => {
        alert("Updated");
    }
    return (
        <Fragment>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>SL.</th>
                        <th>Name</th>
                        <th>Age</th>
                        <th>isActive</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data && data.length > 0 ?
                            data.map((item, index) => {
                                return (<tr key={index}>
                                    <td>{index}</td>
                                    <td>{item.name}</td>
                                    <td>{item.age}</td>
                                    <td>{item.isActive}</td>
                                    <td>
                                        <button onClick={() => handleEdit(item.id)} className="btn btn-primary">Edit</button> &nbsp;
                                        <button onClick={() => handleDelete(item.id)} className="btn btn-danger">Delete</button>
                                    </td>
                                </tr>);

                            })
                            : "Loading..."
                    }

                </tbody>
            </Table>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modify / Update the Employee</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Name: <input></input> <br/><br/>
                    Age: <input></input>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleUpdate}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </Fragment>
    );
}
export default Crud;