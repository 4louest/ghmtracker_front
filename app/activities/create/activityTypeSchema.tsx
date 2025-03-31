import {z} from "zod";

export const activityTypeSchema = z.object({
    id: z.number(),
    name: z.string(),
    color: z.string(),
})
