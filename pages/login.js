import { useSession, signIn, signOut } from "next-auth/react";
import Navigation from "./navigation/Index";

export default function Login() {
  const { data: session } = useSession();
  console.log("session", session);
  // if (session) {
  return (
    <>
      <Navigation />
      <div className="flex  flex-col items-center justify-center h-screen">
        {session ? (
          <>
            <p>Welcome, {session.user.name}!</p>
            <button onClick={() => signOut()} className="px-4 py-2 text-white bg-purple-600 rounded">Sign out</button>
          </>
        ) : (
          <button onClick={() => signIn()} className="px-4 py-2 text-white bg-purple-600 rounded">Sign in </button>
        )}
      </div>
    </>
  );
}
