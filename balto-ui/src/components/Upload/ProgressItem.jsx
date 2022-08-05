import { BsCheckCircle } from "react-icons/bs";
import { Box, ImageListItem } from '@mui/material';
import { IconContext } from "react-icons";
import React, { useEffect, useState } from 'react';
import CircularProgressWithLabel from './CircularProgressWithLabel';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { v4 } from 'uuid'
import { storage } from '../../firebase/firebase'
// import uploadFileProgress from '../../../firebase/uploadFileProgress';
// import addDocument from '../../../firebase/addDocument';


const ProgressItem = ({ file, dogId }) => {
  const [progress, setProgress] = useState(0);
  const [imageURL, setImageURL] = useState(null);
  // const [imageUpload, setImageUpload] = React.useState(null)
  const [form, setForm] = React.useState({imageUrl: '', imageName: '', dogId: dogId})
  const [isLoading, setLoading] = React.useState(false)
  useEffect(()=>{
    
  }, [file])
  return (
    ( 
     <>
      <UploadtoFirebase isLoading = {isLoading}setForm={setForm} setLoading={setLoading} file={file}  />
      <ImageListItem cols={1} rows={1}>
        <img src={imageURL} alt="gallery" loading="lazy" />
        <Box sx={backDrop}>
          {progress < 100 ? (
            <CircularProgressWithLabel value={progress} />
          ) : (
            <CircleCheck/>
          )}
        </Box>
      </ImageListItem>
     </>
    )
  );
};

export default ProgressItem;

const backDrop = {
  position: 'absolute',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'rgba(0,0,0, .5)',
};
export function CircleCheck(){
  return(
    <IconContext.Provider value={{width: 60, height: 60, color: 'lightgreen'}}>
      <BsCheckCircle/>
    </IconContext.Provider>
  )
}
export function UploadtoFirebase({setForm, file, setLoading, isLoading}){
    useEffect(()=>{
      const uploadImage = () => {
        if (file === null) return;
      
        let imageName = file.name + v4();
        setForm((existingForm) => ({...existingForm, imageName: imageName}))
        const imageRef = ref(storage, `dogImages/${imageName}`);
        uploadBytes(imageRef, file).then((snapshot)=>{
          getDownloadURL(snapshot.ref).then(async(url)=>{
            setForm((existingForm) => ({ ...existingForm, imageUrl: url }))
          })
        })
        setLoading(true)
      }

      if (isLoading === false){
        uploadImage()
      }
    })
}
