import { Button } from "@mod-protocol/react-ui-shadcn/dist/components/ui/button";

export default function CastButton({ onClick}: { onClick: () => void }) {
    return (
        <Button
            type="submit"
            onClick={onClick}
            className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 text-white bg-[#855DCD]"
          >
            Cast
        </Button>
    );
}