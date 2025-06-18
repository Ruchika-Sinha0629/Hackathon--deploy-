// "use client";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import "/src/app/styles/gamification.css";

// export default function Gamification() {
//   const [data, setData] = useState(null);

//   useEffect(() => {
//     axios.post("/api/gamification", { completedWorkout: true, weightUpdate: 75 })
//       .then(res => setData(res.data));
//   }, []);

//   if (!data) return <p>Loading...</p>;

//   return (
//     <div className="container">
//       <h1>Gamification Dashboard</h1>
//       <h2>Points Earned: {data.totalPoints}</h2>

//       {data.milestoneMessage && <p className="milestone">🏅 {data.milestoneMessage}</p>}
//       {data.finalMessage && <p className="final-achievement">🏆 {data.finalMessage}</p>}

//       <h3>Achievements</h3>
//       <ul>
//         {data.achievements.map((milestone, index) => (
//           <li key={index}>🏆 {milestone}</li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// import { useEffect, useState } from "react";
// import axios from "axios";
// import "/src/app/styles/gamification.css";

// export default function Gamification() {
//   const [data, setData] = useState(null);

//   useEffect(() => {
//     axios.post("/api/fitness/gamification", { completedWorkout: true, weightUpdate: 75 })
//       .then(res => setData(res.data));
//   }, []);

//   if (!data) return <p>Loading...</p>;

//   return (
//     <div className="container">
//       <h1>Gamification Dashboard</h1>
//       <h2>Points Earned: {data.totalPoints}</h2>

//       {data.milestoneMessage && <p className="milestone">🏅 {data.milestoneMessage}</p>}
//       {data.finalMessage && <p className="final-achievement">🏆 {data.finalMessage}</p>}

//       <h3>Achievements</h3>
//       <ul>
//         {data.achievements.map((milestone, index) => (
//           <li key={index}>🏆 {milestone}</li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// "use client";

// import { useEffect, useState } from "react";
// import axios from "axios";
// import "/src/app/styles/gamification.css";

// export default function Gamification() {
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [viewport, setViewport] = useState("");

//   // useEffect(() => {
//   //   if (typeof generateViewport === "function") {
//   //     setViewport(generateViewport());
//   //   } else {
//   //     console.error("generateViewport() is not available on the client.");
//   //   }
//   // }, []);

//   useEffect(() => {
//   if (typeof window !== "undefined" && typeof generateViewport === "function") {
//     setViewport(generateViewport());
//   } else {
//     console.error("generateViewport() is not available on the client.");
//   }
// }, []);


//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await axios.post("/api/gamification", {
//           completedWorkout: true,
//           weightUpdate: 75,
//         });

//         setData(res.data);
//       } catch (err) {
//         console.error("API error:", err);
//         setError("Failed to load data. Please try again.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);
   
//   const logWorkout = async () => {
//     try {
//       const res = await axios.post("/api/gamification", { completedWorkout: true });
//       setData(res.data);
//     } catch (err) {
//       console.error("Workout logging error:", err);
//       setError("Error logging workout.");
//     }
//   };

//   useEffect(() => {
//   fetchData(); // ✅ Only fetch existing points, NOT log workouts
// }, []);

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p className="error-message">⚠️ {error}</p>;
//   if (!data) return <p>No data available.</p>;

//   return (
//     <div className="container">
//       <h1>Gamification Dashboard</h1>
//       <h2>Points Earned: {data?.totalPoints ?? 0}</h2>

//       {data?.milestoneMessage && <p className="milestone">🏅 {data.milestoneMessage}</p>}
//       {data?.finalMessage && <p className="final-achievement">🏆 {data.finalMessage}</p>}

//       <h3>Achievements</h3>
//       <ul>
//         {data?.achievements?.length > 0 ? (
//           data.achievements.map((milestone, index) => <li key={index}>🏆 {milestone}</li>)
//         ) : (
//           <p>No achievements yet.</p>
//         )}
//       </ul>
//        {/* 🆕 Workout Button */}
//       <button onClick={logWorkout} className="log-workout-btn">
//         Complete Workout
//        </button>

//       {/* <h3>Viewport Details</h3>
//       <p>{viewport || "Fetching viewport data..."}</p> */}
//     </div>
//   );
// }

// "use client";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import "/src/app/styles/gamification.css";

