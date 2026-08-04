import React, { useState, useEffect,useRef } from "react";
import "./calculatorStyle.css";

export default function CalculatorApp() {
  //* add theme here
  // States---s
  const [firstNumber, setFirstNumber] = useState([]);
  const [secondNumber, setSecondNumber] = useState([]);
  const [operator, setOperator] = useState("");
  const [clicked, setClicked] = useState(false);
  const [hadCalc, setHadCalc] = useState(false);
  const [display, setDisplay] = useState("");
  const [preDisplay, setPreDisplay] = useState("");

  // the little helpers
  const updateDisplay = (value) => setDisplay(value);
  const updatePreDisplay = (value) => setPreDisplay(value);

  const resetState = () => {
    setFirstNumber([]);
    setSecondNumber([]);
    setOperator("");
    setClicked(false);
    setHadCalc(false);
    setDisplay("");
    setPreDisplay("");
  };

  const equalState = (sum) => {
    setFirstNumber([sum]);
    setSecondNumber([]);
    setOperator("");
    setClicked(false);
    setHadCalc(true);
  };

  // HandleBars
  const handleNumber = (num) => {
    if (hadCalc) {
      setFirstNumber([]);
      setDisplay("");
      setHadCalc(false);
    }
    if (!clicked) {
      const newFirst = [...firstNumber, num];
      setFirstNumber(newFirst);
      setDisplay(newFirst.join(""));
    } else {
      const newSecond = [...secondNumber, num];
      setSecondNumber(newSecond);
      setDisplay(newSecond.join(""));
    }
  };

  const handleDecimal = () => {
    if (!clicked) {
      if (!firstNumber.includes(".")) {
        handleNumber(".");
      }
    } else {
      if (!secondNumber.includes(".")) {
        handleNumber(".");
      }
    }
  };

  const handleOperator = (op) => {
    if (!clicked) {
      setOperator(op);
      setHadCalc(false);
      setPreDisplay(`${firstNumber.join("")} ${op}`);
      setDisplay("");
      setClicked(true);
    } else {
      setOperator(op);
      setPreDisplay(`${firstNumber.join("")} ${op}`);
    }
  };

  const handleEqual = () => {
    if (!operator) {
      setDisplay("Error");
      return;
    }
    const num1 = Number(firstNumber.join(""));
    const num2 = Number(secondNumber.join(""));

    let sum;
    switch (operator) {
      case "+":
        sum = num1 + num2;
        break;
      case "-":
        sum = num1 - num2;
        break;
      case "*":
        sum = num1 * num2;
        break;
      case "/":
        sum = num2 !== 0 ? num1 / num2 : "Error";
        break;
      default:
        sum = "Error";
    }
    const sumStr = String(sum);
    setPreDisplay(`${num1} ${operator} ${num2} = `);
    setDisplay(sumStr);
    equalState(sumStr);
  };

  const handleClear = () => resetState();
  const handleDelete = () => {
    if (!clicked) {
      const newFirst = firstNumber.slice(0, -1);
      setFirstNumber(newFirst);
      setDisplay(newFirst.join(""));
    } else {
      const newSecond = secondNumber.slice(0, -1);
      setSecondNumber(newSecond);
      setDisplay(newSecond.join(""));
    }
  };

  const handlePercent = () => {
    if (!clicked) {
      const num = Number(firstNumber.join(""));
      if (num >= 0) {
        const percent = 0.01 * num;
        const percentStr = String(percent);
        setFirstNumber([percentStr]);
        setDisplay(percentStr);
        setPreDisplay(percentStr);
        setHadCalc(true);
      } else {
        setDisplay("error");
      }
    } else {
      const num = Number(secondNumber.join(""));
      if (num >= 0) {
        const percent = 0.01 * num;
        const percentStr = String(percent);
        setSecondNumber([percentStr]);
        setDisplay(percentStr);
      } else {
        setDisplay("error");
      }
    }
  };

  const handleSquare = () => {
    const numStr = !clicked ? firstNumber.join("") : secondNumber.join("");
    if (!numStr | (numStr === "")) return;

    const num = Number(numStr);
    if (isNaN(num)) {
      setDisplay("Error");
      return;
    }
    const result = num * num;
    const resultStr = String(result);

    if (!clicked) {
      setFirstNumber([resultStr]);
      setDisplay(resultStr);
    } else {
      setSecondNumber([resultStr]);
      setDisplay(resultStr);
    }
  };

  const handleSqrt = () => {
    const numStr = !clicked ? firstNumber.join("") : secondNumber.join("");
    if (!numStr | (numStr === "")) return;

    const num = Number(numStr);
    if (isNaN(num)) {
      setDisplay("Error");
      return;
    }

    const result = Math.sqrt(num);
    const resultStr = String(result);

    if (!clicked) {
      setFirstNumber([resultStr]);
      setDisplay(resultStr);
    } else {
      setSecondNumber([resultStr]);
      setDisplay(resultStr);
    }
  };

  const handlerRefs = useRef({
    handleNumber,
    handleDecimal,
    handleDelete,
    handleOperator,
    handleClear,
    handlePercent,
    handleEqual,
  });

  useEffect(() => {
    handlerRefs.current = {
      handleNumber,
      handleDecimal,
      handleDelete,
      handleOperator,
      handleClear,
      handlePercent,
      handleEqual,
    };
  });

  useEffect(() => {
    const onKeyDown = (e) => {
      const key = e.key;
      const {
        handleNumber,
        handleDecimal,
        handleDelete,
        handleOperator,
        handleClear,
        handlePercent,
        handleEqual,
      } = handlerRefs.current;

      const handledKey = [
        "0",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        ".",
        "+",
        "-",
        "*",
        "/",
        "Enter",
        "=",
        "Backspace",
        "Escape",
        "%",
        "x",
        "X",
      ];
      if (handledKey.includes(key)) {
        e.preventDefault();
      }

      if (/^[0-9]$/.test(key)) {
        handleNumber(key);
        return;
      }

      switch (key) {
        case ".":
          handleDecimal();
          break;
        case "+":
        case "-":
        case "*":
        case "/":
          handleOperator(key);
          break;
        case "Enter":
        case "=":
          handleEqual();
          break;
        case "Backspace":
          handleDelete();
          break;
        case "Escape":
          handleClear();
          break;
        case "%":
          handlePercent();
          break;
        case "x":
        case "X":
          handleOperator("*");
          break;
        default:
            break;
      }
    };

    document.addEventListener('keydown',onKeyDown);
    return() => {
        document.removeEventListener('keydown',onKeyDown);
    };
    
  },[]);

  return (
    <div className="container">
      <div className="screen">
        <div id="split">{preDisplay}</div>
        <p id="number">{display}</p>
      </div>

      <div className="buttons">
        <div className="rows">
          <button id="sqr" onClick={handleSquare}>
            x<sup>2</sup>
          </button>
          <button id="radic" onClick={handleSqrt}>
            √x
          </button>
          <button
            className="functions operator"
            id="clear"
            onClick={handleClear}
          >
            AC
          </button>
          <button className="functions" id="para">
            ( )
          </button>
          <button className="functions" id="percent" onClick={handlePercent}>
            %
          </button>

          <button
            className="operator"
            id="divide"
            onClick={() => handleOperator("/")}
          >
            /
          </button>
        </div>
        <div className="rows">
          <button
            className="number"
            id="seven"
            onClick={() => handleNumber("7")}
          >
            7
          </button>
          <button
            className="number"
            id="eight"
            onClick={() => handleNumber("8")}
          >
            8
          </button>
          <button
            className="number"
            id="nine"
            onClick={() => handleNumber("9")}
          >
            9
          </button>
          <button
            className="operator"
            id="multiply"
            onClick={() => handleOperator("*")}
          >
            x
          </button>
        </div>
        <div className="rows">
          <button
            className="number"
            id="four"
            onClick={() => handleNumber("4")}
          >
            4
          </button>
          <button
            className="number"
            id="five"
            onClick={() => handleNumber("5")}
          >
            5
          </button>
          <button className="number" id="six" onClick={() => handleNumber("6")}>
            6
          </button>
          <button
            className="operator"
            id="minus"
            onClick={() => handleOperator("-")}
          >
            -
          </button>
        </div>
        <div className="rows">
          <button className="number" id="one" onClick={() => handleNumber("1")}>
            1
          </button>
          <button className="number" id="two" onClick={() => handleNumber("2")}>
            2
          </button>
          <button
            className="number"
            id="three"
            onClick={() => handleNumber("3")}
          >
            3
          </button>
          <button
            className="operator"
            id="plus"
            onClick={() => handleOperator("+")}
          >
            +
          </button>
        </div>
        <div className="rows">
          <button id="dot" onClick={handleDecimal}>
            .
          </button>
          <button
            className="number"
            id="zero"
            onClick={() => handleNumber("0")}
          >
            0
          </button>
          <button className="functions" id="delete" onClick={handleDelete}>
            C
          </button>
          <button className="operator" id="equal" onClick={handleEqual}>
            =
          </button>
        </div>
      </div>
    </div>
  );
}
