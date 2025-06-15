"use client";
import "/src/app/styles/about.css"; // Import styling

export default function About() {
  return (
    <div className="about-container">
      <h1>About Us</h1>
      <p>Welcome to our platform! We are dedicated to helping users track their progress and achieve their goals.</p>

      <div className="about-section">
        <h2>Our Mission</h2>
        <p>We aim to provide a seamless experience for fitness tracking, progress monitoring, and goal setting.</p>
      </div>

      <div className="about-section">
        <h2>Why Choose Us?</h2>
        <ul>
          <li>✔️ User-friendly interface</li>
          <li>✔️ Gamification for motivation</li>
          <li>✔️ Personalized fitness plans</li>
        </ul>
      </div>
    </div>
  );
}