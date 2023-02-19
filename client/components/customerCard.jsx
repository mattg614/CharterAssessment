import React, {useState} from "react";

const CustomerCard = ({ customerId, transactionData }) => {

  let monthData = [];
  for (let [monthYear, data] of Object.entries(transactionData.monthTransactions)) {
    monthData.push(<p id={monthYear} key={monthYear}>{monthYear} : {data.monthPts} points</p>)
  }
  return (
    <div>
      <h3>{`Customer ID: ${customerId}`}</h3>
      <p>{`Total Points: ${transactionData.totalPts}`}</p>
      {monthData}
    </div>
  )
}

export default CustomerCard;