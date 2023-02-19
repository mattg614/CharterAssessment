import React from 'react';

import CustomerCard from './customerCard';

const cardsContainer = ({rewardsData, selectedCustomer}) => {
  const customerCards = [];
  for (let [customerId, transactionData] of Object.entries(rewardsData)) {
    customerCards.push(<CustomerCard key={customerId} customerId={customerId} transactionData={transactionData} />)
  }
  return (
    <div>
      <CustomerCard customerId={selectedCustomer} transactionData={rewardsData[selectedCustomer]} />
    </div>
  )
}

export default cardsContainer;