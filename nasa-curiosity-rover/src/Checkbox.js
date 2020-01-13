import React from 'react';

const Checkbox = ({ camera, checkItem }) => {
  return(
    <div className="drop-down-list-item">
      <input type="checkbox" value={camera.full_name} name="camera-checkbox" onChange={(e) => checkItem(e)}/>
      <label>{camera.full_name}</label>
    </div>
  );
}

export default Checkbox; 