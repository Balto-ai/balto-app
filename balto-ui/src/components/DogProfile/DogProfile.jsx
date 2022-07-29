import { useState, useEffect, useContext } from 'react'
import './DogProfile.css'
import { BsFillHouseDoorFill, BsStar } from "react-icons/bs";
import TrainingFeed from '../TrainingFeed/TrainingFeed';
import { milestones } from '../../data'
import React from 'react';
import Image from 'react-bootstrap/Image'
import Badge from 'react-bootstrap/Badge'
import Button from 'react-bootstrap/Button'
import ProgressBar from 'react-bootstrap/ProgressBar'
import { useAuthContext } from '../../contexts/auth';
import { DogProfileContextProvider, useDogProfileContext } from '../../contexts/dog-profile';
import { ImCheckboxChecked, ImCheckboxUnchecked } from "react-icons/im"
import ApiClient from '../../services/ApiClient';

export default function DogProfileContainer() {
  return (
    <DogProfileContextProvider>
      <DogProfile />
    </DogProfileContextProvider>
  )
}

export function DogProfile() {

  const { dogInfo, setDogInfo, error, getAgeGroup } = useDogProfileContext()
  const { user } = useAuthContext({})

  const handleOnFavorite = async () => {
    return await ApiClient.starDog(dogInfo.id)
  }

  // if (dogInfo) { // TODO: hacky solution to prevent object undefined errors
  return (
    <div className='profile-page'>
      <div className='banner'>
        <img src="#" className='banner-img'></img>
      </div>
      <div className='split-pane'>
        <div className='profile-pane'>
          <div className='profile-header'>
            <Image src={dogInfo.image_url} className='profile-img' roundedCircle ></Image>
            <div className='profile-title'>
              <span>Hi, I'm <h1>{dogInfo.dog_name}</h1></span>
              <section className='tags'>
                <Badge bg="primary" className='tag'>{dogInfo.breed}</Badge>
                <Badge bg="primary" className='tag'>{getAgeGroup(dogInfo.dob)}</Badge>
                <Badge bg="primary" className='tag'>{dogInfo.size}</Badge>
                <Badge bg="primary" className='tag'>{dogInfo.sex === 'm' ? 'male' : 'female'}</Badge>
              </section>
            </div>
          </div>
          <div className='about-section'>
            <section className='desc-1'>
              <h2>I'm known for being...</h2>
              <p>{dogInfo.desc_1}</p>
            </section>
            <section className='desc-2'>
              <h2>I'm looking for someone who...</h2>
              <p>{dogInfo.desc_2}</p>
            </section>
            <section className='attributes'>
              <h2>A little more about me...</h2>
              <ul id='attribute-list'>
                <li>{(dogInfo.kid_friendly >= 3) ? <ImCheckboxChecked /> : <ImCheckboxUnchecked /> } Kid Friendly</li>
                <li>{(dogInfo.stranger_friendly >= 3) ? <ImCheckboxChecked /> : <ImCheckboxUnchecked /> } Stranger Friendly</li>
                <li>{(dogInfo.dog_friendly >= 3) ? <ImCheckboxChecked /> : <ImCheckboxUnchecked /> } Dog Friendly</li>
                <li>{(dogInfo.novice_friendly >= 3) ? <ImCheckboxChecked /> : <ImCheckboxUnchecked /> } Novice Owner Friendly</li>
                <li>{(dogInfo.easu_to_groom >= 3) ? <ImCheckboxChecked /> : <ImCheckboxUnchecked /> } Easy to Groom</li>
                <li>{(dogInfo.energy_levels >= 3) ? <ImCheckboxChecked /> : <ImCheckboxUnchecked /> } Energy Levels</li>
                <li>{(dogInfo.exercise_needs >= 3) ? <ImCheckboxChecked /> : <ImCheckboxUnchecked /> } Exercise Needs</li>
                <li>{(dogInfo.trainability >= 3) ? <ImCheckboxChecked /> : <ImCheckboxUnchecked /> } Easy to Train</li>
              </ul>
            </section>
            <section className='shelter-loc'>
              <h2>You can meet me at...</h2>
              <p>{dogInfo.shelter_name}</p>
              <p>{dogInfo.address}, {dogInfo.city}, {dogInfo.state} {dogInfo.zipcode}</p>
              <p>{dogInfo.email}</p>
            </section>
          </div>
        </div>
        <div className='training-pane'>
          <section className='action-btns'>
            <Button variant="info" className='btn' onClick={handleOnFavorite} style={{ textDecoration: 'none', color: 'black', fontWeight: 'bold' }}>
              <BsStar /> Favorite
            </Button>
            <Button variant="secondary" className='btn' style={{ textDecoration: 'none', color: 'black', fontWeight: 'bold' }}>
              <BsFillHouseDoorFill /> Adopt Me
            </Button>
          </section>
          <section className='progress-bar'>
            <b>Progress in the shelter's training milestones</b>
            <br></br>
            <ProgressBar now={60} striped variant="secondary" />
          </section>
          <div className='training-feed'>
            <h2>Training Feed</h2>
            <div className='feed'>
              <TrainingFeed milestones={milestones} dogInfo={dogInfo} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
  // }
}
