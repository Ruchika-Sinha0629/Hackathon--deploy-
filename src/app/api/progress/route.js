import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";

export async function GET(req) {
  await connectToDatabase();

  const userId = req.nextUrl.searchParams.get("userId");
  if (!userId) {
    return Response.json({ error: "Missing userId" }, { status: 400 });
  }

  const user = await User.findById(userId);
  if (!user) {
    return Response.json({ error: "User not found" }, { status: 404 });
  }

  return Response.json({
    weightHistory: user.weightHistory || [],
    workoutHistory: user.workoutHistory || [],
    workoutStreaks: user.workoutStreaks || [],
    points: user.points || 0,
    goal: user.fitnessGoal || "Not Set",
    achievements: user.achievements || [],
  });
}