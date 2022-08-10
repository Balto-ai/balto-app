import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { StarredContextProvider, useStarredContext } from '../../contexts/starred'
import { useAuthContext } from '../../contexts/auth'
import Dropdown from 'react-bootstrap/Dropdown'
import DogCard from '../DogCard/DogCard'
import LoginToAccess from '../LoginToAccess/LoginToAccess'
import { Box } from '@mui/material';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import "./StarredPage.css"
import Loading from '../Loading/Loading'

export default function StarredPageContainer() {

  const { user, initialized } = useAuthContext()

  // If no user is logged in, display a page telling them to login in order to access their favorites
  if (initialized && !user?.email) {
    return (
      <LoginToAccess />
    )
  }

  return (
    <StarredContextProvider>
      <StarredPage />
    </StarredContextProvider>
  )
}

export function StarredPage() {

  const { starredList, error,} = useStarredContext()
  const [onStarPage, setOnStarPage] = useState(true)
  const [sortBy, setSortBy] = React.useState('')
  const [starredDogs, setStarredDogs] = useState([])
  const [isLoading, setIsLoading] = React.useState(false)

  const { userLocation } = useAuthContext()

  useEffect(()=>{
    if (starredDogs.length === 0){
      setIsLoading(true)
      setStarredDogs(starredList)
    }
    setIsLoading(false)
  },[starredList, isLoading, starredDogs])

  // nearly identical to the ones in the dog search page, just calcultes distance from user and adds it to the dog object
  
  function calcDistForUser() {
    const dogArr = starredDogs
    const loc = userLocation
    dogArr.map((dog) => {
      dog["distanceBetween"] = findDistance(dog.latitude, loc.latitude, dog.longitude, loc.longitude)
    })
    return dogArr
  }

  function findDistance(lat1,
    lat2, lon1, lon2) {

    var radlat1 = Math.PI * lat1 / 180
    var radlat2 = Math.PI * lat2 / 180
    var theta = lon1 - lon2
    var radtheta = Math.PI * theta / 180
    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    dist = Math.acos(dist)
    dist = dist * 180 / Math.PI
    dist = dist * 60 * 1.1515
    dist = dist * 0.8684
    return dist
  }
  
  calcDistForUser()

  return (
    <div className="starred-page">
      <div className='starred-page-container primary-container'>
       <Grid container direction='row' justifyContent='space-between'>
        <Grid item>
          <Box>
            <h1 className='title'>Favorites ({starredList.length})</h1>
          </Box>
        </Grid>
        <Grid item>
          <Box>
            <DropDownSortMenu setStarredDogs={setStarredDogs} starredList={starredList} setSortBy={setSortBy} sortBy={sortBy} starredDogs={starredDogs} className="filter-menu" variant="secondary" />
          </Box>
        </Grid>
       </Grid>
       <Grid container>
        <Grid item width="1">
          <Box>
            <DogGrid setIsLoading={setIsLoading} isLoading={isLoading} setOnStarPage={setOnStarPage} onStarPage={onStarPage} starredDogs={starredDogs} userLocation={userLocation} />
          </Box>
        </Grid>
       </Grid>
      </div>
    </div>
  )
}

export function DropDownSortMenu({ setStarredDogs, starredList, setSortBy, sortBy}) {
  useEffect(() => {

  }, [sortBy])

  if (sortBy !== ""){
    if (sortBy === "Name (A-Z)") { setStarredDogs(starredList.sort(sortByNameAsc)) }
    else if (sortBy === "Size (Ascending)") { setStarredDogs(starredList.sort(sortBySizeAsc)) }
    else if (sortBy === "Age (Ascending)") { setStarredDogs(starredList.sort(sortByAgeAsc)) }
  }
  function sortByNameAsc(a, b) {
    if (a.name.toLowerCase() < b.name.toLowerCase()) return -1
    if (a.name.toLowerCase() > b.name.toLowerCase()) return 1
    return 0
  }

  function sortBySizeAsc(a, b) {
    const sizeMap = { "small": 1, "medium": 2, "large": 3 }
    const dogA = sizeMap[a.size.toLowerCase()]
    const dogB = sizeMap[b.size.toLowerCase()]
    if (dogA < dogB) { return -1 }
    if (dogA > dogB) { return 1 }
    return 0
  }

  function sortByAgeAsc(a, b) {
    return new Date(b.dob) - new Date(a.dob)
  }

  // sort based on dropdown selection
 
  return (
    <Dropdown name="sort-dropdown" id="sort-dropdown">
      <Dropdown.Toggle variant="secondary" id="sort-toggle">
        Sort by: {sortBy}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item onClick={()=>{setSortBy("Name (A-Z)")}}>Name (A-Z)</Dropdown.Item>
        {/* <Dropdown.Item onClick={()=>{starredDogs.sort()}}>Distance (Ascending)</Dropdown.Item> */}
        <Dropdown.Item onClick={()=>{setSortBy("Size (Ascending)")}}>Size (Ascending)</Dropdown.Item>
        <Dropdown.Item onClick={()=>{setSortBy("Age (Ascending)")}}>Age (Ascending)</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  )
}

export function DogGrid({starredDogs, onStarPage, setOnStarPage, isLoading}){
  
  useEffect(()=>{
  },[starredDogs])
  if (isLoading) {
    return (
    <div className='primary-container'>
      <Loading />
    </div>
    )
  }
  
  return (
    <div className='dog-grid'>
    {starredDogs.map(starredDog => {
      return <DogCard key={starredDog.dog_id}
                distancebetween={starredDog.distanceBetween}
                dogId={starredDog.dog_id}
                name={starredDog.name}
                breed={starredDog.breed}
                dob={starredDog.dob}
                imgUrl={starredDog.image_url} onStarPage={onStarPage} setOnStarPage={setOnStarPage} />
    })}
    </div>
  )
}