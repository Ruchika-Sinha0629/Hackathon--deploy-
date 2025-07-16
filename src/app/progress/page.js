import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import ProgressClient from "./ProgressClient";
import "/src/app/styles/progress.css"; 

export default async function ProgressDashboard() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <div className="auth-message">
        <p>Please log in or register to view your progress.</p>
        <a href="/auth/login" className="login-btn">Login</a>
        <a href="/auth/register" className="register-btn">Register</a>
      </div>
    );
  }

  return <ProgressClient userId={session.user.id} />;
}