import { BsCheckCircle } from "react-icons/bs";
import { Box, ImageListItem } from '@mui/material';
import { IconContext } from "react-icons";
import React, { useEffect, useState } from 'react';
import { CheckCircleOutline } from '@mui/icons-material';
import CircularProgressWithLabel from './CircularProgressWithLabel';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { v4 } from 'uuid'
import { storage } from '../../firebase/firebase'
import { create } from "@mui/material/styles/createTransitions";
import { useImageContext } from '../../contexts/images';
import uploadFileProgress from "../../firebase/uploadFileProgress";
// import uploadFileProgress from '../../../firebase/uploadFileProgress';
// import addDocument from '../../../firebase/addDocument';


const ProgressItem = ({ file, isLoading, setLoading, dogId, setFiles}) => {
  const [progress, setProgress] = useState(100);
  const [imageURL, setImageURL] = useState(null);
  const {createImage} = useImageContext()
  // const [imageUpload, setImageUpload] = React.useState(null)
  
  
  useEffect(()=>{
    const uploadImage = async() =>{
      const imageName = v4() + "." + file.name.split('.').pop()
      try {
        const url = await uploadFileProgress(
          file,
          `dogImages/dogId/${dogId}`,
          imageName,
          setProgress
        )
        const imageInfo = {
          imageUrl: url,
          imageName: imageName,
          dogId: dogId
        }
        await createImage(imageInfo)
        setImageURL(null)
        setFiles([])
      } catch (error) {
        alert(error.message)
        console.log(error)
      }
    }
   
    setImageURL(URL.createObjectURL(file))
    uploadImage()

  }, [file])
  return (
    ( 
     <>
      {/* <UploadtoFirebase  form={form} isLoading = {isLoading}setForm={setForm} setLoading={setLoading} file={file}  /> */}
     {imageURL &&  
     <ImageListItem cols={1} rows={1}>
        <img src={imageURL} alt="gallery" loading="lazy" />
        <Box sx={backDrop}>
          {progress < 100 ? (
            <CircularProgressWithLabel value={progress} />
          ) : (
            <CheckCircleOutline
            sx={{ width: 60, height: 60, color: 'lightgreen' }}
            />
          )}
        </Box>
      </ImageListItem>}
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
    <IconContext.Provider value={{width:60, height: 60, color: 'lightgreen'}}>
      <BsCheckCircle/>
    </IconContext.Provider>
  )
}
