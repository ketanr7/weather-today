import React from "react";
import Moment from "react-moment";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import DailyData from "../daily-data/daily-data.component";

import "./card.styles.css";

export const Card = (props) => (
  <div className="card-container temp_container">
    <div className="img-div">
      {
        <img
          alt="monster"
          src={`http://openweathermap.org/img/w/${props.daily.weather[0].icon}.png`}
        />
      }
      <p>
        <Moment unix format="ddd">
          {props.daily.dt}
        </Moment>
      </p>
    </div>
    <h2>{props.daily.temp.day.toFixed()}&#8451;</h2>
    <h4>{props.city}</h4>
    <div className="info-div">
      <p>High</p>
      <h5>{props.daily.temp.max.toFixed()}&#8451;</h5>
    </div>
    <div className="info-div">
      <p>Low</p>
      <h5>{props.daily.temp.min.toFixed()}&#8451;</h5>
    </div>
    <div className="info-div">
      <p>Latitude</p>
      <h5>{props.lat}</h5>
    </div>
    <div className="info-div">
      <p>Longitude</p>
      <h5>{props.lon}</h5>
    </div>
    <div className="info-div">
      <p>Pressure</p>
      <h5>{props.daily.pressure} hpa</h5>
    </div>
    <div className="info-div">
      <p>Humidity</p>
      <h5>{props.daily.humidity} %</h5>
    </div>
    <div className="info-div">
      <p>Sunrise</p>
      <h5>
        <Moment unix format="h:mm a">
          {props.daily.sunrise}
        </Moment>
      </h5>
    </div>
    <div className="info-div">
      <p>Sunset</p>
      <h5>
        <Moment unix format="h:mm a">
          {props.daily.sunset}
        </Moment>
      </h5>
    </div>
    <Link
      className="link-class"
      to={{
        pathname: `/${props.city}/${props.daily.dt}`,
        state: {
          lat: props.lat,
          lon: props.lon,
        },
      }}
    >
      View More
    </Link>
  </div>
);