// export default function Gamification() {
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [viewport, setViewport] = useState("");

//   useEffect(() => {
//     if (typeof generateViewport === "function") {
//       setViewport(generateViewport());
//     } else {
//       console.error("generateViewport() is not available on the client.");
//     }
//   }, []);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await axios.get("/api/gamification"); // Changed to `GET`
//         setData(res.data);
//       } catch (err) {
//         console.error("API error:", err);
//         setError("Failed to load data. Please try again.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const logWorkout = async () => {
//     try {
//       const res = await axios.post("/api/gamification", { completedWorkout: true });
//       setData(res.data);
//     } catch (err) {
//       console.error("Workout logging error:", err);
//       setError("Error logging workout.");
//     }
//   };

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p className="error-message">⚠️ {error}</p>;
//   if (!data) return <p>No data available.</p>;

//   return (
//     <div className="container">
//       <h1>Gamification Dashboard</h1>
//       <h2>Points Earned: {data?.totalPoints ?? 0}</h2>

//       {data?.milestoneMessage && <p className="milestone">🏅 {data.milestoneMessage}</p>}
//       {data?.finalMessage && <p className="final-achievement">🏆 {data.finalMessage}</p>}

//       <h3>Achievements</h3>
//       <ul>
//         {data?.achievements?.length > 0 ? (
//           data.achievements.map((milestone, index) => <li key={index}>🏆 {milestone}</li>)
//         ) : (
//           <p>No achievements yet.</p>
//         )}
//       </ul>

//       {/* 🆕 Workout Button */}
//       <button onClick={logWorkout} className="log-workout-btn">
//         Complete Workout
//       </button>

//       <h3>Viewport Details</h3>
//       <p>{viewport || "Fetching viewport data..."}</p>
//     </div>
//   );
// }


// "use client";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import "/src/app/styles/gamification.css";

// export default function Gamification() {
//   const [data, setData] = useState(null);

//   useEffect(() => {
//     axios.post("/api/gamification", { completedWorkout: true, weightUpdate: 75 })
//       .then(res => setData(res.data));
//   }, []);

//   if (!data) return <p>Loading...</p>;

//   return (
//     <div className="container">
//       <h1>Gamification Dashboard</h1>
//       <h2>Points Earned: {data.totalPoints}</h2>

//       {data.milestoneMessage && <p className="milestone">🏅 {data.milestoneMessage}</p>}
//       {data.finalMessage && <p className="final-achievement">🏆 {data.finalMessage}</p>}

//       <h3>Achievements</h3>
//       <ul>
//         {data.achievements.map((milestone, index) => (
//           <li key={index}>🏆 {milestone}</li>
//         ))}
//       </ul>
//     </div>
//   );
// }


// "use client";
// import { useState } from "react";
// import axios from "axios";
// import "/src/app/styles/gamification.css";

// export default function Gamification() {
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [workoutSubmitted, setWorkoutSubmitted] = useState(false);

//   const handleWorkoutComplete = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.post("/api/gamification", {
//         completedWorkout: true,
//         weightUpdate: 75, // Optional — remove or adjust if needed
//       });
//       setData(response.data);
//       setWorkoutSubmitted(true);
//     } catch (error) {
//       console.error("Error submitting workout:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="container">
//       <h1>Gamification Dashboard</h1>

//       <button
//         onClick={handleWorkoutComplete}
//         disabled={workoutSubmitted || loading}
//         className={`workout-button ${workoutSubmitted ? "disabled" : ""}`}
//       >
//         {workoutSubmitted ? "Workout Logged ✅" : "Mark Workout Complete"}
//       </button>

//       {loading && <p>Calculating points...</p>}

//       {data && (
//         <>
//           <h2>Points Earned: {data.totalPoints}</h2>

//           {data.milestoneMessage && (
//             <p className="milestone">🏅 {data.milestoneMessage}</p>
//           )}
//           {data.finalMessage && (
//             <p className="final-achievement">🏆 {data.finalMessage}</p>
//           )}

//           <h3>Achievements</h3>
//           <ul>
//             {data.achievements.map((milestone, index) => (
//               <li key={index}>🏆 {milestone}</li>
//             ))}
//           </ul>
//         </>
//       )}
//     </di
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
        weightUpdate: 75, // Optional — remove if not needed
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