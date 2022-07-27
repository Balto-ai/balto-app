import React from "react";
import Accordion from "react-bootstrap/Accordion";
import Form from "react-bootstrap/Form";
import Badge from "react-bootstrap/Badge";
import BreedSearchbar from "../BreedSearchbar/BreedSearchbar";
import ShelterSearchbar from "../ShelterSearchbar/ShelterSearchbar";
import ApiClient from "../../services/ApiClient";

export default function DogSearchPage() {
  // options that will show up on the filters, not used for anything else
  const sizeOptions = ["Small", "Medium", "Large"];
  const genderOptions = ["Male", "Female"];
  const goodWithOptions = ["Kids", "Strangers", "Other dogs"];
  const distanceOptions = [5, 10, 15];

  // states each of the filters
  const [selectedBreeds, setSelectedBreeds] = React.useState([]); // ex. ["Dalmation", "Labrador"]
  const [selectedSizes, setSelectedSizes] = React.useState([]); // ex. ["S", "M"]
  const [selectedGenders, setSelectedGenders] = React.useState([]); // ex. ["M", "F"]
  const [selectedGoodWith, setSelectedGoodWith] = React.useState([]); // ex. ["Kids", "Strangers"]
  const [selectedDistance, setSelectedDistance] = React.useState(""); // integer, or '' if distance isn't selected
  const [selectedShelters, setSelectedShelters] = React.useState([]); // selected shelters by their Id, ex. [3, 4]

  const filters = {
    breed: selectedBreeds,
    size: selectedSizes,
    sex: selectedGenders,
    kidFriendly: selectedGoodWith.includes("Kids"),
    strangerFriendly: selectedGoodWith.includes("Strangers"),
    dogFriendly: selectedGoodWith.includes("Other dogs"),
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
                selectedShelters={selectedShelters}
                setSelectedShelters={setSelectedShelters}
              />
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>

      <div className="dog-grid">
        <DogGrid filters = {filters}/>
      </div>
    </div>
  )
}

export function DogGrid({ filters={} }) {

  const [dogResults, setDogResults] = React.useState([]);
  const [error, setError] = React.useState(null)

  React.useEffect(() => {
    const fetchDogResults = async () => {
      console.log("filters:", filters)
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
    <div className="hi">
      {dogResults.map((dogResult, idx) => (
        <p key={dogResult?.id || idx}>{dogResult?.name}</p>
      ))}
    </div>
  );
}
