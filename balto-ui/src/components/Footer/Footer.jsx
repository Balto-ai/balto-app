import React from 'react'
import "./Footer.css"
import { Box } from '@mui/material';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import DogIcon from './icons/paw (1).png'



import {BsFillTelephoneFill,BsFillEnvelopeFill,BsFillHouseDoorFill,BsFacebook, BsTwitter, BsGoogle, BsInstagram, BsLinkedin, BsGithub} from "react-icons/bs";

export default function Footer() {
  return(
    <footer>
      <Box px={{xs: 3, sm: 10}} color='white' py={{xs: 5, sm:7}} bgcolor='#908AF8'>
        <Container  maxWidth="lg">
          <Grid  justifyContent='center' container spacing={5}  textAlign='left'>
            {/* Grid Container that contains the social media icons */}
            <Grid gap={5} container  direction='row'  justifyContent='center' alignItems='center' pt={{xs: 5, sm: 2}} pb={{xs: 5, sm: 3}}>
              <Grid item xs={7} sm={3.5}><span className='social-span'>Get connected with us on social networks:</span></Grid>
              <Grid item xs={12} sm={4.75}>
          <a href='facebook' className='socials'>
            <BsFacebook/>
          </a>
          <a href='twitter' className='socials'>
            <BsTwitter/>
          </a>
          <a href='google' className='socials'>
            <BsGoogle/>
          </a>
          <a href='instagram' className='socials'>
            <BsInstagram/>
          </a>
          <a href='linkedin' className='socials'>
            <BsLinkedin/>
          </a>
          <a href='github' className='socials'>
            <BsGithub/>
          </a>
</Grid>
            </Grid>
            {/* Grid container that contains the columns of company info and resources */}
            <Grid container justifyContent='center' gap={20}>
            <Grid item xs={5} sm={2.25} >
              <Box textAlign='left' pb={{xs: 5, sm: 1}} className='footer-column' sx={{fontWeight: 700, color: 'white', fontSize: '20px'}}><img className='dog-icon' src={DogIcon} alt='dog house icon' width='20px' height='20px'></img>BALTO</Box>
              <Box>
              <span className='footer-content'><i className='company-icon'><BsFillHouseDoorFill/></i> New York, NY 10012, US</span>
              </Box>
              <Box>
              <span className='footer-content'><i className='company-icon'><BsFillEnvelopeFill/></i> balto-ai@balto.com</span>
              </Box>
              <Box>
              <span className='footer-content'><i ><BsFillTelephoneFill/></i> + 01 234 567 89</span>
              </Box>
            </Grid>
            <Grid item xs={5} sm={1.5} >
              <Box pb={{xs: 5, sm: 1}} className='footer-column' sx={{fontWeight: 700, color: 'white', fontSize: '20px'}}>OVERVIEW</Box>
              <Box>
              <span className='footer-content'>About Us</span>
              </Box>
              <Box>
              <span className='footer-content'>Privacy Policy</span>
              </Box>
              <Box>
              <span className='footer-content'>Terms of Service</span>
              </Box>
            </Grid>
            <Grid item xs={12} sm={1.5} >
              <Box pb={{xs: 5, sm: 1}} className='footer-column' sx={{fontWeight: 700, color: 'white', fontSize: '20px'}}>RESOURCES</Box>
              <Box>
              <Link id='footer-links' className='footer-content' href='/search' color='inherit'>Find A Dog</Link>
              </Box>
              <Box>
              <Link id='footer-links' className='footer-content' href='/search' color='inherit'>Take A Quiz</Link>
              </Box>
              <Box>
              <Link id='footer-links' className='footer-content' href='/register' color='inherit'>Register for Free</Link>
              </Box>
            </Grid>
          </Grid>
        </Grid>  
          {/* Box that displays copyright */}
          <Box color='white' textAlign='center' pt={{xs: 5, sm: 10}} pb={{xs: 3, sm: 0}}>
          © 2022 Copyright Balto
          </Box>
        </Container>
      </Box>
    </footer>
  )
}