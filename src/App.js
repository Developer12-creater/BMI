import React, { useState } from "react";
import "./index.css"; // Import the CSS file

export default function BMICalculator() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [bmi, setBmi] = useState(null);
  const [category, setCategory] = useState("");

  const calculateBMI = () => {
    if (weight && height) {
      const heightInMeters = height / 100;
      const bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(2);
      setBmi(bmiValue);
      determineCategory(bmiValue);
    }
  };

  const determineCategory = (bmiValue) => {
    if (bmiValue < 18.5) {
      setCategory("Underweight");
    } else if (bmiValue >= 18.5 && bmiValue < 24.9) {
      setCategory("Normal weight");
    } else if (bmiValue >= 25 && bmiValue < 29.9) {
      setCategory("Overweight");
    } else {
      setCategory("Obese");
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2>BMI Calculator</h2>
        <input
          type="number"
          placeholder="Weight (kg)"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          className="input"
        />
        <input
          type="number"
          placeholder="Height (cm)"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          className="input"
        />
        <button onClick={calculateBMI} className="button">
          Calculate BMI
        </button>
        {bmi && (
          <div>
            <h3>Your BMI: {bmi}</h3>
            <p>Category: {category}</p>
          </div>
        )}
      </div>
    </div>
  );
}
