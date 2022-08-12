import React from 'react'
import { useNavigate } from 'react-router-dom'
import { AdoptionInquiriesContextProvider, useAdoptionInquiriesContext } from '../../contexts/adoption-inquiries'
import { useDogRecordsContext } from '../../contexts/dog-records'
import { Stack, Card, Divider, Tooltip, IconButton, Grid } from '@mui/material'
import { HiOutlineChevronRight } from 'react-icons/hi'
import defaultImage from '../../assets/default-image.svg'
import adoptionInquiryImage from '../../assets/question icon.svg'
import './UpdateFeed.css'

// import { useNavigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

export default function UpdateFeedContainer({ updateLimit=null, cardColor="#ffffff" }) {
    return (
        <AdoptionInquiriesContextProvider>
            <UpdateFeed updateLimit={updateLimit} cardColor={cardColor}/>
        </AdoptionInquiriesContextProvider>
    )
}

export function UpdateFeed({ updateLimit, cardColor }) {

    const { allAdoptionInquiries } = useAdoptionInquiriesContext()
    const { dogRecords } = useDogRecordsContext()

    const allUpdates = [...allAdoptionInquiries, ...dogRecords]

    var updates = []
    // loop through the list of dogRecords and update the updates state array
    for (let i = 0; i < dogRecords.length; i++) {    
        const dogRecord = dogRecords[i]
        const imageUrl = dogRecord.image_url || defaultImage

        // if the time it was created is different from the time it was updated, add both timestamps to the updates
        if (dogRecord.created_at !== dogRecord.updated_at) {
            updates.push({type:"dog-record-edit", timestamp: dogRecord.updated_at, name: dogRecord.name, dogId: dogRecord.id, imageUrl: imageUrl })
        }
        // for all, add in the created_at
        updates.push({type:"dog-record-creation", timestamp: dogRecord.created_at, name: dogRecord.name, dogId: dogRecord.id, imageUrl: imageUrl })
      }

    // loop through the list of adoption inquiries and update the updates state array
    for (let i = 0; i < allAdoptionInquiries.length; i++) {    
        const adoptionInquiry = allAdoptionInquiries[i]
        updates.push({type:"adoption-inquiry", timestamp: adoptionInquiry.created_at, name: adoptionInquiry.dog_name, dogId: adoptionInquiry.id, imageUrl: adoptionInquiryImage})
    }

    // sort updates by their timestamp
    updates.sort((a, b) => {
        return new Date(b.timestamp) - new Date(a.timestamp)
    })

    // slice the updates to only show the set limit
    const updatesToDisplay = updateLimit ? updates.slice(0, updateLimit) : updates

    return (
        <Stack spacing={2}
            divider={
                <Divider orientation="horizontal" sx={{ borderColor: "#a6a6a6" }} flexItem />
            }
            className="update-feed"
        >
            {updatesToDisplay.map((update, idx) => (
                <UpdateCard key={idx}
                    updateType={update.type}
                    timestamp={update.timestamp}
                    dogName={update.name}
                    dogId={update.dogId}
                    imageUrl={update.imageUrl}
                    cardColor={cardColor}
                />
                ))}
        </Stack>
    )
}

export function UpdateCard({updateType, timestamp, dogName, dogId, imageUrl, cardColor }) {

    const navigate = useNavigate()
    let tooltipText = ""

    // function to return the relative time, ex. today, 1 day ago, 3 days ago
    function timeAgo(timestamp) {
        const rtf = new Intl.RelativeTimeFormat('en', {
          numeric: 'auto',
        })
        const oneDayInMs = 1000 * 60 * 60 * 24;
        const daysDifference = Math.round(
          (timestamp - new Date().getTime()) / oneDayInMs,
        )
        
        // if it's been a week or more, show the the date instead (2/2/2022)
        if (daysDifference < -6) {
            return timestamp.toLocaleDateString()
        }
      
        return rtf.format(daysDifference, 'day');
      }

    // set the text for the tooltip that will appear when hovering over the card
    if (updateType==="dog-record-edit" || updateType==="dog-record-creation") {
        tooltipText = `Go to ${dogName}'s profile`
    } else if (updateType==="adoption-inquiry"){
        tooltipText = `Go to Adoption Inquiries`
    }

    // onClick handler that navigates to the dog record detail page if it's about a dog record
    //  OR navigates to the adoption inquiries page if it's about an adoption inquiry
    function handleOnClick() {
        if (updateType==="dog-record-edit" || updateType==="dog-record-creation") {
            navigate(`/admin-dashboard/dog-record/id/${dogId}`)
        } else if (updateType==="adoption-inquiry") {
            navigate("/admin-dashboard/adoption-inquiries")
        }
    }


    return (


        <Card className="update-card" sx={{ display: 'flex', backgroundColor: (cardColor), borderRadius: 'var(--border-radius-small)', boxShadow: 'none' }}>

            <Grid container direction="row" justifyContent="space-between" alignItems="center">


                <Grid item sx={{  display: 'flex', alignItems: 'center'}}>
                    <img src={imageUrl} className="update-card-image" />

                    <div className="update-card-text">
                        <div className="update-card-header">
                            {updateType==="dog-record-edit" ? `Edited ${dogName}'s profile` : null}
                            {updateType==="dog-record-creation" ? `Added ${dogName}` : null}
                            {updateType==="adoption-inquiry" ? `Adoption inquiry received for ${dogName}` : null}
                        </div>
                        <div className="update-card-timestamp">
                            {timeAgo(new Date(timestamp))}
                        </div>
                    </div>

                </Grid>


                <Grid item>
                    {/* set tooltip, if it's an adoption inquiry */}
                    <Tooltip title={tooltipText}>
                        <IconButton aria-label="View More" onClick={handleOnClick} sx={{ marginRight: "15px" }}>
                            <HiOutlineChevronRight />
                        </IconButton>
                    </Tooltip>
                </Grid>
            
            </Grid>

      </Card>
    )


    // return (

    //     // this one is custom
    //     // <Card className="update-card" sx={{ display: 'flex', height: '80px', borderRadius: 'var(--border-radius-small)', boxShadow: 'var(--card-box-shadow)' }}>

    //     // this one matches current dashboard i think
    //     <Card className="update-card" flexDirection="row" sx={{ display: 'flex' }}>

    //         <CardMedia
    //             component="img"
    //             image={imageUrl}
    //             alt="Update card image"
    //             className="update-card-image"
    //         />


    //         <Box sx={{ display: 'flex', flexDirection: 'column' }}>


    //             <CardContent sx={{ flex: '1 0 auto' }}>

    //                 <div className="update-card-header">
    //                     {updateType==="dog-record-edit" ? `Edited ${dogName}'s profile` : null}
    //                     {updateType==="dog-record-creation" ? `Added ${dogName}` : null}
    //                     {updateType==="adoption-inquiry" ? `Adoption inquiry received for ${dogName}` : null}
    //                 </div>
    //                 <div className="update-card-timestamp">
    //                     {timeAgo(new Date(timestamp))}
    //                 </div>

    //             </CardContent>

    //             <CardActions>
    //                 {/* set tooltip, if it's an adoption inquiry */}
    //                 <Tooltip title={tooltipText}>
    //                     <IconButton aria-label="View More" onClick={handleOnClick}>
    //                         <HiOutlineChevronRight />
    //                     </IconButton>
    //                 </Tooltip>
    //             </CardActions>

    //         </Box>
    //   </Card>
    // )
}
    