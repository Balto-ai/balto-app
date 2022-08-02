import React from 'react'
import { useDogRecordsContext } from '../../contexts/dog-records'
import { useNavigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import { DataGrid, GridToolbarContainer, GridToolbarColumnsButton, GridToolbarFilterButton, GridToolbarExport, useGridApiContext, useGridSelector, gridPageSelector, gridPageCountSelector } from '@mui/x-data-grid'
import { styled } from '@mui/material/styles'
import Pagination from '@mui/material/Pagination'
import Dropdown from 'react-bootstrap/Dropdown'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import './ShelterOverview.css'

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
        { field: 'id', headerName: ' ', sortable: false, filterable: false, width: 20 },
        { field: 'image_url', headerName: 'Image', sortable: false, width: 70,
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
            <div style={{ flexGrow: 1, height: 700}}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    rowHeight={70}
                    pagination
                    rowsPerPageOptions={[30]}
                    components={{
                        Toolbar: CustomToolbar,
                        Pagination: CustomPagination
                    }}
                />
            </div>
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
          count={pageCount}
          page={page + 1}
          onChange={(event, value) => apiRef.current.setPage(value - 1)}
        />
      );
}

// import React from 'react'
// import { useDogRecordsContext } from '../../contexts/dog-records'
// import { useNavigate } from 'react-router-dom'
// import 'bootstrap/dist/css/bootstrap.min.css'
// import Dropdown from 'react-bootstrap/Dropdown'
// import Button from 'react-bootstrap/Button'
// import Form from 'react-bootstrap/Form'
// import Card from 'react-bootstrap/Card'
// import './ShelterOverview.css'

// export default function ShelterOverview() {

//     const { dogRecords, error, isLoading, getAgeGroup } = useDogRecordsContext()

//     const [sort, setSort] = React.useState("")
//     const [searchQuery, setSearchQuery] = React.useState("")

//     // sorting functions
//     function sortByNameAsc(a, b) {
//         if ( a.name.toLowerCase() < b.name.toLowerCase() ) return -1
//         if ( a.name.toLowerCase() > b.name.toLowerCase() ) return 1
//         return 0
//     }

//     function sortByNameDesc(a, b) {
//         if ( a.name.toLowerCase() < b.name.toLowerCase() ) return 1
//         if ( a.name.toLowerCase() > b.name.toLowerCase() ) return -1
//         return 0
//     }

//     function sortByDateEnteredAsc(a, b) {
//         return new Date(b.date_entered) - new Date(a.date_entered)
//     }

//     function sortByDateEnteredDesc(a, b) {
//         return new Date(a.date_entered) - new Date(b.date_entered)
//     }

//     function sortByCreatedAtAsc(a, b) {
//         return new Date(a.created_at) - new Date(b.created_at)
//     }

//     function sortByCreatedAtDesc(a, b) {
//         return new Date(b.created_at) - new Date(a.created_at)
//     }

//     // sort dogRecords based on sort criteria
//     if (sort == "Name (A-Z)") {
//         dogRecords.sort( sortByNameAsc )
//     } else if (sort == "Name (Z-A)") {
//         dogRecords.sort( sortByNameDesc )
//     } else if (sort == "Date Entered (Newest)") {
//         dogRecords.sort( sortByDateEnteredAsc )
//     } else if (sort == "Date Entered (Oldest)") {
//         dogRecords.sort( sortByDateEnteredDesc )
//     } else if (sort == "Newest Addition") {
//         dogRecords.sort( sortByCreatedAtAsc )
//     } else if (sort == "Oldest Addition") {
//         dogRecords.sort( sortByCreatedAtDesc )
//     }

//     // filter dogs based on search query
//     let dogRecordsToRender = [...dogRecords]
//     if (searchQuery !== "") {
//         dogRecordsToRender = dogRecordsToRender.filter(dogRecord => dogRecord.name.toLowerCase().includes(searchQuery))
//     }

//     return (
//         <div className="shelter-overview">

