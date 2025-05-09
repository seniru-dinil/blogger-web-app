import { z } from "zod";

const descriptionSchema = z.object({
  description: z
    .string()
    .min(10, {
      message: "description must contain more than 10 characters.",
    })
    .max(200, {
      message: "should only contain less than 50 characters.",
    }),
});

const titleSchema = z.object({
  title: z
    .string()
    .min(10, {
      message: "title should containt at lest 10 characters",
    })
    .max(70, {
      message: "title cannot contains more thatn 70 characters.",
    }),
});

const imageSchema = z.object({
  imageUrl: z.string().url(),
});

export { descriptionSchema, titleSchema, imageSchema };
