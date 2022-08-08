import React, { useEffect, useState } from 'react';
import { ref, deleteObject } from 'firebase/storage'
import { v4 } from 'uuid'
import { storage } from '../../firebase/firebase'
import uploadFileProgress from "../../firebase/uploadFileProgress";
// import uploadFileProgress from '../../../firebase/uploadFileProgress';
// import addDocument from '../../../firebase/addDocument';


const ProgressItem = ({ setLoading, image, setImageUpload, setForm, form}) => {
  const [progress, setProgress] = useState(100);
  const [imageURL, setImageURL] = useState(null);

  // const [imageUpload, setImageUpload] = React.useState(null)
  useEffect(()=>{
    const handleDelete = async () => {
      try {
      //   await deleteFile(`gallery/${currentUser.uid}/${imageId}`);
          const deleteImageRef = ref(storage, `dogProfileImages/${form.image_name}`)
          await deleteObject(deleteImageRef).then(async()=>{
            setForm((existingForm) => ({ ...existingForm, image_url: '', image_name: '' }))
          }).catch((error)=>{
              console.error(error)
          })
      } catch (error) {
        alert(error.message);
        console.error(error);
      }
    };
    
    const uploadImage = async() =>{
      if(form.image_name !== '' || form.image_url !==''){
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
        setForm((existingForm) => ({ ...existingForm, image_url: url, image_name: imageName }))
        setImageURL(null)
        setImageUpload([])
        setLoading(true)
      } catch (error) {
        alert(error.message)
        console.error(error)
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

