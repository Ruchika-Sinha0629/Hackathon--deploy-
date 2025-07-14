"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import "/src/app/styles/gamification.css";

export default function Gamification() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [workoutSubmitted, setWorkoutSubmitted] = useState(false);

  // Check workout status on initial load
  useEffect(() => {
    const checkWorkoutStatus = async () => {
      try {
        const response = await axios.post("/api/gamification", {
          completedWorkout: false, // just checking status
        });
        setData(response.data);
        setWorkoutSubmitted(response.data.alreadyRewarded || false);
      } catch (error) {
        console.error("Error checking workout status:", error);
      }
    };

    checkWorkoutStatus();
  }, []);

  const handleWorkoutComplete = async () => {
    setLoading(true);
    try {
      const response = await axios.post("/api/gamification", {
        completedWorkout: true,
        weightUpdate: 75, // Optional 
      });
      setData(response.data);
      setWorkoutSubmitted(true);
    } catch (error) {
      console.error("Error submitting workout:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Gamification Dashboard</h1>

      <button
        onClick={handleWorkoutComplete}
        disabled={workoutSubmitted || loading}
        className={`workout-button ${workoutSubmitted ? "disabled" : ""}`}
      >
        {workoutSubmitted ? "Workout Logged ✅" : "Mark Workout Complete"}
      </button>

      {loading && <p>Calculating points...</p>}

      {data && (
        <>
          <h2>Points Earned: {data.totalPoints}</h2>

          {data.milestoneMessage && (
            <p className="milestone">🏅 {data.milestoneMessage}</p>
          )}
          {data.finalMessage && (
            <p className="final-achievement">🏆 {data.finalMessage}</p>
          )}

          <h3>Achievements</h3>
          <ul>
            {data.achievements.map((milestone, index) => (
              <li key={index}>🏆 {milestone}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}