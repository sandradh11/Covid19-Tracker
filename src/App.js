import React, { useEffect, useState } from "react";
import axios from "axios";

import "./App.css";
import InfoBox from "./InfoBox";
import World from "./World";
import Table from "./Table";
import { sortedData } from "./utils";
import LineChart from "./LineChart";
//https://disease.sh/v3/covid-19/countries
//https://disease.sh/v3/covid-19/countries/
//https://disease.sh/v3/covid-19/all

import { MenuItem, FormControl, Select, Card } from "@material-ui/core";
import "leaflet/dist/leaflet.css";
import Trackerlogo from "./Trackerlogo.png";

function App() {
  const [countries, setCountries] = useState([]);
  const [countrySelected, setCountrySelected] = useState("WorldWide");
  const [countryDetails, setCountryDetails] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCenterZoom, setMapCenterZoom] = useState({
    center: [34.80746, -40.4796],
    zoom: 3,
  });
  const [countryFullDetails, setCountryFullDetails] = useState([]);
  const [casesType, setCasesType] = useState("cases");
  // const [mapCenter, setMapCenter] = useState({ lat: 32.80746, lng: -40.4796 });
  // const [mapZoom, setMapZoom] = useState(3);

  useEffect(() => {
    const url = "https://disease.sh/v3/covid-19/all";
    const fetchWorldwidedata = async () => {
      const {
        data: {
          cases,
          todayCases,
          deaths,
          todayDeaths,
          recovered,
          todayRecovered,
        },
      } = await axios.get(url);
      setCountryDetails({
        cases,
        todayCases,
        deaths,
        todayDeaths,
        recovered,
        todayRecovered,
      });
    };
    fetchWorldwidedata();
  }, []);

  useEffect(() => {
    const url = "https://disease.sh/v3/covid-19/countries";
    try {
      const fetchCountriesData = async () => {
        const { data } = await axios.get(url);
        setCountryFullDetails(data);
        setCountries(
          data.map((firstItem) => ({
            countryName: firstItem.country,
            countryCode: firstItem.countryInfo.iso3,
          }))
        );
        const sortData = sortedData(data);
        setTableData(sortData);
      };
      fetchCountriesData();
    } catch (error) {}
  }, []);

  const handleChange = async (e) => {
    const countryname = e.target.value;
    console.log(countryname);
    try {
      const url =
        countryname === "WorldWide"
          ? "https://disease.sh/v3/covid-19/all"
          : `https://disease.sh/v3/covid-19/countries/${countryname}`;

      console.log("heyyyy", url);
      const {
        data: {
          cases,
          todayCases,
          deaths,
          todayDeaths,
          recovered,
          todayRecovered,
          country,
          countryInfo,
        },
      } = await axios.get(url);
      if (countryname !== "WorldWide") {
        setMapCenterZoom({
          center: [countryInfo.lat, countryInfo.long],
          zoom: 4,
        });
      } else {
        setMapCenterZoom({
          center: [34.80746, -40.4796],
          zoom: 3,
        });
      }

      setCountrySelected(countryname);
      setCountryDetails({
        cases,
        todayCases,
        deaths,
        todayDeaths,
        recovered,
        todayRecovered,
        country,
      });
    } catch (error) {
      console.log(error);
    }
  };

  // const handleChange = async (e) => {
  //   const countryCode = e.target.value;

  //   const url =
  //     countryCode === "worldwide"
  //       ? "https://disease.sh/v3/covid-19/all"
  //       : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
  //   await fetch(url)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setCountrySelected(countryCode);
  //       setCountryDetails(data);
  //       setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
  //       setMapZoom(4);
  //     })
  //     .catch((error) => console.log(error));
  // };
  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          {/* <img
            src={Trackerlogo.png}
            alt="Covid19 Tracker"
            width="200"
            height="100"
          /> */}
          <h1>Covid-19 Tracker</h1>
          <FormControl className="app__dropdown">
            <Select
              variant="outlined"
              value={countrySelected}
              onChange={handleChange}
            >
              <MenuItem value="WorldWide">WorldWide</MenuItem>
              {countries.map((country) => (
                <MenuItem key={country.countryName} value={country.countryCode}>
                  {country.countryName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="app__body">
          <div className="app__infobox">
            <InfoBox
              onClick={(e) => setCasesType("cases")}
              active={casesType === "cases"}
              title="Covid-19 cases"
              cases={countryDetails.todayCases}
              total={countryDetails.cases}
            />
            <InfoBox
              onClick={(e) => setCasesType("recovered")}
              active={casesType === "recovered"}
              title="Recovered"
              cases={countryDetails.todayRecovered}
              total={countryDetails.recovered}
            />
            <InfoBox
              onClick={(e) => setCasesType("deaths")}
              active={casesType === "deaths"}
              title="Deaths"
              cases={countryDetails.todayDeaths}
              total={countryDetails.deaths}
            />
          </div>
          <div className="app__map">
            <World
              countries={countryFullDetails}
              center={mapCenterZoom.center}
              zoom={mapCenterZoom.zoom}
              casesType={casesType}
            />
          </div>
        </div>
      </div>
      <Card className="app__right">
        <h3>Live cases by country</h3>
        <Table data={tableData} />
        <h4>Newly reported Cases</h4>
        <LineChart type={casesType} />
      </Card>
    </div>
  );
}

export default App;
