"use client";
import "./styles/home.css";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="hero-container">
      <div className="hero-bg">
        <header>
          <h1 className="hero-title">Your Fitness Journey Starts Here</h1>
          <p className="hero-subtitle">Track your progress, optimize workouts, and achieve greatness.</p>
        </header>
      </div>

      <div className="buttons">
        <button className="cta" onClick={() => router.push("/fitnessplan")}>Explore Workouts</button>
        <button className="cta alt" onClick={() => router.push("/dietplan")}>View Diet Plans</button>
        <button className="cta highlight" onClick={() => router.push("/progress")}>Check Progress</button>
      </div>
    </div>
  );
}