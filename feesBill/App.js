import logo from './logo.svg';
import './App.css';
import React from "react";
import { useState, useRef } from 'react';

function App() {
  const [tutionFee, setTutionFee] = useState("");
  const [hostelFee, setHostelFee] = useRef(null);
  const [dressFee, setDressFee] = useRef(null);
  const [activityFee, setActivityFee] = useState("");
  const [paymentDate, setPaymentDate] = useState("");
  const [lastDate, setLastDate] = useState("");
  const [totalBill, setTotalBill] = useRef(null);
  const [discount, setDiscount] = useRef(null);
  const [stdStudy, setStdStudy] = useState("");

  const checkDiscount = (e) => {
    e.preventDefault();

    if(lastDate>paymentDate){
      alert("Last Date of Payment has exceeded the Payment Date");
      return;
    }
    if (stdStudy=== "1-3"){
      const dressFee = 3000;
      const hostelFee = 5000;
    }
    else if (stdStudy === "4-6"){
      const dressFee = 5000;
      const hostelFee = 8000;
    }
    else if(stdStudy==="7-12"){
      const dressFee = 10000;
      const hostelFee = 10000;
    }

    const activityFee = tutionFee*0.1;
    const totalBill = tutionFee + hostelFee + dressFee + activityFee;

    if (totalBill>=1000 && totalBill<4000){
      const newValue = totalBill*0.05;
      const discount = totalBill - newValue;
      const totalBill = totalBill;

    }
    else if(totalBill>=4001 && totalBill<6000){
      const newValue = totalBill*0.12;
      const discount = totalBill - newValue;
      const totalBill = totalBill;

    }
    else if(totalBill>=6001 && totalBill<8000){
      const newValue = totalBill*0.17;
      const discount = totalBill - newValue;
      const totalBill = totalBill;
    }
    else {
      const newValue = totalBill*0.21;
      const discount = totalBill - newValue;
      const totalBill = totalBill;
    }
    const difference = lastDate - paymentDate;
    if (difference<30){
      const fine = totalBill*0.06;
      const totalBill = totalBill + fine;
    }
    else if(difference>=31 && difference<60){
      const fine = totalBill*0.12;
      const totalBill = totalBill +fine;
    }
    else if(difference>60){
      const fine = totalBill*0.21;
      const totalBill = totalBill+fine;
    }
    
    

  }

  return (
    <div className='App'>
      <h2>Fee Bill Calculator</h2>
      <br></br>
      <div className="feeForm">
        <form>
          <label>Name of the Student: </label>
          <input type="text" id="stud_name" name="stud_name" placeholder="Enter the Student's full name" />
          <label>Tution Fee (in Rupees): </label>
          <input type="number" id="tutionFee" name="tutionFee" onChange={(e) => {}} placeholder="Enter tution fee" />
          <label>Hostel Fee (in Rupees): </label>
          <input type="number" id="hostelFee" name="hostelFee" onChange={(e)=> {}} placeholder="Enter hostel fee" />
          <label>Dress Fee (in Rupees): </label>
          <input type="number" id="dressFee" name="dressFee" onChange={(e)=>{}} placeholder="Enter dress fee" />
          <label>Activity Fee (in Rupees): </label>
          <input type="number" id="activityFee" name="activityFee" placeholder="Enter activity fee" />
          <label>Date of Payement: </label>
          <input type="date" id="paymentDate" name="paymentDate" />
          <label>Last Date of Payment: </label>
          <input type="date" id="lastDate" name="lastDate" />
          <label>Standard of Study: </label>
          <select id='stdStudy'>
            <option disabled>Select the Standard of Study</option>
            <option value={"1-3"}>1-3</option>
            <option value={"4-6"}>4-6</option>
            <option value={"7-12"}>7-12</option>
          </select>
          <button id='checkDiscount' name='checkDiscount'>Check Discount</button>
          <div ref={setTotalBill}></div>


        </form>
      </div>
    </div>
  );
}

export default App;
