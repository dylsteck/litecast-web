import { ArrowPathIcon } from "@heroicons/react/24/outline";

export default function LoadingIcon(){
    return(
        <div className="flex flex-row justify-center items-center h-full">
            <ArrowPathIcon className="animate-spin h-10 w-10 text-black" />
        </div>
    )
}