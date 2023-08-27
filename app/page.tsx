'use client';

import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

// import { getServerSession } from "next-auth"
// import { authOptions } from './api/auth/[...nextauth]/route';

export default function Home() {
  // const data = await getServerSession(authOptions)
  const { data, status } = useSession();
  const router = useRouter();

  const logoutHandler = async () => {
    await signOut();
  }

  const loginHandler = () => {
    router.push('/api/auth/signin')
  }

  return (
    <div className="">
      <div>
        {JSON.stringify(data)}
      </div>
      { status==='unauthenticated' && <button onClick={loginHandler}>Login</button>}

      { status==='authenticated' && <button onClick={logoutHandler}>Logout</button>}
    </div>
  )
}
