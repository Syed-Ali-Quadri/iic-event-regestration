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

const departments = [
  "AI&DS",
  "CSE",
  "ECE",
  "MECH",
  "CIVIL",
  "IT",
  "MBA",
];

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
  const [error, setError] = useState<string | string[] | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  function updateField(key: keyof FormDataType, value: string) {
    setFormData((prev) => ({ ...prev, [key]: value }));
    setError(null);
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
      setError(null);
      setSuccess(null);

      // debug: 01
      console.log("Clean output", payload)
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const apiResponse = await response.json().catch(() => null);

      if (!response.ok) {
        // debug: 02
        console.log("Backend error", apiResponse)
        const backendError = apiResponse?.error;

        if (Array.isArray(backendError)) {
          setError(backendError);
        } else if (typeof backendError === "string") {
          setError(backendError);
        } else {
          setError("Something went wrong");
        }
        return;
      }
      // Debug 03:
      console.log("response:", apiResponse)

      setSuccess(apiResponse?.message || "Registration successful!");
      setFormData(initialForm);
    } catch {
      setError("Network error. Try again.");
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

              <div className="absolute right-3 top-3 rounded-xl bg-white/90 p-2 shadow-lg">
                <img
                  src="/IIC org.png"
                  alt="IIC Logo"
                  className="h-10 w-10 object-contain"
                />
              </div>

              <div className="relative">
                <h1 className="text-3xl font-extrabold tracking-tight text-white md:text-4xl">
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
              <div>
                <Label className="text-slate-200 mb-2">Name</Label>
                <Input
                  className="border-slate-700 bg-slate-800 text-slate-100 placeholder:text-slate-500"
                  name="name"
                  value={formData.name}
                  onChange={(e) => updateField("name", e.target.value)}
                  placeholder="Enter your name"
                  required
                />
              </div>

              <div>
                <Label className="text-slate-200 mb-2">Email</Label>
                <Input
                  className="border-slate-700 bg-slate-800 text-slate-100 placeholder:text-slate-500"
                  name="email"
                  value={formData.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div>
                <Label className="text-slate-200 mb-2">Phone</Label>
                <Input
                  className="border-slate-700 bg-slate-800 text-slate-100 placeholder:text-slate-500"
                  name="phone"
                  value={formData.phone}
                  onChange={(e) =>
                    updateField("phone", e.target.value)
                  }
                  placeholder="Enter 10-digit phone number"
                  required
                />
              </div>

              <div>
                <Label className="text-slate-200 mb-2">Roll No</Label>
                <Input
                  className="border-slate-700 bg-slate-800 text-slate-100 placeholder:text-slate-500"
                  name="rollno"
                  value={formData.rollno}
                  onChange={(e) => updateField("rollno", e.target.value)}
                  placeholder="Enter your roll number"
                  required
                />
              </div>

              <div>
                <Label className="text-slate-200 mb-2">Department</Label>
                <Select
                  value={formData.department}
                  onValueChange={(value) => updateField("department", value as string)}
                >
                  <SelectTrigger className="border-slate-700 bg-slate-800 text-slate-100">
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

              <div>
                <Label className="text-slate-200 mb-2">Year</Label>
                <Select
                  value={formData.year}
                  onValueChange={(value) => updateField("year", value as string)}
                >
                  <SelectTrigger className="border-slate-700 bg-slate-800 text-slate-100">
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

              <div>
                <Label className="text-slate-200 mb-2">Section</Label>
                <Select
                  value={formData.section}
                  onValueChange={(value) => updateField("section", value as string)}
                >
                  <SelectTrigger className="border-slate-700 bg-slate-800 text-slate-100">
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

              {error && (
                <div className="rounded-lg border border-red-900/60 bg-red-950/50 p-3 text-sm text-red-300">
                  <strong>Error:</strong>
                  {Array.isArray(error) ? (
                    <ul className="ml-5 mt-2 list-disc">
                      {error.map((item, index) => (
                        <li key={`${item}-${index}`}>{item}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="mt-1">{error}</p>
                  )}
                </div>
              )}

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