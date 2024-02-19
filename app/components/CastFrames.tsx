/* eslint-disable @next/next/no-img-element */
import { useEffect, useState, useCallback } from "react";
import { NeynarCastV2, NeynarFrame } from "../types";
import { useLogin } from "../providers/NeynarProvider";
const neynarApiKey = process.env.NEXT_PUBLIC_NEYNAR_API_KEY;

function CastFrameBtn({ number, text, handleOnClick }: { number: number, text: string, handleOnClick: (btnNumber: number) => void }){
    return(
        <button
            key={`${number}`}
            className="border border-black/75 border-1 rounded-2xl px-4 py-0.8 text-xs md:text-md"
            onClick={() => handleOnClick(number)}
        >
            {text}
        </button>
    )
}

function CastFrame({ hash, frame, signerUuid }: { hash: string, frame: NeynarFrame, signerUuid: string }) {
    const [localFrame, setLocalFrame] = useState<NeynarFrame>(frame);

    function fetchWithTimeout(url: string, options: RequestInit, timeout: number = 8000): Promise<Response> {
        return Promise.race([
            fetch(url, options),
            new Promise<Response>((_, reject) =>
                setTimeout(() => reject(new Error('Request timed out')), timeout)
            )
        ]);
    }

    const handleFrameBtnPress = async (btnIndex: number) => {
        try {
            const response = await fetchWithTimeout("https://api.neynar.com/v2/farcaster/frame/action", {
                method: "POST",
                headers: {
                    "accept": "application/json",
                    "api_key": neynarApiKey as string,
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    "cast_hash": hash,
                    "signer_uuid": signerUuid,
                    "action": {
                        "button": {
                            "index": btnIndex
                        },
                        "frames_url": localFrame.frames_url,
                        "post_url": localFrame.post_url ? localFrame.post_url : localFrame.frames_url
                    }
                })
            }) as Response;
            if (response.ok) {
                const json = await response.json() as NeynarFrame;
                setLocalFrame(json);
            } else {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
        } catch (error) {
            console.error('Error during fetch:', error);
            alert('An error occurred!');
        }
    };

    const renderFrameButtons = () => {
        const buttons = [];
        const buttonTags = localFrame.buttons;

        if (!buttonTags) {
            return null;
        }

        if (buttonTags[0]) {
            buttons.push(
                <CastFrameBtn number={buttonTags[0].index} text={buttonTags[0].title} handleOnClick={() => handleFrameBtnPress(buttonTags[0].index)} />
            );
        }

        if (buttonTags[0] && buttonTags[1]) {
            buttons.push(
                <CastFrameBtn number={buttonTags[1].index} text={buttonTags[1].title} handleOnClick={() => handleFrameBtnPress(buttonTags[1].index)} />
            );
        }

        if (buttonTags[0] && buttonTags[1] && buttonTags[2]) {
            buttons.push(
                <CastFrameBtn number={buttonTags[2].index} text={buttonTags[2].title} handleOnClick={() => handleFrameBtnPress(buttonTags[2].index)} />
            );
        }

        if (buttonTags[0] && buttonTags[1] && buttonTags[2] && buttonTags[3]) {
            buttons.push(
                <CastFrameBtn number={buttonTags[3].index} text={buttonTags[3].title} handleOnClick={() => handleFrameBtnPress(buttonTags[3].index)} />
            );
        }

        return <div className="m-2 flex flex-row gap-2 justify-center">{buttons}</div>;
    };

    return (
        <div>
            {localFrame !== null && localFrame.frames_url &&
            <div className="border border-gray-600/70 border-0.5">
                {/* todo: add loading state when the POST request for the frame action fires off */}
                { /* todo: add placeholder image if no image/erorr */ }
                <img src={localFrame.image} alt={`Frame image for ${localFrame.frames_url}`} width={400} height={150} style={{width: '100%', height: 'auto'}} />
                {renderFrameButtons()}
            </div>
            }
        </div>
    );
}

export default function CastFrames({ hash, frames }: { hash: string, frames: Array<NeynarFrame> }) {
    const { farcasterUser } = useLogin();

    return (
        <div className="flex flex-col gap-1">
            {frames.map((frame, index) => {
                return <CastFrame key={`cast-frame-${index}`} hash={hash} frame={frame} signerUuid={farcasterUser?.signer_uuid as string} />;
            })}
        </div>
    );
}