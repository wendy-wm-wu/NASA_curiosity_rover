import React from 'react';

const Checkbox = ({ camera, checkItem }) => {
  return(
    <div className="drop-down-list-item">
      <input type="checkbox" onChange={(e) => checkItem(e, camera.full_name)}/>
      <label>{camera.full_name}</label>
    </div>
  );
}

export default Checkbox; 