"use client";

import { checkYouTubeSubscription } from "@/app/actions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle, Loader2, XCircle } from "lucide-react";
import { useEffect, useState } from "react";

export function SubscriptionStatus() {
  const [status, setStatus] = useState<{
    subscribed?: boolean;
    error?: string | null;
    loading: boolean;
  }>({
    loading: true,
  });

  async function checkSubscription() {
    setStatus({ loading: true });
    const result = await checkYouTubeSubscription();
    setStatus({
      subscribed: result.subscribed,
      error: result.error,
      loading: false,
    });
  }

  useEffect(() => {
    checkSubscription();
  }, []);

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>YouTube Subscription Status</CardTitle>
        <CardDescription>
          Check if you&apos;re subscribed to our channel
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center justify-center py-6">
          {status.loading ? (
            <div className="flex flex-col items-center gap-2">
              <Loader2 className="h-10 w-10 animate-spin text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                Checking subscription...
              </p>
            </div>
          ) : status.error ? (
            <div className="flex flex-col items-center gap-2 text-center">
              <XCircle className="h-10 w-10 text-red-500" />
              <p className="text-sm text-muted-foreground">{status.error}</p>
            </div>
          ) : status.subscribed ? (
            <div className="flex flex-col items-center gap-2 text-center">
              <CheckCircle className="h-10 w-10 text-green-500" />
              <p className="font-medium">You are subscribed to our channel!</p>
              <p className="text-sm text-muted-foreground">
                Thank you for your support.
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2 text-center">
              <XCircle className="h-10 w-10 text-amber-500" />
              <p className="font-medium">
                You are not subscribed to our channel.
              </p>
              <p className="text-sm text-muted-foreground">
                Subscribe to our channel to get access to exclusive content.
              </p>
              <Button
                className="mt-4"
                onClick={() => {
                  window.open(
                    `https://www.youtube.com/channel/${process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_ID}?sub_confirmation=1`,
                    "_blank"
                  );
                }}
              >
                Subscribe Now
              </Button>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button
          variant="outline"
          onClick={checkSubscription}
          disabled={status.loading}
        >
          {status.loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Checking...
            </>
          ) : (
            "Check Again"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
