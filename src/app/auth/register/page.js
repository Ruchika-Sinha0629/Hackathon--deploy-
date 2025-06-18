// "use client";
// import { useState } from "react";
// import axios from "axios";
// import "../../styles/auth.css"; // Fixed path

// export default function Register() {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     weight: null,
//     height: null,
//     age: null,
//     gender: "Male",
//     fitnessGoal: "Lose Weight",
//     healthRestrictions: [],
//   });

//   const handleSubmit = async (e) => {
//   e.preventDefault();
//   try {
//     const response = await axios.post("/api/auth/register", formData);
//     console.log("API Response:", response.data);
//     alert(response.data.message);
//   } catch (error) {
//     console.error("API Error:", error.response?.data);
//     alert(error.response?.data?.error || "Registration failed! Please try again.");
//   }
// };

//   return (
//     <div className="container">
//       <h1>Register & Set Your Fitness Goals</h1>

//       <form onSubmit={handleSubmit}>
//         <input type="text" name="name" placeholder="Full Name" onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
//         <input type="email" name="email" placeholder="Email" onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
//         <input type="password" name="password" placeholder="Password" onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
//         <input type="number" name="weight" placeholder="Weight (kg)" onChange={(e) => setFormData({ ...formData, weight: e.target.value ? e.target.value : null })} />
//         <input type="number" name="height" placeholder="Height (cm)" onChange={(e) => setFormData({ ...formData, height: e.target.value ? e.target.value : null })} />
//         <input type="number" name="age" placeholder="Age" onChange={(e) => setFormData({ ...formData, age: e.target.value ? e.target.value : null })} />

//         <label>Gender:</label>
//         <select name="gender" onChange={(e) => setFormData({ ...formData, gender: e.target.value })}>
//           <option value="Male">Male</option>
//           <option value="Female">Female</option>
//           <option value="Other">Other</option>
//         </select>

//         <label>Fitness Goal:</label>
//         <select name="fitnessGoal" onChange={(e) => setFormData({ ...formData, fitnessGoal: e.target.value })}>
//           <option value="Lose Weight">Lose Weight</option>
//           <option value="Gain Muscle">Gain Muscle</option>
//         </select>

//         <label>Health Restrictions:</label>
//         <input type="text" name="healthRestrictions" placeholder="E.g., Diabetes, Knee Injury" onChange={(e) => setFormData({
//           ...formData,
//           healthRestrictions: e.target.value ? e.target.value.split(",") : [],
//         })} />

//         <button type="submit">Register</button>
//       </form>
//     </div>
//   );
// }

"use client";
import { useState } from "react";
import axios from "axios";
import "../../styles/auth.css"; // Fixed path

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    startingWeight: null, // Renamed from `weight`
    targetWeight: null,
    height: null,
    age: null,
    gender: "Male",
    fitnessGoal: "",
    healthRestrictions: [],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/auth/register", formData);
      console.log("API Response:", response.data);
      alert(response.data.message);
    } catch (error) {
      console.error("API Error:", error.response?.data);
      alert(error.response?.data?.error || "Registration failed! Please try again.");
    }
  };

  return (
    <div className="container">
      <h1>Register & Set Your Fitness Goals</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        />
        <input
          type="number"
          name="startingWeight"
          placeholder="Current Weight (kg)"
          onChange={(e) => setFormData({ ...formData, startingWeight: e.target.value ? e.target.value : null })}
        />
        <input
          type="number"
          name="height"
          placeholder="Height (cm)"
          onChange={(e) => setFormData({ ...formData, height: e.target.value ? e.target.value : null })}
        />
        <input
          type="number"
          name="age"
          placeholder="Age"
          onChange={(e) => setFormData({ ...formData, age: e.target.value ? e.target.value : null })}
        />

        <label>Gender:</label>
        <select name="gender" onChange={(e) => setFormData({ ...formData, gender: e.target.value })}>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

        <label>Fitness Goal:</label>
        <select
          name="fitnessGoal"
          onChange={(e) => setFormData({ ...formData, fitnessGoal: e.target.value })}
        >
          <option value="">Select Goal</option>
          <option value="Lose Weight">Lose Weight</option>
          <option value="Gain Muscle">Gain Muscle</option>
        </select>

        {formData.fitnessGoal && (
          <input
            type="number"
            name="targetWeight"
            placeholder={formData.fitnessGoal === "Lose Weight" ? "Target Weight (kg)" : "Target Muscle Mass (kg)"}
            onChange={(e) => setFormData({ ...formData, targetWeight: e.target.value ? e.target.value : null })}
          />
        )}

        <label>Health Restrictions:</label>
        <input
          type="text"
          name="healthRestrictions"
          placeholder="E.g., Diabetes, Knee Injury"
          onChange={(e) => setFormData({
            ...formData,
            healthRestrictions: e.target.value ? e.target.value.split(",") : [],
          })}
        />

        <button type="submit">Register</button>
      </form>
    </div>
  );
}