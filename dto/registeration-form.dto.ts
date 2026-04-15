import { z } from "zod";
import ZodClass from "@/utilities/zodClass";

class RegistrationFormDto extends ZodClass {
    protected static schema = z.object({
        name: z.string().min(2, "Name must be at least 2 characters long"),

        email: z.email("Invalid email address"),

        phone: z.number()
        .min(10, "Phone number must be 10 digits"),

        department: z.enum(["CSE", "AI&DS", "IT", "CIVIL", "ECE", "MECH", "MBA"]),
        year: z.enum(["1st", "2nd", "3rd", "4th"]),

        rollno: z.string()
            .startsWith("1605")
            .trim(),

        section: z.enum(["A", "B", "C", "D"]),
    });
}

export default RegistrationFormDto;