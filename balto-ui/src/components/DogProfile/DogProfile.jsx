import React from 'react'
import './DogProfile.css'
import { Link, useNavigate } from 'react-router-dom'
import { BsFillHouseDoorFill, BsStar } from "react-icons/bs";
import TrainingFeed from '../TrainingFeed/TrainingFeed';
import {dogs, milestones} from '../../data'

export default function DogProfile() {

  const dog = dogs[0] // sample dog info

  return (
    <div className='profile-page'>
      <div className='banner'>
        <img src="#" className='banner-img'></img>
      </div>
      <div className='split-pane'>
        <div className='profile-pane'>
          <div className='profile-header'>
            <img src="#" className='profile-img'></img>
            <div className='profile-title'>
              <span>Hi, I'm <h1>{dog.name}</h1></span>
              <section className='tags'>
                <span className='tag'>{dog.breed}</span>
                <span className='tag'>{dog.dob}</span>
                <span className='tag'>{dog.size}</span>
                <span className='tag'>{dog.sex === 'm' ? 'male' : 'female'}</span>
              </section>
            </div>
          </div>
          <div className='about-section'>
            <section className='desc-1'>
              <h2>I'm known for being...</h2>
              <p>{dog.desc_1}</p>
            </section>
            <section className='desc-2'>
              <h2>I'm looking for someone who...</h2>
              <p>{dog.desc_2}</p>
            </section>
            <section className='shelter-loc'>
              <h2>You can meet me at...</h2>
              <p>Wags for Treats Animal Shelter</p>
              <p>2700 Ninth St, Berkeley, CA, 94710</p>
            </section>
          </div>
        </div>
        <div className='training-pane'>
          <section className='action-btns'>
            <div className='btn'>
              <Link to="/favorites">
                <BsStar />Favorite</Link>
            </div>
            <div className='btn'>
              <Link className='btn-txt' to="/adopt">
                <BsFillHouseDoorFill /> Adopt Me</Link>
            </div>
          </section>
          <section className='progress-bar'>
            <b>Progress in the shelter's training milestones</b>
            <div></div>
          </section>
          <div className='training-feed'>
            <h2>Training Feed</h2>
            <div className='feed'>
                  <TrainingFeed milestones={milestones}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
