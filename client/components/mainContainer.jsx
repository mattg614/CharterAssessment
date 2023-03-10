import React, { useState } from 'react';

//styles
import styles from './mainContainer.scss'; 

//components
import FileLoader from './fileLoader';
import CardsContainer from './cardsContainer';
import CustomerSelector from './customerSelector';
const MainContainer = props => {
  const [rewardsData, updateRewardsData] = useState({});
  const [showSelector, updateShowSelector] = useState(false);
  const [selectedCustomer, updateSelectedCustomer] = useState(null);
  const [showCustomerCard, updateShowCustomerCard] = useState(false);
  const handleFileSubmit = async (e) => {
    e.preventDefault();
    try {
      const resp = await fetch('/api/rewards/', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ fileAddress: e.target[0].value })
      });
    const rewardsResult = await resp.json();
      updateRewardsData(() => ({ ...rewardsData, ...rewardsResult }));
      updateShowSelector(() => true);
    } catch (error) {
      console.log(error);
    }
  }
  const handleCustomerSubmit = (e) => {
    e.preventDefault();
    updateSelectedCustomer(() => e.target[0].value);
    updateShowCustomerCard(() => true);
  }
  const reset = (e) => {
    updateRewardsData(() => { });
    updateShowSelector(() => false);
    updateSelectedCustomer(() => null);
    updateShowCustomerCard(() => false);
  }
  return (
    <div className='outerContainer'>
      <div className='header'>
        <h1>Charter Communications Rewards Portal</h1>
        {(showSelector || showCustomerCard) && <button onClick={reset}>Load Other Data</button>}
      </div>
      {!showSelector && <FileLoader handleSubmit={handleFileSubmit} />}
      {showSelector && <CustomerSelector handleSubmit={handleCustomerSubmit} customerIds={Object.keys(rewardsData)} />}
      {showCustomerCard && <CardsContainer rewardsData={rewardsData} selectedCustomer={selectedCustomer} />}
    </div>
  )
}

export default MainContainer;

