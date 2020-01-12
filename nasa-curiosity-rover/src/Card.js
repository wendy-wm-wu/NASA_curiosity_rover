import React from 'react'; 

const Card = ({ camera, photos }) => {
  return(
    <div className="card">
    <div className="card-details">
      <h3>{camera}</h3>
      <p>{`Photos: ${photos[camera][0]}`}</p>
      {photos[camera][1] && (
    <div>
        <p>Sample photo: </p>
        <img src={photos[camera][1]} alt={`${camera}'s view of outerspace`} className="card-photo"></img>
        </div>
      )}
    </div>
    </div>
  );
}

export default Card;