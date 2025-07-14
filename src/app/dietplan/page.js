"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react"; // Import NextAuth session
import axios from "axios";
import "/src/app/styles/diet.css"; 

export default function DietPlan() {
  const { data: session } = useSession(); // Get user session
  const [diet, setDiet] = useState(null);

  useEffect(() => {
    if (session) {
      axios.get("/api/fitness/generatePlan").then((res) => setDiet(res.data));
    }
  }, [session]);

  // If user is not logged in, showing login/register prompt
  if (!session) {
    return (
      <div className="auth-message">
        <p>Please log in or register to view your diet plan.</p>
        <a href="/auth/login" className="login-btn">Login</a>
        <a href="/auth/register" className="register-btn">Register</a>
      </div>
    );
  }

  if (!diet) return <p>Loading...</p>;

  const downloadPDF = async () => {
  try {
    const response = await fetch("/api/generatePDF");

    if (!response.ok) {
      throw new Error("Failed to generate PDF");
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "Grocery_List.pdf";
    document.body.appendChild(a);
    a.click();
    a.remove();

    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Failed to download PDF", error);
    alert("An error occurred while generating the PDF.");
  }
};


  return (
    <div className="container">
      <h1>Your Diet Plan</h1>

      <button className="pdf-btn" onClick={downloadPDF}>Download Grocery List (PDF)</button>

      <table className="diet-table">
        <thead>
          <tr>
            <th>Meal</th><th>Veg Dish</th><th>Non-Veg Dish</th><th>Image</th><th>Ingredients</th><th>Preparation</th>
          </tr>
        </thead>
        <tbody>
          {diet.dietPlan.map((item, idx) => (
            <tr key={idx}>
              <td>{item.meal}</td>
              <td>{item.veg} ({item.calories} kcal)</td>
              <td>{item.nonVeg} ({item.calories} kcal)</td>
              <td>
                <img src={item.imageVeg} className="diet-img" alt={item.veg} />
                <img src={item.imageNonVeg} className="diet-img" alt={item.nonVeg} />
              </td>
              <td>
                <strong>Veg:</strong> {item.ingredientsVeg.join(", ")} <br />
                <strong>Non-Veg:</strong> {item.ingredientsNonVeg.join(", ")}
              </td>
              <td>
                <strong>Veg:</strong> {item.procedureVeg} <br />
                <strong>Non-Veg:</strong> {item.procedureNonVeg}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}