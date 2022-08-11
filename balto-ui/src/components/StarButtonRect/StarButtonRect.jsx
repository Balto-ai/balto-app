import React from 'react'
import ApiClient from '../../services/ApiClient'
import { useAuthContext } from '../../contexts/auth'
import { useComponentContext } from '../../contexts/component'
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Toast from 'react-bootstrap/Toast'
import LoginForm from '../LoginForm/LoginForm'
import { IconButton } from '@mui/material';
import "./StarButtonRect.css"
import Tooltip from '@mui/material/Tooltip';
import DogIcon from '../AddDogRecord/icon/paw (1).png'


export default function StarButtonRect({ dogId=1, dogName="", onStarPage, setOnStarPage}) {
    const { user } = useAuthContext()
    const { createNewToast } = useComponentContext()
    const [isStarred, setIsStarred] = React.useState(false) // whether the dog is starred or not, sets the fill of the star
    const [modalShow, setModalShow] = React.useState(false) // shows modal that appears when a non-logged in user attampts to favorite a dog
    const [toastShow, setToastShow] = React.useState(false) // shows bottom-right notification that appears when a dog is starred/unstarred
    const [userLoggedIn, setUserLoggedIn] = React.useState(false)
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
        //  we know that non-logged in users should not have any saved dogs
        if (user?.email) {
            checkIfStarred()
        }
    })

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
            
            const headerMessage = isStarred ? (`Removed ${dogName} from Favorites`) : (`Added ${dogName} to Favorites`)
            const bodyMessage = onStarPage ? (<><a href="/star">Reload</a><span> to view your newly updated Favorites</span></>) : (<><span>View your </span><a href="/star">Favorites</a></>)
            createNewToast(headerMessage, bodyMessage )
            // setToastShow(true)
        // if no user is signed in, show a modal prompting them to login/signup
        } else {
            setModalShow(true)
        }
    }

    return (
        <>
        {/* actual button component that is displayed on the card */}
        {/* <Button className='btn' onClick={handleOnClick} variant={isStarred ? "info" : "primary"} style={{ textDecoration: 'none', color: 'black', fontWeight: 'bold' }}>{isStarred ? <BsStarFill /> : <BsStar />} {isStarred ? <span>Favorited</span> : <span>Favorite </span> }</Button> */}
        {isStarred ? <Tooltip title="Remove from Favorites">
          <IconButton aria-label='favorite' onClick={handleOnClick}><FavoriteIcon sx={{ color: 'var(--balto-main)'}} /></IconButton>
        </Tooltip>:
        <Tooltip title="Add to Favorites">
          <IconButton aria-label='favorite' onClick={handleOnClick}><FavoriteBorderIcon sx={{ color: 'gray'}} /></IconButton>
        </Tooltip>}
        {/* modal that appears and prompts users to login/signup when they attempt to star a dog */}
        {modalShow && <StarModal setUserLoggedIn={setUserLoggedIn} show={modalShow} onHide={() => setModalShow(false)} />}

        {/* bottom-right notification that appears when a user stars/unstars a dog */}
        {/* {onStarPage ? <StarUpdateToastFromStarredPage setOnStarPage={setOnStarPage} toastShow={toastShow} setToastShow={setToastShow} dogName={dogName} isStarred={isStarred} /> :<StarUpdateToast toastShow={toastShow} setToastShow={setToastShow} dogName={dogName} isStarred={isStarred} />} */}
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
          <Modal.Title id="contained-modal-title-vcenter">Login to add dogs to your Favorites</Modal.Title>
        </Modal.Header>
        {/* modal body is the form to login the user */}
        <Modal.Body>
            <LoginForm onHide={props.onHide} userLoggedIn={props.userLoggedIn} setUserLoggedIn={props.setUserLoggedIn}/>
        </Modal.Body>
        <Modal.Footer>
          <Button style={{color:'white'}} onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    )
  }

// export function StarUpdateToastFromStarredPage({setToastShow=()=>{}, toastShow=false, dogName="", isStarred="true", setOnStarPage}) {
//   return (
//       <Toast onClose={() => {setToastShow(false); setOnStarPage(false)}} show={toastShow} delay={5000} autohide className="star-update-toast">
//       <Toast.Header>
//         {/* <strong className="me-auto"> */}
//             {/* render appropriate message based on if the user checked/unchecked */}
//             <img
//                 src={DogIcon}
//                 className="dog-icon-toast"
//                 alt="dog paw"
//               />
//             {isStarred
//              ? <strong className="me-auto">{`Added ${dogName} to Favorites`}</strong>
//              : <strong className="me-auto">{`Removed ${dogName} from Favorites`}</strong>
//             }
//         {/* </strong> */}
//       </Toast.Header>
//       {/* link to the Favorites page for ease of access */}
//       <Toast.Body>Click <a href="/star">reload</a> to view your newly updated Favorites</Toast.Body>
//     </Toast>
//   )
//   }