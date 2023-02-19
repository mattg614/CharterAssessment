import React, { useState } from "react";

import styles from './customerCard.scss';

const CustomerCard = ({ customerId, transactionData }) => {

  let monthData = [];
  for (let [monthYear, data] of Object.entries(transactionData.monthTransactions)) {
    monthData.push(<p id={monthYear} key={monthYear}>{monthYear} : {data.monthPts} points</p>)
  }
  return (
    <div className="customer-rewards">
      <h3>{`Customer ID: ${customerId}`}</h3>
      <p>{`Total Points: ${transactionData.totalPts} points`}</p>
      {monthData}
    </div>
  )
}

export default CustomerCard;