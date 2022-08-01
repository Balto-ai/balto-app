import React from 'react'
import Select from 'react-select'
import './FilterSearchbar.css'

export default function FilterSearchbar({ isMulti=true, optionsArr=[], selectedOptions=[], setSelectedOptions=()=>{}, placeholder="Search" }) {

  // optionsArr: supplies options that will be shown in the returned Select element
    // Select element takes an options prop thats formatted in an array of { value, label } objects

  // selectedOptions + setSelectedOptions: useState variables that will get updated as user selects options

  // placeholder: ex. "Search by breed"

  // when the user should be able to select multiple; updates the selectedOptions state var to the list of all selected values
  const handleSelectionChangeMulti = (evt) => {
    setSelectedOptions( evt.map(selection => selection.value) )
  }
  
  // when the user should be able to select only one; updates the selectedOptions state var to the single selected item
  const handleSelectionChangeSingle = (evt) => {
    setSelectedOptions([evt.value])
  }

  if (isMulti) {
    return (
      <Select
        options={optionsArr}
        placeholder={placeholder}
        // set value of the element
        value={optionsArr.filter((selection) => selectedOptions.includes(selection.value))}
        onChange={handleSelectionChangeMulti}
        // these two allows menu to stay open when the user selects an option
        closeMenuOnSelect={false}
        blurInputOnSelect={false}
        // isMulti allows multiple options to be selected
        isMulti
      />
    )
  } else {
    return (
      <Select
        options={optionsArr}
        placeholder={placeholder}
        // set value of the element
        value={optionsArr.filter((selection) => selectedOptions.includes(selection.value))}
        onChange={handleSelectionChangeSingle}
        // these two allows menu to stay open when the user selects an option
        closeMenuOnSelect={false}
        blurInputOnSelect={false}
      />
    )
  }
}