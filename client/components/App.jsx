import React from 'react';

const App = props => {
  const handleClick = async(e) => {
    console.log(e.target.innerText)
    try {
    const resp = await fetch('/api');
    const data = await resp.json();
    console.log(data);
    } catch (error) {
      
    }

  }
  return (
    <div>
      <p>Hello Worlds</p>
      <button onClick={handleClick}>Click Me</button>
    </div>
  )
}

export default App;