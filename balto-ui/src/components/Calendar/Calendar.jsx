import React from 'react'
import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './Calendar.css'
import { Grid, Box, Container,Paper } from '@mui/material'

export default function ReactCalendar(){
    const [date, setDate] = useState(new Date());
    return(
        <Paper elevation={0} sx={{borderRadius: 'var(--border-radius-small)', boxShadow: 'var(--card-box-shadow)'}}>
            <Calendar onChange={setDate} value={date} />
        </Paper>
             
        
    )
}