import { auth, signIn, signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { UserButton } from "./user-button";

export async function Nav() {
  const session = await auth();

  return (
    <header className="border-b">
      <div className="container flex h-16 items-center justify-between py-4">
        <Link href="/" className="font-bold">
          YouTube Subscription Checker
        </Link>
        <nav className="flex items-center gap-4">
          {session ? (
            <UserButton
              user={session.user}
              signOut={async () => {
                "use server";
                return await signOut();
              }}
            />
          ) : (
            <form
              action={async () => {
                "use server";
                await signIn("google");
              }}
            >
              <Button>Sign In</Button>
            </form>
          )}
        </nav>
      </div>
    </header>
  );
}
