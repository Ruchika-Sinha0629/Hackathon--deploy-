"use client"
import Navbar from "./components/navbar";
import "./styles/home.css";
import { SessionProvider } from "next-auth/react";


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />

      <main> <SessionProvider>
      {children}
      </SessionProvider>
      </main>

        <footer className="footer">
          <p>© 2025 Your Fitness App | Stay Healthy 💪</p>
        </footer>
      </body>
    </html>
  );
}
