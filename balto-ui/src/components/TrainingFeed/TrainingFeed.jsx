import React, { useState }from 'react'
import './TrainingFeed.css'
import { BsAward } from 'react-icons/bs'

export default function TrainingFeed(props) {
    console.log("training feed milestone", props.milestones)
    return (
        props.milestones.map((milestone, idx) => {
            return (<TrainingCell dogInfo={props.dogInfo} milestone={milestone} key={idx} />)
        })
    )
}

export function TrainingCell(props) {
    console.log("training cell milestones: ", props.milestones)

    return (
        <div className='training-cell'>
            <section className="cell-header">
                <img className="profile-pic" src={props.dogInfo.image_url} />
                <div className="header-text">
                    <h3>{props.milestone["dog_id"] === 1 ? "Marley" : "Balto"}</h3>
                    <p>{props.milestone["updated_at"]}</p>
                </div>
                <button className='congrats-btn'>Congratulate <BsAward /></button>
            </section>
            <section className='details-section'>
                <p className='name'>
                    {props.milestone["dog_id"] === 1 ? "Marley" : "Balto"} trained the activity
                    "{props.milestone["name"]}" for {props.milestone["minutes"]} minutes.
                </p>
            </section>
        </div>
    )
}
