import React from 'react'
import moment from "moment"
import { useDogRecordsContext } from '../../contexts/dog-records'
import './ShelterOverview.css'

export default function ShelterOverview() {

    const { dogRecords, error, isLoading, getAgeGroup  } = useDogRecordsContext()
    const [sort, setSort] = React.useState("CREATED_ASC")

    // sorting functions
    function sortByNameAsc(a, b) {
        if ( a.name.toLowerCase() < b.name.toLowerCase() ) return -1
        if ( a.name.toLowerCase() > b.name.toLowerCase() ) return 1
        return 0
    }

    function sortNameDesc(a, b) {
        if ( a.name.toLowerCase() < b.name.toLowerCase() ) return 1
        if ( a.name.toLowerCase() > b.name.toLowerCase() ) return -1
        return 0
    }

    if (sort == "NAME_ASC") {
          dogRecords.sort( sortByNameAsc )
    } else if (sort == "NAME_DESC") {
        dogRecords.sort( compare )

    }
        

    return (
        <div className="shelter-overview">

            {/* dropdown used to sort dogs in the shelter */}
            <div className="dropdown">
            <button className="btn btn-secondary dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Sort By: Name
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenu2">

                <button className="dropdown-item" type="button" onClick={()=>{setSort("NAME_ASC")}}>Name (A-Z)</button>
                <button className="dropdown-item" type="button" onClick={()=>{setSort("NAME_DESC")}}>Name (Z-A)</button>

            </div>
            </div>

            {/* list of all the dogs in the shelter */}
            <div className="dog-record-feed">
                {dogRecords.length <= 0 && !isLoading
                ? <h2 className="empty-message">No dogs added yet.</h2>
                : dogRecords.map((dogRecord, idx) => {
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
                            /> } )
                }
            </div>
        </div>
    )
}

export function DogRecordRow( props ) {
    return (
        <div className="dog-record-row">
            {/* col-1 includes the row number, dog image, name, breed, sex, and age group */}
            <div className="col-1">
                <p className="dog-record-number">{props.rowNumber}</p>
                <img className="dog-image" src={props.imageUrl} alt={`Image of ${props.name}`} />
                <div className="basic-info">
                    <p className="dog-name">{props.name}</p>
                    <p className="dog-info">{props.breed} | {props.sex == "m" ? "Male" : "Female"} | {props.ageGroup}</p>
                </div>
            </div>
            <div className="col-2">
                <p className="date-entered">Entered on {moment(new Date(props.dateEntered)).format("MM/DD/YYYY")}</p>
            </div>
        </div>
    )
}
