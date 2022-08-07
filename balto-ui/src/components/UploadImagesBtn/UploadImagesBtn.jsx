import React from 'react'
import Button from '@mui/material/Button';




export default function UploadImages({setFiles}) {


  const handleChange = (e) => {
    setFiles([...e.target.files])
  }
  return (
        <>
         <Button variant="contained" component="label" >
          Upload
          <input hidden accept="image/*" multiple type="file" onChange={handleChange} />
        </Button>
        </>
  )
}
