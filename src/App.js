import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
// import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';

const FACE_DETECT_KEY = '5ca4a1901d4b4757aa24bae8dd4ec97c';

const app = new Clarifai.App({
  apiKey: FACE_DETECT_KEY,
});

const particlesOptions = {
  particles: {
    number: {
      value: 100,
      density: {
        enable: true,
        area: 800,
      },
    },
  },
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageURL: '',
      boxes: [],
      route: 'login',
      isLoggedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: '',
      },
    };
  }

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined,
      },
    });
  };

  calculateFaceLocations = (data) => {
    const clarifaiFaces = data.outputs[0].data.regions;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    const faceBoxesArray = [];
    for (const face of clarifaiFaces) {
      const clarifaiFace = face.region_info.bounding_box;
      const boxObject = {
        leftCol: clarifaiFace.left_col * width,
        topRow: clarifaiFace.top_row * height,
        rightCol: width - clarifaiFace.right_col * width,
        bottomRow: height - clarifaiFace.bottom_row * height,
      };
      faceBoxesArray.push(boxObject);
    }
    return faceBoxesArray;
  };

  displayFaceBoxes = (boxes) => {
    this.setState({ boxes: boxes });
  };

  onInputChange = (event) => {
    this.setState({
      input: event.target.value,
    });
  };

  onPictureSubmit = () => {
    this.setState({ imageURL: this.state.input });
    app.models
      .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then((response) => {
        if (response) {
          fetch('http://localhost:3000/image', {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              id: this.state.user.id,
            }),
          })
            .then((response) => response.json())
            .then((count) => {
              this.setState(Object.assign(this.state.user, { entries: count }));
            });
          this.displayFaceBoxes(this.calculateFaceLocations(response));
        }
      })
      .catch((error) => console.log(error));
  };

  onRouteChange = (route) => {
    if (route === 'logout') {
      this.setState({ isLoggedIn: false });
    } else if (route === 'home') {
      this.setState({ isLoggedIn: true });
    }
    this.setState({ route: route });
  };

  render() {
    const { route, isLoggedIn, imageURL, boxes } = this.state;
    return (
      <div className='App'>
        <Particles params={particlesOptions} className='particles' />
        <Navigation onRouteChange={this.onRouteChange} isLoggedIn={isLoggedIn} />
        {route === 'home' ? (
          <div>
            {/* <Logo /> */}
            <Rank name={this.state.user.name} entries={this.state.user.entries} />
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onButtonSubmit={this.onPictureSubmit}
            />
            <FaceRecognition imageURL={imageURL} boxes={boxes} />
          </div>
        ) : route === 'login' || route === 'logout' ? (
          <Login onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
        ) : (
          <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
        )}
      </div>
    );
  }
}

export default App;
