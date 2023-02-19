import React, {useState} from 'react';

//components
import FileLoader from './fileLoader';
import CardsContainer from './cardsContainer';
const MainContainer = props => {
  const [ rewardsPoints, updateRewardsPoints] = useState([]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resp = await fetch('/api/rewards/', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ fileAddress: e.target[0].value })
      });
    const rewardsArray = await resp.json();
      updateRewardsPoints(rewardsArray);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <h1>Charter Communications Rewards Portal</h1>
      <FileLoader handleSubmit={ handleSubmit} />
      <CardsContainer rewardsPoints={ rewardsPoints} />
    </>
  )
}

export default MainContainer;

