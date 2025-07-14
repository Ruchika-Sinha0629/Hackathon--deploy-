import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";
import { getToken } from "next-auth/jwt"; // Use JWT token helper for App Router

export async function GET(request) {
  await connectToDatabase();

  // Get token from request headers, to identify user
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

  if (!token?.sub) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }

  const user = await User.findById(token.sub);
  if (!user) {
    return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
  }

  const weeksTracked = user.workoutHistory?.length / 7 || 0;

  // Determine user difficulty level
  let difficulty, reps, duration;
  if (weeksTracked >= 4) {
    difficulty = "Advanced";
    reps = 20;
    duration = "60 sec";
  } else if (weeksTracked >= 2) {
    difficulty = "Intermediate";
    reps = 15;
    duration = "45 sec";
  } else {
    difficulty = "Beginner";
    reps = 10;
    duration = "30 sec";
  }

  const isWeightLoss = user.fitnessGoal === "Lose Weight";
  const ageGroup = user.age < 13 ? "Children" : user.age >= 60 ? "Senior" : "Young";

  // **Workout Plan (Monday-Saturday, Sunday as Rest Day)**
  const workoutPlan = {
    "Lose Weight": {
      Senior: [
        { day: "Monday", exercises: [{ name: "Brisk Walking", duration: "30 min", calories: 150 }] },
        { day: "Tuesday", exercises: [{ name: "Chair Yoga", duration, calories: 100 }] },
        { day: "Wednesday", exercises: [{ name: "Leg Raises", sets: 3, reps, rest: "30 sec", calories: 80 }] },
        { day: "Thursday", exercises: [{ name: "Standing Stretches", duration, calories: 110 }] },
        { day: "Friday", exercises: [{ name: "Mobility Drills", duration, calories: 120 }] },
        { day: "Saturday", exercises: [{ name: "Relaxed Walking", duration, calories: 130 }] },
        { day: "Sunday", exercises: [{ name: "Rest Day" }] },
      ],
      Young: [
        { day: "Monday", exercises: [{ name: "Burpees", sets: 3, reps, rest: "45 sec", calories: 250 }] },
        { day: "Tuesday", exercises: [{ name: "Mountain Climbers", sets: 3, reps, rest: "30 sec", calories: 230 }] },
        { day: "Wednesday", exercises: [{ name: "Jump Squats", sets: 3, reps, rest: "30 sec", calories: 180 }] },
        { day: "Thursday", exercises: [{ name: "Step-ups", sets: 3, reps, rest: "45 sec", calories: 160 }] },
        { day: "Friday", exercises: [{ name: "Lunges", sets: 3, reps, rest: "45 sec", calories: 170 }] },
        { day: "Saturday", exercises: [{ name: "HIIT Sprint Intervals", duration: "20 min", calories: 300 }] },
        { day: "Sunday", exercises: [{ name: "Rest Day" }] },
      ],
    },
    "Gain Muscle": {
      Senior: [
        { day: "Monday", exercises: [{ name: "Chair Squats", sets: 3, reps, rest: "30 sec", calories: 100 }] },
        { day: "Tuesday", exercises: [{ name: "Light Resistance Band Training", duration, calories: 90 }] },
        { day: "Wednesday", exercises: [{ name: "Wall Push-ups", sets: 3, reps, rest: "30 sec", calories: 90 }] },
        { day: "Thursday", exercises: [{ name: "Shoulder Press (Light)", sets: 3, reps, rest: "45 sec", calories: 90 }] },
        { day: "Friday", exercises: [{ name: "Balance Exercises", duration, calories: 85 }] },
        { day: "Saturday", exercises: [{ name: "Mobility Stretches", duration, calories: 100 }] },
        { day: "Sunday", exercises: [{ name: "Rest Day" }] },
      ],
      Young: [
        { day: "Monday", exercises: [{ name: "Bench Press", sets: 4, reps, rest: "90 sec", calories: 300 }] },
        { day: "Tuesday", exercises: [{ name: "Barbell Squats", sets: 4, reps, rest: "90 sec", calories: 350 }] },
        { day: "Wednesday", exercises: [{ name: "Deadlifts", sets: 4, reps, rest: "90 sec", calories: 400 }] },
        { day: "Thursday", exercises: [{ name: "Overhead Press", sets: 3, reps, rest: "60 sec", calories: 270 }] },
        { day: "Friday", exercises: [{ name: "Hammer Curls", sets: 3, reps, rest: "45 sec", calories: 240 }] },
        { day: "Saturday", exercises: [{ name: "Push-ups", sets: 3, reps, rest: "60 sec", calories: 250 }] },
        { day: "Sunday", exercises: [{ name: "Rest Day" }] },
      ],
    },
  };

  const dietPlan = isWeightLoss
  ? [
      {
        meal: "Breakfast",
        veg: "Oatmeal & Fruit",
        nonVeg: "Egg White Omelette & Whole Wheat Toast",
        calories: 350,
        imageVeg: "/images/oatmeal.jpg",
        imageNonVeg: "/images/egg-toast.jpg",
        ingredientsVeg: ["Oats", "Milk", "Banana", "Honey"],
        ingredientsNonVeg: ["Egg whites", "Whole wheat bread", "Olive oil"],
        procedureVeg: "Combine oats and milk, heat, then top with banana and honey.",
        procedureNonVeg: "Whisk egg whites, cook with olive oil, and serve with toast."
      },
      {
        meal: "Lunch",
        veg: "Grilled Tofu & Veggies",
        nonVeg: "Grilled Chicken & Veggies",
        calories: 500,
        imageVeg: "/images/grilled-tofu.jpg",
        imageNonVeg: "/images/grilled-chicken.jpg",
        ingredientsVeg: ["Tofu", "Bell peppers", "Olive oil", "Salt"],
        ingredientsNonVeg: ["Chicken breast", "Bell peppers", "Olive oil", "Salt"],
        procedureVeg: "Grill tofu with olive oil and spices, sauté veggies separately.",
        procedureNonVeg: "Grill chicken with olive oil and spices, sauté veggies separately."
      },
      {
        meal: "Dinner",
        veg: "Lentil Soup & Brown Rice",
        nonVeg: "Salmon & Quinoa",
        calories: 550,
        imageVeg: "/images/lentil-soup.jpg",
        imageNonVeg: "/images/salmon-quinoa.jpg",
        ingredientsVeg: ["Lentils", "Brown rice", "Garlic", "Tomatoes"],
        ingredientsNonVeg: ["Salmon", "Quinoa", "Garlic", "Lemon"],
        procedureVeg: "Boil lentils with spices, serve over cooked brown rice.",
        procedureNonVeg: "Bake salmon and cook quinoa, serve with lemon."
      },
      {
        meal: "Snack",
        veg: "Greek Yogurt & Berries",
        nonVeg: "Boiled Eggs & Nuts",
        calories: 200,
        imageVeg: "/images/yogurt-berries.jpg",
        imageNonVeg: "/images/boiled-eggs.jpg",
        ingredientsVeg: ["Greek yogurt", "Blueberries", "Honey"],
        ingredientsNonVeg: ["Boiled eggs", "Almonds", "Cashews"],
        procedureVeg: "Mix yogurt and berries, drizzle honey, and chill lightly.",
        procedureNonVeg: "Boil eggs, peel, and serve with mixed nuts."
      }
    ]
  : [
      {
        meal: "Breakfast",
        veg: "Scrambled Paneer & Toast",
        nonVeg: "Scrambled Eggs & Toast",
        calories: 500,
        imageVeg: "/images/paneer-toast.jpg",
        imageNonVeg: "/images/egg-toast.jpg",
        ingredientsVeg: ["Paneer", "Whole wheat toast", "Butter"],
        ingredientsNonVeg: ["Eggs", "Whole wheat toast", "Butter"],
        procedureVeg: "Scramble paneer with butter, serve with toasted bread.",
        procedureNonVeg: "Scramble eggs with butter, serve with toasted bread."
      },
      {
        meal: "Lunch",
        veg: "Brown Rice & Chickpea Curry",
        nonVeg: "Brown Rice & Chicken",
        calories: 600,
        imageVeg: "/images/chickpea-rice.jpg",
        imageNonVeg: "/images/rice-chicken.jpg",
        ingredientsVeg: ["Brown rice", "Chickpeas", "Spices"],
        ingredientsNonVeg: ["Brown rice", "Chicken breast", "Spices"],
        procedureVeg: "Cook chickpeas with spices, serve over brown rice.",
        procedureNonVeg: "Grill chicken, cook brown rice, serve with spices."
      },
      {
        meal: "Dinner",
        veg: "Grilled Cottage Cheese & Sweet Potato",
        nonVeg: "Steak & Sweet Potato",
        calories: 700,
        imageVeg: "/images/paneer-potato.jpg",
        imageNonVeg: "/images/steak-potato.jpg",
        ingredientsVeg: ["Cottage cheese", "Sweet potato", "Olive oil"],
        ingredientsNonVeg: ["Steak", "Sweet potato", "Olive oil"],
        procedureVeg: "Grill paneer, roast sweet potato with olive oil.",
        procedureNonVeg: "Grill steak, roast sweet potato with olive oil."
      },
      {
        meal: "Snack",
        veg: "Protein Shake with Almond Milk",
        nonVeg: "Protein Shake & Nuts",
        calories: 300,
        imageVeg: "/images/almond-shake.jpg",
        imageNonVeg: "/images/protein-shake.jpg",
        ingredientsVeg: ["Plant-based protein", "Almond milk", "Honey"],
        ingredientsNonVeg: ["Whey protein", "Milk", "Almonds"],
        procedureVeg: "Blend almond milk and protein, add honey for taste.",
        procedureNonVeg: "Blend whey protein with milk, top with almonds."
      }
    ];

const planByGoal = workoutPlan[user.fitnessGoal];

if (!planByGoal) {
  return new Response(
    JSON.stringify({ error: `No workout plan for goal: ${user.fitnessGoal}` }),
    {
      status: 400,
      headers: { "Content-Type": "application/json" },
    }
  );
}

const finalWorkoutPlan = planByGoal[ageGroup];

if (!finalWorkoutPlan) {
  return new Response(
    JSON.stringify({ error: `No plan for age group: ${ageGroup}` }),
    {
      status: 400,
      headers: { "Content-Type": "application/json" },
    }
  );
}

// Safe to return the data now
return new Response(
  JSON.stringify({ workoutPlan: finalWorkoutPlan, dietPlan }),
  {
    status: 200,
    headers: { "Content-Type": "application/json" },
  }
);
}
