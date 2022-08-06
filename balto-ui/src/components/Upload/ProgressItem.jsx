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


const ProgressItem = ({ file, isLoading, setLoading, form, setForm, dogId}) => {
  const [progress, setProgress] = useState(100);
  const [imageURL, setImageURL] = useState(null);
  // const [imageUpload, setImageUpload] = React.useState(null)
  
  
  useEffect(()=>{
    const uploadImage = async() =>{
      const imageName = v4() + "." + file.name.split('.').pop()
      try {
        const url = await uploadFileProgress(
          file,
          `dogImages/${dogId}`,
          imageName,
          setProgress
        )
        console.log(url)
        setImageURL(null)
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
export function UploadtoFirebase({setForm, file, setLoading, isLoading, form, setIndex, fileIndex}){
  console.log(form.imageUrl)
  useEffect(()=>{
      const uploadImage = async() => {
        if (file === null) return;
        if (form.imageName === '' && form.imageUrl === ''){
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
      }
      if (!isLoading){
        uploadImage()
        setIndex((oldFiles) => [...oldFiles, {...form}])
        console.log(fileIndex)
      }
    },[])
}
