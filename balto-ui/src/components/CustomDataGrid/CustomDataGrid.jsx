import { DataGrid, GridToolbarContainer, GridToolbarColumnsButton, GridToolbarFilterButton, GridToolbarExport, useGridApiContext, useGridSelector, gridPageSelector, gridPageCountSelector } from '@mui/x-data-grid'
import Form from 'react-bootstrap/Form'
import Pagination from '@mui/material/Pagination'
import PaginationItem from '@mui/material/PaginationItem'
import { styled } from '@mui/material/styles'
import './CustomDataGrid.css'

// searchbar updates searchQuery var whenever the value is changed
export function Searchbar({ setSearchQuery, placeholder }) {
    return (
        <Form.Group className="mb-3 searchbar">
          <Form.Control placeholder={placeholder} onChange={(evt)=>setSearchQuery(evt.target.value)} />
        </Form.Group>
    )
}

export default function CustomDataGrid(props) {
    return (
        <div style={{ flexGrow: 1}} className="custom-data-grid">
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
                componentsProps={props.componentsProps}
            />
        </div>
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

const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
    border: 0,
    color:
        theme.palette.mode === 'light' ? 'rgba(0,0,0,.85)' : 'rgba(255,255,255,0.85)',
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