import { useSession, signIn, signOut } from "next-auth/react";

export default function Login() {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        Signed in as {session.user.name} <br />
        {/* <Image
          src={session.user.image}
          width={50}
          height={50}
          alt={session.user}
        ></Image> */}
        <button onClick={() => signOut()}>Sign out</button>
      </> 
    );
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  );
}