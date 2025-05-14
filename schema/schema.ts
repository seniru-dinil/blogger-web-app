import { z } from "zod";

const descriptionSchema = z.object({
  description: z
    .string()
    .min(50, {
      message: "description must contain more than 10 characters.",
    })
    .max(500, {
      message: "should only contain less than 300 characters.",
    }),
});

const titleSchema = z.object({
  title: z
    .string()
    .min(8, {
      message: "title should containt at lest 10 characters",
    })
    .max(150, {
      message: "title cannot contains more thatn 200 characters.",
    }),
});

const imageSchema = z.object({
  imageUrl: z.string().url(),
});

export { descriptionSchema, titleSchema, imageSchema };
