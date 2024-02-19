import React from "react";
import { useLogin } from "../providers/NeynarProvider";
import SearchCastItem from "./SearchCastItem";
import LoadingIcon from "./icons/LoadingIcon";
import { type SearchcasterCast, type SearchcasterResponse } from "../types";
  

export default function CastSearch({ query, handleRefetch }: { query: string, handleRefetch?: () => void }){
  const [resultsLoading, setResultsLoading] = React.useState<boolean>(false);
  const [searchResult, setSearchResults] = React.useState<SearchcasterResponse | null>(null);
  const { farcasterUser: authenticatedUser } = useLogin();

  const getSearch = React.useCallback(async () => {
    if (query && query.length > 0) {
      try {
        setResultsLoading(true);
        const response = await fetch(`https://searchcaster.xyz/api/search?text=${query}&count=100`);
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json() as SearchcasterResponse;
        setResultsLoading(false);
        setSearchResults(data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
        setSearchResults(null);
      }
    }
  }, [query]);

    return(
        <>
            {searchResult !== null && searchResult.casts && 
            <div className="flex flex-col w-full gap-1 pb-4">
                {searchResult.casts.map((searchCast: SearchcasterCast, index: number) => {
                    return <SearchCastItem cast={searchCast} key={`search-cast-${index}`} />
                })}
            </div>
            }
            {searchResult === null && resultsLoading && <LoadingIcon />}
        </>
    )
}