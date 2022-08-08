import React from 'react'
import Button from '@mui/material/Button';




export default function UploadImages({isLoading, show, setImageUpload}) {


  const handleChange = (e) => {
    setImageUpload([e.target.files[0]])
  }
  return (
        <>
        {!isLoading ?  
        <Button sx={{backgroundColor: '#908AF8'}} className='upload-btn' variant="contained" component="label" >
          Upload
          <input hidden accept="image/*"  type="file" onChange={handleChange} />
        </Button>:  <Button sx={{backgroundColor: '#908AF8'}} className='upload-btn' variant="contained" component="label" >
        Loading...  
        </Button>}
        </>
  )
}