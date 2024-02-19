"use client"
import React from "react";
import PageLayout from "../components/PageLayout";
import NotificationsFeed from "../components/NotificationsFeed";
import Navigation from "../components/Navigation";
import NavigationItem from "../components/Navigation/NavigationItem";

export default function NotificationsPage() {
  return (
    <PageLayout>
      <Navigation>
        <div className="p-2 pl-4 pr-4 flex flex-row gap-6 items-center">
          <NavigationItem text="Notifications" />
        </div>
      </Navigation>
      <NotificationsFeed />
    </PageLayout>
  );
}