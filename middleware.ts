import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// const isPublicRoute = createRouteMatcher(["/", "/properties(.*)"]);
// const isAdminRoute = createRouteMatcher(["/admin(.*)"]);

const isProtectedRoute = createRouteMatcher([
  "/bookings(.*)",
  "/checkout(.*)",
  "/favorites(.*)",
  "/profile(.*)",
  "/rentals(.*)",
  "/reviews(.*)",
]);
export default clerkMiddleware((auth, req) => {
  // console.log("admin user", auth().userId);
  // const isAdminUser = auth().userId === process.env.ADMIN_USER_ID;

  // if (isAdminRoute(req) && !isAdminUser) {
  //   return NextResponse.redirect(new URL("/", req.url));
  // }
  if (isProtectedRoute(req)) auth().protect();
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
