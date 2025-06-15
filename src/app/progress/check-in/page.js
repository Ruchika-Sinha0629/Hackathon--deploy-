"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import "/src/app/styles/progress.css"; 

export default function DailyCheckIn() {
  const { data: session } = useSession();
  const [weight, setWeight] = useState("");
  const [workoutCompleted, setWorkoutCompleted] = useState(false);
  const [caloriesBurned, setCaloriesBurned] = useState(0);

  const submitCheckIn = async () => {
    if (!session?.user?.id) {
      alert("Please log in.");
      return;
    }

    await axios.post("/api/progress/update", {
      userId: session.user.id,
      weight: weight ? parseFloat(weight) : null,
      workoutCompleted,
      caloriesBurned: workoutCompleted ? parseInt(caloriesBurned) : 0,
    });

    alert("Check-in saved! Your progress is updated.");
  };

  return (
    <div className="container check-in-container">
      <h1>Daily Check-In</h1>

      <label>Log Weight (optional):</label>
      <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="Enter your weight" />

      <div className="checkbox-container">
        <input type="checkbox" checked={workoutCompleted} onChange={(e) => setWorkoutCompleted(e.target.checked)} />
        <label>Workout Completed?</label>
      </div>

      {workoutCompleted && (
        <>
          <label>Calories Burned:</label>
          <input type="number" value={caloriesBurned} onChange={(e) => setCaloriesBurned(e.target.value)} placeholder="Enter calories burned" />
        </>
      )}

      <button onClick={submitCheckIn}>Submit Check-In</button>
    </div>
  );
}