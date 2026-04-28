import { z } from "zod";
import ZodClass from "@/utilities/zodClass";

// ─── Member Schema (reusable) ─────────────────────────────────────────────────
const memberSchema = z.object({
    name: z.string().min(2, "Member name must be at least 2 characters"),
    rollno: z.string(),
    year: z.enum(["1st", "2nd", "3rd", "4th"], { error: "Select a valid year" }),
    section: z.enum(["A", "B", "C", "D"], { error: "Select a valid section" }),
});

// ─── DTO ──────────────────────────────────────────────────────────────────────
class RegistrationFormDto extends ZodClass {
    protected static schema = z.object({

        // Leader info
        leaderName: z.string().min(3, "Name must be at least 3 characters"),
        email: z.email("Invalid email address"),
        phone: z.string()
            .length(10, "Phone must be exactly 10 digits")
            .regex(/^\d{10}$/, "Phone must contain only digits"),
        rollno: z.string()
            .trim(),
        department: z.enum(["AI&DS", "CSE", "ECE", "MECH", "CIVIL", "IT", "MBA"]),
        year: z.enum(["1st", "2nd", "3rd", "4th"]),
        section: z.enum(["A", "B", "C", "D"]),
        college: z.string().min(2, "College name is required"),

        // Team details
        teamName: z.string().min(3, "Team name must be at least 3 characters"),
        projectTitle: z.string().min(1, "Project title is required"),

        // Team members (1–4 additional members)
        members: z.array(memberSchema)
            .min(1, "At least 1 team member is required")
            .max(4, "Maximum 4 additional members allowed"),
    });
}

export default RegistrationFormDto;