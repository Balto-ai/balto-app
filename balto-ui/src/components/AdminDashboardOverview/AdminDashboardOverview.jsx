import React from 'react'
import { Grid, Box, Container,Paper } from '@mui/material'
import { useDogRecordsContext } from '../../contexts/dog-records'
import {useAdoptionInquiriesContext} from '../../contexts/adoption-inquiries'
import { DogRecordsContextProvider } from '../../contexts/dog-records'
import { AdoptionInquiriesContextProvider } from '../../contexts/adoption-inquiries'
import { StarredContextProvider, useStarredContext } from '../../contexts/starred'
import { useNavigate } from 'react-router-dom'
import DogIcon from './images/dog.png'
import { Carousel } from 'react-bootstrap'
import Inquiry from './images/conversation.png'
import Table from '@mui/material/Table';
import Popover from 'react-bootstrap/Popover';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import './AdminDashboardOverview.css'
import Calendar from '../Calendar/Calendar'

import UpdateFeed from '../UpdateFeed/UpdateFeed'

import { useState, useEffect } from 'react'

export default function AdminDashboardOverviewContainer(){
return(
  <DogRecordsContextProvider>
    <AdoptionInquiriesContextProvider>
      <StarredContextProvider>
        <AdminDashboardOverview/>
      </StarredContextProvider>
    </AdoptionInquiriesContextProvider>
  </DogRecordsContextProvider>
)
}

export function AdminDashboardOverview() {
  const {allAdoptionInquiries} = useAdoptionInquiriesContext()
  const {dogRecords} = useDogRecordsContext();
  const [recentInquiries, setRecentInquiries] = useState([])
  const [inquiryIsEmpty, setInquiryIsEmpty] = useState(false)
  const navigate = useNavigate();
  const emptyInquiry = [{created_at: '', id:0, user_first_name: '', email: '', phone_number: '', zipcode: ''}]

  console.log(allAdoptionInquiries,dogRecords, recentInquiries)
  useEffect(()=>{
    const fetchRecentInquiries = () =>{
      const inquiries = allAdoptionInquiries.filter((inquiry)=>{
        const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)  
        let date = new Date(inquiry.created_at)
        return date > sevenDaysAgo
      })
      if (inquiries.length === 0){
        setInquiryIsEmpty(true)
        setRecentInquiries(emptyInquiry)
      }
      setRecentInquiries(inquiries)
      console.log(inquiries, recentInquiries)
    }
    if (recentInquiries.length === 0 || !inquiryIsEmpty){
      fetchRecentInquiries();
      console.log('entered 1')
    }
  },[recentInquiries, allAdoptionInquiries])
  console.log(recentInquiries)
  return (
    <Grid container direction='column' gap={3}>
      <h1>Dashboard</h1>
     <Grid container direction='row' gap={3}>
      <Grid item>
        <Grid container columnGap={3} gap={3} sx={{marginBottom:5}}>
          <Grid item>
          <Paper sx={{
              boxShadow:'var(--card-box-shadow)',
              borderRadius:'var(--border-radius-small)',
              width: 325,
              height: 150,
              backgroundColor: 'white',
              borderLeft: 'solid',
              borderWidth:5,
              borderColor:'#FEC272',
              opacity: 1,
              transition: 'opacity .3s linear',
              '&:hover': {
                cursor:'pointer',
                opacity:0.8
            }
            }}
            elevation={0}
            onClick={()=>{navigate('/admin-dashboard/dog-record')}}
            >
              <Grid container sx={{height:'100%', marginLeft: 2}} direction='row'  alignItems='center' gap={3} >
                <Grid direction='column' item xs={8}>
                  <Box  justifyContent='center' alignItems='center' sx={{fontWeight:700, verticalAlign:'middle', color:'#697bbb'}}>Dogs</Box>
                  <Box item>{dogRecords.length}</Box>
                </Grid>
                <Grid item justifyContent='center' alignItems='center'> 
                  <Box >
                    <img height={50} width='auto' src={DogIcon} alt='inquiry'></img>
                  </Box>
                </Grid>
              </Grid>
            </Paper>

          </Grid>
          <Grid item>
          <Paper sx={{
              boxShadow:'var(--card-box-shadow)',
              borderRadius:'var(--border-radius-small)',
              width: 325,
              height: 150,
              backgroundColor: 'white',
              borderLeft: 'solid',
              borderColor:'#FEC272',
              borderWidth:5,
              opacity: 1,
              transition: 'opacity .3s linear',
              '&:hover': {
                cursor:'pointer',
                opacity:0.8
              }
            }}
            elevation={0}
            onClick={()=>{navigate('/admin-dashboard/adoption-inquiries')}}
            >
              <Grid container sx={{height:'100%', marginLeft: 2}} direction='row'  alignItems='center' gap={3} >
                <Grid direction='column' item xs={8}>
                  <Box  justifyContent='center' alignItems='center' sx={{fontWeight:700, verticalAlign:'middle', color:'#697bbb'}}>Adoption Inquiries</Box>
                  <Box item>{allAdoptionInquiries.length}</Box>
                </Grid>
                <Grid item justifyContent='center' alignItems='center'> 
                  <Box >
                    <img height={50} width='auto' src={Inquiry} alt='inquiry'></img>
                  </Box>
                </Grid>
              </Grid>
            </Paper>

          </Grid>
        </Grid>
        <Grid container gap={3} columnGap={3}>
          <Grid item>
          <Box>
          <h4>Recent Adoption Inquiries</h4>
        </Box>
        <Box >
        <AdoptionTable recentInquiries={recentInquiries}  />
        </Box>

          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Grid container gap={3}>
          <Grid item>
          </Grid>
          <Grid item>
            <Grid container gap={3}>
              <Grid item>
                <Calendar className="custom-calendar" />
              </Grid>
              <Grid item>
                <UpdateFeed updateLimit={5}/>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
     </Grid>
    </Grid>
  )
}


