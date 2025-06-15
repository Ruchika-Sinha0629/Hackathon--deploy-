import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route"; // adjust path as needed
import ProgressClient from "./ProgressClient";

export default async function ProgressDashboard() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return <p>You must be logged in to view this page.</p>;
  }

  return <ProgressClient userId={session.user.id} />;
}
