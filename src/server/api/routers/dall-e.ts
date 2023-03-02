import { createTRPCRouter, publicProcedure } from "../trpc";
import { openai } from "../openAi";
import { generateDallEImageSchema } from "y/schemas/openai";

export const dalleRouter = createTRPCRouter({
  generate: publicProcedure
    .input(generateDallEImageSchema)
    .mutation(async ({ input }) => {
      const { prompt, quantity } = input;
      try {
        const response = await openai.createImage({
          prompt,
          n: quantity,
          size: "1024x1024",
        });

        return response.data;
      }
      catch (error) {
        console.error(error);
        throw error;
      }
    }),
});
