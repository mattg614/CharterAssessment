import React, {useState} from "react";

const CustomerCard = ({ customerId, transactionData }) => {
  const [show , toggleShow] = useState(false);
  const handleClick = () => {
    toggleShow(!show);
  }
  const monthData = [];
  for (let [monthYear, data] of Object.entries(transactionData.monthTransactions)) {
    monthData.push(<p key={monthYear}>{monthYear} : {data.monthPts} points</p>)
  }
  console.log(monthData);
  return (
    <div>
      <button onClick={handleClick}>{`Customer ID: ${customerId}`}</button>
      {show &&
        <p>Total Points: {transactionData.totalPts} points</p>} 
      {show && monthData}
    </div>
  )
}

export default CustomerCard;