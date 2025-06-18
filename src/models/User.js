import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  startingWeight: Number, 
  targetWeight: Number,
  height: Number,
  age: Number,
  gender: String,
  fitnessGoal: String, 
  healthRestrictions: [String], 
  points: { type: Number, default: 0 }, 
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
  achievements: {
    type: [String],
    default: [], 
  },

});

export default mongoose.models.User || mongoose.model("User", UserSchema);