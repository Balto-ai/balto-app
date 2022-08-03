import React from 'react'
import { useDogRecordsContext } from '../../contexts/dog-records'
import { useNavigate } from 'react-router-dom'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Button from 'react-bootstrap/Button'
import { Searchbar } from '../CustomDataGrid/CustomDataGrid'
import CustomDataGrid from '../CustomDataGrid/CustomDataGrid'
import 'bootstrap/dist/css/bootstrap.min.css'
import './ShelterOverview.css'

export default function ShelterOverview() {

    const { dogRecords, error, isLoading, getAgeGroup } = useDogRecordsContext()
    const navigate = useNavigate()
    const [searchQuery, setSearchQuery] = React.useState("")

    // filter dogs based on search query
    let dogRecordsToRender = [...dogRecords]
    if (searchQuery !== "") {
        dogRecordsToRender = dogRecordsToRender.filter(dogRecord => dogRecord.name.toLowerCase().includes(searchQuery.toLowerCase()))
    }

    const rows = [...dogRecordsToRender]
    const columns = [
        { field: 'image_url', headerName: 'Image', sortable: false, filterable: false, width: 70,
            renderCell: (params) => <img src={params.value} className="dog-record-image" /> },
        { field: 'name', headerName: 'Name', width: 150,
            renderCell: (params) => <div className="capitalized dog-name" onClick={()=>{navigate(`/admin-dashboard/dog-record/id/${params.id}`)}}>{params.value}</div> },
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
        { field: 'updated_at', headerName: 'Last Updated', width: 150,
            renderCell: (params) => <div>{(new Date(params.value)).toLocaleDateString()}</div> },
      ]

    return (
        <div className="shelter-overview primary-container" style={{ display: 'flex', height: '100%', width: '100%' }}>
            <div className="top-bar">
                <Searchbar setSearchQuery={setSearchQuery} />
                <Button href="/admin-dashboard/add-record" className="dog-record-add-btn mb-3">+ New</Button>
            </div>
            <RowContextMenu rows={rows} columns={columns} />
        </div>
    )
}

// provides both the context menu and the actual data grid
export function RowContextMenu(props) {
    const [selectedRow, setSelectedRow] = React.useState()
    const navigate = useNavigate()
  
    const [contextMenu, setContextMenu] = React.useState(null)
  
    const handleContextMenu = (event) => {
      event.preventDefault();
      setSelectedRow(Number(event.currentTarget.getAttribute('data-id')));
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
          <MenuItem onClick={()=>{}} disableRipple className="context-menu-item" sx={{ color: "red"}}>Delete</MenuItem>
        </Menu>
      </div>
    )
  }

