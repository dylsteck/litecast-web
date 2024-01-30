"use client"
import React, { useState, useEffect, useCallback } from "react";
import PageLayout from "../components/PageLayout";
import useNeynarNotifications from "../hooks/useNeynarNotifications";
import { useLogin } from "../providers/NeynarProvider";

export default function NotificationsPage() {
  const { farcasterUser } = useLogin();
  const { notifications, loading, error } = useNeynarNotifications(farcasterUser?.fid ?? 616);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <PageLayout title="Notifications" isSearch={false}>
      <div>
        {notifications && notifications.map((notification, index) => (
          <div key={index}>
            <p>{notification.type}</p>
            <p>{notification.most_recent_timestamp}</p>
          </div>
        ))}
      </div>
    </PageLayout>
  );
}