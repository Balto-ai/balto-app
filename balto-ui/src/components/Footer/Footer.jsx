import React from 'react'
import "./Footer.css"
import { Box } from '@mui/material';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import DogIcon from './icons/paw (1).png'



import { BsFillTelephoneFill, BsFillEnvelopeFill, BsFillHouseDoorFill, BsFacebook, BsTwitter, BsGoogle, BsInstagram, BsLinkedin, BsGithub } from "react-icons/bs";

export default function Footer() {


  return (
    <footer>

      <div className="footer primary-container" >

        {/* grid container 1: info columns */}
        <Grid container direction='row' justifyContent='space-between'>

          {/* Grid container that contains the columns of company info and resources */}
          <Grid item xs={12} sm="auto">
            <Box textAlign='left' pb={{ sm: 1 }} className='footer-column' sx={{ fontWeight: 700, color: 'white', fontSize: '20px' }}><img className='dog-icon' src={DogIcon} alt='dog house icon' width='20px' height='20px'></img>BALTO</Box>
            <Box><span className='footer-content'><i className='company-icon'><BsFillHouseDoorFill /></i> Los Angeles, CA 90210, US</span></Box>
            <Box><span className='footer-content'><i className='company-icon'><BsFillEnvelopeFill /></i> balto-ai@balto.com</span></Box>
            <Box pb={{ xs: 3 }}><span className='footer-content'><i className='company-icon'><BsFillTelephoneFill /></i> + 1 (234) 567-8901</span></Box>
          </Grid>

          <Grid item xs={12} sm="auto">
            <Box pb={{ sm: 1 }} className='footer-column' sx={{ fontWeight: 700, color: 'white', fontSize: '20px' }}>OVERVIEW</Box>
            <Box><span className='footer-content'>About Us</span></Box>
            <Box><span className='footer-content'>Privacy Policy</span></Box>
            <Box pb={{ xs: 3 }}><span className='footer-content'>Terms of Service</span></Box>
          </Grid>

          <Grid item xs={12} sm="auto">
            <Box pb={{ sm: 1 }} className='footer-column' sx={{ fontWeight: 700, color: 'white', fontSize: '20px' }}>DEVELOPERS</Box>
            <Box><span className='footer-content'>Annesa Tran</span></Box>
            <Box><span className='footer-content'>Christy Xiong</span></Box>
            <Box pb={{ xs: 3 }}><span className='footer-content'>Charles Xu</span></Box>
          </Grid>

          <Grid item xs={12} sm="auto">
            <Box pb={{ sm: 1 }} className='footer-column' sx={{ fontWeight: 700, color: 'white', fontSize: '20px' }}>RESOURCES</Box>
            <Box><Link id='footer-links' className='footer-content' href='/search' color='inherit'>Find A Dog</Link></Box>
            <Box><Link id='footer-links' className='footer-content' href='/register' color='inherit'>Register for Free</Link></Box>
            <Box><Link id='footer-links' className='footer-content' href='/star' color='inherit'>View Favorites</Link></Box>
          </Grid>

        </Grid>

        {/* gridcontainer 2: displays copyright and social media */}
        <Grid className="copyright-line" container direction='row' justifyContent='space-between' alignItems='center' pt={{ xs: 5, sm: 2 }} pb={{ xs: 5, sm: 3 }}>

          <Grid item color='white' textAlign='center'>© 2022 Copyright Balto &nbsp; &nbsp; &nbsp; Graphics courtesy of Storyset</Grid>

          <Grid item container justifyContent='right' px={{ xs: 3, sm: 3 }} xs={5} sm={4.75} gap={5} >
            <Box><a href='#' className='socials'><BsFacebook /></a></Box>
            <Box><a href='#' className='socials'><BsTwitter /></a></Box>
            <Box><a href='#' className='socials'><BsGoogle /></a></Box>
            <Box><a href='#' className='socials'><BsInstagram /></a></Box>
            <Box><a href='#' className='socials'><BsLinkedin /></a></Box>
            <Box><a href='https://github.com/Balto-ai/balto-app' className='socials'><BsGithub /></a></Box>
          </Grid>


        </Grid>

      </div>
    </footer>
  )

}