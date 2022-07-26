import React from 'react'
import Select from 'react-select'
import './FilterSearchbar.css'

export default function FilterSearchbar({ optionsArr=[], selectedOptions=[], setSelectedOptions=()=>{}, placeholder="Search" }) {

  // supplies options that will be shown in the returned Select element
    // since Select element takes an options prop thats formatted in an array of { value, label } objects 
  const options = optionsArr.map((option) => {
    return { value:option, label:option }
    }
  )

  // updates the selectedOptions state var
  const handleSelectionChange = (evt) => {
    setSelectedOptions( evt.map(selection => selection.value) )
  }

  return (
    <Select
      options={options}
      placeholder={placeholder}
      // set value of the element
      value={options.filter((selection) => selectedOptions.includes(selection.value))}
      onChange={handleSelectionChange}
      // these two allows menu to stay open when the user selects an option
      closeMenuOnSelect={false}
      blurInputOnSelect={false}
      // isMulti allows multiple options to be selected
      isMulti
     />
  )
}