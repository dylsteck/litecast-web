"use client"
import { usePathname } from "next/navigation";
import CastFeed from "../components/CastFeed";
import PageLayout from "../components/PageLayout";
import { useLogin } from "../providers/NeynarProvider";
import UserDetails from "../components/UserDetails";
import UserFeed from "../components/UserFeed";
import React from "react";
import Navigation from "../components/Navigation";
import NavigationItem from "../components/Navigation/NavigationItem";
import LoadingIcon from "../components/icons/LoadingIcon";
import InfiniteScrollFeed from "../components/InfiniteScrollFeed";
import CastSearch from "../components/CastSearch";

export type Category = 'Casts' | 'Users';

export default function SearchPage(){
  const [category, setCategory] = React.useState<Category>('Casts');
  const [query, setQuery] = React.useState<string>('');

  return(
    <PageLayout>
        <Navigation>
          <div className="p-2 pl-4 flex flex-row gap-2 items-center">
            <input type="text" value={query} className="outline-none overflow-x-scroll" placeholder={`Search ${category.toLowerCase()}`} onChange={(e) => setQuery(e.target.value)} />
            {/* {query.length > 0 && <button onClick={() => getSearch()} className="text-gray-800/75 text-sm">Search</button>} */}
            {query.length > 0 && <button className="text-gray-800/75 text-sm">Search</button>}
          </div>
        </Navigation>
        <Navigation>
          <div className="p-2 pl-4 flex flex-row gap-6 items-center">
            <NavigationItem text="Casts" underline={category === "Casts"} />
            <NavigationItem text="Users" underline={category === "Users"} handleClick={() => alert('Support for search by users is coming soon!')} />
          </div>
        </Navigation>
        {category === 'Casts' && <CastSearch query={query} />}
    </PageLayout>
  )
}