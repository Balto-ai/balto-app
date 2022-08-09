import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import Accordion from "react-bootstrap/Accordion";
import Chip from '@mui/material/Chip'
import Dropdown from 'react-bootstrap/Dropdown';
import Form from "react-bootstrap/Form";
import Grid from '@mui/material/Grid';
import { BsX } from "react-icons/bs"
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import Badge from "react-bootstrap/Badge";
import BreedSearchbar from "../BreedSearchbar/BreedSearchbar";
import ShelterSearchbar from "../ShelterSearchbar/ShelterSearchbar";
import ApiClient from "../../services/ApiClient";
import DogCard from "../DogCard/DogCard"
import "./DogSearchPage.css"
import { useAuthContext } from "../../contexts/auth";

import ReactPaginate from 'react-paginate';

export default function DogSearchPage() {

  // import auth variables
  const { user, userLocation, askForLocation, setAskForLocation } = useAuthContext()

  const [resultCount, setResultCount] = React.useState(0);

  // states each of the filters
  const [selectedBreeds, setSelectedBreeds] = React.useState([]); // ex. ["Dalmation", "Labrador"]
  const [selectedSizes, setSelectedSizes] = React.useState([]); // ex. ["S", "M"]
  const [selectedGenders, setSelectedGenders] = React.useState([]); // ex. ["M", "F"]
  const [selectedGoodWith, setSelectedGoodWith] = React.useState([]); // ex. ["Kids", "Strangers"]
  const [selectedDistance, setSelectedDistance] = React.useState(""); // integer, or '' if distance isn't selected
  const [selectedShelters, setSelectedShelters] = React.useState([]); // selected shelters by their Id, ex. [3, 4]
  const [sortBy, setSortBy] = React.useState('')

  // filters that will be used to show the correct dogs in the DogGrid component
  const filters = {
    breed: selectedBreeds,
    size: selectedSizes,
    sex: selectedGenders,
    kidFriendly: selectedGoodWith.includes("Kids"),
    strangerFriendly: selectedGoodWith.includes("Strangers"),
    dogFriendly: selectedGoodWith.includes("Other dogs"),
    catFriendly: selectedGoodWith.includes("Cats"),
    noviceFriendly: selectedGoodWith.includes("Beginner Owners"),
    distance: selectedDistance || null,
    shelterIds: selectedShelters
  }

  // function that will be used to clear all filters
  const clearFilters = () => {
    setSelectedBreeds([])
    setSelectedSizes([])
    setSelectedGenders([])
    setSelectedGoodWith([])
    setSelectedDistance("")
    setSelectedShelters([])
  }

  setAskForLocation(true)


  return (
    <div className="dog-search-page primary-container">

      <Grid container spacing={3} direction="row" alignItems="flex-start" >

          {/* col #1 the filter sidebar */}
          <Grid item sm={12} md={3} sx={{ width: 1}}>

            <FilterSidebar 
              selectedBreeds={selectedBreeds} setSelectedBreeds={setSelectedBreeds}
              selectedSizes={selectedSizes} setSelectedSizes={setSelectedSizes}
              selectedGenders={selectedGenders} setSelectedGenders={setSelectedGenders}
              selectedGoodWith={selectedGoodWith} setSelectedGoodWith={setSelectedGoodWith}
              selectedDistance={selectedDistance} setSelectedDistance={setSelectedDistance}
              selectedShelters={selectedShelters} setSelectedShelters={setSelectedShelters}
            />
          </Grid>

          {/* col #2 filter chips, sort by dropdown, and dog grid */}
          <Grid item container justifyContent="space-between" sm={12} md={9}>

            <Grid item sx={{ width: 1 }}>
              <div className="dog-search-topline">
                <div id="result-count-label">{resultCount} {resultCount === 1 ? "result" : "results"}</div>
                <div><DogRecordDropdown sortBy={sortBy} setSortBy={setSortBy} className="dog-record-sort" /></div>
              </div>
            </Grid>

            <Grid item sx={{ width: 1 }} className="mb-3">
              <AppliedFilters
                selectedBreeds={selectedBreeds} setSelectedBreeds={setSelectedBreeds}
                selectedSizes={selectedSizes} setSelectedSizes={setSelectedSizes}
                selectedGenders={selectedGenders} setSelectedGenders={setSelectedGenders}
                selectedGoodWith={selectedGoodWith} setSelectedGoodWith={setSelectedGoodWith}
                selectedDistance={selectedDistance} setSelectedDistance={setSelectedDistance}
                selectedShelters={selectedShelters} setSelectedShelters={setSelectedShelters}
                onClearFilters={clearFilters}
              />
            </Grid>
        

            <Grid item sx={{ width: 1 }}>
              <DogGrid itemsPerPage={12} sortBy={sortBy} setSortBy={setSortBy} filters={filters} userLocation={userLocation} setResultCount={setResultCount} />
            </Grid>

          </Grid>

      </Grid>
    </div>
  )
}

