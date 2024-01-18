// // import { z } from "zod";

// import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

// export const friendsRouter = createTRPCRouter({
//   getFriendsProfileImages: protectedProcedure.query(async ({ ctx }) => {
//     // Get the current user's ID from the session
//     const currentUserId = ctx.session.user.id;

//     // Find the current user's follows
//     const userFollows = await ctx.db.user.findUnique({
//       where: { id: currentUserId },
//       select: { follows: { select: { id: true } } },
//     });

//     // Extract the IDs of users the current user follows
//     const followedUserIds = userFollows?.follows.map((user) => user.id) ?? [];

//     // Shuffle the array of followedUserIds to get a random order
//     const shuffledUserIds = followedUserIds.sort(() => Math.random() - 0.5);

//     // Take the first 5 user IDs
//     const randomUserIds = shuffledUserIds.slice(0, 5);

//     // Find the user records for the selected randomUserIds
//     const randomUsers = await ctx.db.user.findMany({
//       where: { id: { in: randomUserIds } },
//       // Add any additional fields you want to select
//     });

//     // Return the profile images of the random users
//     return randomUsers.map((user) => user.profileImage).filter(Boolean);
//   }),

//   //   addFriend: protectedProcedure.mutation(async ({ ctx }) => {}),

//   getPossibleFriendsList: protectedProcedure.mutation(async ({ ctx }) => {
//     const possibleFriends = await ctx.db.user.findMany({
//       take: 5,
//     });
//     return possibleFriends;
//   }),
// });