export function NewDogs({dogRecords}){
  const [recentDogs, setRecentDogs] = useState([])
  const [dogsIsEmpty, setDogsIsEmpty] = useState(false)
  useEffect(()=>{
    const fetchRecentDogs = () =>{
      const dogs = dogRecords.filter((dog)=>{
        const sevenDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)  
        let date = new Date(dog.date_entered)
        console.log(date, sevenDaysAgo, dog)
        return date > sevenDaysAgo
      })
      if (dogs.length === 0){
        setDogsIsEmpty(true)
      }
      // setRecentDogs(dogs)
      console.log(dogs, recentDogs)
    }
    if (recentDogs.length === 0 || !dogsIsEmpty){
      fetchRecentDogs();
    }
  }, [dogRecords, dogsIsEmpty, recentDogs])
}

export function AdoptionTable({recentInquiries}){
  const rows = [...recentInquiries]
  console.log(rows, recentInquiries)
  return (
    <TableContainer component={Paper} elevation={0}
      sx={{
        boxShadow:'var(--card-box-shadow)',
        borderRadius:'var(--border-radius-small)'
        }}
      >
      <Table
        sx={{}}
       aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Dog</TableCell>
            <TableCell align="left">Name</TableCell>
            <TableCell align="left">Email</TableCell>
            <TableCell align="left">Phone Number</TableCell>
            <TableCell align="left">Zip Code</TableCell>
            <TableCell align="left">Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => {
            let date = new Date(row.created_at).toDateString()
            console.log(date)
          return(
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.dog_name}
              </TableCell>
              <TableCell align="right" sx={{border:'none'}}>{row.user_first_name}</TableCell>
              <TableCell align="left" sx={{border:'none'}}>{row.email}</TableCell>
              <TableCell align="left" sx={{border:'none'}}>{row.phone_number || "N/A"}</TableCell>
              <TableCell align="left" sx={{border:'none'}}>{row.zipcode}</TableCell>
              <TableCell align="left" sx={{border:'none'}}>{date !== 'Invalid Date' ? date : null}</TableCell>
            </TableRow>
          )})}
        </TableBody>
      </Table>
    </TableContainer>
  );
}