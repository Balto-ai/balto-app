import React from 'react'
import { useDogRecordsContext } from '../../contexts/dog-records'
import './ShelterOverview.css'

export default function ShelterOverview() {

    const { dogRecords, error, isLoading  } = useDogRecordsContext()
    console.log(dogRecords)
    return (
        <div className="shelter-overview">
          <div className="dog-record-feed">
            {dogRecords.length <= 0 && !isLoading
            ? <h2 className="empty-message">No dogs added yet.</h2>
            : dogRecords.map(dogRecord => {
                return <DogRecordRow
                          key={dogRecord.id}
                          dogRecordId={dogRecord.id}
                          imageUrl={dogRecord.image_url}
                          name={dogRecord.name}
                          sex={dogRecord.sex}
                          breed={dogRecord.breed}
                          dob={dogRecord.dob}
                          dateEntered={dogRecord.dateEntered}
                          createdAt={dogRecord.created_at}
                        /> } )
            }
          </div>
        </div>
    )
}

export function DogRecordRow( props ) {
    return (
        <div className="dog-record-row">
            <img className="dog-record-image" src={props.imageUrl} alt={`Image of ${props.name}`} />
            <p>{props.name}</p>
            <p>{props.breed}</p>
        </div>
    )
}
