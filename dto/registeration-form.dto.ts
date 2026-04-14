import { z } from "zod";
import ZodClass from "@/utilities/zodClass";

class RegistrationFormDto extends ZodClass {
    protected static schema = z.object({
        name: z.string().min(2, "Name must be at least 2 characters long"),

        email: z.email("Invalid email address"),

        phone: z.string()
            .transform(val => val.replace(/\s+/g, ""))
            .refine(val => val.length >= 10 && val.length <= 12, {
                message: "Phone number must be 10–12 digits"
            }),

        department: z.enum(["CSE", "AI&DS", "IT", "CIVIL", "ECE", "MECH", "MBA"]),
        year: z.enum(["1st", "2nd", "3rd", "4th"]),

        rollno: z.string()
            .startsWith("1605")
            .trim(),

        section: z.enum(["A", "B", "C", "D"]),
    });
}

export default RegistrationFormDto;