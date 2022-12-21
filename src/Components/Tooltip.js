import React from "react";

const Tooltip = ({ feature }) => {
  const { id } = feature.properties;

  return (
    <div style={{background: "black", color: "white", padding: "10px", borderRadius: "5px"}} id={`tooltip-${id}`}>
      <strong>Source Layer:</strong> {feature.layer["source-layer"]}
      <br />
      <strong>Layer ID:</strong> {feature.layer.id}
    </div>
  );
};

export default Tooltip;