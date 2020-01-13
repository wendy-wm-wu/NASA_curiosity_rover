import React, { Component } from 'react';
import './style.css';
import { API_Key } from './config';
import CameraFilter from './CameraFilter';
import axios from 'axios'; 

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cameras: [],
      photos: {},
      launched: '',
      landed: '',
      maxSol: 0,
      input: '', 
    }
  }

  componentDidMount = () => {
    this.getCameras(); 
  };

  getCameras = () => {
    const url = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/?api_key=${API_Key}`; 
    axios.get(url)
      .then((res) => {
        console.log(res.data.rover.cameras);
        let output = {};
        for (let i = 0; i < res.data.rover.cameras.length; i++) {
          let camera = res.data.rover.cameras[i];
          output[camera.full_name] = [0]; 
        }
        this.setState({
          cameras: res.data.rover.cameras,
          photos: output,
          launched: res.data.rover.launch_date,
          landed: res.data.rover.landing_date,
          maxSol: res.data.rover.max_sol,
        });
        this.getPhotos(1);
      })
      .catch((err) => {
        console.log(err); 
      });
  };

  getPhotos = sol => {
    const { photos } = this.state;
    const url = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=${sol}&api_key=${API_Key}`;
    axios.get(url)
      .then((res) => {
        console.log(res.data.photos);
        for (let j = 0; j < res.data.photos.length; j++) {
          let cameraName = res.data.photos[j].camera.full_name;
          let photoURL = res.data.photos[j].img_src;
          photos[cameraName][0]++;
          if (photos[cameraName].length <= 1) {
            photos[cameraName].push(photoURL); 
          } else {
            continue; 
          }
        }
        this.setState({
          photos,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleChange = e => {
    this.setState({
      input: e.target.value,
    });
    this.getPhotos(e.target.value);
  };

  render() {
    const { cameras, photos, launched, landed, maxSol } = this.state;
    return(
        <div>
          <div className="curiosity-details">
            <h1>Curiosity Images</h1>
            <p>{`Launched: ${launched} | Landed: ${landed} | Max Sol: ${maxSol}`}</p>
          </div>
          <div className="filters">
            <div>
              <h4>Cameras</h4> 
              <CameraFilter cameras={cameras} photos={photos} />
            </div>
            <div className="sol">
              <h4>Sol</h4>
              <input type="text" className="sol-input" onChange={this.handleChange} />
            </div>
          </div>
        </div>
    );
  }
}

export default App;
