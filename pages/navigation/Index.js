import Link from "next/link";
import { useSession } from "next-auth/react";
import { AiOutlineUser } from "react-icons/ai";

export default function Navigation() {
  const { data: session } = useSession();

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <div>
      <nav>
        <ul className="md:flex gap-8 p-6 uppercase bg-black bg-opacity-10 rounded-2xl items-center">
          <li className="flex-shrink-0 text-4xl font-bold text-purple-600 mr-4">
            My Movies
          </li>
          <li className="ml-auto">
            <Link href="/"> 🎬 Movies </Link>
          </li>
          <li>
            <Link href="/quiz"> 🎮 Quiz </Link>
          </li>
          <li>
            <Link href="/profile">Profile</Link>
          </li>
          <li className="flex-items-center">
            {session ? (
              <Link href="/login">
                <AiOutlineUser className="relative top-0 text-xl" />
              </Link>
            ) : (
              <Link href="/login">💬 Log-in</Link>
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
}
