// import { connectToDatabase } from "@/lib/mongodb";
// import User from "@/models/User";
// import { getSession } from "next-auth/react";

// export async function GET(req) {
//   await connectToDatabase();
//   const session = await getSession({ req });

//   if (!session?.user?.id) {
//     return Response.json({ error: "Unauthorized" }, { status: 401 });
//   }

//   const user = await User.findById(session.user.id);
//   if (!user) return Response.json({ error: "User not found" }, { status: 404 });

//   const weeksTracked = user.workoutHistory?.length / 7 || 0;

//   let difficulty;
//   let reps, duration;
//   if (weeksTracked >= 4) {
//     difficulty = "Advanced";
//     reps = 20;
//     duration = "60 sec";
//   } else if (weeksTracked >= 2) {
//     difficulty = "Intermediate";
//     reps = 15;
//     duration = "45 sec";
//   } else {
//     difficulty = "Beginner";
//     reps = 10;
//     duration = "30 sec";
//   }

//   let workoutPlan = [];
//   const isWeightLoss = user.fitnessGoal === "Lose Weight";

//   if (isWeightLoss) {
//     workoutPlan = [
//       { day: "Monday", exercises: [
//         { name: "Burpees", sets: 3, reps, rest: "45 sec" },
//         { name: "Jump Squats", sets: 3, reps, rest: "45 sec" }
//       ]},
//       { day: "Tuesday", exercises: [
//         { name: "Mountain Climbers", sets: 3, reps, rest: "30 sec" },
//         { name: "Plank", sets: 2, reps: duration, rest: "30 sec" },
//         { name: "High Knees", sets: 3, reps, rest: "30 sec" }
//       ]},
//       { day: "Wednesday", exercises: [
//         { name: "Jumping Jacks", sets: 3, reps, rest: "30 sec" },
//         { name: "Skaters", sets: 3, reps, rest: "30 sec" }
//       ]},
//       { day: "Thursday", exercises: [
//         { name: "Step-ups", sets: 3, reps, rest: "45 sec" },
//         { name: "Push-ups", sets: 3, reps, rest: "60 sec" },
//         { name: "Glute Bridge", sets: 3, reps, rest: "45 sec" }
//       ]},
//       { day: "Friday", exercises: [
//         { name: "Air Squats", sets: 3, reps, rest: "30 sec" },
//         { name: "Lunges", sets: 3, reps, rest: "45 sec" }
//       ]},
//       { day: "Saturday", exercises: [
//         { name: "HIIT Sprint Intervals", sets: 1, reps: duration, rest: "N/A" },
//         { name: "Burpees", sets: 3, reps, rest: "45 sec" },
//         { name: "Wall Sit", sets: 2, reps: duration, rest: "30 sec" }
//       ]},
//       { day: "Sunday", exercises: [
//         { name: "Rest Day", sets: "-", reps: "-", rest: "Recover" }
//       ]}
//     ];
//   } else {
//     workoutPlan = [
//       { day: "Monday", exercises: [
//         { name: "Bench Press", sets: 4, reps, rest: "90 sec" },
//         { name: "Incline Dumbbell Press", sets: 3, reps, rest: "60 sec" }
//       ]},
//       { day: "Tuesday", exercises: [
//         { name: "Barbell Squats", sets: 4, reps, rest: "90 sec" },
//         { name: "Leg Press", sets: 3, reps, rest: "60 sec" },
//         { name: "Calf Raises", sets: 3, reps, rest: "45 sec" }
//       ]},
//       { day: "Wednesday", exercises: [
//         { name: "Deadlifts", sets: 4, reps, rest: "90 sec" },
//         { name: "Pull-ups", sets: 3, reps, rest: "60 sec" }
//       ]},
//       { day: "Thursday", exercises: [
//         { name: "Overhead Press", sets: 3, reps, rest: "60 sec" },
//         { name: "Lateral Raises", sets: 3, reps, rest: "45 sec" },
//         { name: "Tricep Dips", sets: 3, reps, rest: "60 sec" }
//       ]},
//       { day: "Friday", exercises: [
//         { name: "Dumbbell Rows", sets: 3, reps, rest: "60 sec" },
//         { name: "Hammer Curls", sets: 3, reps, rest: "45 sec" }
//       ]},
//       { day: "Saturday", exercises: [
//         { name: "Push-ups", sets: 3, reps, rest: "60 sec" },
//         { name: "Bodyweight Squats", sets: 3, reps, rest: "45 sec" },
//         { name: "Plank", sets: 2, reps: duration, rest: "30 sec" }
//       ]},
//       { day: "Sunday", exercises: [
//         { name: "Rest Day", sets: "-", reps: "-", rest: "Recover" }
//       ]}
//     ];
//   }
// }

