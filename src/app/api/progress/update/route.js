import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(req) {
  await connectToDatabase();
  const { userId, weight, workoutCompleted, caloriesBurned } = await req.json();

  const user = await User.findById(userId);
  if (!user) {
    return Response.json({ error: "User not found" }, { status: 404 });
  }

  const today = new Date().toISOString().split("T")[0];

  // Log weight
  if (weight) {
    user.weightHistory.push({ date: today, weight });
  }

  // Log workout completion
  if (workoutCompleted) {
     if (typeof caloriesBurned !== "number" || caloriesBurned <= 0) {
    return Response.json(
      { error: "Calories burned must be a positive number." },
      { status: 400 }
    );

    }

    user.workoutHistory.push({ date: today, calories: caloriesBurned });

    // Prevent duplicate entry for same day streak
    const alreadyLogged = user.workoutStreaks.find((s) => s.date === today);
    if (!alreadyLogged) {
      user.workoutStreaks.push({ date: today, completedWorkouts: 1 });
    }

    user.points += 10;

    // Bonus for 7-day streak
    const last7 = user.workoutStreaks.slice(-7);
    const isStreak = last7.length === 7;
    if (isStreak) {
      user.points += 100;
    }
  }

  await user.save();
  return Response.json({ message: "Progress updated", points: user.points });
}

