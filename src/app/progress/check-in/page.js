"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import "/src/app/styles/progress.css";

export default function DailyCheckIn() {
  const { data: session, status } = useSession();
  const [weight, setWeight] = useState("");
  const [workoutCompleted, setWorkoutCompleted] = useState(false);
  const [caloriesBurned, setCaloriesBurned] = useState(0);

  const submitCheckIn = async () => {
    if (!session?.user?.id) {
      alert("Please log in.");
      return;
    }

    const parsedWeight = weight ? parseFloat(weight) : null;
    const parsedCalories = parseInt(caloriesBurned);

    if (workoutCompleted) {
      if (isNaN(parsedCalories) || parsedCalories <= 0) {
        alert("Please enter a valid number of calories burned.");
        return;
      }
    }

    await axios.post("/api/progress/update", {
      userId: session.user.id,
      weight: parsedWeight,
      workoutCompleted,
      caloriesBurned: workoutCompleted ? parsedCalories : null,
    });

    alert("Check-in saved! Your progress is updated.");
  };

  // 🔐 Show login prompt if not authenticated
  if (status === "unauthenticated") {
    return (
      <div className="auth-message">
        <p>Please log in or register to log your daily check-in.</p>
        <a href="/auth/login" className="login-btn">Login</a>
        <a href="/auth/register" className="register-btn">Register</a>
      </div>
    );
  }

  return (
    <div className="container check-in-container">
      <h1>Daily Check-In</h1>

      <label>Log Weight (optional):</label>
      <input
        type="number"
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
        placeholder="Enter your weight"
      />

      <div className="checkbox-container">
        <input
          type="checkbox"
          checked={workoutCompleted}
          onChange={(e) => setWorkoutCompleted(e.target.checked)}
        />
        <label>Workout Completed?</label>
      </div>

      {workoutCompleted && (
        <>
          <label>Calories Burned:</label>
          <input
            type="number"
            value={caloriesBurned}
            onChange={(e) => setCaloriesBurned(e.target.value)}
            placeholder="Enter calories burned"
          />
        </>
      )}

      <button
        onClick={submitCheckIn}
        disabled={workoutCompleted && (!caloriesBurned || parseInt(caloriesBurned) <= 0)}
      >
        Submit Check-In
      </button>
    </div>
  );
}