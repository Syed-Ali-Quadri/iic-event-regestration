import { z } from "zod";

class ZodClass {
    protected static schema: z.ZodSchema;

    public static async validate(data: unknown) {
        const result = await this.schema.safeParseAsync(data);

        if (!result.success) {
            return {
                success: false,
                error: result.error.flatten(),
                data: null
            };
        }

        return {
            success: true,
            error: null,
            data: result.data
        };
    }
}

export default ZodClass;