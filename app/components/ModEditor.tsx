import { useEditor, EditorContent } from "@mod-protocol/react-editor";
import { EmbedsEditor } from "@mod-protocol/react-ui-shadcn/dist/lib/embeds";
import { Button } from "@mod-protocol/react-ui-shadcn/dist/components/ui/button";
import {
  Embed,
  ModManifest,
  fetchUrlMetadata,
  handleAddEmbed,
  handleOpenFile,
  handleSetInput,
} from "@mod-protocol/core";
import {
  Channel,
  getFarcasterChannels,
  getFarcasterMentions,
  isFarcasterUrlEmbed,
} from "@mod-protocol/farcaster";
import { MentionList } from "@mod-protocol/react-ui-shadcn/dist/components/mention-list";
import { ChannelList } from "@mod-protocol/react-ui-shadcn/dist/components/channel-list";
import { ChannelPicker } from "@mod-protocol/react-ui-shadcn/dist/components/channel-picker";
import { CastLengthUIIndicator } from "@mod-protocol/react-ui-shadcn/dist/components/cast-length-ui-indicator";
import { createRenderMentionsSuggestionConfig } from "@mod-protocol/react-ui-shadcn/dist/lib/mentions";
import { useLogin } from "../providers/NeynarProvider";
import { defaultRichEmbedMod } from "@mod-protocol/mod-registry";
import { renderers } from "@mod-protocol/react-ui-shadcn/dist/renderers";
import { RichEmbed } from "@mod-protocol/react";

const MOD_API_URL = "https://api.modprotocol.org/api";
const FCKIT_API_URL = "https://api.farcasterkit.com";

// use our MOD_API_URL, self host our API, or use your own API.
const getUrlMetadata = fetchUrlMetadata(MOD_API_URL);
const getResults = getFarcasterMentions(MOD_API_URL);
const getChannels = getFarcasterChannels(MOD_API_URL);

// todo: make default state for hash null and change type to string | null
export default function ModEditor({ hash }: { hash?: string }) {
  const { farcasterUser } = useLogin();
  const onSubmit = async ({
    text,
    embeds,
    channel,
  }: {
    text: string;
    embeds: Embed[];
    channel: Channel;
  }): Promise<boolean> => {
    try {
      if (text.length === 0) {
        throw new Error("You submitted a blank cast. Please try again.");
        alert("You submitted a blank cast. Please try again.");
      }
      const respBody = {
        parent: hash,
        signer_uuid: farcasterUser?.signer_uuid,
        text: text,
        embeds: embeds.length
          ? embeds.map((embed) =>
              isFarcasterUrlEmbed(embed)
                ? { url: embed.url }
                : {
                    cast_id: { ...embed.castId },
                  }
            )
          : undefined,
        channel_id: channel?.id ? channel?.id : "",
      };
      await fetch(`${FCKIT_API_URL}/neynar/cast`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(respBody),
      });
    } catch (error) {
      console.error("Failed to post cast", error);
      alert(error);
      return false;
    }
    alert("Casted successfully!");
    return true;
  };

  const {
    editor,
    getEmbeds,
    setEmbeds,
    handleSubmit,
    getText,
    setChannel,
    getChannel,
  } = useEditor({
    fetchUrlMetadata: getUrlMetadata,
    onError: (error) => console.error(error),
    onSubmit,
    linkClassName: "text-blue-600",
    renderChannelsSuggestionConfig: createRenderMentionsSuggestionConfig({
      getResults: (query) => getChannels(query, true),
      RenderList: ChannelList,
    }),
    renderMentionsSuggestionConfig: createRenderMentionsSuggestionConfig({
      getResults: getResults,
      RenderList: MentionList,
    }),
    initialText: "",
    placeholderText: hash ? "Reply" : "Cast something",
  });
  return (
    <div className="border-b border-black z-index-50">
      <form onSubmit={handleSubmit}>
        <EditorContent
          editor={editor}
          autoFocus
          className="w-full h-auto max-h-full p-3 pl-4"
        />
        <div className="px-4 py-3">
          <EmbedsEditor
            embeds={getEmbeds()}
            setEmbeds={setEmbeds}
            RichEmbed={({ embed }) => (
              <RichEmbed
                api={MOD_API_URL}
                defaultRichEmbedMod={defaultRichEmbedMod}
                mods={[defaultRichEmbedMod]}
                embed={embed}
                renderers={renderers}
              />
            )}
          />
        </div>
        <div className="flex flex-row gap-4 items-center p-3 pl-4">
          {!hash && (
            <ChannelPicker
              getChannels={getChannels}
              onSelect={setChannel}
              value={getChannel()}
            />
          )}
          <CastLengthUIIndicator getText={getText} />
          <div className="grow"></div>
          <Button
            type="submit"
            className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 text-white bg-[#855DCD]"
          >
            Cast
          </Button>
        </div>
      </form>
    </div>
  );
}
