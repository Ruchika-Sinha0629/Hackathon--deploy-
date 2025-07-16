import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";
import { getToken } from "next-auth/jwt";

export async function POST(req) {
  try {
    await connectToDatabase();

    const token = await getToken({ req });

    if (!token?.sub) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    const user = await User.findById(token.sub);
    if (!user) {
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    const body = await req.json();
    const { completedWorkout, weightUpdate } = body;

    let pointsEarned = 0;
    let achievements = [...user.achievements];
    let milestoneMessage = null;
    let finalMessage = null;

    // ⚖️ Weight update milestones
  const today = new Date().toISOString().split("T")[0];
  const alreadyRewarded = user.lastWorkoutDate === today;

if (completedWorkout && !alreadyRewarded) {
  pointsEarned += 10;
  user.pointsEarned = 10;
  user.lastWorkoutDate = today;
}
    if (weightUpdate) {
      const weightChange = Math.abs(user.startingWeight - weightUpdate);

      if (weightChange % 5 === 0 && !user.weightMilestones.includes(weightUpdate)) {
  milestoneMessage = `🎉 You've ${weightUpdate < user.startingWeight ? "lost" : "gained"} ${weightChange} kg!`;
  pointsEarned += 50;
  user.weightMilestones.push(weightUpdate);
}

      if (weightUpdate === user.targetWeight) {
        finalMessage = `🏆 You've reached your fitness goal of ${user.targetWeight} kg!`;
        pointsEarned += 100;
      }
    }

    // Finalize points and badges only if points were earned
    // Finalize points
if (pointsEarned > 0) {
  user.points += pointsEarned;
}

// ✅ Always check for badge upgrades
if (user.points >= 1000 && !achievements.includes("Diamond Badge")) {
  achievements.push("Diamond Badge");
}
if (user.points >= 500 && !achievements.includes("Gold Badge")) {
  achievements.push("Gold Badge");
}
if (user.points >= 200 && !achievements.includes("Silver Badge")) {
  achievements.push("Silver Badge");
}

user.achievements = achievements;
    await user.save();

    return new Response(
      JSON.stringify({
        pointsEarned,
        achievements: user.achievements,
        totalPoints: user.points,
        alreadyRewarded,
        milestoneMessage,
        finalMessage,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Gamification API Error:", error);

    return new Response(
      JSON.stringify({
        error: "Internal Server Error",
        details: error.message,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}