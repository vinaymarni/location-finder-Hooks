import React, { useState } from "react";

import Axios from "axios";
import './dataShow.css';

function App() {
  const [data, setData] = useState([]);
  const [containerDisplay, setContainerDisplay] = useState("none");
 
  const getData = async () => {
    setContainerDisplay("block")
    await Axios.get(`http://localhost:3000/`)
    .then((res) => {
      setData(res.data);
    })
  }

  return (
    <div className="App">
        <div className="top_container">
          <button className="data-buttons" onClick={getData}>Get Data from Server</button> 
          <button className="data-buttons" onClick={()=> setContainerDisplay("none")}>Clear</button>
        </div>   
        <div style={{display: containerDisplay}}>
          <h1 style={{color: "white"}}>History</h1>        
          <div>
            {data.map((each) => {
            return(
            <div key={each.id} className="box_container">
              <div className="top_container">
                <p>{each.id}:  </p><h3> {each.place}</h3>
              </div>
              <div className="coordinates_container">
                <h3>Longitude : </h3><p style={{marginRight: "10px", marginLeft: "5px"}}>{each.lon}</p>
                <h3>Latitude : </h3><p style={{marginRight: "10px", marginLeft: "5px"}}>{each.lat}</p>
              </div>
          </div>
          )
        })}
          </div>
        </div>      
    </div>
  );
}

export default App;
