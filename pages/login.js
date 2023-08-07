import { useSession, signIn, signOut } from "next-auth/react";
import Navigation from "./navigation/Index";
import Footer from "@/movies-app/Footer";

export default function Login() {
  const { data: session } = useSession();
  console.log("session", session);
  // if (session) {
  return (
    <>
      <Navigation />
      <div className="flex  flex-col items-center justify-center h-screen bg-center bg-cover" style={{backgroundImage:`url(/cinema-background.jpg)`}}>
        {session ? (
          <>
            <p className="text-white">Welcome, {session.user.name}!</p>
            <button onClick={() => signOut()} className="px-4 py-2 text-white bg-purple-600 rounded">Sign out</button>
          </>
        ) : (
          <button onClick={() => signIn()} className="px-4 py-2 text-white bg-purple-600 rounded">Sign in </button>
        )}
      </div>
      <Footer/>
    </>
  );
}
