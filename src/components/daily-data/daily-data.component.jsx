import React, { Component } from "react";
import axios from "axios";
import Moment from "react-moment";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

import HighchartsWrapper from "../chart/chart.component";

import "./daily-data.styles.css";

class DailyData extends Component {
  constructor() {
    super();

    this.state = {
      temp_now: "",
      max: "",
      min: "",
      imgUrl: "",
      lat: "",
      lon: "",
      appId: "9b66a9c4055d9d1f99e3bdcdd1dbfa69",
      dailyData: {},
      hourlyData: [],
      series: [
        {
          data: [],
        },
      ],
      options: {
        chart: {
          type: "spline",
        },
        title: {
          text: "My chart",
        },
        xAxis: {
          title: {
            text: "",
          },
          labels: {
            formatter: function () {
              return this.value;
            },
          },
          categories: [],
        },
      },
    };
  }

  componentDidMount() {
    const lat = this.props.location.state.lat;
    const lon = this.props.location.state.lon;
    const date = this.props.match.params.day;
    axios
      .get(
        "https://api.openweathermap.org/data/2.5/onecall?lat=" +
          lat +
          "&lon=" +
          lon +
          "&exclude=" +
          "&dt=" +
          this.props.match.params.day +
          "&APPID=" +
          this.state.appId +
          "&units=metric"
      )
      .then((response) => {
        var temp = response.data.daily.filter(function (data) {
          return data.dt == date;
        });

        this.setState({ dailyData: temp[0] });

        this.setState({ imgUrl: this.state.dailyData.weather[0].icon });
        this.setState({ temp_now: this.state.dailyData.temp.day });
        this.setState({ max: this.state.dailyData.temp.max });
        this.setState({ min: this.state.dailyData.temp.min });

        const info = response.data.hourly.map((girl) =>
          Number(girl.temp.toFixed())
        );

        let _this = this;

        _this.setState({ series: [{ data: info }] });
      });
  }

  render() {
    return (
      <div className="outer-div">
        {/* <ReactFC {...chartConfigs} /> */}

        <div className="dailycard-container temp_container">
          <div className="img-div daily-img-div">
            <img
              alt="monster"
              src={`http://openweathermap.org/img/w/${this.state.imgUrl}.png`}
            />
            <p>
              <Moment unix format="ddd">
                {this.state.dailyData.dt}
              </Moment>
            </p>
          </div>
          <div className="city-div daily-city-div">
            <h2>{parseFloat(this.state.temp_now).toFixed()}&#8451;</h2>
            <h4>{this.props.match.params.city}</h4>
          </div>
          <div className="info-div daily-info-div">
            <p>High</p>
            <h5>{parseFloat(this.state.max).toFixed()}&#8451;</h5>
          </div>
          <div className="info-div daily-info-div">
            <p>Low</p>
            <h5>{parseFloat(this.state.min).toFixed()}&#8451;</h5>
          </div>
          <div className="info-div daily-info-div">
            <p>Latitude</p>
            <h5>{this.props.location.state.lat}</h5>
          </div>
          <div className="info-div daily-info-div">
            <p>Longitude</p>
            <h5>{this.props.location.state.lon}</h5>
          </div>
          <div className="info-div daily-info-div">
            <p>Pressure</p>
            <h5>{this.state.dailyData.pressure} hpa</h5>
          </div>
          <div className="info-div daily-info-div">
            <p>Humidity</p>
            <h5>{this.state.dailyData.humidity} %</h5>
          </div>
          <div>
            <HighchartsWrapper chartData={this.state.series} />
          </div>

          <div className="info-div daily-info-div">
            <p>Sunrise</p>
            <h5>
              <Moment unix format="h:mm a">
                {this.state.dailyData.sunrise}
              </Moment>
            </h5>
          </div>
          <div className="info-div daily-info-div">
            <p>Sunset</p>
            <h5>
              <Moment unix format="h:mm a">
                {this.state.dailyData.sunset}
              </Moment>
            </h5>
          </div>
        </div>
      </div>
    );
  }
}

export default DailyData;
