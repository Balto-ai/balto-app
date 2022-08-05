import { ImageList } from '@mui/material';
import React from 'react';
import ProgressItem from './ProgressItem';

const ProgressList = ({ files }) => {
  return (
    <ImageList cols={5}>
      {files.map((file, index) => (
        <ProgressItem file={file} key={index} />
      ))}
    </ImageList>
  );
};

export default ProgressList;