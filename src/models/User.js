import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  weight: Number,
  height: Number,
  age: Number,
  gender: String,
  fitnessGoal: String, 
  healthRestrictions: [String], 
  points: { type: Number, default: 0 }, // Gamification tracking
  weightHistory: {
    type: [
      {
        date: { type: Date, required: true },
        weight: { type: Number, required: true },
      },
    ],
    default: [],
  },
  workoutHistory: {
    type: [
      {
        date: { type: Date, required: true },
        calories: { type: Number, required: true },
      },
    ],
    default: [],
  },
  workoutStreaks: {
    type: [{ date: String, completedWorkouts: Number }],
    default: [],
  },
});

export default mongoose.models.User || mongoose.model("User", UserSchema);