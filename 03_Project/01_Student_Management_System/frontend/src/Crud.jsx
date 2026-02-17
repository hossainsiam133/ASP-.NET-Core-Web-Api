import React, { useState, useEffect, Fragment } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from "axios";
function Crud() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [isActive, setIsActive] = useState(0);
    const [id, setId] = useState(0);

    const [nameEdit, setNameEdit] = useState("");
    const [ageEdit, setAgeEdit] = useState("");
    const [isActiveEdit, setIsActiveEdit] = useState(0);
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
        getData();
    }, []);
    const getData = () => {
        axios.get('http://localhost:5168/api/Employee')
            .then((response) => {
                setData(response.data)
            })
            .catch((error) => {
                console.error("There was an error fetching the data!", error);
            })
    }
    function handleEdit(id) {
        setId(id);
        handleShow();
        axios.get(`http://localhost:5168/api/Employee/${id}`)
            .then((response) => {
                setNameEdit(response.data.name);
                setAgeEdit(response.data.age);
                setIsActiveEdit(response.data.isActive);
            })
            .then((error) => {
                console.error("There was an error fetching the data!", error);
            })
        // alert(id);
    }
    function handleDelete(id) {
        if (window.confirm("Are you sure to delete") == true) {
            axios.delete(`http://localhost:5168/api/Employee/${id}`)
                .then((response) => {
                    getData();
                })
                .catch((error) => {
                    console.error("There was an error deleting the data!", error);
                })
        }
    }
    const handleUpdate = () => {
        // Update logic would go here
        // 
        // const updatedData = data.map(item => {
        //     if (item.id === id) {
        //         return {
        //             ...item,
        //             name: nameEdit,
        //             age: ageEdit,
        //             isActive: isActiveEdit
        //         };
        //     }
        //     return item;
        // })
        // setData(updatedData);
        axios.put(`http://localhost:5168/api/Employee/${id}`, {
            id: id,
            name: nameEdit,
            age: ageEdit,
            isActive: isActiveEdit
        })
            .then((response) => {
                alert("Data updated successfully!");
                getData();
            })
            .catch((error) => {
                console.error("There was an error updating the data!", error);
            });
        handleClose();
    }
    const saveData = () => {
        // const mx = data.reduce((max, item) => (item.id > max ? item.id : max), 0);
        const newData = {
            // id: mx + 1,
            name: name,
            age: age,
            isActive: isActive
        }
        axios.post('http://localhost:5168/api/Employee', newData)
            .then((response) => {
                alert("Data saved successfully!");
                getData();
            })
            .catch((error) => {
                console.error("There was an error saving the data!", error);
            });
        // setData([...data, newData]);
    }
    return (
        <Fragment>
            <Container>
                <Row>
                    <Col>
                        <input value={name} onChange={(e) => setName(e.target.value)} type="text" className="form-control" placeholder="Name"></input>
                    </Col>
                    <Col>
                        <input value={age} onChange={(e) => setAge(e.target.value)} type="number" className="form-control" placeholder="Age"></input>
                    </Col>
                    <Col>
                        <input checked={isActive} onChange={(e) => setIsActive(e.target.checked)} type="checkbox" className="form-check-input" id="isActive"></input>
                        <label className="form-check-label" htmlFor="isActive">&nbsp;Is Active</label>
                    </Col>
                    <Col>
                        <button onClick={saveData} className="btn btn-success">Submit</button> &nbsp;
                    </Col>

                </Row> <br />
            </Container>
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
                                    <td>{item.isActive ? "Yes" : "No"}</td>
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
                    <Container>
                        <Row>
                            <Col>
                                <input value={nameEdit} onChange={(e) => setNameEdit(e.target.value)} type="text" className="form-control" placeholder="Name"></input>
                            </Col>
                            <Col>
                                <input value={ageEdit} onChange={(e) => setAgeEdit(e.target.value)} type="number" className="form-control" placeholder="Age"></input>
                            </Col>
                            <Col>
                                <input checked={isActiveEdit} onChange={(e) => setIsActiveEdit(e.target.checked)} type="checkbox" className="form-check-input" id="isActive"></input>
                                <label className="form-check-label" htmlFor="isActive">&nbsp;Is Active</label>
                            </Col>
                        </Row> <br />
                    </Container>
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