// sidebar where user can select criteria to filter by
export function FilterSidebar({
  selectedBreeds=[], setSelectedBreeds=()=>{},
  selectedSizes=[], setSelectedSizes=()=>{},
  selectedGenders=[], setSelectedGenders=()=>{},
  selectedGoodWith=[], setSelectedGoodWith=()=>{},
  selectedDistance="", setSelectedDistance=()=>{},
  selectedShelters=[], setSelectedShelters=()=>{}
  }) {

  // options that will show up on the filters, not used for anything else
  const sizeOptions = ["Small", "Medium", "Large"];
  const genderOptions = ["Male", "Female"];
  const goodWithOptions = ["Kids", "Strangers", "Other dogs", "Cats", "Beginner Owners"];
  const distanceOptions = [5, 10, 15];

  // function to handle checking/unchecking checkboxes used in the size, gender, and good with filters
  //    takes a state var and setState var  as params (ex. selectedSizes and setSelectedSizes)
  const handleCheck = (evt, stateArr, setStateArr) => {
    let newArr = [...stateArr];
    if (evt.target.checked) {
      // checking if the checkbox just got checked or unchecked
      newArr = [...stateArr, evt.target.value];
    } else {
      newArr.splice(stateArr.indexOf(evt.target.value), 1);
    }
    setStateArr(newArr); // updating the stateArr here
  }

  return (
    <>
    {/* alwaysOpen allows multiple filters to be open at once */}
    <Accordion alwaysOpen>
      {/* breed filter (dropdown search) */}
      <Accordion.Item eventKey="breed">
        {/* if any filters have been selected, header shows Badge with number of selected filters */}
        <Accordion.Header>
          Breed
          {selectedBreeds.length > 0 ? (
            <Badge pill bg="primary" className="filter-badge">
              {selectedBreeds.length}
            </Badge>
          ) : null}
        </Accordion.Header>
        <Accordion.Body>
          <BreedSearchbar
            isMulti={true}
            selectedBreeds={selectedBreeds}
            setSelectedBreeds={setSelectedBreeds}
          />
        </Accordion.Body>
      </Accordion.Item>

      {/* size filter (checkboxes) */}
      <Accordion.Item eventKey="size">
        <Accordion.Header>
          Size
          {selectedSizes.length > 0 ? (
            <Badge pill bg="primary" className="filter-badge">
              {selectedSizes.length}
            </Badge>
          ) : null}
        </Accordion.Header>
        <Accordion.Body>
          <Form>
            {sizeOptions.map((option) => (
              <div key={option} className="mb-3">
                <Form.Check
                  type="checkbox"
                  id={option}
                  label={option}
                  value={option.toLowerCase()}
                  checked={selectedSizes.includes(option.toLowerCase())}
                  onChange={(evt) => {
                    handleCheck(evt, selectedSizes, setSelectedSizes)
                  }}
                />
              </div>
            ))}
          </Form>
        </Accordion.Body>
      </Accordion.Item>

      {/* gender filter (checkboxes) */}
      <Accordion.Item eventKey="gender">
        <Accordion.Header>
          Gender
          {selectedGenders.length > 0 ? (
            <Badge pill bg="primary" className="filter-badge">
              {selectedGenders.length}
            </Badge>
          ) : null}
        </Accordion.Header>
        <Accordion.Body>
          <Form>
            {genderOptions.map((option) => (
              <div key={option} className="mb-3">
                <Form.Check
                  type="checkbox"
                  id={option}
                  label={option}
                  value={option[0].toLowerCase()}
                  checked={selectedGenders.includes(option[0].toLowerCase())}
                  onChange={(evt) => {
                    handleCheck(evt, selectedGenders, setSelectedGenders)
                  }}
                />
              </div>
            ))}
          </Form>
        </Accordion.Body>
      </Accordion.Item>

      {/* good with filter (checkboxes) */}
      <Accordion.Item eventKey="good-with">
        <Accordion.Header>
          Good With
          {selectedGoodWith.length > 0 ? (
            <Badge pill bg="primary" className="filter-badge">
              {selectedGoodWith.length}
            </Badge>
          ) : null}
        </Accordion.Header>
        <Accordion.Body>
          <Form>
            {goodWithOptions.map((option) => (
              <div key={option} className="mb-3">
                <Form.Check
                  type="checkbox"
                  id={option}
                  label={option}
                  value={option}
                  checked={selectedGoodWith.includes(option)}
                  onChange={(evt) => {
                    handleCheck(evt, selectedGoodWith, setSelectedGoodWith);
                  }}
                />
              </div>
            ))}
          </Form>
        </Accordion.Body>
      </Accordion.Item>

      {/* distance filter (radio buttons) */}
      <Accordion.Item eventKey="distance">
        <Accordion.Header>
          Distance
          {selectedDistance && (
            <Badge pill bg="primary" className="filter-badge">
              1
            </Badge>
          )}
        </Accordion.Header>
        <Accordion.Body>
          <Form>
            <Form.Select
              aria-label="distance-select"
              // onChange prop updates distance choice
              onChange={(evt) => {
                setSelectedDistance(evt.target.value);
              }}
            >
              {/* default option to not specify distance constraint */}
              <option value={""}>Anywhere</option>
              {/* rest of the distance options */}
              {distanceOptions.map((option) => (
                <option key={option} value={option}>
                  Within {option} miles
                </option>
              ))}
            </Form.Select>
          </Form>
        </Accordion.Body>
      </Accordion.Item>

      {/* shelter filter (dropdown search) */}
      <Accordion.Item eventKey="shelter">
        <Accordion.Header>
          Shelter
          {selectedShelters.length > 0 ? (
            <Badge pill bg="primary" className="filter-badge">
              {selectedShelters.length}
            </Badge>
          ) : null}
        </Accordion.Header>
        <Accordion.Body>
          <ShelterSearchbar
            isMulti={true}
            selectedShelters={selectedShelters}
            setSelectedShelters={setSelectedShelters}
          />
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  </>
  )
}

