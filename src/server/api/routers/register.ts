import { z } from "zod";
import bcrypt from "bcrypt";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const registerRouter = createTRPCRouter({
  register: publicProcedure
    .input(z.object({ email: z.string().min(1), password: z.string().min(4) }))
    .mutation(async ({ ctx, input }) => {
      if (!input.email || !input.password) {
        return "Missing email or password";
      }
      //Prevent duplicate emails from registering
      const duplicate = await ctx.db.user.findUnique({
        where: {
          email: input.email,
        },
      });

      if (duplicate) {
        return "Email already used";
      }

      //Encrypt password
      const hashedPassword = await bcrypt.hash(input.password, 10);

      //Add user to database with prisma
      await ctx.db.user.create({
        data: {
          email: input.email,
          password: hashedPassword,
        },
      });

      return "User successfully created!";
    }),
});
