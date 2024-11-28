import { z } from "zod";

export const formSchema = z.object({
    title: z.string().min(3).max(100),
    description: z.string().min(20).max(500),
    category: z.string().min(3).max(20),
    link: z
        .string()
        .url()
        .refine(
            async (url) => {
                try {
                    const res = await fetch(url, { method: "HEAD" });

                    if (!res.ok) {
                        // If the response is not OK, the URL is not valid
                        return false;
                    }

                    const contentType = res.headers.get("content-type");
                    // Check if the content type indicates an image
                    return contentType?.startsWith("image/");
                } catch {
                    // Return false if any error occurs during the fetch
                    return false;
                }
            },
            {
                message: "The provided URL is not a valid image link.",
            }
        ),
    pitch: z.string().min(10),
});
