import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { StarredContextProvider, useStarredContext } from '../../contexts/starred'
import { useAuthContext } from '../../contexts/auth'
import Dropdown from 'react-bootstrap/Dropdown'
import DogCard from '../DogCard/DogCard'
import LoginToAccess from '../LoginToAccess/LoginToAccess'
import "./StarredPage.css"

export default function StarredPageContainer() {

  // If no user is logged in, display a page telling them to login in order to access their favorites
  const { user, initialized } = useAuthContext()
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

  const { starredList, error, isLoading } = useStarredContext()

  return (
    <div className="starred-page">
      <div className='starred-page-container primary-container'>
        <div className='header'>
          <h1 className='title'>Favorited Dogs ({starredList.length})</h1>
          <DropDownSortMenu className="filter-menu" variant="secondary" />
        </div>
        <div className='starred-grid'>
          {starredList.map(starredDog => {
            return <DogCard key={starredDog.id}
                      dogId={starredDog.id}
                      name={starredDog.name}
                      breed={starredDog.breed}
                      dob={starredDog.dob}
                      imgUrl={starredDog.image_url} />
          })}
        </div>
      </div>
    </div>
  )
}

export function DropDownSortMenu() {
  const [sort, setSort] = useState("") 
  const { starredList, error, isLoading } = useStarredContext()

  useEffect(() => {
  }, [sort])

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
    return new Date(b.date_entered) - new Date(a.date_entered)
  }

  // sort based on dropdown selection
  if (sort == "name") { starredList.sort(sortByNameAsc) }
  else if (sort == "size") { starredList.sort(sortBySizeAsc) }
  else if (sort == "age") { starredList.sort(sortByAgeAsc) }

  return (
    <Dropdown name="sort-dropdown" id="sort-dropdown">
      <Dropdown.Toggle variant="secondary" id="sort-toggle">
        Sort by:
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item onClick={()=>{setSort("name")}}>Name (A-Z)</Dropdown.Item>
        <Dropdown.Item onClick={()=>{starredList.sort()}}>Distance (Ascending)</Dropdown.Item>
        <Dropdown.Item onClick={()=>{setSort("size")}}>Size (Ascending)</Dropdown.Item>
        <Dropdown.Item onClick={()=>{setSort("age")}}>Age (Ascending)</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  )
}