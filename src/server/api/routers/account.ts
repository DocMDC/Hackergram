import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const accountRouter = createTRPCRouter({
  updateProfileImage: protectedProcedure
    .input(z.object({ url: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const updatedUser = await ctx.db.user.update({
        where: {
          id: ctx.session.user.id,
        },
        data: {
          profileImage: input.url,
        },
      });

      return updatedUser;
    }),
  getCurrentProfileImage: protectedProcedure.query(async ({ ctx }) => {
    const user = await ctx.db.user.findFirst({
      where: {
        id: ctx.session.user.id,
      },
    });

    return user?.profileImage ?? null;
  }),
});
