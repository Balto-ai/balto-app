import * as React from 'react';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Tooltip from '@mui/material/Tooltip';
import { IconButton } from '@mui/material';
import { Delete, MoreVert } from '@mui/icons-material';
import { storage } from '../../firebase/firebase';
import { deleteObject, ref } from 'firebase/storage';
import { useImageContext } from '../../contexts/images';
// import deleteDocument from '../../firebase/deleteDocument';
// import deleteFile from '../../firebase/deleteFile';

export default function Options({ imageId, imageName, dogId }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const {deleteImage, fetchAllImages} = useImageContext()
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleDelete = async () => {
    try {
    //   await deleteFile(`gallery/${currentUser.uid}/${imageId}`);
        const deleteImageRef = ref(storage, `dogImages/dogId/${dogId}/${imageName}`)
        await deleteObject(deleteImageRef).then(async()=>{
            await deleteImage(imageId, dogId)
            await fetchAllImages(dogId)
        }).catch((error)=>{
            console.error(error)
        })
    } catch (error) {
      alert(error.message);
      console.log(error);
    }
  };
  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="Options">
          <IconButton
            onClick={handleClick}
            sx={{
              position: 'absolute',
              right: 0,
              top: 0,
              color: 'white',
              background: 'rgba(0,0,0,.3)',
            }}
          >
            <MoreVert fontSize="large" />
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleDelete}>
          <ListItemIcon>
            <Delete />
          </ListItemIcon>
          Delete
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}