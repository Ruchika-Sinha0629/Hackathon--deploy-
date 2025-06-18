import { getToken } from "next-auth/jwt";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";
import PDFDocument from "pdfkit";
import { PassThrough } from "stream";
import getStream from "get-stream";

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

    const host = req.headers.get("host");
    const protocol = req.headers.get("x-forwarded-proto") || "http";
    const fetchUrl = `${protocol}://${host}/api/fitness/generatePlan`;

    const res = await fetch(fetchUrl, {
      headers: {
        cookie: req.headers.get("cookie") || ""
      }
    });

    if (!res.ok) {
      const raw = await res.text();
      throw new Error(`Failed to fetch diet plan: ${raw.slice(0, 100)}...`);
    }

    const { dietPlan } = await res.json();
    const groceryItems = new Set();

    dietPlan.forEach((meal) => {
      meal.ingredientsVeg?.forEach((item) => groceryItems.add(item));
      meal.ingredientsNonVeg?.forEach((item) => groceryItems.add(item));
    });

    const doc = new PDFDocument();
    const passthrough = new PassThrough();
    doc.pipe(passthrough);

    doc.fontSize(20).text("🛒 Grocery List", { align: "center" }).moveDown();
    groceryItems.forEach((item) => {
      doc.fontSize(14).text(`- ${item}`);
    });
    doc.end();

    const buffer = await getStream.buffer(passthrough);

    return new Response(buffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="Grocery_List_${user.name || "User"}.pdf"`,
      },
    });
  } catch (error) {
    console.error("PDF Generation Error:", error);
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