//             {/* the top bar where the user can search by name or sort */}
//             <div className="filter-sort-bar">
//                 {/* search bar */}
//                 <DogRecordSearch setSearchQuery={setSearchQuery} />
//                 {/* sort by dropdown menu */}
//                 <DogRecordDropdown sort={sort} setSort={setSort} />
//             </div>

//             {/* list of all the dogs in the shelter */}
//             <div className="dog-record-feed mb-3">
//                 {dogRecords.length <= 0 && !isLoading
//                 ? <h2 className="empty-message">No dogs to display</h2>
//                 // create a row for each dog record
//                 : dogRecordsToRender.map((dogRecord, idx) => {
//                     if (dogRecord.name) {
//                         return <DogRecordRow
//                             key={dogRecord.id}
//                             rowNumber={idx + 1}
//                             dogRecordId={dogRecord.id}
//                             imageUrl={dogRecord.image_url}
//                             name={dogRecord.name}
//                             sex={dogRecord.sex}
//                             breed={dogRecord.breed}
//                             ageGroup={getAgeGroup(dogRecord.dob)}
//                             dateEntered={dogRecord.date_entered}
//                             />
//                     } })
//                 }
//             </div>

//             <Button variant="primary" href="admin-dashboard/add-record">+ Add Dog Record</Button>

//         </div>
//     )
// }

// // searchbar updates searchQuery var whenever the value is changed
// export function DogRecordSearch({ setSearchQuery }) {
//     return (
//         <Form.Group className="mb-3 dog-record-search">
//           <Form.Control placeholder="Search by name" onChange={(evt)=>setSearchQuery(evt.target.value)} />
//         </Form.Group>
//     )
// }

// // calls appropriate sort function on the dogRecords when a sort is chosen
// export function DogRecordDropdown({ sort, setSort }) {
//     return (
//         <Dropdown>
//             <Dropdown.Toggle variant="light" id="dropdown-basic"  className="dog-record-sort">Sort By: {sort}</Dropdown.Toggle>
//             <Dropdown.Menu>
//                 <Dropdown.Item onClick={()=>{setSort("Name (A-Z)")}}>Name (A-Z)</Dropdown.Item>
//                 <Dropdown.Item onClick={()=>{setSort("Name (Z-A)")}}>Name (Z-A)</Dropdown.Item>
//                 <Dropdown.Item onClick={()=>{setSort("Date Entered (Newest)")}}>Date Entered (Newest)</Dropdown.Item>
//                 <Dropdown.Item onClick={()=>{setSort("Date Entered (Oldest)")}}>Date Entered (Oldest)</Dropdown.Item>
//                 <Dropdown.Item onClick={()=>{setSort("Newest Addition")}}>Newest Addition</Dropdown.Item>
//                 <Dropdown.Item onClick={()=>{setSort("Oldest Addition")}}>Oldest Addition</Dropdown.Item>
//             </Dropdown.Menu>
//         </Dropdown>
//     )
// }

// // TODO: need to figure out formatting and exactly which props we want to show up here
// export function DogRecordRow( props ) {
//     const navigate = useNavigate()
//     return (

//         <div className="dog-record-card" onClick={()=>{navigate("/admin-dashboard/dog-record/id/" + props.dogRecordId)}} >
//             <div className="dog-record-col-1">
//                 <p>{props.rowNumber}</p>
//                 <img className="dog-record-image" src={props.imageUrl} alt={`Image of ${props.name}`} /> 
//                 <div className="dog-record-main-text">                   
//                     <Card.Title>{props.name}</Card.Title>
//                     <Card.Subtitle className="mb-2 text-muted">{props.breed} | {props.sex == "m" ? "Male" : "Female"} | {props.ageGroup}</Card.Subtitle>
//                 </div>
//             </div>
//             {/* <p className="date-entered-label">Entered {(new Date(props.dateEntered)).toLocaleDateString()}</p> */}

//             {/* TODO: figure out if we want to keep it as a link/button or have the person click the dog name to view details */}
//             {/* <a className="view-more-link:" href={"/admin-dashboard/dog-record/id/" + props.dogRecordId}>View Details</a> */}
//         </div>
//     )
// }
