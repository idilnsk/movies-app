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
      <div
        className="flex  flex-col items-center justify-center h-screen bg-center bg-cover"
        style={{
          backgroundImage: ` linear-gradient(rgba(22, 32, 88, 0.5), rgba(34, 68, 134, 0.3)),
    url(/background.jpg)`,
        }}
      >
        {session ? (
          <>
            <p className="text-white py-4">Welcome, {session.user.name}!</p>
            <button
              onClick={() => signOut()}
              className="px-4 py-2 text-white bg-purple-600 rounded"
            >
              Sign out
            </button>
          </>
        ) : (
          <button
            onClick={() => signIn()}
            className="px-4 py-2 text-white bg-purple-600 rounded"
          >
            Sign in{" "}
          </button>
        )}
      </div>
      <Footer />
    </>
  );
}