// let dietPlan;

// if (isWeightLoss) {
//   dietPlan = [
//     {
//       meal: "Breakfast",
//       food: "Oatmeal & fruit",
//       calories: 350,
//       image: "/images/oatmeal.jpg",
//       ingredients: ["Oats", "Milk", "Banana", "Honey"],
//       procedure: "Combine oats and milk. Heat, top with banana and honey."
//     },
//     {
//       meal: "Lunch",
//       food: "Grilled chicken & veggies",
//       calories: 500,
//       image: "/images/grilled-chicken.jpg",
//       ingredients: ["Chicken breast", "Bell peppers", "Olive oil", "Salt"],
//       procedure: "Grill chicken with spices; sauté veggies separately."
//     },
//     {
//       meal: "Dinner",
//       food: "Salmon & quinoa",
//       calories: 550,
//       image: "/images/salmon-quinoa.jpg",
//       ingredients: ["Salmon", "Quinoa", "Garlic", "Lemon"],
//       procedure: "Bake salmon and cook quinoa. Serve with lemon."
//     },
//     {
//       meal: "Snack",
//       food: "Greek yogurt & berries",
//       calories: 200,
//       image: "/images/yogurt-berries.jpg",
//       ingredients: ["Greek yogurt", "Blueberries", "Honey"],
//       procedure: "Mix all ingredients and chill lightly."
//     }
//   ];
// } else {
//   dietPlan = [
//     {
//       meal: "Breakfast",
//       food: "Scrambled eggs & toast",
//       calories: 500,
//       image: "/images/eggs-toast.jpg",
//       ingredients: ["Eggs", "Whole wheat toast", "Butter"],
//       procedure: "Scramble eggs; toast bread and add butter."
//     },
//     {
//       meal: "Lunch",
//       food: "Brown rice & chicken",
//       calories: 600,
//       image: "/images/rice-chicken.jpg",
//       ingredients: ["Brown rice", "Chicken breast", "Spices"],
//       procedure: "Cook rice; grill chicken and combine with spices."
//     },
//     {
//       meal: "Dinner",
//       food: "Steak & sweet potato",
//       calories: 700,
//       image: "/images/steak-potato.jpg",
//       ingredients: ["Steak", "Sweet potato", "Olive oil"],
//       procedure: "Grill steak; roast sweet potato until tender."
//     },
//     {
//       meal: "Snack",
//       food: "Protein shake & nuts",
//       calories: 300,
//       image: "/images/protein-shake.jpg",
//       ingredients: ["Whey protein", "Milk", "Almonds"],
//       procedure: "Blend milk and protein; top with almonds."
//     }
//   ];
// }

// return Response.json({ workoutPlan, dietPlan });

import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";
import { getSession } from "next-auth/react";

export async function GET(req) {
  await connectToDatabase();
  const session = await getSession({ req });

  if (!session?.user?.id) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await User.findById(session.user.id);
  if (!user) return Response.json({ error: "User not found" }, { status: 404 });

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
    "Build Muscle": {
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

  // **Diet Plan**
  // const dietPlan = isWeightLoss
  //   ? [
  //       { meal: "Breakfast", food: "Oatmeal & Fruit", calories: 350 },
  //       { meal: "Lunch", food: "Grilled Chicken & Veggies", calories: 500 },
  //       { meal: "Dinner", food: "Salmon & Quinoa", calories: 550 },
  //       { meal: "Snack", food: "Greek Yogurt & Berries", calories: 200 },
  //     ]
  //   : [
  //       { meal: "Breakfast", food: "Scrambled Eggs & Toast", calories: 500 },
  //       { meal: "Lunch", food: "Brown Rice & Chicken", calories: 600 },
  //       { meal: "Dinner", food: "Steak & Sweet Potato", calories: 700 },
  //       { meal: "Snack", food: "Protein Shake & Nuts", calories: 300 },
  //     ];

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
        imageNonVeg: "/images/eggs-toast.jpg",
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

  return Response.json({
    workoutPlan: workoutPlan[user.fitnessGoal][ageGroup],
    dietPlan,
  });
}