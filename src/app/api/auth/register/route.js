import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcrypt";

export async function POST(req) {
    console.log("Register API Hit!");

  try {
    await connectToDatabase(); // Ensure DB connection

    const body = await req.json();

    // Validate required fields
    const { name, email, password, weight, height, age, gender, fitnessGoal, healthRestrictions } = body;

    if (!name || !email || !password) {
      return new Response(JSON.stringify({ error: "Name, email, and password are required!" }), { status: 400 });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return new Response(JSON.stringify({ error: "User already exists!" }), { status: 409 });
    }

    // Hash password securely
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user profile
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      weight: weight || null,
      height: height || null,
      age: age || null,
      gender: gender || "Not Specified",
      fitnessGoal: fitnessGoal || "General Fitness",
      healthRestrictions: Array.isArray(healthRestrictions) ? healthRestrictions : [],
      points: 0, // Initialize gamification points
    });

    await newUser.save();

    return new Response(
      JSON.stringify({ message: "User registered successfully!", user: { id: newUser._id, email: newUser.email, name: newUser.name } }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration Error:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error", details: error.message }), { status: 500 });
  }
}
export async function GET() {
  console.log("Register API is being hit!");
  return new Response(JSON.stringify({ message: "API is working!" }), { status: 200 });
}

