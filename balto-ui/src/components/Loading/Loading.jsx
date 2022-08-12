import React from 'react'
import Spinner from 'react-bootstrap/Spinner';
import Backdrop from '@mui/material/Backdrop';
import './Loading.css'

export default function Loading() {
  return (
    <div className="loading-spinner">
      <Backdrop
        open={true}
        sx={{ backgroundColor: 'rgba(255, 255, 255, 0.4)', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Spinner animation="border" variant="primary" />
      </Backdrop>
      {/* <Spinner animation="border" variant="primary" /> */}
    </div>
  )
}
