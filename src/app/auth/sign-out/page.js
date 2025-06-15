"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SignOut() {
  const router = useRouter();

  useEffect(() => {
    // Clear token or any other stored auth data
    localStorage.removeItem("token");

    // Optionally redirect to home or login page after sign out
    router.push("/auth/login");
  }, [router]);

  return <p>Signing you out...</p>;
}