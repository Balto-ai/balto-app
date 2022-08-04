import React from 'react'
import { AdoptionInquiriesContextProvider, useAdoptionInquiriesContext } from '../../contexts/adoption-inquiries'
import { Searchbar } from '../CustomDataGrid/CustomDataGrid'
import CustomDataGrid from '../CustomDataGrid/CustomDataGrid'
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
    const [searchQuery, setSearchQuery] = React.useState("")

    // filter dogs based on search query
    let adoptionInquiriesToRender = [...allAdoptionInquiries]

    if (searchQuery !== "") {
      adoptionInquiriesToRender = adoptionInquiriesToRender.filter(adoptionInquiry => adoptionInquiry.dog_name.toLowerCase().includes(searchQuery.toLowerCase()))
    }

    const rows = [...allAdoptionInquiries]
    const columns = [
      { field: 'created_at', headerName: 'Timestamp', width: 160, type: 'dateTime',
        valueFormatter: (params) => (new Date(params.value)).toLocaleString()},
      { field: 'dog_name', headerName: 'Dog', width: 160,
        renderCell: (params) =>
          <div className="capitalized">
            <img className="dog-image-icon" src={params.row.dog_image_url} alt={`"Image of ${params.value}`} />
            {params.value}
          </div> },
      { field: 'user_first_name', headerName: 'First Name', width: 120,
        renderCell: (params) => <div className="capitalized">{params.value}</div> },
      { field: 'email', headerName: 'Email', width: 140 },
      { field: 'phone_number', headerName: 'Phone Number', width: 130, sortable: false, filterable: false },
      { field: 'zipcode', headerName: 'Zip Code', width: 100 },
      { field: 'comments', headerName: 'Comments', flex: 1, sortable: false, filterable: false }
    ]

    return (
        <div className="adoption-inquiries-page primary-container" style={{ display: 'flex', height: '100%', width: '100%' }}>
            <div className="top-bar">
                <Searchbar setSearchQuery={setSearchQuery} placeholder={"Search by dog name"} />
            </div>
            <CustomDataGrid rows={rows} columns={columns} />
        </div>
    )
}




