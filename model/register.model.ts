import mongoose from "mongoose";

const registerSchema = new mongoose.Schema({
    name: {
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
        minlength: 10,
        maxlength: 12,
    },

    department: {
        type: String,
        required: true,
        enum: ["CSE", "AI&DS", "IT", "CIVIL", "ECE", "MECH", "MBA"],
    },

    year: {
        type: String,
        required: true,
        enum: ["1st", "2nd", "3rd", "4th"],
    },

    rollno: {
        type: String,
        required: true,
        maxlength: 12,
        trim: true,
    },

    section: {
        type: String,
        required: true,
        enum: ["A", "B", "C", "D"],
    },
}, { timestamps: true });

export default mongoose.model("Register", registerSchema);