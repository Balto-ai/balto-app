import React from "react";
import Accordion from "react-bootstrap/Accordion";
import Chip from '@mui/material/Chip'
import Dropdown from 'react-bootstrap/Dropdown';
import Form from "react-bootstrap/Form";
import Badge from "react-bootstrap/Badge";
import BreedSearchbar from "../BreedSearchbar/BreedSearchbar";
import ShelterSearchbar from "../ShelterSearchbar/ShelterSearchbar";
import ApiClient from "../../services/ApiClient";
import DogCard from "../DogCard/DogCard"
import "./DogSearchPage.css"

export default function DogSearchPage() {
  // options that will show up on the filters, not used for anything else
  const sizeOptions = ["Small", "Medium", "Large"];
  const genderOptions = ["Male", "Female"];
  const goodWithOptions = ["Kids", "Strangers", "Other dogs", "Cats", "Beginner Owners"];
  const distanceOptions = [5, 10, 15];
  
  // states each of the filters
  const [selectedBreeds, setSelectedBreeds] = React.useState([]); // ex. ["Dalmation", "Labrador"]
  const [selectedSizes, setSelectedSizes] = React.useState([]); // ex. ["S", "M"]
  const [selectedGenders, setSelectedGenders] = React.useState([]); // ex. ["M", "F"]
  const [selectedGoodWith, setSelectedGoodWith] = React.useState([]); // ex. ["Kids", "Strangers"]
  const [selectedDistance, setSelectedDistance] = React.useState(""); // integer, or '' if distance isn't selected
  const [selectedShelters, setSelectedShelters] = React.useState([]); // selected shelters by their Id, ex. [3, 4]
  const [sortBy, setSortBy] = React.useState('')

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
  };
  return (
    <div className="dog-search-page">
      <div className="dog-search-page-container">
      <div className="filter-sidebar">
        {/* alwaysOpen allows multiple filters to be open at once */}
        <Accordion alwaysOpen>
          {/* breed filter (dropdown search) */}
          <Accordion.Item eventKey="breed">
            {/* if any filters have been selected, header shows Badge with number of selected filters */}
            <Accordion.Header>
              Breed
              {selectedBreeds.length > 0 ? (
                <Badge pill bg="primary">
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
                <Badge pill bg="primary">
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
                      onChange={(evt) => {
                        handleCheck(evt, selectedSizes, setSelectedSizes);
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
                <Badge pill bg="primary">
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
                      onChange={(evt) => {
                        handleCheck(evt, selectedGenders, setSelectedGenders);
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
                <Badge pill bg="primary">
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
                <Badge pill bg="primary">
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
                <Badge pill bg="primary">
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
      </div>
      <div>
        <div className="search-dog-header">
          <div className="search-col" id='applied-filters'>
          {(selectedBreeds.length > 0 || selectedDistance.length > 0 || selectedGenders.length > 0 || selectedGoodWith.length > 0 || selectedShelters.lenght > 0 || selectedSizes.length > 0) && <h2 className="applied-filters-title">Applied Filters</h2>}
          
          <div className="applied-filters-labels">
            {selectedGenders.length > 0 && selectedGenders.map((gender, ind)=>{
              return(
                <Chip className="applied-filters-chip" key={ind} label = {gender === 'm' ? 'Male': 'Female'} name={gender}/>
              )
            })}
            {selectedBreeds.length > 0 && selectedBreeds.map((breed, ind)=>{
              return(
                <Chip className="applied-filters-chip"  key={ind} label = {breed} name={breed}/>
              )
            })}
            {selectedDistance && <Chip className="applied-filters-chip" label = {`${selectedDistance} miles`} name={selectedDistance}/>}
           
            {selectedGoodWith.length > 0 && selectedGoodWith.map((goodWith, ind)=>{
              return(
                <Chip className="applied-filters-chip"  key={ind} label = {goodWith} name={goodWith}/>
              )
            })}
            {selectedSizes.length > 0 && selectedSizes.map((size, ind)=>{
              return(
                <Chip className="applied-filters-chip"  key={ind} label = {size} name={size}/>
              )
            })}
            {selectedShelters.length > 0 && <ShelterNames selectedShelters={selectedShelters} setSelectedShelters={setSelectedShelters} />

            }
            </div>
          </div>
       
        <div className='search-col' id='dropdown-menu'>
          <DogRecordDropdown sortBy={sortBy} setSortBy={setSortBy} className="dog-record-sort" />
        </div>
        </div>
        <div>
          <DogGrid sortBy={sortBy} setSortBy={setSortBy} filters = {filters}/>
        </div>
      </div>
              
      
    </div>
    </div>
  )
}

export function DogGrid({ filters={}, setSortBy, sortBy }) {

  const [dogResults, setDogResults] = React.useState([]);
  const [error, setError] = React.useState(null)
  // sorting functions
 function sortByNameAsc(a, b) {
  if ( a.name.toLowerCase() < b.name.toLowerCase() ) return -1
  if ( a.name.toLowerCase() > b.name.toLowerCase() ) return 1
  return 0
}

function sortByNameDesc(a, b) {
  if ( a.name.toLowerCase() < b.name.toLowerCase() ) return 1
  if ( a.name.toLowerCase() > b.name.toLowerCase() ) return -1
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



// sort dogRecords based on sort criteria
if (sortBy === 'Name (A-Z)') {
  dogResults.sort( sortByNameAsc )
} else if (sortBy === 'Name (Z-A)') {
  dogResults.sort( sortByNameDesc )
}else if (sortBy === 'Newest Addition') {
  dogResults.sort( sortByDateEnteredAsc )
}else if (sortBy === 'Oldest Addition') {
  dogResults.sort( sortByDateEnteredDesc )
}else if (sortBy === 'Youngest to Oldest') {
  dogResults.sort( sortByDOBAsc )
}else if (sortBy === 'Oldest to Youngest') {
  dogResults.sort( sortByDOBDesc )
}


  React.useEffect(() => {
    const fetchDogResults = async () => {
      const { data, error } = await ApiClient.fetchDogs(filters);
      if (data?.dogResults) {
        setDogResults(data.dogResults)
        setError(null)
      }
      if (error) setError(error);
    };
    fetchDogResults()
  }, [filters])

  return (
    <div className="dog-grid">
      {dogResults.map((dogResult, idx) => (
        <DogCard key={dogResult.id || idx}
          dogId={dogResult.id}
          imgUrl={dogResult.image_url}
          name={dogResult.name}
          dob={dogResult.dob}
          breed={dogResult.breed}
          ageGroup={dogResult.dob}
        />

      ))}
    </div>
  );
}
export function DogRecordDropdown({ sortBy, setSortBy }) {
  return (
      <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">Sort By: {sortBy}</Dropdown.Toggle>
          <Dropdown.Menu>
              <Dropdown.Item onClick={()=>{setSortBy("Name (A-Z)")}}>Name (A-Z)</Dropdown.Item>
              <Dropdown.Item onClick={()=>{setSortBy("Name (Z-A)")}}>Name (Z-A)</Dropdown.Item>
              <Dropdown.Item onClick={()=>{setSortBy("Youngest to Oldest")}}>Youngest to Oldest</Dropdown.Item>
              <Dropdown.Item onClick={()=>{setSortBy("Oldest to Youngest")}}>Oldest to Youngest</Dropdown.Item>
              <Dropdown.Item onClick={()=>{setSortBy("Newest Addition")}}>Newest Addition</Dropdown.Item>
              <Dropdown.Item onClick={()=>{setSortBy("Oldest Addition")}}>Oldest Addition</Dropdown.Item>
          </Dropdown.Menu>
      </Dropdown>
  )
}
export function ShelterNames({selectedShelters=[], setSelectedShelters=()=>{}}){
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
    }, [])

    if (Object.keys(shelters).length !== 0){
      result = selectedShelters.map((el)=>{
        let obj = shelters.find(({id})=> id === el)
        return obj;
      })
    }
    
    return(
      <span>
        {result.length !== 0 && result.map((element)=>{
          return(
            <Chip className="applied-filters-chip" label = {element.name}/>
          )
        })}
      </span>
      
    )
}