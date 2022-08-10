import React from 'react'
import { AdoptionInquiriesContextProvider, useAdoptionInquiriesContext } from '../../contexts/adoption-inquiries'
import { useNavigate } from 'react-router-dom'
import defaultImage from '../../assets/default-image.svg'
import CustomDataGrid from '../CustomDataGrid/CustomDataGrid'
import Popover from 'react-bootstrap/Popover';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import 'bootstrap/dist/css/bootstrap.min.css'
import './AdoptionInquiriesPage.css'

export default function AdoptionInquiriesPageContainer() {
  return (
    <AdoptionInquiriesContextProvider>
      <AdoptionInquiriesPage />
    </AdoptionInquiriesContextProvider>
  )
}

export function AdoptionInquiriesPage() {

    const { allAdoptionInquiries, error, isLoading } = useAdoptionInquiriesContext()
    const navigate = useNavigate()
    // const [searchQuery, setSearchQuery] = React.useState("")

    // filter dogs based on search query
    // let adoptionInquiriesToRender = [...allAdoptionInquiries]

    // if (searchQuery !== "") {
    //   adoptionInquiriesToRender = adoptionInquiriesToRender.filter(adoptionInquiry => adoptionInquiry.dog_name.toLowerCase().includes(searchQuery.toLowerCase()))
    // }

    const rows = [...allAdoptionInquiries]
    const columns = [
      { field: 'dog_name', headerName: 'Dog', width: 160,
        renderCell: (params) =>
          <>
            <img className="dog-image-icon" src={params.row.dog_image_url || defaultImage} alt={`${params.value}`} onClick={()=>{navigate(`/admin-dashboard/dog-record/id/${params.row.dog_id}`)}}/>
            <div className="capitalized dog-name" onClick={()=>{navigate(`/admin-dashboard/dog-record/id/${params.row.dog_id}`)}}>{params.value}</div>
          </>
      },
      { field: 'user_first_name', headerName: 'First Name', width: 120,
        renderCell: (params) => <div className="capitalized">{params.value}</div> },
      { field: 'email', headerName: 'Email', width: 140 },
      { field: 'phone_number', headerName: 'Phone Number', width: 130, sortable: false, filterable: false },
      { field: 'zipcode', headerName: 'Zip Code', width: 80 },
      { field: 'comments', headerName: 'Comments', flex: 1, sortable: false, filterable: false,
        renderCell: (params) =>  (
        <OverlayTrigger trigger="hover" placement="right" overlay={
          <Popover>
            <Popover.Header as="h3">Comments from {params.row.user_first_name}</Popover.Header>
            <Popover.Body>{params.value}</Popover.Body>
          </Popover>
          }>
          <span className="table-cell-trucate">{params.value}</span>
        </OverlayTrigger>
        )
    },
      { field: 'created_at', headerName: 'Timestamp', width: 170, type: 'dateTime',
        valueFormatter: (params) => (new Date(params.value)).toLocaleString()}
    ]

    return (
        <div className="adoption-inquiries-page primary-container" style={{ display: 'flex', height: '100%', width: '100%' }}>
            {/* <div className="top-bar">
                <Searchbar setSearchQuery={setSearchQuery} placeholder={"Search by dog name"} />
            </div> */}
            <h1 className='dogs-overview-title'>Adoption Inquiries</h1>
            <CustomDataGrid rows={rows} columns={columns} />
        </div>
    )
}
