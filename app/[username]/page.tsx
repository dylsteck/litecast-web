"use client"
import { usePathname } from "next/navigation";
import CastFeed from "../components/CastFeed";
import { useLogin } from "../providers/NeynarProvider";
import useNeynarUser from "../hooks/useNeynarUser";
import UserDetails from "../components/UserDetails";
import UserFeed from "../components/UserFeed";
import PageLayout from "../components/PageLayout";

export default function UsernamePage(){
  const pathname = usePathname();
  const username = pathname.replace('/', '');
  const { farcasterUser: authenticatedUser } = useLogin();
  const { user: neynarUser, loading, error } = useNeynarUser(-1, username);

  if(loading) return <p>Loading...</p>

  if(error) return <p>Error!</p>

  return(
    <PageLayout>
      {neynarUser && 
      <>
        <UserDetails neynarUser={neynarUser} />
        <UserFeed fid={neynarUser.fid} username={neynarUser.username} pfp={neynarUser.pfp.url} />
      </>
      }
    </PageLayout>
  )
}