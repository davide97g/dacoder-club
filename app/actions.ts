"use server";

import { auth } from "@/auth";

export async function checkYouTubeSubscription() {
  const session = await auth();

  if (!session?.accessToken) {
    return { subscribed: false, error: "Not authenticated" };
  }

  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/subscriptions?part=snippet&mine=true&forChannelId=${process.env.YOUTUBE_CHANNEL_ID}`,
      {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      return {
        subscribed: false,
        error: `API error: ${errorData.error?.message || response.statusText}`,
      };
    }

    const data = await response.json();
    const isSubscribed = data.items && data.items.length > 0;

    return { subscribed: isSubscribed, error: null };
  } catch (error) {
    return {
      subscribed: false,
      error: `Failed to check subscription: ${
        error instanceof Error ? error.message : String(error)
      }`,
    };
  }
}

export async function checkGithubAccount() {
  const session = await auth();

  if (!session?.accessToken) {
    return { loggedIn: false, error: "Not authenticated" };
  }

  try {
    const response = await fetch(`https://api.github.com/user`, {
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      return {
        loggedIn: false,
        error: `API error: ${errorData.error?.message || response.statusText}`,
      };
    }

    const data = await response.json();
    const isLoggedIn = data.login;
    // TODO: save this data to the database since it's the github account username

    return { loggedIn: isLoggedIn, error: null };
  } catch (error) {
    return {
      loggedIn: false,
      error: `Failed to check subscription: ${
        error instanceof Error ? error.message : String(error)
      }`,
    };
  }
}
