import Link from "next/link";

export default function Navigation() {
  return (
    <div>
      <nav>
        <ul className=" md:flex gap-8 p-6 uppercase bg-black/10">
          <li>
            <Link href="/"> 🎬 Movies </Link>
          </li>
          <li>
            <Link href="/quiz"> 🎮 Quiz </Link>
          </li>
          <li>
            <Link href="/login"> 💬 Log-in </Link>
          </li>
          <li>
            <Link href="/watchlist">watchlist</Link>
          </li>
          <li>
            <Link href="Form"> 📞 Contact Us </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
