// import React from 'react';
// import { render } from 'react-dom';
// import Axios from 'axios';
// import './App.css';
// import UserLocation from './components/UserLocation'; 
// import Navbar from './components/Navbar';


// class App extends React.Component {

//   //state
//   state = { 
//     coords:{
//       latitude: 45,
//       longitude: 60
//     } ,
//     data : {},
//     inputData: ""
//   }

  
//   componentDidMount(){                                          //this function shows us the things when we refresh the page of open the app for the first time
//   //get device location
//     if(navigator.geolocation){

//       navigator.geolocation.getCurrentPosition((position) => {                       //its html5 api----supports or find our current location
//           let newCoords = {
//             latitude : position.coords.latitude,
//             longitude : position.coords.longitude
//           }
//           this.setState({coords : newCoords});

//           //api call
//         Axios.get(`http://api.weatherstack.com/current?access_key=2d7e0e1688c769425cad70ada63d479c&query=${this.state.coords.latitude},${this.state.coords.longitude}`).then(res => {
//           let weatherdata = {
//             location : res.data.location.name,
//             temperature : res.data.current.temperature,
//             descripton : res.data.current.weather_descriptions[0],
//             region : res.data.location.region,
//             country : res.data.location.country,
//             wind_speed : res.data.current.wind_speed,
//             pressure : res.data.current.pressure,
//             precip : res.data.current.precip,
//             humidity : res.data.current.humidity,
//             img : res.data.current.weather_icons,
//           }
//           this.setState({data : weatherdata});
//        })

//       }) 
//     }
//   }
//   changeRegion = (value) => {
//     this.setState( {inputData: value})
//   }
//   changeWeather = (e) => {
//     e.preventDefault();

//     //api call
//     Axios.get(`http://api.weatherstack.com/current?access_key= 2d7e0e1688c769425cad70ada63d479c&query=${this.state.inputData}`).then(res => {
//       let weatherdata = {
//         location : res.data.location.name,
//         temperature : res.data.current.temperature,
//         descripton : res.data.current.weather_descriptions[0],
//         region : res.data.location.region,
//         country : res.data.location.country,
//         wind_speed : res.data.current.wind_speed,
//         pressure : res.data.current.pressure,
//         precip : res.data.current.precip,
//         humidity : res.data.current.humidity,
//         img : res.data.current.weather_icons,
//       }
//       this.setState({data : weatherdata});

//     })
//   }

//   render(){
//     return (
//       <div className="App">
//         <div className = "container">
//         <Navbar changeWeather = {this.changeWeather} changeRegion ={this.changeRegion}/>
//         <UserLocation data={this.state.data} />
//         </div>
//       </div>
//     );
//   }
  
// }

// export default App;
import React from 'react';
import UserLocation from './components/UserLocation.js';
import Navbar from './components/Navbar.js'
import './App.css';
import Axios from 'axios';

class App extends React.Component {

  //state
  state = {
    userPosition: {
      latitude: 35,
      longitude: 139
    },
    weather: {},
    regionInput: ""
  }

  componentDidMount() {
    //check whether geolocation is supported
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {

        //get the lat and long of your device
        let pos = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        }

        this.setState({ userPosition: pos });

        //Weather Api call
        Axios.get(`http://api.weatherstack.com/current?access_key=ff57ca4b8ec780e114d15704879a7157&query=${this.state.userPosition.latitude},${this.state.userPosition.longitude}`).then(res => {

          let userWeather = {
            temperature: res.data.current.temperature,
            description: res.data.current.weather_descriptions[0],
            location: res.data.location.name,
            region: res.data.location.region,
            country: res.data.location.country,
            wind_speed: res.data.current.wind_speed,
            pressure: res.data.current.pressure,
            precip: res.data.current.precip,
            humidity: res.data.current.humidity,
            img: res.data.current.weather_icons
          }

          this.setState({ weather: userWeather });
        })
      })
    }
  }

  //update the value of the the input field with state
  changeRegion = (value) => {
    this.setState({ regionInput: value })
  }

  //update the weather depending upon the value user entered
  changeLocation = (e) => {

    e.preventDefault()

    Axios.get(`http://api.weatherstack.com/current?access_key=ff57ca4b8ec780e114d15704879a7157&query=${this.state.regionInput}`).then(res => {

      let userWeather = {
        temperature: res.data.current.temperature,
        description: res.data.current.weather_descriptions[0],
        location: res.data.location.name,
        region: res.data.location.region,
        country: res.data.location.country,
        wind_speed: res.data.current.wind_speed,
        pressure: res.data.current.pressure,
        precip: res.data.current.precip,
        humidity: res.data.current.humidity,
        img: res.data.current.weather_icons
      }

      this.setState({ weather: userWeather });

    })
  }

  render() {
    return (
      <div className="App">
        <div className="container">
          <Navbar changeRegion={this.changeRegion} changeLocation={this.changeLocation} />
          <UserLocation weather={this.state.weather} />
        </div>
      </div>
    );
  }
}

export default App;




