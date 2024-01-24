"use client"
import { usePathname } from "next/navigation";
import CastFeed from "../../components/CastFeed";
import PageLayout from "../../components/PageLayout";
import { useLogin } from "../../providers/NeynarProvider";
import useNeynarThread from "@/app/hooks/useNeynarThread";
import ThreadFeed from "@/app/components/ThreadFeed";

export default function CastHashPage(){
  const pathname = usePathname();
  const pathnameParts = pathname.split('/');
  const hash = pathnameParts[2];
  const { farcasterUser: authenticatedUser } = useLogin();
  const { casts, loading, error } = useNeynarThread(hash, authenticatedUser?.fid ?? 616);

  if(loading) return <p>Loading...</p>

  if(error) return <p>Error!</p>

  return(
    <PageLayout title="Conversation">
      <ThreadFeed hash={hash} />
    </PageLayout>
  )
}