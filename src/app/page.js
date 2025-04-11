'use client';
import { useState } from "react";

const getBMIStatus = (bmi) => {
  if (bmi < 18.5) return { status: "Niedowaga", color: "bg-blue-300" };
  if (bmi < 25) return { status: "Norma", color: "bg-green-400" };
  if (bmi < 30) return { status: "Nadwaga", color: "bg-yellow-300" };
  if (bmi < 35) return { status: "Otyłość", color: "bg-orange-400" };
  return { status: "Poważna otyłość", color: "bg-red-500" };
};

export default function BMICalculator() {
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);
  const [bmi, setBmi] = useState(null);
  const [result, setResult] = useState(null);

  const calculateBMI = () => {
    const heightInMeters = height / 100;
    const bmiValue = weight / (heightInMeters * heightInMeters);
    const roundedBmi = parseFloat(bmiValue.toFixed(1));
    const bmiStatus = getBMIStatus(roundedBmi);
    setBmi(roundedBmi);
    setResult(bmiStatus);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-600">
      <div className="w-full max-w-md p-6 space-y-4 shadow-xl bg-gray-800 rounded-xl text-gray">
        <h1 className="text-2xl font-bold text-center">Kalkulator BMI</h1>
        <input
          type="number"
          placeholder="Waga (kg)"
          onChange={(e) => setWeight(parseFloat(e.target.value))}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="number"
          placeholder="Wzrost (cm)"
          onChange={(e) => setHeight(parseFloat(e.target.value))}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
          onClick={calculateBMI}
        >
          Oblicz BMI
        </button>
        {bmi && result && (
          <div className={`rounded-xl p-4 text-center text-white ${result.color}`}>
            <p className="text-xl font-bold">BMI: {bmi}</p>
            <p className="text-lg">Stan: {result.status}</p>
          </div>
        )}
      </div>
    </div>
  );
}
