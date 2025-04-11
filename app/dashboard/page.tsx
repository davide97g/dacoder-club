import { redirect } from "next/navigation"
import { auth } from "@/auth"
import { SubscriptionStatus } from "@/components/subscription-status"

export default async function Dashboard() {
  const session = await auth()

  if (!session) {
    redirect("/")
  }

  return (
    <div className="flex flex-col items-center justify-center gap-6">
      <h1 className="text-3xl font-bold">Your Dashboard</h1>
      <p className="text-center text-muted-foreground max-w-md">
        Welcome back, {session.user?.name}! Check your subscription status below.
      </p>

      <SubscriptionStatus />
    </div>
  )
}
