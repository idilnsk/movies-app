import Link from "next/link";
import { useSession } from "next-auth/react";

export default function Navigation() {
  const { data: session } = useSession();

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <div>
      <nav>
        <ul className=" md:flex gap-8 p-6 uppercase bg-black  bg-opacity-10 rounded-2xl">
          <li className="ml-auto">
            <Link href="/"> 🎬 Movies </Link>
          </li>
          <li>
            <Link href="/quiz"> 🎮 Quiz </Link>
          </li>
          <li>
            <Link href="/profile">Profile</Link>
          </li>
          <li>
            {session ? (
              <Link href="/login">Logged-in</Link>
            ) : (
              <Link href="/login">💬 Log-in</Link>
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
}
