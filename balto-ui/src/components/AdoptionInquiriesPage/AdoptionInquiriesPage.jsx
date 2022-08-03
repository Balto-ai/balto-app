import React from 'react'
import { useDogRecordsContext } from '../../contexts/dog-records'
import { useNavigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import { DataGrid, GridToolbarContainer, GridToolbarColumnsButton, GridToolbarFilterButton, GridToolbarExport, useGridApiContext, useGridSelector, gridPageSelector, gridPageCountSelector } from '@mui/x-data-grid'
import { styled } from '@mui/material/styles'
import Pagination from '@mui/material/Pagination'
import PaginationItem from '@mui/material/PaginationItem'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import './AdoptionInquiriesPage.css'


export default function AdoptionInquiriesPage() {

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
                <DogRecordSearch setSearchQuery={setSearchQuery} />
                <Button href="/admin-dashboard/add-record" className="dog-record-add-btn mb-3">+ New</Button>
            </div>
            {/* <ShelterOverviewGrid rows={rows} columns={columns} /> */}
            <RowContextMenu rows={rows} columns={columns} />
        </div>
    )
}

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
        <ShelterOverviewGrid
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

export function ShelterOverviewGrid(props) {
return (
    <div style={{ flexGrow: 1}} className="shelter-overview-grid">

    </div>
    )
}

// searchbar updates searchQuery var whenever the value is changed
export function DogRecordSearch({ setSearchQuery }) {
    return (
        <Form.Group className="mb-3 dog-record-search">
          <Form.Control placeholder="Search by Name" onChange={(evt)=>setSearchQuery(evt.target.value)} />
        </Form.Group>
    )
}

// toolbar with column list, filters, and export option
export function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarExport />
      </GridToolbarContainer>
    )
  }

// custom pagination that appears at the footer
export function CustomPagination() {
    const apiRef = useGridApiContext()
    const page = useGridSelector(apiRef, gridPageSelector)
    const pageCount = useGridSelector(apiRef, gridPageCountSelector)

    return (
        <Pagination
          color="primary"
          variant="outlined"
          count={pageCount}
          page={page + 1}
          shape="rounded"
          renderItem={(props2) => <PaginationItem {...props2} disableRipple />}
          onChange={(event, value) => apiRef.current.setPage(value - 1)}
        />
      );
}

