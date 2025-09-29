import React, { useState } from 'react';
import './App.css';

function App() {
  const [studentName, setStudentName] = useState("");
  const [tutionFee, setTutionFee] = useState("");
  const [paymentDate, setPaymentDate] = useState("");
  const [lastDate, setLastDate] = useState("");
  const [stdStudy, setStdStudy] = useState("");
  const [totalFee, setTotalFee] = useState(0);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [totalBill, setTotalBill] = useState(0);
  const [fineAmount, setFineAmount] = useState(0);
  const [finalAmount, setFinalAmount] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const calculateFees = (e) => {
    e.preventDefault();
    setShowResults(false);

    // Validation
    if (!studentName || !tutionFee || !paymentDate || !lastDate || !stdStudy) {
      alert("Please fill all fields");
      return;
    }

    if (new Date(paymentDate) > new Date(lastDate)) {
      alert("Payment Date cannot be after Last Date of Payment");
      return;
    }

    // Calculate fees based on standard
    let hostelFee, dressFee;
    
    if (stdStudy === "1-3") {
      dressFee = 3000;
      hostelFee = 5000;
    } else if (stdStudy === "4-6") {
      dressFee = 5000;
      hostelFee = 8000;
    } else if (stdStudy === "7-12") {
      dressFee = 10000;
      hostelFee = 10000;
    } else {
      dressFee = 0;
      hostelFee = 0;
    }

    // Activity fee is 10% of tuition fee
    const activityFee = parseFloat(tutionFee) * 0.1;
    
    // Total fee calculation
    const calculatedTotalFee = parseFloat(tutionFee) + hostelFee + dressFee + activityFee;
    setTotalFee(calculatedTotalFee);
    
    // Calculate discount
    calculateDiscount(calculatedTotalFee);
  };

  const calculateDiscount = (totalFee) => {
    let discountPercentage = 0;
    
    if (totalFee >= 1000 && totalFee <= 4000) {
      discountPercentage = 0.05;
    } else if (totalFee >= 4001 && totalFee <= 6000) {
      discountPercentage = 0.12;
    } else if (totalFee >= 6001 && totalFee <= 8000) {
      discountPercentage = 0.17;
    } else if (totalFee >= 8001) {
      discountPercentage = 0.21;
    }

    const discount = totalFee * discountPercentage;
    const billAfterDiscount = totalFee - discount;
    
    setDiscountAmount(discount);
    setTotalBill(billAfterDiscount);
    
    // Calculate payment with fine
    calculatePayment(billAfterDiscount);
  };

  const calculatePayment = (billAmount) => {
    const paymentDateObj = new Date(paymentDate);
    const lastDateObj = new Date(lastDate);
    const differenceInTime = lastDateObj.getTime() - paymentDateObj.getTime();
    const differenceInDays = differenceInTime / (1000 * 3600 * 24);
    
    let finePercentage = 0;
    
    if (differenceInDays < 0) {
      // Payment is late
      const daysLate = Math.abs(differenceInDays);
      
      if (daysLate <= 30) {
        finePercentage = 0.06;
      } else if (daysLate >= 31 && daysLate <= 60) {
        finePercentage = 0.12;
      } else if (daysLate > 60) {
        finePercentage = 0.21;
      }
    }

    const fine = billAmount * finePercentage;
    const final = billAmount + fine;
    
    setFineAmount(fine);
    setFinalAmount(final);
    setShowResults(true);
  };

  const resetForm = () => {
    setStudentName("");
    setTutionFee("");
    setPaymentDate("");
    setLastDate("");
    setStdStudy("");
    setTotalFee(0);
    setDiscountAmount(0);
    setTotalBill(0);
    setFineAmount(0);
    setFinalAmount(0);
    setShowResults(false);
  };

  // Calculate fees based on standard for display
  const getCalculatedFees = () => {
    let hostelFee = 0, dressFee = 0;
    
    if (stdStudy === "1-3") {
      dressFee = 3000;
      hostelFee = 5000;
    } else if (stdStudy === "4-6") {
      dressFee = 5000;
      hostelFee = 8000;
    } else if (stdStudy === "7-12") {
      dressFee = 10000;
      hostelFee = 10000;
    }
    
    const activityFee = parseFloat(tutionFee || 0) * 0.1;
    
    return { hostelFee, dressFee, activityFee };
  };

  const { hostelFee, dressFee, activityFee } = getCalculatedFees();

  return (
    <div className='App'>
      <h2>Fee Bill Calculator</h2>
      <div className="feeForm">
        <form onSubmit={calculateFees}>
          <label>Name of the Student: </label>
          <input 
            type="text" 
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            placeholder="Enter the Student's full name" 
          />
          
          <label>Tution Fee (in Rupees): </label>
          <input 
            type="number" 
            value={tutionFee}
            onChange={(e) => setTutionFee(e.target.value)}
            placeholder="Enter tution fee" 
          />
          
          <label>Standard of Study: </label>
          <select 
            value={stdStudy}
            onChange={(e) => setStdStudy(e.target.value)}
          >
            <option value="">Select the Standard of Study</option>
            <option value="1-3">1-3</option>
            <option value="4-6">4-6</option>
            <option value="7-12">7-12</option>
          </select>
          
          <label>Date of Payment: </label>
          <input 
            type="date" 
            value={paymentDate}
            onChange={(e) => setPaymentDate(e.target.value)}
          />
          
          <label>Last Date of Payment: </label>
          <input 
            type="date" 
            value={lastDate}
            onChange={(e) => setLastDate(e.target.value)}
          />
          
          <div className="button-group">
            <button type="submit">Calculate Fees</button>
            <button type="button" onClick={resetForm}>Reset</button>
          </div>
        </form>

        {showResults && (
          <div className="results">
            <h3>Fee Calculation Results</h3>
            
            <div className="fee-breakdown">
              <h4>Fee Breakdown:</h4>
              <p>Tuition Fee: Rs{parseFloat(tutionFee).toFixed(2)}</p>
              <p>Hostel Fee: Rs{hostelFee.toFixed(2)}</p>
              <p>Dress Fee: Rs{dressFee.toFixed(2)}</p>
              <p>Activity Fee (10% of Tuition): Rs{activityFee.toFixed(2)}</p>
              <p><strong>Total Fee: Rs{totalFee.toFixed(2)}</strong></p>
            </div>

            <div className="discount-calculation">
              <h4>Discount Calculation:</h4>
              <p>Discount Amount: Rs{discountAmount.toFixed(2)}</p>
              <p><strong>Total Bill after Discount: Rs{totalBill.toFixed(2)}</strong></p>
            </div>

            <div className="payment-calculation">
              <h4>Payment Calculation:</h4>
              <p>Fine Amount: Rs{fineAmount.toFixed(2)}</p>
              <p><strong>Final Amount to be Paid: Rs{finalAmount.toFixed(2)}</strong></p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;