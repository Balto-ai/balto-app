import { ImageList } from '@mui/material';
import React from 'react';
import ProgressItem from './ProgressItem';

import { create } from '@mui/material/styles/createTransitions';


export default function ProgressList ({ files, dogId, setFiles }){

  const [isLoading, setLoading] = React.useState(false)
  return (
    <>
    <ImageList cols={5}>
      {files.map((file, index) => {
        return(
          <>
          <ProgressItem setFiles={setFiles} dogId={dogId}  isLoading={isLoading} setLoading={setLoading} file={file} key={index} />
          </>
        )
      })}
    </ImageList>
    </>
  );
};
