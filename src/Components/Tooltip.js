import React from "react";

let id = "";
let areaName = "";
const getMapDetails = (localityId, localArea) => {
  id = localityId;
  areaName = localArea;
}

const Tooltip = () => {
  //const { id } = feature.properties;

  return (
    <div style={{background: "black", color: "white", padding: "10px", borderRadius: "5px", fontSize: "20px"}} id={`tooltip-${id}`}>
      <strong>Area :</strong> {areaName}
      <br />
      <strong>ID:</strong> {id}
    </div>
  );
};

export {Tooltip, getMapDetails} ;
