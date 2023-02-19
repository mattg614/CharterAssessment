import React from "react";
import styles from './customerSelector.scss';
const CustomerSelector = ({ handleSubmit, customerIds }) => {
  const options = [];
  customerIds.forEach(id => {
    options.push(<option value={id} key={id}>Customer Id: {id}</option>)
  });
  
  return (
    <form className='customer-selector' onSubmit = {handleSubmit} >
      <label>Select the desired Customer Id
      <select>
        {options}
      </select>
      </label>
      <input type='submit' value='Submit' />
    </form>
  )
}
export default CustomerSelector;