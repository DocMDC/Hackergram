import { postRouter } from "~/server/api/routers/post";
import { accountRouter } from "./routers/account";
import { registerRouter } from "./routers/register";
// import { friendsRouter } from "./routers/friends";
import { createTRPCRouter } from "~/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  post: postRouter,
  account: accountRouter,
  register: registerRouter,
  // friends: friendsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
