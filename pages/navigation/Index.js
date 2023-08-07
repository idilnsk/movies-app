import Link from "next/link";
import { useSession } from "next-auth/react";
import { TbLogout } from "react-icons/tb";
import { AiOutlineUser } from "react-icons/ai";
import { IoGameControllerOutline } from "react-icons/io5";
import { BiMovie } from "react-icons/bi";
import { TbLogin } from "react-icons/tb";

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
            <Link href="/">
              <div className="flex items-center space-x-2">
                <BiMovie className="relative top-0 text-xl text-purple-500" />
                <span>Movies</span>
              </div>
            </Link>
          </li>
          <li className="flex items-center">
            <Link href="/quiz">
              <div className="flex items-center space-x-2">
                <IoGameControllerOutline className="relative top-0 text-xl text-purple-500" />
                <span>Quiz</span>
              </div>
            </Link>
          </li>
          <li className="flex items-center">
            <Link href="/profile">
              <div className="flex items-center space-x-2">
                <AiOutlineUser className="relative top-0 text-xl text-purple-500 " />
                <span>Profile</span>
              </div>
            </Link>
          </li>
          <li className="flex-items-center ">
            {session ? (
              <Link href="/login">
                <TbLogout className="relative top-0 text-2xl text-purple-500 " />
              </Link>
            ) : (
              <Link href="/login">
                {" "}
                <TbLogin className="relative top-0 text-2xl text-purple-500" />
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
}
