// import pdfkit from "pdfkit";
// import fs from "fs";
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

//   // Fetch diet plan
//   const { dietPlan } = await fetch("/api/fitness/generatePlan").then((res) => res.json());
//   const groceryItems = new Set();

//   dietPlan.forEach((meal) => meal.ingredients.forEach((item) => groceryItems.add(item)));

//   // Create PDF document
//   const pdf = new pdfkit();
//   const filePath = `/tmp/Grocery_List_${user.name}.pdf`;
//   const stream = fs.createWriteStream(filePath);
//   pdf.pipe(stream);

//   pdf.fontSize(20).text("Grocery List", { align: "center" });
//   pdf.moveDown();
  
//   groceryItems.forEach((item) => {
//     pdf.fontSize(14).text(`- ${item}`);
//   });

//   pdf.end();

//   return Response.json({ message: "PDF generated", url: filePath });
// }

import pdfkit from "pdfkit";
import fs from "fs";
import path from "path"; // Ensure file paths work across environments
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";
import { getSession } from "next-auth/react";

export async function GET(req) {
  try {
    await connectToDatabase();
    const session = await getSession({ req });

    if (!session?.user?.id) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await User.findById(session.user.id);
    if (!user) return Response.json({ error: "User not found" }, { status: 404 });

    // Fetch diet plan properly
    const response = await fetch("/api/fitness/generatePlan");
    if (!response.ok) {
      throw new Error("Failed to fetch diet plan.");
    }

    const { dietPlan } = await response.json();
    const groceryItems = new Set();

    dietPlan.forEach((meal) => {
      meal.ingredientsVeg.forEach((item) => groceryItems.add(item));
      meal.ingredientsNonVeg.forEach((item) => groceryItems.add(item));
    });

    // Define a reliable file path
    const filePath = path.join(process.cwd(), `Grocery_List_${user.name}.pdf`);
    const pdf = new pdfkit();
    const stream = fs.createWriteStream(filePath);
    pdf.pipe(stream);

    pdf.fontSize(20).text("Grocery List", { align: "center" });
    pdf.moveDown();

    groceryItems.forEach((item) => {
      pdf.fontSize(14).text(`- ${item}`);
    });

    pdf.end();

    return Response.json({ message: "PDF generated", url: filePath });
  } catch (error) {
    console.error("PDF Generation Error:", error);
    return Response.json({ error: "PDF generation failed", details: error.message }, { status: 500 });
  }
}