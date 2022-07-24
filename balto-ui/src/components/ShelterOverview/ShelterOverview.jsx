import React from 'react'
import { useDogRecordsContext } from '../../contexts/dog-records'
import { Link } from 'react-router-dom' 
import 'bootstrap/dist/css/bootstrap.min.css'
import { Button } from 'react-bootstrap/Button'
import Dropdown from 'react-bootstrap/Dropdown'
import Form from 'react-bootstrap/Form'
import Card from 'react-bootstrap/Card'
import BreedSearchbar from '../BreedSearchbar/BreedSearchbar'
import './ShelterOverview.css'

export default function ShelterOverview() {

    const { dogRecords, error, isLoading, getAgeGroup  } = useDogRecordsContext()

    const [sort, setSort] = React.useState("")
    const [searchQuery, setSearchQuery] = React.useState("")

    // sorting functions
    function sortByNameAsc(a, b) {
        if ( a.name.toLowerCase() < b.name.toLowerCase() ) return -1
        if ( a.name.toLowerCase() > b.name.toLowerCase() ) return 1
        return 0
    }

    function sortByNameDesc(a, b) {
        if ( a.name.toLowerCase() < b.name.toLowerCase() ) return 1
        if ( a.name.toLowerCase() > b.name.toLowerCase() ) return -1
        return 0
    }

    function sortByDateEnteredAsc(a, b) {
        return new Date(b.date_entered) - new Date(a.date_entered)
    }

    function sortByDateEnteredDesc(a, b) {
        return new Date(a.date_entered) - new Date(b.date_entered)
    }

    function sortByCreatedAtAsc(a, b) {
        return new Date(a.created_at) - new Date(b.created_at)
    }

    function sortByCreatedAtDesc(a, b) {
        return new Date(b.created_at) - new Date(a.created_at)
    }

    // sort dogRecords based on sort criteria
    if (sort == "Name (A-Z)") {
        dogRecords.sort( sortByNameAsc )
    } else if (sort == "Name (Z-A)") {
        dogRecords.sort( sortByNameDesc )
    } else if (sort == "Date Entered (Newest)") {
        dogRecords.sort( sortByDateEnteredAsc )
    } else if (sort == "Date Entered (Oldest)") {
        dogRecords.sort( sortByDateEnteredDesc )
    } else if (sort == "Newest Addition") {
        dogRecords.sort( sortByCreatedAtAsc )
    } else if (sort == "Oldest Addition") {
        dogRecords.sort( sortByCreatedAtDesc )
    }

    // filter dogs based on search query
    let dogRecordsToRender = [...dogRecords]
    if (searchQuery !== "") {
        dogRecordsToRender = dogRecordsToRender.filter(dogRecord => dogRecord.name.toLowerCase().includes(searchQuery))
    }

    return (
        <div className="shelter-overview">

            <BreedSearchbar />
            
            {/* the top bar where the user can search by name or sort */}
            <div className="filter-sort-bar">
                {/* search bar */}
                <DogRecordSearch setSearchQuery={setSearchQuery} />
                {/* sort by dropdown menu */}
                <DogRecordDropdown sort={sort} setSort={setSort} className="dog-record-sort" />
            </div>

            {/* list of all the dogs in the shelter */}
            <div className="dog-record-feed">
                {dogRecords.length <= 0 && !isLoading
                ? <h2 className="empty-message">No dogs to display</h2>
                // create a row for each dog record
                : dogRecordsToRender.map((dogRecord, idx) => {
                    if (dogRecord.name) {
                        return <DogRecordRow
                            key={dogRecord.id}
                            rowNumber={idx + 1}
                            dogRecordId={dogRecord.id}
                            imageUrl={dogRecord.image_url}
                            name={dogRecord.name}
                            sex={dogRecord.sex}
                            breed={dogRecord.breed}
                            ageGroup={getAgeGroup(dogRecord.dob)}
                            dateEntered={dogRecord.date_entered}
                            />
                    } })
                }
            </div>
        </div>
    )
}

// searchbar updates searchQuery var whenever the value is changed
export function DogRecordSearch({ setSearchQuery }) {
    return (
        <Form.Group className="mb-3 dog-record-search">
          <Form.Control placeholder="Search by name" onChange={(evt)=>setSearchQuery(evt.target.value)} />
        </Form.Group>
    )
}

// calls appropriate sort function on the dogRecords when a sort is chosen
export function DogRecordDropdown({ sort, setSort }) {
    return (
        <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">Sort By: {sort}</Dropdown.Toggle>
            <Dropdown.Menu>
                <Dropdown.Item onClick={()=>{setSort("Name (A-Z)")}}>Name (A-Z)</Dropdown.Item>
                <Dropdown.Item onClick={()=>{setSort("Name (Z-A)")}}>Name (Z-A)</Dropdown.Item>
                <Dropdown.Item onClick={()=>{setSort("Date Entered (Newest)")}}>Date Entered (Newest)</Dropdown.Item>
                <Dropdown.Item onClick={()=>{setSort("Date Entered (Oldest)")}}>Date Entered (Oldest)</Dropdown.Item>
                <Dropdown.Item onClick={()=>{setSort("Newest Addition")}}>Newest Addition</Dropdown.Item>
                <Dropdown.Item onClick={()=>{setSort("Oldest Addition")}}>Oldest Addition</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    )
}

// TODO: need to figure out formatting and exactly which props we want to show up here
export function DogRecordRow( props ) {
    return (

        <Card style={{ width: '100%', minWidth: '700px' }}>
            <Card.Body>
                <img className="dog-record-image" src={props.imageUrl} alt={`Image of ${props.name}`} />                    
                <Card.Title>{props.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{props.breed} | {props.sex == "m" ? "Male" : "Female"} | {props.ageGroup}</Card.Subtitle>
                <Card.Text>Entered {(new Date(props.dateEntered)).toLocaleDateString()}</Card.Text>

                {/* TODO: figure out if we want to keep it as a link/button or have the person click the dog name to view details */}
                <Link to={"/admin-dashboard/dog-record/id/" + props.dogRecordId}>View Details</Link>

            </Card.Body>
        </Card>
    )
}
