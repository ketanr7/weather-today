import React from "react";

import { Card } from "../card/card.component";

import "./card-list.styles.css";

export const CardList = (props) => (
  <div className="card-list">
    {props.weeklyData.map((daily) => (
      <Card
        key={daily.dt}
        daily={daily}
        lat={props.lat}
        lon={props.lon}
        city={props.city}
      />
    ))}
  </div>
);
