import React from 'react'
import "./LandingPage.css"
import { useState, useEffect } from 'react'
import {FiArrowRight} from 'react-icons/fi'
import Hero from "./image/Adopt a pet-amico 2.svg"
import {useNavigate} from 'react-router-dom'
import DogCard from '../DogCard/DogCard'
import { Container } from '@mui/material';
import { Button } from '@mui/material';
import {Box} from '@mui/material'
import {Grid} from '@mui/material'
import {AiOutlineDoubleRight} from 'react-icons/ai'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ApiClient from '../../services/ApiClient'

//change theme colors to change the button mui colors
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
export default function LandingPage() {
  const navigate = useNavigate();
  return (
  <ThemeProvider theme={theme}> 
    <Box px={{xs: 3, sm: 12}} color='black' py={{xs: 5, sm:12}} bgcolor='rgb(244, 244, 244);'>
      <Container maxWidth='lg'>
        <Grid alignItems='center' justifyContent='center' container  direction="row" spacing={5}>
          <Grid item xs={5} sm={5} >
            {/* tagline; we can modify later if wanted */}
            <Box>
              <h1 className='dogs-avail'>Help Change a Life, </h1>
              <h1>One Paw at a Time</h1>
            </Box>
            <Box><p className='landing-para'>You can’t change a dog’s past, but you can rewrite their future</p></Box>
            <Box>
              <Button size='large' variant="outlined" href="/search" endIcon={<AiOutlineDoubleRight />}>Start Exploring</Button>
            </Box>
          </Grid>
          <Grid item xs={5} sm={7} >
            {/* hero image */}
            <Box>
              <img src={Hero} alt="hero-dog-pic"></img>
              </Box>
          </Grid>
        </Grid>
        <Grid container direction='column' alignItems='center' justifyContent='center' spacing={5}>
          <Grid item>
            <h1 className='dogs-avail'>Dogs Available for Adoption</h1>
          </Grid>
          <Grid item>
            <LandingDogGrid/>
          </Grid>
          <Grid item>
            <Button color='primary' size='large' variant="contained" onClick={()=>{navigate('/search')}}>See More</Button>
          </Grid>
        </Grid>
       
          
      </Container>
    </Box>
 </ThemeProvider>  
  )
}

export function LandingDogGrid(){
  //constant variables for useEffect
  const [dogResults, setDogResults] = useState([]) 
  const [error, setError] = useState(null)
  //empty filter used to fetch dogs from api client
  const filters = {
    breed: [],
    size: [],
    sex: [],
    kidFriendly: false,
    strangerFriendly: false,
    dogFriendly: false,
    catFriendly: false,
    noviceFriendly: false,
    distance: '' || null,
    shelterIds: []
  }
  //fetch dogs
  useEffect(() => {
    const fetchDogResults = async () => {
      const { data, error } = await ApiClient.fetchDogs(filters);
      if (data?.dogResults) {
        setDogResults(data.dogResults)
        setError(null)
      }
      if (error) setError(error);
    };
    fetchDogResults()
  }, [])
  //variable that stores only 4 dogs for the landing page
  const dogs = dogResults.slice(0,4);
  return (
    <div className="dog-grid">
        {dogs.map((dog)=>{
          return(
            <DogCard key={dog.id} dogId={dog.dog_id} name={dog.name} breed={dog.breed} dob={dog.dob} imgUrl={dog.image_url}/>
          )
        })}
    </div>
  )
}