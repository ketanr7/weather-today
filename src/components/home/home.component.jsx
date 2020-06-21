import React, { Component } from "react";
import axios from "axios";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { CardList } from "../card-list/card-list.component";

import "./home.styles.css";
const google = window.google;

class Home extends Component {
  constructor() {
    super();

    this.state = {
      monsters: [],
      lat: "",
      lon: "",
      city: "Mumbai",
      searchField: "",
      appId: "9b66a9c4055d9d1f99e3bdcdd1dbfa69",
      weeklyData: [],
      options: {
        chart: {
          type: "spline",
        },
        title: {
          text: "My chart",
        },
        series: [
          {
            data: [1, 2, 1, 4, 3, 6],
          },
        ],
      },
    };
    this.autocompleteInput = React.createRef();
    this.autocomplete = null;

    const google = window.google;
  }

  componentDidMount() {
    this.autocomplete = new google.maps.places.Autocomplete(
      this.autocompleteInput.current,
      { types: ["geocode"] }
    );

    this.autocomplete.addListener("place_changed", this.handlePlaceChanged);
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((users) => this.setState({ monsters: users }));

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.setState(
            { lat: position.coords.latitude, lon: position.coords.longitude },
            () => {
              this.getWeather();
            }
          );
        },
        (error) => {
          axios.get("http://ip-api.com/json").then((response) => {
            this.setState(
              { lat: response.data.lat, lon: response.data.lon },
              () => {
                this.getWeather();
              }
            );
          });
        }
      );
    } else {
      axios.get("http://ip-api.com/json").then((response) => {
        this.setState(
          { lat: response.data.lat, lon: response.data.lon },
          () => {
            this.getWeather();
          }
        );
      });
    }
  }

  getWeather = () => {
    const lat = this.state.lat;
    const lon = this.state.lon;
    const appId = this.state.appId;

    axios
      .get(
        "https://api.openweathermap.org/data/2.5/onecall?lat=" +
          lat +
          "&lon=" +
          lon +
          "&exclude=hourly" +
          "&APPID=" +
          appId +
          "&units=metric"
      )
      .then((response) => {
        this.setState({ weeklyData: response.data.daily });
      });
  };

  handlePlaceChanged = () => {
    const place = this.autocomplete.getPlace();

    const lat = place.geometry.location.lat();
    const lon = place.geometry.location.lng();
    this.setState({
      city: place.address_components[0].long_name,
      lat: place.geometry.location.lat(),
      lon: place.geometry.location.lng(),
    });
    const appId = this.state.appId;

    axios
      .get(
        "https://api.openweathermap.org/data/2.5/onecall?lat=" +
          lat +
          "&lon=" +
          lon +
          "&exclude=hourly" +
          "&APPID=" +
          appId +
          "&units=metric"
      )
      .then((response) => {
        this.setState({ weeklyData: response.data.daily });
      });
  };

  onSearchChange = (event) => {
    this.setState({ searchField: event.target.value });
  };

  render() {
    return (
      <div className="App">
        <h1>Weather Today</h1>

        <div className="input-div">
          <i className="fas fa-map-marker-alt"></i>
          <input
            ref={this.autocompleteInput}
            id="autocomplete"
            placeholder="Enter city name"
            type="text"
            className="searchBar"
          ></input>
          <i className="fas fa-search"></i>
        </div>
        <CardList
          weeklyData={this.state.weeklyData}
          lat={this.state.lat}
          lon={this.state.lon}
          city={this.state.city}
        />
      </div>
    );
  }
}

export default Home;
