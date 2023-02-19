import React from 'react';

import CustomerCard from './customerCard';

const cardsContainer = ({rewardsPoints}) => {
  const customerCards = [];
  console.log(rewardsPoints);
  for (let [customerId, transactionData] of Object.entries(rewardsPoints)) {
    customerCards.push(<CustomerCard key={customerId} customerId={customerId} transactionData={transactionData} />)
  }
  return (
    <div>
      {customerCards}
    </div>
  )
}

export default cardsContainer;