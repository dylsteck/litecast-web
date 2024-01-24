"use client"
import CastFeed from "./components/CastFeed";
import PageLayout from "./components/PageLayout";

export default function Home(){
  return(
    <PageLayout title="Home">
      <CastFeed castEditorVisible={true} />
    </PageLayout>
  )
}