import React from 'react'
import { Box } from '@mui/material';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import ErrorDog from '../LoginToAccess/image/Error Naughty Dog.svg'

export default function AccessForbidden() {
  return (
    <Box  px={{xs: 3, sm: 10}} color='black' py={{xs: 8, sm:12}}>
    <Container maxWidth='sm'>
      <Grid justifyContent='center' alignItems='center' textAlign='center'>
        <Grid item>
        
          <Box>
            <h4 className='nf-title'>Access forbidden</h4>
            <span>
            <Link  href="/login" underline="hover">Login</Link> to gain access to this page
            </span>
          </Box>
        </Grid>
        <Grid item>
          <Box sx={{marginBottom:10}}>
          <img width={300} height={300} className='doggie-nf' src={ErrorDog} alt="Not Found Page"></img>
          </Box>
        </Grid>
      </Grid>
    </Container>
  </Box>
  )
}
