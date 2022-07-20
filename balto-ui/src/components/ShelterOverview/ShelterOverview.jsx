import React from 'react'
import { useDogRecordsContext } from '../../contexts/dog-records'
import './ShelterOverview.css'

export default function ShelterOverview() {

    const { dogRecords, error, isLoading  } = useDogRecordsContext()
    
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
                        /> } )
            }
          </div>
        </div>
    )
}

export function DogRecordRow( {dogRecordId, imageUrl='', name=''} ) {
    return (
        <div className="dog-record-row">
            <img className="dog-record-image" src={imageUrl} alt={`Image of ${name}`} />
            <p>{name}</p>
        </div>
    )
}
