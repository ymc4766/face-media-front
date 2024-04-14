import React, { useState } from "react";

const FaceData = ({ detections, onSaveName }) => {
  const [names, setNames] = useState(Array(detections?.length).fill(""));

  const handleChangeName = (index, newName) => {
    const updatedNames = [...names];
    updatedNames[index] = newName;
    setNames(updatedNames);
  };

  const handleSaveName = (index) => {
    onSaveName(names[index]);
  };

  return (
    <div>
      {detections?.map((face, index) => (
        <div key={index} className="mt-4">
          <p>Face {index + 1}</p>
          <p>Age: {Math.round(face.age)} years</p>
          <p>Gender: {face.gender}</p>
          <input
            type="text"
            placeholder="Enter name"
            value={names[index]}
            onChange={(e) => handleChangeName(index, e.target.value)}
            className="mr-2"
          />
          <button onClick={() => handleSaveName(index)}>Save Name</button>
        </div>
      ))}
    </div>
  );
};

export default FaceData;
