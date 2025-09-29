import React from "react";
import { useState } from "react";

//create a calculator component and add the basic operation in switch case
//add additional funtion to check the given experession ((a+b)/(a-b))*(a+b)
//add additional funtion to check the sum of square of digits in a number
//add additional funtion to check the given number is even or odd
const Calculator = () => {
  const [a, setA] = useState('');
  const [b, setB] = useState('');
  const [result, setResult] = useState('');
  const evaluateExpression = () => {
    if (a === '' || b === '') {
      return alert('Please enter values for both A and B');
    }  
    const numA = parseFloat(a);
    const numB = parseFloat(b);
    
    //0 not divisible
    if (numA - numB === 0) {
      return alert('Error: Division by zero (A-B cannot be zero)');
      
    }
    
    try {
      const expressionResult = ((numA + numB) / (numA - numB)) * (numA + numB);
      setResult(expressionResult);
    } catch (error) {
      alert('Error calculating expression');
    }
  };
  //a2 = axa
  const calculateSumOfSquares = () => {
    if (a === '') {
      return alert('Please enter a value for A');
    }
    const digits = a.toString().split('').filter(char => char >= '0' && char <= '9');
    let sum = 0;
    digits.forEach(digit => {
      const num = parseInt(digit, 10);
      sum += num * num;
    });
    
    setResult(sum);
  };

  //odd or eve
  const checkEvenOdd = () => {
    if (a === '') {
      return alert('Please enter a value for A');
    }
    
    const numA = parseFloat(a);
    
    if (isNaN(numA)) {
      return alert('Please enter a valid number');
    }
    
    const isEven = numA % 2 === 0;
    setResult(isEven ? 'Even' : 'Odd');
  };

  //cal op
  const performOperation = (operation) => {
    if (a === '' || b === '') {
      return alert('Please enter values for both A and B');
    }
    
    const numA = parseFloat(a);
    const numB = parseFloat(b);
    let operationResult;
    
    switch(operation) {
      case 'add':
        operationResult = numA + numB;
        break;
      case 'subtract':
        operationResult = numA - numB;
        break;
      case 'multiply':
        operationResult = numA * numB;
        break;
      case 'divide':
        if (numB === 0) {
          return alert('Error: Division by zero');
        }
        operationResult = numA / numB;
        break;
      default:
        return;
    }
    
    setResult(operationResult);
  };

  //clean fields
  const clearAll = () => {
    setA('');
    setB('');
    setResult('');
    setMessage('');
  };
  return (
    <div className="calculator">
      <h1>Calculator</h1>
      <p>*Note: <br></br>
        - Please enter only the value of A to find out whether it is even or odd<br></br>
        - Please enter only the value of A to find out the sum of squares of its digits</p>
        <br></br>
      <div className="inputFields">
        <label>Enter values of A:</label>
        <input type="text" value={a} onChange={(e) => setA(e.target.value)} placeholder="Enter A" />
        <br></br>
        <label>Enter values of B:</label>
        <input type="text" value={b} onChange={(e) => setB(e.target.value)} placeholder="Enter B" />
        
      </div>
      <br></br>
      <div className="mathFunctions">
        <button onClick={evaluateExpression}>Evaluate Expression</button>
        <button onClick={calculateSumOfSquares}>MoD_Sum_square</button>
        <button onClick={checkEvenOdd}>Even_ODD</button>
        <br></br>
        <button onClick={() => performOperation('add')}>+</button>
        <button onClick={() => performOperation('subtract')}>-</button>
        <button onClick={() => performOperation('multiply')}>x</button>
        <button onClick={() => performOperation('divide')}>/</button>
        <br></br>
        <button onClick={clearAll}>Clear</button>
      </div>
      <div className="result">
        <h2>Result: {result}</h2>
      </div>
    </div>
  );
};
export default Calculator;