import clsx from "clsx";
import React from "react";

const ToSubscript = ({ number, sub }) => {
  if (number === undefined || number === null) {
    return <span>0</span>;
  }

  let numStr;
  if (number.toString().includes("e")) {
    numStr = Number(number).toFixed(20); // Convert scientific notation to a full decimal string
  } else {
    numStr = number.toString();
  }

  const [integerPart, decimalPart] = numStr.split(".");
  let formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ","); // Add commas for thousands

  if (!decimalPart) {
    return <span>{formattedInteger}</span>; // Return just the integer part if there's no decimal
  }
  let countZero = 0;
  for (const char of decimalPart) {
    if (char !== "0") break;
    countZero++;
  }
  const remainingPart = decimalPart.substring(countZero, countZero + 3); // Take first 3 non-zero decimals

  return (
    <span>
      {formattedInteger}.{countZero > 0 && "0"}
      {countZero > 1 && <sub className={clsx(sub)}>{countZero}</sub>}
      {remainingPart}
    </span>
  );
};

export default ToSubscript;
