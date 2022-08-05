import React from 'react'
import Button from '@mui/material/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form'
import { useImageContext } from '../../contexts/images';
import { storage } from '../../firebase/firebase'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { v4 } from 'uuid'
import ImagePlaceholder from './icon/image (1).png'
import DogIcon from './icon/paw (1).png'
import Box from '@mui/material/Box';
import Toast from 'react-bootstrap/Toast';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

export default function UploadImages({dogId}) {
  const [modalShow, setModalShow] = React.useState(false);
  return (
        <>
         <Button variant="contained" component="label" onClick={() => setModalShow(true)}>
            Upload
        </Button>
        <UploadModal
        dogId={dogId}
        show={modalShow}
        onHide={() => setModalShow(false)}
        />
        </>
  )
}
export function UploadModal(props){
    const [isValidated, setIsValidated] = React.useState(false)
    const [form, setForm] = React.useState({imageUrl:'', imageName:'', dogId:''})
    const [error, setError] = React.useState(null)
    const {createImage} = useImageContext()
    const [imageUpload, setImageUpload] = React.useState(null)
    const [isLoading, setLoading] = React.useState(false)
    const [imageList, setImageList] = React.useState([])
    
    const handleOnFormSubmit = async (evt) => {
        setError(null)
        evt.preventDefault()
        setIsValidated(true)
    
        const addImage = evt.currentTarget
        if (addImage.checkValidity() === false) {
          evt.stopPropagation()
        } else {
          // update form to include the selected breed
          if (props.dogId){
            setForm((existingForm)=>({...existingForm, dogId: props.dogId}))
        }
          await createImage(form)
        }
      }
      const handleOnImageFileChange = (evt) => {
        if (evt.target.files[0]){
          setImageUpload(evt.target.files[0])
        }
      }
    
      const uploadImage = () => {
        if (imageUpload === null) return;
        
        let imageName = imageUpload.name + v4();
        setForm((existingForm) => ({...existingForm, imageName: imageName}))
        const imageRef = ref(storage, `dogProfileImages/${imageName}`);
        uploadBytes(imageRef, imageUpload).then((snapshot)=>{
            getDownloadURL(snapshot.ref).then(async(url)=>{
              setForm((existingForm) => ({ ...existingForm, imageUrl: url }))
            })
          })
          setLoading(true)
      }
    return(
        <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Upload Image
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Centered Modal</h4>
          <Form className="form" noValidate validated={isValidated} onSubmit={handleOnFormSubmit}>
            <Form.Group controlId="formFile" className="mb-3">
            {!form.imageUrl ? 
                      <Box className='photo-area' sx={{ borderRadius: '10px', height: 300, width:300, p: 2, border: '1px dashed ', borderColor: '#BDBDBD' }}>
                        

                      {!isLoading ? 
                        <div>
                            <Row className="justify-content-md-center">
                              <Col> <img className='camera-icon' src={ImagePlaceholder} alt='camera icon'></img></Col>
                            </Row >
                            <Row className="justify-content-md-center">
                              <Col> <p>No image preview available</p></Col>
                            </Row>
                          </div>
                          :
                          null
                        }
                      </Box>  
                  :
                    <div className='image-preview-container'>
                      <img className='dogImage' src={form.imageUrl} alt='preview'></img>
                    </div>
                  }
                  

                <Form.Control multiple type="file" onChange={handleOnImageFileChange}></Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    )
}
export function ShowToast({setShow, show}) {
  return (
    <div
      aria-live="polite"
      aria-atomic="true"
    >
        <Toast  onClose={() => setShow(false)} show={show} delay={2000} autohide className='update-toast' >
          <Toast.Header>
            <img
              src={DogIcon}
              className="dog-icon-toast"
              alt="dog paw"
            />
            <strong className="me-auto">Balto</strong>
            <small className="text-muted">just now</small>
          </Toast.Header>
          <Toast.Body>Image saved!</Toast.Body>
        </Toast>
    </div>
  );
}
