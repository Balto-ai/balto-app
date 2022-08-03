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
    console.log(searchQuery)
    if (searchQuery !== "") {
      adoptionInquiriesToRender = adoptionInquiriesToRender.filter(adoptionInquiry => adoptionInquiry.email.toLowerCase().includes(searchQuery.toLowerCase()))
    }

    const rows = [...allAdoptionInquiries]
    const columns = [
        { field: 'email', headerName: 'Email', width: 150 },
        { field: 'phone_number', headerName: 'Phone Number', width: 150 },
        { field: 'created_at', headerName: 'Timestamp', width: 150 }
      ]

    return (
        <div className="adoption-inquiries-page primary-container" style={{ display: 'flex', height: '100%', width: '100%' }}>
            <div className="top-bar">
                <Searchbar setSearchQuery={setSearchQuery} />
            </div>
            <CustomDataGrid rows={rows} columns={columns} />
        </div>
    )
}




