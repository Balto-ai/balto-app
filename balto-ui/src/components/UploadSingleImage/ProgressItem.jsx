import { BsCheckCircle } from "react-icons/bs";
import { Box, ImageListItem } from '@mui/material';
import { IconContext } from "react-icons";
import React, { useEffect, useState } from 'react';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage'
import { v4 } from 'uuid'
import { storage } from '../../firebase/firebase'
import { create } from "@mui/material/styles/createTransitions";
import uploadFileProgress from "../../firebase/uploadFileProgress";
// import uploadFileProgress from '../../../firebase/uploadFileProgress';
// import addDocument from '../../../firebase/addDocument';


const ProgressItem = ({ setLoading, image, setImageUpload, setForm, form, setShow}) => {
  const [progress, setProgress] = useState(100);
  const [imageURL, setImageURL] = useState(null);

  // const [imageUpload, setImageUpload] = React.useState(null)
  console.log(form.imageName, form.imageUrl)
  console.log(image)
  useEffect(()=>{
    const handleDelete = async () => {
      try {
      //   await deleteFile(`gallery/${currentUser.uid}/${imageId}`);
          const deleteImageRef = ref(storage, `dogProfileImages/${form.imageName}`)
          await deleteObject(deleteImageRef).then(async()=>{
            setForm((existingForm) => ({ ...existingForm, imageUrl: '', imageName: '' }))
          }).catch((error)=>{
              console.error(error)
          })
      } catch (error) {
        alert(error.message);
        console.log(error);
      }
    };
    
    const uploadImage = async() =>{
      if(form.imageName !== '' || form.imageUrl !==''){
        await handleDelete();
      }
      const imageName = v4() + "." + image.name.split('.').pop()
      try {
        const url = await uploadFileProgress(
          image,
          `dogProfileImages/`,
          imageName,
          setProgress
        )
        setForm((existingForm) => ({ ...existingForm, imageUrl: url, imageName: imageName }))
        setImageURL(null)
        setImageUpload([])
        setLoading(true)
      } catch (error) {
        alert(error.message)
        console.log(error)
      }
    }
   
    setImageURL(URL.createObjectURL(image))
    uploadImage()

  }, [image])
  return (
    ( 
     <>
     </>
    )
  );
};

export default ProgressItem;

