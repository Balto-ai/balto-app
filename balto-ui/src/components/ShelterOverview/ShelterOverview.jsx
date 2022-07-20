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

    function getAgeGroup(dob) {
        const birthDate = new Date(dob)
        const currentDate = new Date()
        let age_time = currentDate - birthDate
        let age_days = Math.floor(age_time / (1000 * 3600 * 24))
        // following this source for age groupings:
        // https://www.frontiersin.org/articles/10.3389/fvets.2021.643085/full#:~:text=An%20option%20here%20would%20be,11%20years%20as%20Late%2DSenior.
        if (age_days <= 180) {
            return "Puppy"
        } else if (age_days > 180 && age_days <=365) {
            return "Junior"
        } else if (age_days > 365 && age_days <= 730) {
            return "Young Adult"
        } else if (age_days > 730 && age_days <= 2555) {
            return "Mature Adult"
        } else if (age_days > 2555 && age_days <= 4380) {
            return "Senior"
        } else {
            return "Geriatric"
        }
    }

    return (
        <div className="dog-record-row">
            <div className="col-1">
                <img className="dog-record-image" src={props.imageUrl} alt={`Image of ${props.name}`} />
                <div className="basic-info">
                    <p className="dog-name">{props.name}</p>
                    <p className="dog-info">{props.breed} | {props.sex == "m" ? "Male" : "Female"} | {getAgeGroup(props.dob)}</p>
                </div>
            </div>
            <p>{props.dateEntered}</p>
        </div>
    )
}
