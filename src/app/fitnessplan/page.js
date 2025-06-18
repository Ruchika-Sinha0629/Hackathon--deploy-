// "use client";
// import { useEffect, useState } from "react";
// import { useSession } from "next-auth/react"; // Import NextAuth session
// import axios from "axios";
// import "/src/app/styles/fitness.css";

// export default function FitnessPlan() {
//   const { data: session } = useSession(); // Get user session
//   const [plan, setPlan] = useState(null);

//   useEffect(() => {
//     if (session) {
//       axios.get("/api/generatePlan").then(res => setPlan(res.data));
//     }
//   }, [session]);

//   // If user is not logged in, show login prompt
//   if (!session) {
//     return (
//       <div className="auth-message">
//         <p>Please log in or register to view your fitness plan.</p>
//         <a href="/auth/login" className="login-btn">Login</a>
//         <a href="/auth/register" className="register-btn">Register</a>
//       </div>
//     );
//   }

//   if (!plan) return <p>Loading...</p>;

//   return (
//     <div className="container">
//       <h1>Your Weekly Workout Plan</h1>

//       <table className="workout-table">
//         <thead>
//           <tr>
//             <th>Day</th><th>Exercise</th><th>Sets</th><th>Reps</th><th>Rest</th>
//           </tr>
//         </thead>
//         <tbody>
//           {plan.workoutPlan.map((day, i) =>
//             day.exercises.map((ex, j) => (
//               <tr key={`${i}-${j}`}>
//                 {j === 0 ? <td rowSpan={day.exercises.length}>{day.day}</td> : null}
//                 <td>{ex.name}</td>
//                 <td>{ex.sets}</td>
//                 <td>{ex.reps}</td>
//                 <td>{ex.rest}</td>
//               </tr>
//             ))
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// }

"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react"; 
import axios from "axios";
import "/src/app/styles/fitness.css"; 

export default function FitnessPlan() {
  const { data: session } = useSession(); 
  const [plan, setPlan] = useState(null);

  useEffect(() => {
    if (session) {
      axios.get("/api/fitness/generatePlan").then(res => setPlan(res.data));
    }
  }, [session]);

  // If user is not logged in, show login prompt
  if (!session) {
    return (
      <div className="auth-message">
        <p>Please log in or register to view your fitness plan.</p>
        <a href="/auth/login" className="login-btn">Login</a>
        <a href="/auth/register" className="register-btn">Register</a>
      </div>
    );
  }

  if (!plan) return <p>Loading...</p>;

  return (
    <div className="container">
      <h1>Your Weekly Workout Plan</h1>

      <table className="workout-table">
        <thead>
          <tr>
            <th>Day</th>
            <th>Exercise</th>
            <th>Sets</th>
            <th>Reps / Duration</th>
            <th>Rest</th>
            <th>Calories Burned</th>
          </tr>
        </thead>
        <tbody>
          {plan.workoutPlan.map((day, i) =>
            day.exercises.map((ex, j) => (
              <tr key={`${i}-${j}`}>
                {j === 0 ? <td rowSpan={day.exercises.length}>{day.day}</td> : null}
                <td>{ex.name}</td>
                <td>{ex.sets || "-"}</td>
                <td>{ex.reps || ex.duration}</td>
                <td>{ex.rest || "-"}</td>
                <td>{ex.calories} kcal</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

