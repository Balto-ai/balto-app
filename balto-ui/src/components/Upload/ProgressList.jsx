import { ImageList } from '@mui/material';
import React from 'react';
import { useEffect } from 'react';
import ProgressItem from './ProgressItem';
import { useImageContext } from '../../contexts/images';


export default function ProgressList ({ files, dogId }){
  const [form, setForm] = React.useState({imageUrl: '', imageName: '', dogId: dogId})
  const [isLoading, setLoading] = React.useState(false)
  console.log(form)
  return (
    <>
    <ImageList cols={5}>
      {files.map((file, index) => {
        return(
          <>
          <ProgressItem dogId={dogId}  isLoading={isLoading} setLoading={setLoading} file={file} form={form} setForm={setForm} key={index} />
          </>
        )
      })}
    </ImageList>
    </>
  );
};
export function SubmitToDatabase ({form}){
  const {createImage} = useImageContext(); 
  useEffect(()=>{
    const submitForm = async() => {
      return await createImage(form)
    }
    submitForm()
  })
}

