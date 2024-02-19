"use client"

import React from "react";
import { useLogin } from "../providers/NeynarProvider";
import { LOCAL_STORAGE_FARCASTER_USER } from "../utils/consts";
import { SIWNWindow, SIWNResponseData } from "../types";
import useNeynarUser from "../hooks/useNeynarUser";

declare let window: SIWNWindow;

export default function SignInWithNeynar(){
    const { farcasterUser, setFarcasterUser } = useLogin();
    const [signerUuid, setSignerUuid] = React.useState<string | null>(null);
    const [fid, setFid] = React.useState<number | null>(null);
    const { user: neynarUser, loading: neynarLoading, error: neynarError } = useNeynarUser(fid === null ? 0 : fid, '');
    const neynarClientId = process.env.NEXT_PUBLIC_NEYNAR_CLIENT_ID;

    const onSignInSuccess = (data: SIWNResponseData) => {
        setFid(Number(data.fid));
        setSignerUuid(data.signer_uuid);
    };

    React.useEffect(() => {
        if (neynarUser && signerUuid) {
          const farcasterUser = {
            signer_uuid: signerUuid,
            fid: Number(neynarUser.fid),
            fname: neynarUser?.username,
            displayName: neynarUser?.displayName,
            profile: {
              bio: neynarUser.profile.bio.text,
            },
            pfp: neynarUser.pfp.url,
            followerCount: neynarUser?.followerCount,
            followingCount: neynarUser?.followingCount,
          };
          localStorage.setItem(LOCAL_STORAGE_FARCASTER_USER, JSON.stringify(farcasterUser));
          setFarcasterUser(farcasterUser);
        }
      }, [setFarcasterUser, signerUuid, neynarUser]);

    React.useEffect(() => {
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