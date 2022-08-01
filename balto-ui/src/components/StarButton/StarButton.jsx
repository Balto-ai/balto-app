import React from 'react'
import ApiClient from '../../services/ApiClient'
import { useAuthContext } from '../../contexts/auth'
import { BsStar, BsStarFill } from 'react-icons/bs'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import ToastContainer from 'react-bootstrap/ToastContainer'
import Toast from 'react-bootstrap/Toast'
import LoginForm from '../LoginForm/LoginForm'
import { IconButton } from '@mui/material';
import "./StarButton.css"

export default function StarButton({ dogId=1, dogName=""}) {
    const { user } = useAuthContext()
    const [isInquired, setIsInquired] = React.useState(false) // if dog has already been requested by user
    const [modalShow, setModalShow] = React.useState(false) // show modal on "Adopt" button click

    React.useEffect(() => {
        const checkIfInquired = async () => {
            const { data, error } = await ApiClient.fetchStarredDogs()
            if (data?.starredDogs) {
                // this is checking though the returned list of starred dogs to see if one of them has a dog_id value matching the card's dogId
                if (data.starredDogs.some(e => e.dog_id === dogId)) {
                    setIsInquired(true)
                  }
            }
        }
        // only check if starred if the user is signed into an account since
        //  we know that non-loggin in users should not have any saved dogs
        if (user?.email) {
            checkIfInquired()
        }
    }, [user])

    const handleOnClick = async () => {
        // if a user is signed in, allow the user to star/unstar the dog
        if (user?.email) {
            if (isInquired) {
                // TODO: may want to add error handling on frontend here
                const { data, error } = await ApiClient.unstarDog(dogId)
                setIsInquired(false)
            } else {
                // TODO: may want to add error handling on frontend here
                const { data, error } = await ApiClient.starDog({dogId})
                setIsInquired(true)
            }
            setToastShow(true)
        // if no user is signed in, show a modal prompting them to login/signup
        } else {
            setModalShow(true)
        }
    }

    return (
        <>
        {/* actual button component that is displayed on the card */}
        <IconButton 
          disableRipple className='starbtn' onClick={handleOnClick} sx={{ transition: '0.3s', bgcolor: '#908af8', color:'white'}} aria-label="star" >
          {isInquired ? <BsStarFill/> : <BsStar/>}
        </IconButton>
        {/* modal that appears and prompts users to login/signup when they attempt to star a dog */}
        <StarModal show={modalShow} onHide={() => setModalShow(false)} />

        {/* bottom-right notification that appears when a user stars/unstars a dog */}
        <StarUpdateToast toastShow={toastShow} setToastShow={setToastShow} dogName={dogName} isStarred={isInquired} />
        </>
    )
}

export function StarModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Login to Balto to add dogs to your Favorites</Modal.Title>
        </Modal.Header>
        {/* modal body is the form to login the user */}
        <Modal.Body>
            <LoginForm/>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    )
  }

export function StarUpdateToast({setToastShow=()=>{}, toastShow=false, dogName="", isStarred="true"}) {
return (
    <Toast onClose={() => setToastShow(false)} show={toastShow} delay={5000} autohide className="star-update-toast">
    <Toast.Header>
      <strong className="me-auto">
          {/* render appropriate message based on if the user checked/unchecked */}
          {isStarred
           ? <strong className="me-auto">{`Added ${dogName} to Favorites`}</strong>
           : <strong className="me-auto">{`Removed ${dogName} from Favorites`}</strong>
          }
      </strong>
    </Toast.Header>
    {/* link to the Favorites page for ease of access */}
    <Toast.Body>View your <a href="/star">Favorites</a></Toast.Body>
  </Toast>
)
}