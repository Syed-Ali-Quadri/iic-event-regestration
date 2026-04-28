import mongoose from "mongoose";

// ─── Member Sub-Schema ────────────────────────────────────────────────────────
const memberSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        trim: true,
    },
    rollno: {
        type: String,
        required: true,
        trim: true,
    },
    year: {
        type: String,
        required: true,
        enum: ["1st", "2nd", "3rd", "4th"],
    },
    section: {
        type: String,
        required: true,
        enum: ["A", "B", "C", "D"],
    },
}, { _id: false });

// ─── Main Registration Schema ─────────────────────────────────────────────────
const registerSchema = new mongoose.Schema({

    // ── Leader ───────────────────────────────────────────────────────────────
    leaderName: {
        type: String,
        required: true,
        minlength: 3,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, "Invalid email address"],
    },
    phone: {
        type: String,
        required: true,
        match: [/^\d{10}$/, "Phone must be exactly 10 digits"],
    },
    rollno: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    department: {
        type: String,
        required: true,
        enum: ["AI&DS", "CSE", "ECE", "MECH", "CIVIL", "IT", "MBA"],
    },
    year: {
        type: String,
        required: true,
        enum: ["1st", "2nd", "3rd", "4th"],
    },
    section: {
        type: String,
        required: true,
        enum: ["A", "B", "C", "D"],
    },
    college: {
        type: String,
        required: true,
        minlength: 2,
        trim: true,
    },

    // ── Team ─────────────────────────────────────────────────────────────────
    teamName: {
        type: String,
        required: true,
        minlength: 3,
        trim: true,
    },
    projectTitle: {
        type: String,
        required: true,
        trim: true,
    },
    members: {
        type: [memberSchema],
        default: [],
        validate: {
            validator: (arr: unknown[]) => arr.length <= 4,
            message: "Maximum 4 additional members allowed",
        },
    },

    // ── Meta ──────────────────────────────────────────────────────────────────
    slug: {
        type: String,
        required: true,
        unique: true,
    },
    checkedIn: {
        type: Boolean,
        default: false,
    },
    checkedInAt: {
        type: Date,
        default: null,
    },
    attend: {
        type: Boolean,
        default: false,
    },

}, { timestamps: true });

export default mongoose.model("Register", registerSchema, "registers", { overwriteModels: true });