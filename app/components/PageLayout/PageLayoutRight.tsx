/* eslint-disable @next/next/no-img-element */
import { useLogin } from "@/app/providers/NeynarProvider";
import SignInWithNeynar from "../SignInWithNeynar";

export default function PageLayoutRight(){
    const { farcasterUser } = useLogin();
    return(
        <div className="hidden md:block col-span-3 border-l border-gray-400 overflow-y-auto pl-5 pt-2 pb-2 md:pb-0">
            <img src="https://i.imgur.com/enUb8gc.png" alt="Litecast icon" width={48} height={48} className="w-7 h-7 rounded-md" />
            <p className="pt-1 font-medium text-md text-black/80">Litecast</p>
            <p className="text-black/90 text-sm max-w-[80%]">A beautiful yet simple Farcaster client</p>
            {!farcasterUser && <SignInWithNeynar />}
      </div>  
    )
}