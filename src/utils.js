import React from "react";
import { Circle, Popup } from "react-leaflet";
import numeral from "numeral";

export const sortedData = (data) => {
  const sortingData = [...data];
  sortingData.sort((a, b) => {
    // return a.cases>b.cases ? -1 :1
    if (a.cases > b.cases) {
      return -1;
    } else {
      return 1;
    }
  });

  return sortingData;
};

export const showDataOnMap = (data, caseType = "cases") => {
  let circleColor;
  let multiplier;
  switch (caseType) {
    case "cases":
      circleColor = "orange";
      multiplier = 500;
      break;
    case "recovered":
      circleColor = "green";
      multiplier = 600;
      break;
    case "deaths":
      circleColor = "red";
      multiplier = 700;
      break;

    default:
      break;
  }
  return data.map((country) => (
    <Circle
      center={[country.countryInfo.lat, country.countryInfo.long]}
      fillOpacity={0.4}
      color={circleColor}
      fillColor={circleColor}
      radius={Math.sqrt(country[caseType]) * multiplier}
    >
      <Popup>
        <div className="popUp__container">
          <div
            className="country-Flag"
            style={{ backgroundImage: `url(${country.countryInfo.flag})` }}
          />
          <div className="country-Name">{country.country}</div>
          <div className="country-Cases">
            Active : {numeral(country.cases).format("0,0")}
          </div>
          <div className="country-Recovered">
            Recovered : {numeral(country.recovered).format("0,0")}
          </div>
          <div className="country-Deaths">
            Deaths : {numeral(country.deaths).format("0,0")}
          </div>
        </div>
      </Popup>
    </Circle>
  ));
};
