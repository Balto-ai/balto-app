import React from 'react'
import Dog from './image/Error Dog.svg'
import { Box } from '@mui/material';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import "./NotFound.css"
export default function NotFound() {
  return (
    <Box  px={{xs: 3, sm: 10}} color='black' py={{xs: 8, sm:12}}>
      <Container maxWidth='sm'>
        <Grid justifyContent='center' alignItems='center' textAlign='center'>
          <Grid item>
          
            <Box>
              <h4 className='nf-title'>Page not found</h4>
              <span>
              Go back to <Link  href="/" underline="hover">main page</Link>
              </span>
            
            <img className='doggie-nf' src={Dog} alt="Not Found Page"></img>
            </Box>
          
          </Grid>
          <Grid item>
            <Box>
            
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}
