import React from 'react'
import ApiClient from '../../services/ApiClient'
import { useAuthContext } from '../../contexts/auth'
import { BsStar, BsStarFill } from 'react-icons/bs'
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Toast from 'react-bootstrap/Toast'
import LoginForm from '../LoginForm/LoginForm'
import { IconButton } from '@mui/material';
import "./StarButton.css"

export default function StarButton({ dogId=1, dogName=""}) {
    const { user } = useAuthContext()
    const [isStarred, setIsStarred] = React.useState(false) // whether the dog is starred or not, sets the fill of the star
    const [modalShow, setModalShow] = React.useState(false) // shows modal that appears when a non-logged in user attampts to favorite a dog
    const [toastShow, setToastShow] = React.useState(false) // shows bottom-right notification that appears when a dog is starred/unstarred

    // useEffect hook gets the user's list of starred dogs and checks if the card's dog is in that list
    //   TODO: for later sprint, create new endpoint that returns a boolean
    React.useEffect(() => {
        const checkIfStarred = async () => {
            const { data, error } = await ApiClient.fetchStarredDogs()
            if (data?.starredDogs) {
                // this is checking though the returned list of starred dogs to see if one of them has a dog_id value matching the card's dogId
                if (data.starredDogs.some(e => e.dog_id === dogId)) {
                    setIsStarred(true)
                  }
            }
        }
        // only check if starred if the user is signed into an account since
        //  we know that non-loggin in users should not have any saved dogs
        if (user?.email) {
            checkIfStarred()
        }
    }, [user])

    const handleOnClick = async () => {
        // if a user is signed in, allow the user to star/unstar the dog
        if (user?.email) {
            if (isStarred) {
                // TODO: may want to add error handling on frontend here
                const { data, error } = await ApiClient.unstarDog(dogId)
                setIsStarred(false)
            } else {
                // TODO: may want to add error handling on frontend here
                const { data, error } = await ApiClient.starDog({dogId})
                setIsStarred(true)
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
          disableRipple className='starbtn' onClick={handleOnClick} sx={{ transition: '0.3s', bgcolor: 'var(--balto-main)', color:'white'}} aria-label="star" >
          {isStarred ? <StarIcon /> : <StarBorderIcon />}
        </IconButton>
        {/* modal that appears and prompts users to login/signup when they attempt to star a dog */}
        <StarModal show={modalShow} onHide={() => setModalShow(false)} />

        {/* bottom-right notification that appears when a user stars/unstars a dog */}
        <StarUpdateToast toastShow={toastShow} setToastShow={setToastShow} dogName={dogName} isStarred={isStarred} />
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
          <Button style={{color:'white'}} onClick={props.onHide}>Close</Button>
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