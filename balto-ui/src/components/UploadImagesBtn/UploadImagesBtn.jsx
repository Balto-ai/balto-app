import React from 'react'
import Button from '@mui/material/Button';
import { useRef } from 'react'



export default function UploadImages({setFiles}) {
  const fileRef = useRef()
  const handleClick = () => {
    fileRef.current.onClick()
  }
  const handleChange = (e) => {
    setFiles([...e.target.files])
    fileRef.current.value = null
  }
  return (
        <>
         <Button variant="contained" component="label" onClick={handleClick}>
          Upload
          <input inputref={fileRef} hidden accept="image/*" multiple type="file" onChange={handleChange} />
        </Button>
        </>
  )
}
