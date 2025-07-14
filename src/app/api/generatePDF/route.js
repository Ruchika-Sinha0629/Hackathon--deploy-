export const runtime = "nodejs";

import { getToken } from "next-auth/jwt";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";
import { PDFDocument, StandardFonts } from "pdf-lib";

export async function GET(req) {
  try {
    await connectToDatabase();
    const token = await getToken({ req });

    if (!token?.sub) {
      return new Response("Unauthorized", { status: 401 });
    }

    const user = await User.findById(token.sub);
    if (!user) {
      return new Response("User not found", { status: 404 });
    }

    // Fetch diet plan
    const host = req.headers.get("host");
    const protocol = req.headers.get("x-forwarded-proto") || "http";
    const fetchUrl = `${protocol}://${host}/api/fitness/generatePlan`;

    const res = await fetch(fetchUrl, {
      headers: {
        cookie: req.headers.get("cookie") || "",
      },
    });

    if (!res.ok) {
      const raw = await res.text();
      throw new Error(`Failed to fetch diet plan: ${raw.slice(0, 100)}...`);
    }

    const { dietPlan } = await res.json();
    if (!Array.isArray(dietPlan)) {
      throw new Error("Invalid dietPlan format");
    }

    const groceryItems = new Set();
    dietPlan.forEach((meal) => {
      meal.ingredientsVeg?.forEach((item) => groceryItems.add(item));
      meal.ingredientsNonVeg?.forEach((item) => groceryItems.add(item));
    });

    // Created PDF using pdf-lib
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([595.28, 841.89]); // A4 size in points
    const font = await pdfDoc.embedFont(StandardFonts.TimesRoman);

    const { width, height } = page.getSize();
    let y = height - 50;

    page.drawText(" Grocery List", {
      x: 50,
      y,
      size: 20,
      font,
    });

    y -= 40;
    groceryItems.forEach((item) => {
      page.drawText(`• ${item}`, {
        x: 60,
        y,
        size: 14,
        font,
      });
      y -= 20;
    });

    const pdfBytes = await pdfDoc.save();

    return new Response(pdfBytes, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="Grocery_List_${user.name || "User"}.pdf"`,
      },
    });
  } catch (error) {
    console.error("PDF Generation Error:", error.stack);
    return new Response(
      JSON.stringify({
        error: "PDF generation failed",
        details: error.message,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}