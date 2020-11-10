import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import "./infobox.css";
import numeral from "numeral";

function InfoBox({ title, cases, total, onClick, active }) {
  let color;
  switch (title) {
    case "Covid-19 cases":
      color = "orange";
      break;
    case "Recovered":
      color = "green";
      break;
    case "Deaths":
      color = "red";
      break;

    default:
      break;
  }
  return (
    <Card
      className={`infobox ${active && "infobox--selected"}`}
      onClick={onClick}
      style={{ borderBottom: `10px solid ${color}` }}
    >
      <CardContent>
        <Typography color="textSecondary" variant="h5" gutterBottom>
          {title}
        </Typography>
        <Typography color="textPrimary" variant="h2" gutterBottom>
          +{numeral(cases).format("0,0")}
        </Typography>
        <Typography color="textSecondary" variant="h5" gutterBottom>
          +{numeral(total).format("0,0a")} total
        </Typography>
      </CardContent>
    </Card>
  );
}

export default InfoBox;
