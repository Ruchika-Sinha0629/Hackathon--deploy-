import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";
import { getSession } from "next-auth/react";

export async function POST(req) {
  await connectToDatabase();
  const session = await getSession({ req });

  if (!session?.user?.id) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await User.findById(session.user.id);
  if (!user) return Response.json({ error: "User not found" }, { status: 404 });

  const { completedWorkout, weightUpdate } = await req.json();

  let pointsEarned = 0;
  let achievements = [...user.achievements];
  let milestoneMessage = null;
  let finalMessage = null;

  // Points for workouts
  if (completedWorkout) {
    pointsEarned += 10;
  }

  // Track milestone every 5 kg lost/gained
  if (weightUpdate) {
    const weightChange = Math.abs(user.startingWeight - weightUpdate);
    if (weightChange % 5 === 0) {
      milestoneMessage = `🎉 Awesome! You've ${weightUpdate < user.startingWeight ? "lost" : "gained"} ${weightChange} kg! Keep it up!`;
      pointsEarned += 50;
    }
  }

  // Final message when reaching target weight or muscle goal
  if (weightUpdate === user.targetWeight) {
    finalMessage = `🏆 Incredible! You've reached your fitness goal of ${user.targetWeight} kg! Stay strong and keep moving forward!`;
    pointsEarned += 100;
  }

  // Badge unlocking based on points
  const newTotalPoints = user.points + pointsEarned;
  if (newTotalPoints >= 1000 && !achievements.includes("Diamond Badge")) {
    achievements.push("Diamond Badge");
  } else if (newTotalPoints >= 500 && !achievements.includes("Silver Badge")) {
    achievements.push("Silver Badge");
  } else if (newTotalPoints >= 200 && !achievements.includes("Gold Badge")) {
    achievements.push("Gold Badge");
  }

  user.points = newTotalPoints;
  user.achievements = achievements;
  await user.save();

  return Response.json({ pointsEarned, achievements, totalPoints: user.points, milestoneMessage, finalMessage });
}