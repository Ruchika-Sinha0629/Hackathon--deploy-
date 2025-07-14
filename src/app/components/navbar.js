"use client";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import "/src/app/styles/navbar.css";

export default function Navbar() {
  const { data: session, status } = useSession();

  const handleSignOut = () => {
    signOut();
  };

  return (
    <nav className="navbar">
      <div className="logo-container">
        <img src="/images/logo.jpg" alt="FitPro Logo" className="logo" />
        <span className="brand-name">FitTrack Pro</span>
      </div>

      <ul className="nav-list">
        <li><Link className="nav-links" href="/">Home</Link></li>
        <li><Link className="nav-links" href="/about">About</Link></li>

        {status === "loading" ? (
          <li>Loading...</li>
        ) : session ? (
          <>
            <li><Link className="nav-links" href="/progress">Progress</Link></li>
            <li><Link className="nav-links" href="/progress/check-in">Check-in</Link></li>
            <li><Link className="nav-links" href="/gamification" aria-label="Gaming Dashboard">Gamification</Link></li>
            <li><Link className="nav-links" href="/rewards" aria-label="Rewards">Rewards</Link></li>
            <li><Link className="nav-links" href="/fitnessplan" aria-label="Fitness Plan">Fitness Plan</Link></li>
            <li><Link className="nav-links" href="/dietplan" aria-label="Diet Plan">Diet Plan</Link></li>
            <li><button className="nav-links signout-btn" onClick={handleSignOut}>Sign Out</button></li>
          </>
        ) : (
          <>
            <li><Link className="nav-links" href="/auth/register">Register</Link></li>
            <li><Link className="nav-links" href="/auth/login">Login</Link></li>
          </>
        )}

        
      </ul>
    </nav>
  );
}