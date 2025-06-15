// "use client";
// import Link from "next/link";
// import "/src/app/styles/navbar.css";

// export default function Navbar() {
//   return (
//     <nav className="navbar">
//       <div className="logo-container">
//         <img src="/images/logo.jpg" alt="FitPro Logo" className="logo" />
//         <span className="brand-name">FitTrack Pro</span>
//       </div>
//       <ul className="nav-list">
//         <li><Link className="nav-links" href="/" aria-label="Home">Home</Link></li>
//         <li><Link className="nav-links" href="/progress/check-in" aria-label="Daily Check-in">Check-in</Link></li>
//         <li><Link className="nav-links" href="/auth/register" aria-label="Register">Register</Link></li>
//         <li><Link className="nav-links" href="/auth/login" aria-label="Login">Login</Link></li>
//         <li><Link className="nav-links" href="/about" aria-label="About Us">About</Link></li>
//       </ul>
//     </nav>
//   );
// }

// "use client";
// import Link from "next/link";
// import { useEffect, useState } from "react";
// import "/src/app/styles/navbar.css";

// export default function Navbar() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     setIsLoggedIn(!!token);
//   }, []);
//   return (
//     <nav className="navbar">
//       <div className="logo-container">
//         <img src="/images/logo.jpg" alt="FitPro Logo" className="logo" />
//         <span className="brand-name">FitTrack Pro</span>
//       </div>

//       <ul className="nav-list">
//         <li><Link className="nav-links" href="/" aria-label="Home">Home</Link></li>
//         <li><Link className="nav-links" href="/progress/check-in" aria-label="Daily Check-in">Check-in</Link></li>
//         {/* <li><Link className="nav-links" href="/auth/register" aria-label="Register">Register</Link></li> */}

//         {!isLoggedIn && (
//           <>
//             <li><Link className="nav-links" href="/auth/register">Register</Link></li>
//             <li><Link className="nav-links" href="/auth/login">Login</Link></li>
//           </>
//         )}

//         {isLoggedIn && (
//           <>
//           <li><Link className="nav-links" href="/progress">Progress</Link></li>
//           <li><Link className="nav-links" href="/gamification" aria-label="Gaming Dashboard">Gamification</Link></li>
//           <li><Link className="nav-links" href="/fitnessplan" aria-label="Fitness Plan">Fitness Plan</Link></li>
//           <li><Link className="nav-links" href="/dietplan" aria-label="Diet Plan">Diet Plan</Link></li>
          
//           </>
//         )}
//         <li><Link className="nav-links" href="/about" aria-label="About Us">About</Link></li>
//       </ul>
//     </nav>
//   );
// }

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
        <li><Link className="nav-links" href="/progress/check-in">Check-in</Link></li>

        {status === "loading" ? (
          <li>Loading...</li>
        ) : session ? (
          <>
            <li><Link className="nav-links" href="/progress">Progress</Link></li>
            <li><Link className="nav-links" href="/gamification" aria-label="Gaming Dashboard">Gamification</Link></li>
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

        <li><Link className="nav-links" href="/about">About</Link></li>
      </ul>
    </nav>
  );
}