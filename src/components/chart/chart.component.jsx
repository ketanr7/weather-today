import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const HighchartsWrapper = (props) => {
  console.log(props.chartData); // this is always correct

  let options = {
    title: { text: "Temperature" },
    chart: {
      type: "spline",
    },

    plotOptions: {
      spline: {
        marker: {
          radius: 4,
          lineColor: "#666666",
          lineWidth: 1,
        },
      },
    },
    credits: {
      enabled: false,
    },
    xAxis: {
      title: {
        text: "",
      },
      categories: [],
    },
    yAxis: {
      title: {
        text: "",
      },
      labels: {
        formatter: function () {
          return this.value;
        },
      },
    },
    series: props.chartData,
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default HighchartsWrapper;
