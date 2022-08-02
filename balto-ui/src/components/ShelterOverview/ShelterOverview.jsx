import React from 'react'
import { useDogRecordsContext } from '../../contexts/dog-records'
import { useNavigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import { DataGrid, GridToolbarContainer, GridToolbarColumnsButton, GridToolbarFilterButton, GridToolbarExport, useGridApiContext, useGridSelector, gridPageSelector, gridPageCountSelector } from '@mui/x-data-grid'
import { styled } from '@mui/material/styles'
import Pagination from '@mui/material/Pagination'
import PaginationItem from '@mui/material/PaginationItem'
import Dropdown from 'react-bootstrap/Dropdown'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import './ShelterOverview.css'

// used to add styling
const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
    border: 0,
    color:
        theme.palette.mode === 'light' ? 'rgba(0,0,0,.85)' : 'rgba(255,255,255,0.85)',
    fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
    ].join(','),
    WebkitFontSmoothing: 'auto',
    letterSpacing: 'normal',
    '& .MuiDataGrid-columnsContainer': {
        backgroundColor: theme.palette.mode === 'light' ? '#fafafa' : '#1d1d1d',
    },
    '& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell': {
        borderBottom: `1px solid ${theme.palette.mode === 'light' ? '#f0f0f0' : '#303030'}`,
    },
    '& .MuiDataGrid-cell': {
        color: theme.palette.mode === 'light' ? 'rgba(0,0,0,.85)' : 'rgba(255,255,255,0.65)',
    },
    '& .MuiPaginationItem-root': {
        borderRadius: 5,
    },
    }))

export default function ShelterOverview() {

    const { dogRecords, error, isLoading, getAgeGroup } = useDogRecordsContext()

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
            renderCell: (params) => <div className="capitalized">{params.value}</div> },
        { field: 'breed', headerName: 'Breed', width: 150 },
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
            renderCell: (params) => <div>{(new Date(params.value)).toLocaleDateString()}</div> }
      ]

    return (
        <div className="shelter-overview primary-container" style={{ display: 'flex', height: 700, width: '100%' }}>
            <DogRecordSearch setSearchQuery={setSearchQuery} />
            <ShelterOverviewGrid rows={rows} columns={columns} />
        </div>
    )
}

export function ShelterOverviewGrid(props) {
return (
    <div style={{ flexGrow: 1, height: 700}} className="shelter-overview-grid">
        <StyledDataGrid
            rows={props.rows}
            columns={props.columns}
            rowHeight={70}
            autoHeight
            pagination
            rowsPerPageOptions={[30]}
            components={{
                Toolbar: CustomToolbar,
                Pagination: CustomPagination
            }}
        />
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

