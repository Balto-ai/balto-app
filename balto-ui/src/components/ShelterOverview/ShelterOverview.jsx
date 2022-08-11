import React from 'react'
import { useDogRecordsContext } from '../../contexts/dog-records'
import { useComponentContext } from '../../contexts/component'
import { useNavigate } from 'react-router-dom'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Button from 'react-bootstrap/Button'
import defaultImage from '../../assets/default-image.svg'
import { Searchbar } from '../CustomDataGrid/CustomDataGrid'
import CustomDataGrid from '../CustomDataGrid/CustomDataGrid'
import 'bootstrap/dist/css/bootstrap.min.css'
import './ShelterOverview.css'
import { storage } from '../../firebase/firebase'
import { ref, deleteObject } from 'firebase/storage'
import Modal from 'react-bootstrap/Modal'
import { useState } from 'react'
import { useEffect } from 'react'

export default function ShelterOverview() {

    const { dogRecords, error, isLoading, getAgeGroup } = useDogRecordsContext()
    const navigate = useNavigate()
    const [searchQuery, setSearchQuery] = React.useState("")
    const [modalShow, setModalShow] = React.useState(false)
    // filter dogs based on search query
    let dogRecordsToRender = [...dogRecords]
    if (searchQuery !== "") {
        dogRecordsToRender = dogRecordsToRender.filter(dogRecord => dogRecord.name.toLowerCase().includes(searchQuery.toLowerCase()))
    }
    
    const rows = [...dogRecordsToRender]
    const columns = [
        { field: 'name', headerName: 'Name', width: 170,
          renderCell: (params) =>
            <>
              <img className="dog-image-icon" src={params.row.image_url || defaultImage} alt={`${params.value}`} onClick={()=>{navigate(`/admin-dashboard/dog-record/id/${params.id}`)}}/>
              <div className="capitalized dog-name" onClick={()=>{navigate(`/admin-dashboard/dog-record/id/${params.id}`)}}>{params.value}</div>
            </>
        }, 
        { field: 'breed', headerName: 'Breed', width: 130 },
        { field: 'sex', headerName: 'Sex', width: 90,
            renderCell: (params) => <div>{params.value === "m" ? "Male" : "Female"}</div> },
        { field: 'size', headerName: 'Size', width: 90,
            renderCell: (params) => <div className="capitalized">{params.value}</div> },
        { field: 'color', headerName: 'Color', width: 110,
            renderCell: (params) => <div className="capitalized">{params.value}</div> },
        { field: 'dob', headerName: 'Date of Birth', width: 150,
            renderCell: (params) => <div>{(new Date(params.value)).toLocaleDateString()}</div> },
        { field: 'date_entered', headerName: 'Date Entered', width: 150,
            renderCell: (params) => <div>{(new Date(params.value)).toLocaleDateString()}</div> },
        { field: 'updated_at', headerName: 'Last Updated', flex: 1,
            renderCell: (params) => <div>{(new Date(params.value)).toLocaleDateString()}</div> },
      ]

    return (
        <div className="shelter-overview primary-container" style={{ display: 'flex', height: '100%', width: '100%' }}>
            <h1 className='dogs-overview-title'>Dogs</h1>
            <div className="top-bar">
                <Searchbar setSearchQuery={setSearchQuery} placeholder={"Search by dog name"}/>
                <Button style={{color:'white'}} href="/admin-dashboard/add-record" className="dog-record-add-btn mb-3">+ New</Button>
            </div>
            <RowContextMenu show={modalShow} setModalShow={setModalShow} rows={rows} columns={columns} />
        </div>
    )
}

// provides both the context menu and the actual data grid
export function RowContextMenu(props) {
    const [selectedRow, setSelectedRow] = React.useState()
    const [selectedDogName, setSelectedDogName] = React.useState("")
    const navigate = useNavigate()
    const [contextMenu, setContextMenu] = React.useState(null)
    const {setModalShow, show}= props
    const handleContextMenu = (event) => {
      event.preventDefault();
      setSelectedRow(Number(event.currentTarget.getAttribute('data-id')))
      setSelectedDogName(props.rows[event.currentTarget.getAttribute('data-rowindex')]["name"])
      setContextMenu(
        contextMenu === null
          ? { mouseX: event.clientX - 2, mouseY: event.clientY - 4 }
          : null,
      )
    }
  
    const handleClose = () => {
      setContextMenu(null);
    }
  
    return (
      <div style={{ width: '100%' }}>
        <CustomDataGrid
            rows={props.rows}
            columns={props.columns}
            componentsProps={{
                row: {
                    onContextMenu: handleContextMenu,
                    style: { cursor: 'context-menu' },
                }
            }}
        />

        <Menu
          open={contextMenu !== null}
          onClose={handleClose}
          anchorReference="anchorPosition"
          anchorPosition={
            contextMenu !== null
              ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
              : undefined
          }
          componentsProps={{
            root: {
              onContextMenu: (e) => {
                e.preventDefault()
                handleClose()
              },
            },
          }}
        >
          {/* might want to just replace with <a href> links */}
          <MenuItem onClick={()=>{navigate("/admin-dashboard/dog-record/id/"+selectedRow)}} disableRipple className="context-menu-item">Go to details</MenuItem>
          <MenuItem onClick={()=>{navigate("/admin-dashboard/dog-record/id/"+selectedRow+"/edit")}} disableRipple className="context-menu-item">Edit record</MenuItem>
          {/* delete button here is mockup; should be the delete modal used in the dog record detail page */}
          <MenuItem onClick={()=>{ setModalShow(true); handleClose();}} disableRipple className="context-menu-item" sx={{ color: "red"}}>Delete</MenuItem>
        </Menu>
        {show &&  <DeleteDogRecordModal rows={props.rows} dogId={selectedRow} dogName={selectedDogName} show={show} onHide={() => setModalShow(false)} />}
      </div>
    )
  }
  export function DeleteDogRecordModal(props) {

    const { deleteDogRecord } = useDogRecordsContext()
    const { createNewToast } = useComponentContext()
    const {rows, dogId, show, onHide} = props;
    const [imageName, setImageName] = useState('')
    const [selectedDog, setSelectedDog] = useState({})
    const navigate = useNavigate()
    useEffect(()=>{
      if (rows.length === 0)  return;
      else{
      const dog = rows.filter((row)=>{
        return row.id === dogId;
      })
      setImageName(dog[0].image_name)
      }
    },[])
    const handleOnDelete = async () => {
      const oldImageRef = ref(storage, `dogProfileImages/${imageName}`);
      // Delete the file
      deleteObject(oldImageRef).then(() => {
        // File deleted successfully
        // setImageDeleted(true)
      }).catch((error) => {
        // Uh-oh, an error occurred!
        console.error(error)
      });
      await deleteDogRecord(props.dogId)
      createNewToast("Balto", `Successfully deleted ${props.dogName}'s profile`)
      navigate('/admin-dashboard')
      onHide()
    }
    return (
      <Modal
        {...props}
        size="m"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton></Modal.Header>
        {/* modal body is the form to login the user */}
        <Modal.Body>
            <p>Are you sure you want to delete this dog record? This cannot be undone.</p>
            <Button variant="outline-danger" onClick={handleOnDelete}>Yes, Delete</Button>
            <Button variant="outline-light" onClick={onHide}>Cancel</Button>
        </Modal.Body>
      </Modal>
    )
  }