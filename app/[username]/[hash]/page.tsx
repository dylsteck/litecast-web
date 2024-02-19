"use client"
import { usePathname } from "next/navigation";
import CastFeed from "../../components/CastFeed";
import { useLogin } from "../../providers/NeynarProvider";
import useNeynarThread from "@/app/hooks/useNeynarThread";
import ThreadFeed from "@/app/components/ThreadFeed";
import PageLayout from "@/app/components/PageLayout";
import Navigation from "@/app/components/Navigation";
import NavigationItem from "@/app/components/Navigation/NavigationItem";

export default function CastHashPage(){
  const pathname = usePathname();
  const pathnameParts = pathname.split('/');
  const hash = pathnameParts[2];
  const { farcasterUser: authenticatedUser } = useLogin();
  const { casts, loading, error } = useNeynarThread(hash, authenticatedUser?.fid ?? 616);

  if(loading) return <p>Loading...</p>

  if(error) return <p>Error!</p>

  return(
    <PageLayout>
      <Navigation>
        <div className="p-2 pl-4 pr-4 flex flex-row gap-6 items-center">
          <NavigationItem text="Conversation" />
        </div>
      </Navigation>
      <ThreadFeed hash={hash} />
    </PageLayout>
  )
}