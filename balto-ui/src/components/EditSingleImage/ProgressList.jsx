import { ImageList } from '@mui/material';
import React from 'react';
import ProgressItem from './ProgressItem';


export default function ProgressList ({ setLoading, form, imageUpload, setImageUpload, setForm}){
  return (
    <>
    <ImageList>
      {imageUpload.map((image) => {
        return(
          <>
          <ProgressItem setLoading={setLoading} form={form} setImageUpload={setImageUpload} setForm={setForm} image={image} key={image.name} />
          </>
        )
      })}
    </ImageList>
    </>
  );
};
