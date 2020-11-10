import React from "react";
import { Map, TileLayer } from "react-leaflet";
import "./world.css";
import { showDataOnMap } from "./utils";
// http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png

function World({ countries, casesType, center, zoom }) {
  return (
    <div className="world">
      <Map center={center} zoom={zoom}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {showDataOnMap(countries, casesType)}
      </Map>
      {/* <Map>
                <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href=""> OpenStreetMap </a> contributors'
                />

                
            </Map> */}
    </div>
  );
}

export default World;
