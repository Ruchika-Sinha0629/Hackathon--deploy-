"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import "/src/app/styles/gamification.css";

export default function Gamification() {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.post("/api/fitness/gamification", { completedWorkout: true, weightUpdate: 75 })
      .then(res => setData(res.data));
  }, []);

  if (!data) return <p>Loading...</p>;

  return (
    <div className="container">
      <h1>Gamification Dashboard</h1>
      <h2>Points Earned: {data.totalPoints}</h2>

      {data.milestoneMessage && <p className="milestone">🏅 {data.milestoneMessage}</p>}
      {data.finalMessage && <p className="final-achievement">🏆 {data.finalMessage}</p>}

      <h3>Achievements</h3>
      <ul>
        {data.achievements.map((milestone, index) => (
          <li key={index}>🏆 {milestone}</li>
        ))}
      </ul>
    </div>
  );
}