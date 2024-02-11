import React, { useState } from "react";
import Styles from "./Calculator.module.css";
import * as math from "mathjs";

const Calculator = () => {
  const [inputValue, setInputValue] = useState("");
  const buttons = [
    "AC",
    "+/-",
    "%",
    "/",
    "7",
    "8",
    "9",
    "*",
    "4",
    "5",
    "6",
    "-",
    "1",
    "2",
    "3",
    "+",
    "0",
    ".",
    "=",
  ];

  const handleButtonClick = (value) => {
    switch (value) {
      case "AC":
        setInputValue("");
        break;
      case "+":
      case "-":
      case "*":
      case "/":
        if (inputValue === "") {
          if (inputValue === "-") {
            setInputValue((prevInputValue) => prevInputValue + value);
          }
        } else if (/[-+*/]/.test(inputValue.slice(-1))) {
          setInputValue(
            (prevInputValue) => prevInputValue.slice(0, -1) + value
          );
        } else {
          setInputValue((prevInputValue) => prevInputValue + value);
        }
        break;

      case "=":
        try {
          const result = math.evaluate(inputValue);
          setInputValue(result.toString());
        } catch (error) {
          setInputValue("Error");
        }
        break;
      default:
        setInputValue((prevInputValue) => prevInputValue + value);
        break;
    }
  };
  return (
    <div className={Styles["cal-container"]}>
      <div className={Styles["input-wrap"]}>
        <input
          className={Styles["input"]}
          type="text"
          value={inputValue}
          readOnly
          maxLength={8}
        />
      </div>
      <div className={Styles["buttons-wrap"]}>
        {buttons.map((button, idx) => (
          <button
            onClick={() => handleButtonClick(button)}
            className={`${Styles.button} ${
              button === "AC" ? Styles.acButton : ""
            } ${button === "%" ? Styles.moduloButton : ""} ${
              button === "/" ? Styles.divideButton : ""
            } ${button === "+/-" ? Styles.plusMinusButton : ""}
            ${button === "-" ? Styles.minusButton : ""}
            ${button === "+" ? Styles.plusButton : ""}
            ${button === "*" ? Styles.multiplyButton : ""}
            `}
          >
            {button}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Calculator;
