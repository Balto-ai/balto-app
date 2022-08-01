import React from 'react'
import Modal from 'react-bootstrap/Modal'
import AdoptionInquiryForm from '../AdoptionForm/AdoptionForm'

// takes in two props: show (a Boolean) and onHide (function)
// example instance: <AdoptionInquiryModal show={modalShow} onHide={() => setModalShow(false)} />
//    where show modalShow and setModalShow are state/state-setting vars in the parent component

export default function AdoptionInquiryModal(props) {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">Adoption Inquiry</Modal.Title>
            </Modal.Header>
            {/* modal body is the form to create an inquiry */}
            <Modal.Body>
                {/* NOTE: passes in the onHide prop so that the modal can close once the user submits the form */}
                <AdoptionInquiryForm onHide={props.onHide} />
            </Modal.Body>
        </Modal>
    )
}