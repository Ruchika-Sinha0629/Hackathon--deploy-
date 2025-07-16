"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation"; 
import { useSession } from "next-auth/react";
import { Line } from "react-chartjs-2";
import "../styles/progress.css";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from "chart.js";
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

export default function ProgressClient({ userId }) {
  const [progress, setProgress] = useState(null);
  const [showWelcome, setShowWelcome] = useState(false);
  const searchParams = useSearchParams();
  const { data: session } = useSession(); // ⬅️ Get session data


  const welcomeParam = searchParams.get("welcome");

  useEffect(() => {
    if (userId) {
      const fetchProgress = async () => {
        const response = await axios.get(`/api/progress?userId=${userId}`);
        setProgress(response.data);
      };
      fetchProgress();
    }
    // Check if welcome param is in URL
    if (welcomeParam === "true") {
    setShowWelcome(true);
  }

  }, [userId,welcomeParam]);

  if (!progress) return <p>Loading...</p>;

  return (
    <div className="container">
      <h1>Progress Dashboard</h1>

      {showWelcome && session?.user?.name && (
        <div className="welcome-message">
          🎉 Welcome back, {session.user.name}!
        </div>
      )}

      <div className="progress-card">
        <strong>Total Points:</strong> {progress.points}
      </div>

      <h2>Weight Trend</h2>
      <Line data={{
        labels: progress.weightHistory.map(entry => new Date(entry.date).toLocaleDateString()),
        datasets: [{
          label: "Weight",
          data: progress.weightHistory.map(entry => entry.weight),
          borderColor: "#5E81AC",
          fill: false
        }]
      }} />

      <h2>Workout History</h2>
      <ul className="history-list">
        {progress.workoutHistory.map((entry, index) => (
          <li key={index}>
            Date: {new Date(entry.date).toLocaleDateString()} | Calories Burned: {entry.calories}
          </li>
        ))}
      </ul>
    </div>
  );
}
