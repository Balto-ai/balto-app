import React from 'react'
import './AdoptionReceiptModal.css'
import { Modal, Button } from 'react-bootstrap'
import Confetti from 'react-confetti'
import { useWindowSize } from '@react-hook/window-size'

export default function AdoptionReceiptModal(props) {
  // get the size of the window using custom hook
  const [ width, height ] = useWindowSize()
  return (
    <>
    <Confetti 
    width={width} 
    height={height} 
    numberOfPieces={900} 
    run={props.show} 
    recycle={false}
    colors={['#908AF8','#FEC272', '#99ADF9']}
    />


    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop={false}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Congratulations!
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>You've successfully submitted a request to adopt {props.dogName}.</h4>
        <p>
          We will forward your request to {props.shelterName}, so look out for an email from them in the next few weeks. In the meantime, feel free to continue browsing our site. 
        </p>
        <i>If you are feeling generous, leave us a tip to help keep Balto free!</i>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide} style={{ fontWeight: 'bold', color: 'white' }}>Close</Button>
      </Modal.Footer>
    </Modal>
    </>
  );
}
