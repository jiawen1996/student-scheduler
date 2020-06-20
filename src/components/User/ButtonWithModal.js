import React, { useState } from 'react'
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";


export default (props) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <button
                type="button"
                class="close"
                aria-label="Close"
                onClick={(e) => {
                    e.preventDefault();
                    handleShow()
                }}
            >
                <span aria-hidden="true">&times;</span>
            </button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Do you want to delete this user?</Modal.Title>
                </Modal.Header>
                <Modal.Body>Confirm to delete</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancle
                    </Button>
                    <Button
                        variant="primary"
                        onClick={(e) => {
                            props.handleClick(props.login)
                            handleClose()
                        }}
                    >
                        Yes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}