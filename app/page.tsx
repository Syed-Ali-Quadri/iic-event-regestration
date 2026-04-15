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
                  value={formData.name}
                  onChange={(e) => updateField("name", e.target.value)}
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
                  value={formData.email}
                  onChange={(e) => updateField("email", e.target.value)}
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
                  value={formData.phone}
                  type="number"
                  onChange={(e) => updateField("phone", e.target.value)}
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
                  value={formData.rollno}
                  onChange={(e) => updateField("rollno", e.target.value)}
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
                  onValueChange={(v) => updateField("department", v as string)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map((d) => (
                      <SelectItem key={d} value={d}>
                        {d}
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
                  onValueChange={(v) => updateField("year", v as string)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select year" />
                  </SelectTrigger>
                  <SelectContent>
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
                  onValueChange={(v) => updateField("section", v as string)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select section" />
                  </SelectTrigger>
                  <SelectContent>
                    {sections.map((s) => (
                      <SelectItem key={s} value={s}>
                        {s}
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

              <Button disabled={loading} type="submit" className="w-full">
                {loading ? "Submitting..." : "Register"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}