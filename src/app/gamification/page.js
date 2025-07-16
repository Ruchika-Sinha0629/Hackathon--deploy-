"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import "/src/app/styles/gamification.css";

export default function Gamification() {
  const { data: session, status } = useSession();
  const [data, setData] = useState(null);

  // Check workout status on initial load
  useEffect(() => {
    if (status !== "authenticated") return;

    const checkWorkoutStatus = async () => {
      try {
        const response = await axios.post(
          "/api/gamification",
          { completedWorkout: false },
          { withCredentials: true }
        );
        setData(response.data);
      } catch (error) {
        console.error("Error checking workout status:", error);
      }
    };

    checkWorkoutStatus();
  }, [status]);

  // Show login prompt if not authenticated
  if (status === "unauthenticated") {
    return (
      <div className="auth-message">
        <p>Please log in or register to view your gamification dashboard.</p>
        <a href="/auth/login" className="login-btn">Login</a>
        <a href="/auth/register" className="register-btn">Register</a>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Gamification Dashboard</h1>

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