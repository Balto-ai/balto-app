import React from 'react'
import { Link, useNavigate, useParams } from "react-router-dom"
import { useDogRecordsContext } from '../../contexts/dog-records'
import { useDogRecordDetailContext } from '../../contexts/dog-record-detail'
import { Rating} from '@mui/material'
import { IoPaw } from 'react-icons/io5'
import { BsCheckCircleFill, BsCheckCircle } from 'react-icons/bs'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Modal from 'react-bootstrap/Modal'
import Typography from '@mui/material/Typography'
import "./DogRecordDetail.css"
import { storage } from '../../firebase/firebase'
import { ref, deleteObject } from 'firebase/storage'
import { useImageContext } from '../../contexts/images'
import {ImagesContextProvider} from '../../contexts/images'
import Image from 'react-bootstrap/Image'
import Stack from 'react-bootstrap/Stack'
import { RiPencilFill } from "react-icons/ri";
import PropTypes from 'prop-types';
import moment from 'moment'
import {Box, Tab, Tabs} from '@mui/material'
import {TabContext, TabList, TabPanel} from '@mui/lab'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import UploadImagesBtn from '../UploadImagesBtn/UploadImagesBtn'
import LightBox from 'react-image-lightbox'
import 'react-image-lightbox/style.css'
import ProgressList from '../Upload/ProgressList'
import Options from './Options'
import { useEffect } from 'react'

const theme = createTheme({
  status: {
    danger: '#e53e3e',
  },
  palette: {
    primary: {
      main: '#908af8',
      darker: '#7972f7',
      contrastText: 'white'
    },
    secondary: {
      main: '#FEC272',
      contrastText: 'black',
    },
  },
});

export default function DogRecordDetailContainer(){
  return(
    <ImagesContextProvider>
        <DogRecordDetail/>
    </ImagesContextProvider>
  )
}

