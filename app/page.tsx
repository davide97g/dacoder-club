import { auth, signIn } from "@/auth";
import { SubscriptionStatus } from "@/components/subscription-status";
import { Button } from "@/components/ui/button";

export default async function Home() {
  const session = await auth();

  return (
    <div className="flex flex-col items-center justify-center gap-6">
      <h1 className="text-3xl font-bold">YouTube Subscription Checker</h1>
      <p className="text-center text-muted-foreground max-w-md">
        Sign in with your Google account to check if you&apos;re subscribed to
        our YouTube channel.
      </p>

      {session ? (
        <SubscriptionStatus />
      ) : (
        <div className="flex flex-col items-center gap-4">
          <form
            action={async () => {
              "use server";
              await signIn("google");
            }}
          >
            <Button size="lg">Sign in with Google</Button>
          </form>
          <p className="text-sm text-muted-foreground">
            We&apos;ll only check if you&apos;re subscribed to our channel.
          </p>
        </div>
      )}
    </div>
  );
}
