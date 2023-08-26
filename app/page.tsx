'use client';

import { useSession } from "next-auth/react";

// import { getServerSession } from "next-auth"
// import { authOptions } from './api/auth/[...nextauth]/route';

export default function Home() {
  // const data = await getServerSession(authOptions)
  const { data } = useSession();
  return (
    <div className="">
      {JSON.stringify(data)}
    </div>
  )
}
