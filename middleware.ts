import { auth } from "./auth"

// Export the auth middleware
export default auth((req) => {
  // req.auth has user's session
  // req.nextUrl has the URL information
})

// Optionally, don't invoke middleware on some paths
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
