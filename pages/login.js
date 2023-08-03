import { useSession, signIn, signOut } from "next-auth/react";
import Navigation from "./navigation/Index";

export default function Login() {
  const { data: session } = useSession();
  console.log("session", session);
  // if (session) {
  return (
    <>
      <Navigation />
      <div>
        {session ? (
          <>
            <p>Welcome, {session.user.name}!</p>
            <button onClick={() => signOut()}>Sign out</button>
          </>
        ) : (
          <button onClick={() => signIn()}>Sign in </button>
        )}
      </div>
    </>
  );
}