export function DogRecordDetail() {
  const navigate = useNavigate()
  const { dogId } = useParams()
  const { dogRecord, initialized } = useDogRecordDetailContext()
  const {setDogId, images} = useImageContext()



  const [modalShow, setModalShow] = React.useState(false) // modal to confirm if the user wants to delete the record
  
  //tab variabls and methods
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  

  // used to set the ratings; due to how rating inputs work this is needed to show the ratings on the page
  const [playfulness, setPlayfulness] = React.useState(0)
  const [energyLevel, setEnergyLevel] = React.useState(0)
  const [exerciseNeeds, setExerciseNeeds] = React.useState(0)
  const ratingCategories = {"Playfulness": playfulness, "Energy Level": energyLevel, "Exercise Needs": exerciseNeeds}
  const [files, setFiles] = React.useState([])
  const goodWithCategories = {
    "Other Dogs": dogRecord.dog_friendly,
    "Cats": dogRecord.cat_friendly,
    "Beginners": dogRecord.novice_friendly,
    "Kids": dogRecord.kid_friendly,
    "Strangers": dogRecord.stranger_friendly}

  // set the dog attributes to state variables for ratings
  React.useEffect(() => {
    setPlayfulness(dogRecord.playfulness)
    setEnergyLevel(dogRecord.energy_level)
    setExerciseNeeds(dogRecord.exercise_needs)
    setDogId(dogId);
  })
  return (
  <ThemeProvider theme={theme}>
    <Container fluid className="dog-record-detail">  
        {/* basic info like name, breed, sex, etc. */}
          <div className="main-top-header">
           <Box>
           <Row  xs='auto' md="auto" lg='auto' >
      
              <Col >
               <Image roundedCircle src={dogRecord.image_url} className="dog-pfp" alt={`Image of ${dogRecord.name}`}></Image>
              </Col>
              <Stack>
               <h1 className='dog-name-title'>{dogRecord.name}</h1>
               <div className="bottom-buttons">
               
               {/* This one just links to the dog page that you can get to from the search page */}
               <Button id='view-prof-btn' onClick={()=>{navigate(`/dog/${dogRecord.id}`)}}>View Public Profile</Button>
              
               {/* edit button, redirects to the edit page */}
                 <Link className="btn" variant="outline-secondary" to={`/admin-dashboard/dog-record/id/${dogId}/edit`}><i className='pencil-icon'><RiPencilFill/></i>Edit</Link>
              
               {/* edit button, redirects to the edit page */}
               
               <Button variant="outline-danger" onClick={()=>{setModalShow(true)}}>Delete</Button>
                 <DeleteDogRecordModal imageName={dogRecord.image_name} dogId={dogId} show={modalShow} onHide={() => setModalShow(false)} />
               </div>  
              </Stack>
              
              </Row>
           </Box>

            <Row  xs='auto' md="auto" lg='auto' className="basic-info secondary-container">
            <Box sx={{ width: '100%' }}>
                <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <Tabs
                    value={value}
                    onChange={handleChange}
                    textColor="primary"
                    indicatorColor="primary"
                    aria-label="secondary tabs example"
                  >
                    <Tab value="1" label="About" />
                    <Tab value="2" label="Characteristics" />
                    <Tab value="3" label="Description" />
                    <Tab value="4" label="Photos" />
                  </Tabs>
                </Box>
                <TabPanel value='1'>
                <Row>
                    <h4 className='photo-title'>About</h4>
                  </Row>
                  <Box sx={{marginTop:5}}>
                  <Row>
                  <Col>
                    <Row>
                      <h4 className='detail-title'>Breed</h4>
                      <p>{dogRecord.breed}</p>
                    </Row>
                    <Row>
                      <h4  className='detail-title'>Sex</h4>
                      <p>{dogRecord.sex === 'f' ? 'Female': 'Male'}</p>
                    </Row>
                    <Row>
                      <h4  className='detail-title'>Size</h4>
                      <p>{dogRecord.size}</p>
                    </Row>
                  </Col>
                  <Col>
                    <Row>
                      <h4  className='detail-title'>Color</h4>
                      <p>{dogRecord.color}</p>
                    </Row>
                    <Row>
                      <h4  className='detail-title'>Date of Birth</h4>
                      <p>{(new Date(dogRecord.dob)).toLocaleDateString()}</p>
                    </Row>
                    <Row>
                      <h4  className='detail-title'>Date Entered</h4>
                      <p>{(new Date(dogRecord.date_entered)).toLocaleDateString()}</p>
                    </Row>
                  </Col>
                  </Row>
                  
                  
               
                  </Box>
                  </TabPanel>
                <TabPanel value='2'>
                <Row>
                    <h4 className='photo-title'>Characteristics</h4>
                  </Row>
                  {/* Good with categories and ratings */}
                  <Col className="adopter-compatibility secondary-container">
          
                  <Row className="dog-record-detail">
                    <Col className="good-withs">
                      <h4 className='second-panel-title'>Good With...</h4>
                      {Object.keys(goodWithCategories).map((category, idx) => {
                          return (
                            <div className="good-with" key={idx}>
                              <span className="checkbox-line">
                                {goodWithCategories[category] ? <BsCheckCircleFill color='#908AF8' fontSize="150%" />  : <BsCheckCircle color='#ffffff' fontSize="150%" />}
                                {goodWithCategories[category] ? <Typography component="legend" noWrap={true}>&nbsp; {category}</Typography> : <Typography component="legend" noWrap={true} color="var(--faded-text-grey)">&nbsp; {category}</Typography>}
                              </span>
                            </div>
                            )})}
                    </Col>
                  
                    <Col className="ratings">
                      {Object.keys(ratingCategories).map(((category, idx) => {
                        return (
                        <div className="rating" key={idx}>
                          <p className="rating-label">{category}</p>
                          <Rating
                            value={ratingCategories[category] || 1}
                            icon={<IoPaw className="filled-rating-icon" />}
                            emptyIcon={<IoPaw className="empty-rating-icon" />}
                            getLabelText={(value) => `Rating ${value}`}
                            readOnly />
                        </div> )
                      }))}
                    </Col>
                  </Row>
                  
                  </Col>
                  
                </TabPanel>
                <TabPanel value='3'>
                  {/* Text descriptions */}
                  <Row>
                    <h4 className='photo-title'>Description</h4>
                  </Row>
                  <Row>
                    <Col className="adopter-compatibility secondary-container">
                      <h4 className='detail-title'>I'm known for being...</h4>
                      <p>{dogRecord.desc_1}</p>
                      <h4 className='detail-title'>I'm looking for someone who...</h4>
                      <p>{dogRecord.desc_2}</p>
                    </Col>
                  </Row>

                </TabPanel>
                <TabPanel value='4'>
                  <Box sx={{marginBottom:5}}>
                  
                  
                  <Row className='upload-images-button'>
                   
                        <UploadImagesBtn setFiles={setFiles} />
                   
                      
                  </Row>
                  <Row>
                    <h4 className='photo-title'>Photos</h4>
                  </Row>
                  </Box>
                  <Box>
                    <Row>
                    <ProgressList files={files} dogId={dogId} />
                    </Row>
                  </Box>

                  <Box>
                   <Row>
                      <ImageLists images={images} dogId={dogId} />
                    </Row>
                    
                   
                  </Box>
                </TabPanel>
                </TabContext>
                </Box>
            </Row>
          </div>
    </Container>
  </ThemeProvider>
    
  )
}

