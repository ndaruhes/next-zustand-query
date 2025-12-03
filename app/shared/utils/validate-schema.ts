import { ZodSchema, ZodError, ZodFormattedError } from "zod";

export function validateSchema<T>(schema: ZodSchema<T>, input: unknown): T {
    const result = schema.safeParse(input);

    if (!result.success) {
        const formatted = result.error.format();
        const firstMessage = result.error.issues[0]?.message ?? "Validation error";

        throw new ValidationError<T>(firstMessage, formatted, result.error);
    }

    return result.data;
}

export class ValidationError<T> extends Error {
    formatted: ZodFormattedError<T>;
    raw: ZodError<T>;

    constructor(
        message: string,
        formatted: ZodFormattedError<T>,
        raw: ZodError<T>
    ) {
        super(message);
        this.name = "ValidationError";
        this.formatted = formatted;
        this.raw = raw;
    }
}
