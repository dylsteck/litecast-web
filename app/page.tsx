"use client"
import CastComposeModal from "./components/CastComposeModal";
import CastFeed from "./components/CastFeed";
import Navigation from "./components/Navigation";
import NavigationItem from "./components/Navigation/NavigationItem";
import PageLayout from "./components/PageLayout";

export default function Home(){
  return(
    <PageLayout>
      <Navigation>
        <div className="p-2 pl-4 pr-4 flex flex-row gap-6 items-center justify-between">
          <div className="flex flex-row gap-6 items-center">
            <NavigationItem text="Home" />
          </div>
          <CastComposeModal />
        </div>
      </Navigation>
      <CastFeed />
    </PageLayout>
  )
}