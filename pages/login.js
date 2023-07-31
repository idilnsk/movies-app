import { useSession, signIn, signOut } from "next-auth/next";
import Navigation from "./navigation/Index";



export const Login = () => {
  const { data: session } = useSession();

  if (session) {
    return (
        <div>
            <Navigation/>
        <p>Welcome, {session.user.email}</p>
        <button onClick={() => signOut()}>Sign out</button>
      </div>
    );
  } else {
    return (
      <div>
        <Navigation/>
        <p>You are not signed in.</p>
        <button onClick={() => signIn()}>Sign in</button>
      </div>
    );
  }
};

export default Login;