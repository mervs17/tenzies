import "./main.scss";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

if (process.env.NODE_ENV !== "production") {
  const style = [
    "color: lightblue;",
    "font-size: 30px;",
    "font-weight: bold",
    "-webkit-text-stroke: 1px black;",
  ];
  console.log("%cLooks like we are in development mode!", style.join(";"));
}

ReactDOM.render(<App />, document.getElementById("root"));
