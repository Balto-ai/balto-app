import { ImageList } from '@mui/material';
import React from 'react';
import ProgressItem from './ProgressItem';

const ProgressList = ({ files, dogId }) => {
  return (
    <ImageList cols={5}>
      {files.map((file, index) => (
        <ProgressItem file={file} dogId={dogId} key={index} />
      ))}
    </ImageList>
  );
};

export default ProgressList;