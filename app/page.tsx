"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const departments = ["AI&DS", "CSE", "ECE", "MECH", "CIVIL", "IT", "MBA"];
const sections = ["A", "B", "C", "D"];

type FormDataType = {
  name: string;
  email: string;
  phone: string;
  department: string;
  year: string;
  rollno: string;
  section: string;
};

const initialForm: FormDataType = {
  name: "",
  email: "",
  phone: "",
  department: "",
  year: "",
  rollno: "",
  section: "",
};

export default function Home() {
  const [formData, setFormData] = useState<FormDataType>(initialForm);
  const [loading, setLoading] = useState(false);

  // ✅ separated error states
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  function updateField(key: keyof FormDataType, value: string) {
    setFormData((prev) => ({ ...prev, [key]: value }));

    // clear only that field error
    setFieldErrors((prev) => {
      const { [key]: _, ...rest } = prev;
      return rest;
    });

    setFormError(null);
    setSuccess(null);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const payload: FormDataType = {
      name: formData.name.trim(),
      email: formData.email.trim().toLowerCase(),
      phone: formData.phone.trim(),
      department: formData.department,
      year: formData.year,
      rollno: formData.rollno.trim(),
      section: formData.section,
    };

    try {
      setLoading(true);
      setFieldErrors({});
      setFormError(null);
      setSuccess(null);

      // debug 01: 
      console.log("Clean payload", payload)

      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const apiResponse = await response.json().catch(() => null);

      if (!response.ok) {
        const backendError = apiResponse?.error;
        // debug 02:
        console.log("Backend error", backendError)

        // ✅ field errors
        if (backendError?.fieldErrors) {
          setFieldErrors(backendError.fieldErrors);
        }
        // ✅ general error
        else if (typeof backendError === "string") {
          setFormError(backendError);
        }
        // fallback
        else {
          setFormError("Something went wrong");
        }

        return;
      }

      // debug 03:
      console.log("Success", apiResponse)

      setSuccess(apiResponse?.message || "Registration successful!");
      setFormData(initialForm);
    } catch {
      setFormError("Network error. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black p-6 text-slate-100">
      <div className="mx-auto max-w-xl">


        <Card className="border border-slate-800 bg-slate-900/95 text-slate-100 shadow-2xl">
          <CardHeader className="space-y-4">
            <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-gradient-to-br from-indigo-600 via-purple-600 to-cyan-500 p-6 shadow-xl">
              <div className="absolute inset-0 bg-white opacity-20 blur-2xl" />

              <div className="absolute right-2 top-2 sm:right-3 sm:top-3 rounded-sm bg-white/90 p-1 sm:p-2 shadow-lg">
                <img
                  src="/IIC org.png"
                  alt="IIC Logo"
                  className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 object-contain"
                />
              </div>

              <div className="relative">
                <h1 className="text-2xl md:text-2xl lg:text-3xl font-extrabold tracking-tight text-white">
                  ASPIRE 2026 🚀
                </h1>
                <p className="mt-1 text-sm text-white/90">
                  Innovation • Skills • Leadership
                </p>
              </div>
            </div>

            <CardTitle className="text-center text-xl font-semibold text-white">
              Event Registration
            </CardTitle>

            <CardDescription className="text-center text-slate-400">
              Secure your seat for the tech event
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">

              {/* 🔴 GENERAL ERROR */}
              {formError && (
                <div className="rounded-lg border border-red-900/60 bg-red-950/50 p-3 text-sm text-red-300">
                  {formError}
                </div>
              )}

              {/* ✅ Name */}
              <div>
                <Label>Name</Label>
                {fieldErrors.name && (
                  <p className="text-red-400 text-sm mb-1">
                    {fieldErrors.name[0]}
                  </p>
                )}
                <Input
                  className="border-slate-700 bg-slate-800 text-slate-100 placeholder:text-slate-500"
                  name="name"
                  value={formData.name}
                  onChange={(e) => updateField("name", e.target.value)}
                  placeholder="Enter your name"
                  required
                />
              </div>

              {/* ✅ Email */}
              <div>
                <Label>Email</Label>
                {fieldErrors.email && (
                  <p className="text-red-400 text-sm mb-1">
                    {fieldErrors.email[0]}
                  </p>
                )}
                <Input
                  className="border-slate-700 bg-slate-800 text-slate-100 placeholder:text-slate-500"
                  name="email"
                  value={formData.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </div>

              {/* ✅ Phone */}
              <div>
                <Label>Phone</Label>
                {fieldErrors.phone && (
                  <p className="text-red-400 text-sm mb-1">
                    {fieldErrors.phone[0]}
                  </p>
                )}
                <Input
                  className="border-slate-700 bg-slate-800 text-slate-100 placeholder:text-slate-500"
                  name="phone"
                  value={formData.phone}
                  onChange={(e) =>
                    updateField("phone", e.target.value.replace(/\D/g, ""))
                  }
                  placeholder="Enter 10-digit phone number"
                  maxLength={10}
                  required
                />
              </div>

              {/* ✅ Roll No */}
              <div>
                <Label>Roll No</Label>
                {fieldErrors.rollno && (
                  <p className="text-red-400 text-sm mb-1">
                    {fieldErrors.rollno[0]}
                  </p>
                )}
                <Input
                  className="border-slate-700 bg-slate-800 text-slate-100 placeholder:text-slate-500"
                  name="rollno"
                  value={formData.rollno}
                  onChange={(e) => updateField("rollno", e.target.value)}
                  placeholder="Enter your roll number"
                  required
                />
              </div>

              {/* ✅ Department */}
              <div>
                <Label>Department</Label>
                {fieldErrors.department && (
                  <p className="text-red-400 text-sm mb-1">
                    {fieldErrors.department[0]}
                  </p>
                )}
                <Select
                  value={formData.department}
                  onValueChange={(value) => updateField("department", value as string)}
                >
                  <SelectTrigger className="border-slate-700 bg-slate-800 text-slate-100 w-full">
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent className="border-slate-700 bg-slate-900 text-slate-100">
                    {departments.map((department) => (
                      <SelectItem key={department} value={department}>
                        {department}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* ✅ Year */}
              <div>
                <Label>Year</Label>
                {fieldErrors.year && (
                  <p className="text-red-400 text-sm mb-1">
                    {fieldErrors.year[0]}
                  </p>
                )}
                <Select
                  value={formData.year}
                  onValueChange={(value) => updateField("year", value as string)}
                >
                  <SelectTrigger className="border-slate-700 bg-slate-800 text-slate-100 w-full">
                    <SelectValue placeholder="Select year" />
                  </SelectTrigger>
                  <SelectContent className="border-slate-700 bg-slate-900 text-slate-100">
                    <SelectItem value="1st">1</SelectItem>
                    <SelectItem value="2nd">2</SelectItem>
                    <SelectItem value="3rd">3</SelectItem>
                    <SelectItem value="4th">4</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* ✅ Section */}
              <div>
                <Label>Section</Label>
                {fieldErrors.section && (
                  <p className="text-red-400 text-sm mb-1">
                    {fieldErrors.section[0]}
                  </p>
                )}
                <Select
                  value={formData.section}
                  onValueChange={(value) => updateField("section", value as string)}
                >
                  <SelectTrigger className="border-slate-700 bg-slate-800 text-slate-100 w-full">
                    <SelectValue placeholder="Select section" />
                  </SelectTrigger>
                  <SelectContent className="border-slate-700 bg-slate-900 text-slate-100">
                    {sections.map((section) => (
                      <SelectItem key={section} value={section}>
                        {section}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* ✅ Success */}
              {success && (
                <div className="rounded-lg border border-emerald-900/60 bg-emerald-950/40 p-3 text-sm text-emerald-300">
                  {success}
                </div>
              )}

              <Button
                className="w-full bg-white text-slate-950 hover:bg-slate-200"
                disabled={loading}
                type="submit"
              >
                {loading ? "Submitting..." : "Register"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}