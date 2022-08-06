import { ImageList } from '@mui/material';
import React from 'react';
import { useEffect } from 'react';
import ProgressItem from './ProgressItem';

import { create } from '@mui/material/styles/createTransitions';


export default function ProgressList ({ files, dogId }){

  // const [form, setForm] = React.useState({imageUrl: '', imageName: '', dogId: dogId})
  const [isLoading, setLoading] = React.useState(false)
  // console.log(form)
  // useEffect(()=>{
  //   const saveToDataBase = async()=>{
  //     console.log(form)
  //     images.forEach((image)=>{
  //       console.log('image.imageurl',image.image_url, 'image.imagename',image.image_url, 'form.imageurl',form.imageName, 'form.imagename',form.imageUrl)
  //       if (image.image_name === form.imageName || image.image_url === form.imageUrl){
  //         console.log(image.image_url, image.image_url, form.imageName, form.imageUrl)
  //         return setForm((existingForm)=> ({...existingForm, imageName: '', imageUrl: ''}))
          
  //       }
  //       })
  //     if (form.imageName === '' || form.imageUrl ===''){
  //       return
  //     }

       
  //     try {
  //       console.log('try...', form)
  //       await createImage(form)
  //       await setForm((existingForm)=> ({...existingForm, imageName: '', imageUrl: ''}))
  //     } catch (error) {
  //       console.error(error)
  //     }
  //   }
  //   saveToDataBase()
  // }, [form, createImage, images])
  return (
    <>
    <ImageList cols={5}>
      {files.map((file, index) => {
        return(
          <>
          <ProgressItem dogId={dogId}  isLoading={isLoading} setLoading={setLoading} file={file} key={index} />
          </>
        )
      })}
    </ImageList>
    </>
  );
};
