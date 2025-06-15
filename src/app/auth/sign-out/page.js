export default function SignOutPage() {
  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h1>You’ve been signed out</h1>
      <p>Thank you for using FitTrack Pro.</p>
      <a href="/auth/login" style={{ color: "#5E81AC" }}>Log back in</a>
    </div>
  );
}