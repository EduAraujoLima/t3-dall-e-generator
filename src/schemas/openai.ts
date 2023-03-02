import { z } from "zod";

const generateDallEImageSchema = z.object({
  prompt: z.string().min(3, {
    message: "Prompt must be at least 3 characters long",
  }),
  quantity: z
    .number()
    .min(1, {
      message: "Quantity must be at least 1",
    })
    .max(9, {
      message: "Quantity must be at most 9",
    }),
});

type GenerateDallEImageSchema = z.infer<typeof generateDallEImageSchema>;

export {
  generateDallEImageSchema
};
export type { GenerateDallEImageSchema };