export function DeleteDogRecordModal(props) {

  const { deleteDogRecord } = useDogRecordsContext()
  const {imageName} = props;
  const navigate = useNavigate()

  const handleOnDelete = async () => {
    const oldImageRef = ref(storage, `dogProfileImages/${imageName}`);
    // Delete the file
    deleteObject(oldImageRef).then(() => {
      // File deleted successfully
      // setImageDeleted(true)
    }).catch((error) => {
      // Uh-oh, an error occurred!
      console.error(error)
    });
    await deleteDogRecord(props.dogId)
    navigate('/admin-dashboard')

  }

  return (
    <Modal
      {...props}
      size="m"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton></Modal.Header>
      {/* modal body is the form to login the user */}
      <Modal.Body>
          <p>Are you sure you want to delete this dog record? This cannot be undone.</p>
          <Button variant="outline-danger" onClick={handleOnDelete}>Yes, Delete</Button>
          <Button variant="outline-light" onClick={props.onHide}>Cancel</Button>
      </Modal.Body>
    </Modal>
  )
}
export function ImageLists({images, dogId}){
  const [photoIndex, setPhotoIndex] = React.useState(0)
  const [isOpen, setIsOpen] = React.useState(false)
  console.log(images)
  useEffect(()=>{
    console.log(images)
  },[images])
  return (
  <>
  <ImageList  cols={5}>
      {images.map((item, index) => (
        <ImageListItem key={item.image_url}
        sx={{
          opacity: '.7',
          transition: 'opacity .3s linear',
          cursor: 'pointer',
          '&:hover': {opacity: 1}
        }}>
          <Options imageId={item.id} imageName = {item.image_name} dogId={dogId} />
          <img 
            src={`${item.image_url}?w=164&h=164&fit=crop&auto=format`}
            srcSet={`${item.image_url}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            alt={item.title}
            loading="lazy"
            
            onClick={()=>{
              setPhotoIndex(index)
              setIsOpen(true)
            }}
          />
          <Typography
          variant='body2'
          component='span'
          sx={{
            position: 'absolute',
            bottom: 0,
            left:0,
            color:'white',
            background: 'rgba(0,0,0, .3)',
            p: '5px',
            borderTopRightRadius: 8,
              
          }}
          >
            {moment(item?.created_at).fromNow()}
          </Typography>
        </ImageListItem>
      ))}
    </ImageList>
    {isOpen && (
      <LightBox 
      mainSrc = {images[photoIndex]?.image_url}
      nextSrc = {images[(photoIndex + 1)%images.length]?.image_url}
      prevSrc = {images[(photoIndex + images.length - 1)%images.length]?.image_url}
      onCloseRequest = {()=> setIsOpen(false)}
      onMoveNextRequest={() => setPhotoIndex((photoIndex + 1)%images.length)}
      onMovePrevRequest={()=>setPhotoIndex((photoIndex + images.length - 1 )%images.length)}
      imageTitle={images[photoIndex]?.image_name}
      />
    )}
  </>
  );
}

