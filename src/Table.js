import React from "react";
import "./table.css";
import numeral from "numeral";

function Table({ data }) {
  return (
    <div className="table">
      <table>
        {data.map((country) => (
          <tr>
            <td>{country.country}</td>
            <td>{numeral(country.cases).format("0,0")}</td>
          </tr>
        ))}
      </table>
    </div>
  );
}

export default Table;
