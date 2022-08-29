import React from "react";
import dice from "../scss/Dice.scss";

var classNames = require("classnames");

export default function Die(props) {
  let dots;
  switch (props.value) {
    case 1:
      dots = (
        <div className={classNames(dice.Die__Dot, dice["Die__Dot--First"])}>
          <span></span>
        </div>
      );
      break;
    case 2:
      dots = (
        <div className={classNames(dice.Die__Dot, dice["Die__Dot--Second"])}>
          <span></span>
          <span></span>
        </div>
      );
      break;
    case 3:
      dots = (
        <div className={classNames(dice.Die__Dot, dice["Die__Dot--Third"])}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      );
      break;
    case 4:
      dots = (
        <div className={classNames(dice.Die__Dot, dice["Die__Dot--Fourth"])}>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      );
      break;
    case 5:
      dots = (
        <div className={classNames(dice.Die__Dot, dice["Die__Dot--Fifth"])}>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      );
      break;
    case 6:
      dots = (
        <div className={classNames(dice.Die__Dot, dice["Die__Dot--Sixth"])}>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      );
      break;
    default:
      dots = "";
  }

  return (
    <div
      onClick={() => props.holdDice(props.id)}
      style={props.isHeld ? { backgroundColor: "#59E391" } : {}}
      className={dice.Die}
    >
      {dots}
      <span className={dice.Die__Value}>{props.value}</span>
    </div>
  );
}