// grid of dog cards sorted based on selection in the DogRecord dropdown
export function DogGrid({ itemsPerPage=4, filters={}, setSortBy, sortBy, userLocation={}, setResultCount=()=>{} }) {

  const [dogResults, setDogResults] = React.useState([])
  const [error, setError] = React.useState(null)

  const [currentItems, setCurrentItems] = React.useState([])
  const [pageCount, setPageCount] = React.useState(0)
  const [itemOffset, setItemOffset] = React.useState(0)
  const [currentPage, setCurrentPage] = React.useState(0)

  const navigate = useNavigate()

  // sorting functions
  function sortByNameAsc(a, b) {
    if (a.name.toLowerCase() < b.name.toLowerCase()) return -1
    if (a.name.toLowerCase() > b.name.toLowerCase()) return 1
    return 0
  }

  function sortByNameDesc(a, b) {
    if (a.name.toLowerCase() < b.name.toLowerCase()) return 1
    if (a.name.toLowerCase() > b.name.toLowerCase()) return -1
    return 0
  }


  function sortByDateEnteredAsc(a, b) {
    return new Date(b.date_entered) - new Date(a.date_entered)
  }

  function sortByDateEnteredDesc(a, b) {
    return new Date(a.date_entered) - new Date(b.date_entered)
  }

  function sortByDOBAsc(a, b) {
    return new Date(b.dob) - new Date(a.dob)
  }
  function sortByDOBDesc(a, b) {
    return new Date(a.dob) - new Date(b.dob)
  }

  calcDistForUser() // calculate the distances between user and dog shelter
  // add distanceBetween attribute to each dog

  function sortByLocationAsc(a, b) {
    if (a.distanceBetween < b.distanceBetween) return -1
    if (a.distanceBetween > b.distanceBetween) return 1
    return 0
  }

  function calcDistForUser() {
    const dogArr = dogResults
    // eslint-disable-next-line no-restricted-globals
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

  // useEffect to fetch the data and display the correct items for a page
  React.useEffect(() => {
    const fetchDogResults = async () => {
      const { data, error } = await ApiClient.fetchDogs(filters);
      if (data?.dogResults) {
        setDogResults(data.dogResults)
        setResultCount(data.dogResults.length)
        setError(null)
      if (error) setError(error)
      }
    }
  
    // first fetch all dog results based on filters (unsorted at this point)
    fetchDogResults()

    // start sorting afterwards
    //  have to sort in the use effect so that pagination works
    //  otherwise, it'll sort within each result page rather than across all results
    var sortedDogResults = [...dogResults]

    if (sortBy !== "") { // if there's a criteria to sort by...
      if (sortBy === 'Name (A-Z)') {
        sortedDogResults.sort(sortByNameAsc)
      } else if (sortBy === 'Name (Z-A)') {
        sortedDogResults.sort(sortByNameDesc)
      } else if (sortBy === 'Newest Addition') {
        sortedDogResults.sort(sortByDateEnteredAsc)
      } else if (sortBy === 'Oldest Addition') {
        sortedDogResults.sort(sortByDateEnteredDesc)
      } else if (sortBy === 'Youngest to Oldest') {
        sortedDogResults.sort(sortByDOBAsc)
      } else if (sortBy === 'Oldest to Youngest') {
        sortedDogResults.sort(sortByDOBDesc)
      } else if (sortBy === 'Distance (nearest)') {
        sortedDogResults.sort(sortByLocationAsc)
      }
    }

  const endOffset = itemOffset + itemsPerPage
  console.log("endOffset:", itemOffset + itemsPerPage)
  console.log("itemOffset:", itemOffset)
  // set the items to display using the sorted results
  setCurrentItems([...sortedDogResults].slice(itemOffset, endOffset))
  setPageCount(Math.ceil(dogResults.length / itemsPerPage))

  }, [itemOffset, itemsPerPage, filters, sortBy])


  // useEffect to reset current page to the first one whenever filters/sorting changes
  React.useEffect(() => {
    setItemOffset(0)
    setCurrentPage(0)
  }, [filters, sortBy])


  // event handler for when a user requests a new page
  const handlePageClick = (evt) => {
    const newOffset = (evt.selected * itemsPerPage) % dogResults.length
    setItemOffset(newOffset) // triggers fetching use effect to update the current items to show
    setCurrentPage(evt.selected) // update current page
  }

  return (
    <>
      <div className="dog-grid">
        {currentItems.map((dogResult, idx) => (
          <DogCard key={dogResult.dog_id || idx}
            dogId={dogResult.dog_id}
            imgUrl={dogResult.image_url}
            name={dogResult.name}
            dob={dogResult.dob}
            breed={dogResult.breed}
            ageGroup={dogResult.dob}
            distancebetween={dogResult.distanceBetween}
          />
        ))}
      </div>

      <ReactPaginate className="dog-search-pagination"
        breakLabel="..."
        nextLabel={<FiChevronRight />}
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel={<FiChevronLeft />}
        renderOnZeroPageCount={null}
        forcePage={currentPage}
        activeClassName="active-page"
        hrefBuilder={(page, pageCount) =>
          page >= 1 && page <= pageCount ? `/search/page/${page}` : '/#'
          }
        hrefAllControls={true}
      />


    </>
  )
}

// Applied Filters: + all the appropriate chips
export function AppliedFilters({
  selectedBreeds=[], setSelectedBreeds=()=>{},
  selectedSizes=[], setSelectedSizes=()=>{},
  selectedGenders=[], setSelectedGenders=()=>{},
  selectedGoodWith=[], setSelectedGoodWith=()=>{},
  selectedDistance="", setSelectedDistance=()=>{},
  selectedShelters=[], setSelectedShelters=()=>{},
  onClearFilters=()=>{}
  }) {

  const handleDelete = (itemToDelete, stateArr, setStateArr) => {
    const newArr = stateArr.filter((item) => item !== itemToDelete)
    setStateArr(newArr)
  }


  return (
    <div className="applied-filters">

    {/* {(selectedBreeds.length > 0 || selectedDistance.length > 0 || selectedGenders.length > 0 || selectedGoodWith.length > 0 || selectedShelters.length > 0 || selectedSizes.length > 0) && <h2 className="applied-filters-label">Applied Filters</h2>} */}

      {selectedGenders.length > 0 && selectedGenders.map((gender, ind) => {
        return (
          <Chip className="applied-filters-chip" key={ind} label={gender === 'm' ? 'Male' : 'Female'} name={gender}
            onDelete={()=>handleDelete(gender, selectedGenders, setSelectedGenders)} deleteIcon={<BsX style={{color: "white"}}/>} />
        )
      })}
      {selectedBreeds.length > 0 && selectedBreeds.map((breed, ind) => {
        return (
          <Chip className="applied-filters-chip" key={ind} label={breed} name={breed}
            onDelete={()=>handleDelete(breed, selectedBreeds, setSelectedBreeds)} deleteIcon={<BsX style={{color: "white"}}/>} />
        )
      })}
      {selectedDistance && <Chip className="applied-filters-chip" label={`${selectedDistance} miles`} name={selectedDistance}
        onDelete={()=>setSelectedDistance("")} deleteIcon={<BsX style={{color: "white"}}/>} />}

      {selectedGoodWith.length > 0 && selectedGoodWith.map((goodWith, ind) => {
        return (
          <Chip className="applied-filters-chip" key={ind} label={"Good with " + goodWith} name={goodWith}
            onDelete={()=>handleDelete(goodWith, selectedGoodWith, setSelectedGoodWith)} deleteIcon={<BsX style={{color: "white"}}/>} />
        )
      })}
      {selectedSizes.length > 0 && selectedSizes.map((size, ind) => {
        return (
          <Chip className="applied-filters-chip" key={ind} label={size[0].toUpperCase() + size.substring(1)} name={size}
            onDelete={()=>handleDelete(size, selectedSizes, setSelectedSizes)} deleteIcon={<BsX style={{color: "white"}}/>} />
        )
      })}
      {selectedShelters.length > 0 && <ShelterNames selectedShelters={selectedShelters} setSelectedShelters={setSelectedShelters} handleDelete={handleDelete} />}


    {(selectedBreeds.length > 0 || selectedDistance.length > 0 || selectedGenders.length > 0 || selectedGoodWith.length > 0 || selectedShelters.length > 0 || selectedSizes.length > 0)
      && <div id="filter-clear-label" onClick={onClearFilters}>Clear All</div>}

  </div>
  )
}

// dropdown for sorting
export function DogRecordDropdown({ sortBy, setSortBy }) {
  return (
    <Dropdown className="dog-record-dropdown">
      <Dropdown.Toggle variant="secondary" className="sort-by-dropdown" id="dropdown-basic">Sort By: {sortBy}</Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item onClick={() => { setSortBy("Name (A-Z)") }}>Name (A-Z)</Dropdown.Item>
        <Dropdown.Item onClick={() => { setSortBy("Name (Z-A)") }}>Name (Z-A)</Dropdown.Item>
        <Dropdown.Item onClick={() => { setSortBy("Youngest to Oldest") }}>Youngest to Oldest</Dropdown.Item>
        <Dropdown.Item onClick={() => { setSortBy("Oldest to Youngest") }}>Oldest to Youngest</Dropdown.Item>
        <Dropdown.Item onClick={() => { setSortBy("Distance (nearest)") }}>Distance (nearest)</Dropdown.Item>
        <Dropdown.Item onClick={() => { setSortBy("Newest Addition") }}>Newest Addition</Dropdown.Item>
        <Dropdown.Item onClick={() => { setSortBy("Oldest Addition") }}>Oldest Addition</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  )
}

// function to return a chip with shelter name, used in Applied Filters
export function ShelterNames({ selectedShelters = [], setSelectedShelters = () => {}, handleDelete=()=>{} }) {
  const [shelters, setShelters] = React.useState([])
  const [error, setError] = React.useState(null)
  const [shelter, setShelter] = React.useState({})
  var result = [];
  // useEffect to get JSON object of shelter names
  React.useEffect(() => {
    const fetchShelters = async () => {
      const { data, error } = await ApiClient.fetchShelters()
      if (data?.shelters) {
        // get the usable array of shelters [ { id:, name } ]
        setShelters(data.shelters)
        setError(null)
      }
      if (error) setError(error)
    }
    fetchShelters()
  }, [selectedShelters])

  if (Object.keys(shelters).length !== 0) {
    result = selectedShelters.map((el) => {
      let obj = shelters.find(({ id }) => id === el)
      return obj;
    })
  }


  return (
    <span className="applied-filters">
      {result.length !== 0 && result.map((element) => {
        return (
          <Chip className="applied-filters-chip" label={element.name} key={element.id}
          onDelete={()=>{handleDelete(element.id, selectedShelters, setSelectedShelters)}} deleteIcon={<BsX style={{color: "white"}}/>} />
        )
      })}
    </span>

  )
}