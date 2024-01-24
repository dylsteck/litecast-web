"use client"

import { useEffect, useState } from "react";
import { useLogin } from "../providers/NeynarProvider";
import useWarpcastUser from "../hooks/useWarpcastUser";
import { LOCAL_STORAGE_FARCASTER_USER } from "../utils/consts";
import { SIWNWindow, SIWNResponseData } from "../types";

declare let window: SIWNWindow;

export default function SignInWithNeynar(){
    const { farcasterUser, setFarcasterUser } = useLogin();
    const [signerUuid, setSignerUuid] = useState<string | null>(null);
    const [fid, setFid] = useState<number | null>(null);
    const { user: warpcastUser, loading, error } = useWarpcastUser(fid);
    const neynarClientId = process.env.NEXT_PUBLIC_NEYNAR_CLIENT_ID;

    const onSignInSuccess = (data: SIWNResponseData) => {
        setFid(Number(data.fid));
        setSignerUuid(data.signer_uuid);
    };

    useEffect(() => {
        if (warpcastUser && signerUuid) {
          const farcasterUser = {
            signer_uuid: signerUuid,
            fid: Number(warpcastUser.fid),
            fname: warpcastUser?.username,
            displayName: warpcastUser?.displayName,
            profile: {
              bio: warpcastUser.profile.bio.text,
              location: warpcastUser.profile.location.placeId
            },
            pfp: warpcastUser.pfp.url,
            followerCount: warpcastUser?.followerCount,
            followingCount: warpcastUser?.followingCount,
          };
          localStorage.setItem(LOCAL_STORAGE_FARCASTER_USER, JSON.stringify(farcasterUser));
          setFarcasterUser(farcasterUser);
        }
      }, [setFarcasterUser, signerUuid, warpcastUser]);

    useEffect(() => {
        window.onSignInSuccess = onSignInSuccess;

        return () => {
            delete window.onSignInSuccess;
        };
    }, []);

    return(
      <div
          className="neynar_signin pt-2 pr-0 md:pr-4"
          data-client_id={neynarClientId}
          data-success-callback="onSignInSuccess"
          data-width="147px"
          data-height="29px"
          data-font_size="13px"
          data-padding="6px 13px"
          data-theme="light">
      </div>
    )
}