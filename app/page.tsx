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
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  function updateField(key: keyof FormDataType, value: string) {
    setFormData((prev) => ({ ...prev, [key]: value }));
    setFieldErrors((prev) => {
      const { [key]: _, ...rest } = prev;
      return rest;
    });
    setFormError(null);
    setSuccess(null);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Basic validation for Shadcn Select components
    if (!formData.department || !formData.year || !formData.section) {
      setFormError("Please select your Department, Year, and Section.");
      return;
    }

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

      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const apiResponse = await response.json().catch(() => null);

      if (!response.ok) {
        const backendError = apiResponse?.error;
        if (backendError?.fieldErrors) {
          setFieldErrors(backendError.fieldErrors);
        } else if (typeof backendError === "string") {
          setFormError(backendError);
        } else {
          setFormError("Something went wrong");
        }
        return;
      }

      setSuccess(apiResponse?.message || "Registration successful!");
      setFormData(initialForm);
    } catch {
      setFormError("Network error. Please check your connection.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 p-4 sm:p-6 text-slate-100 flex items-center justify-center">
      <div className="mx-auto w-full max-w-2xl">
        <Card className="border-slate-800 bg-slate-900/50 backdrop-blur-sm text-slate-100 shadow-2xl overflow-hidden">
          <CardHeader className="p-0">
            {/* Header Banner - Indigo/Violet Theme */}
            <div className="relative p-6 sm:p-8 bg-gradient-to-br from-indigo-600 via-violet-700 to-fuchsia-600">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" />
              
              <div className="absolute right-4 top-4 rounded-lg bg-white/10 backdrop-blur-md p-2 border border-white/20 shadow-xl">
                <img
                  src="/IIC org.png"
                  alt="IIC Logo"
                  className="h-8 w-8 md:h-12 md:w-12 object-contain"
                />
              </div>

              <div className="relative space-y-1">
                <h1 className="text-2xl md:text-3xl font-black tracking-tight text-white drop-shadow-md">
                  AI Automation Masterclass
                </h1>
                <p className="text-indigo-100 font-medium text-sm sm:text-base opacity-90">
                  AI • Automation • Empower
                </p>
                <p className="text-indigo-100 font-medium text-sm sm:text-base opacity-90">By Ali Asgar</p>
              </div>
            </div>

            <div className="px-6 pt-6 text-center">
              <CardTitle className="text-2xl font-bold text-white">
                Participant Portal
              </CardTitle>
              <CardDescription className="text-slate-400 mt-1">
                Fill in your details to register for the flagship event.
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {formError && (
                <div className="rounded-md border border-red-500/50 bg-red-500/10 p-3 text-sm text-red-400 animate-in fade-in zoom-in duration-200">
                  {formError}
                </div>
              )}

              {/* Name Field */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-slate-300">Full Name</Label>
                {fieldErrors.name && <p className="text-red-400 text-xs italic">{fieldErrors.name[0]}</p>}
                <Input
                  id="name"
                  className="border-slate-700 bg-slate-800/50 focus:ring-indigo-500 text-slate-100"
                  value={formData.name}
                  onChange={(e) => updateField("name", e.target.value)}
                  placeholder="John Doe"
                  required
                />
              </div>

              {/* Email & Phone Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-slate-300">Email Address</Label>
                  {fieldErrors.email && <p className="text-red-400 text-xs italic">{fieldErrors.email[0]}</p>}
                  <Input
                    id="email"
                    type="email"
                    className="border-slate-700 bg-slate-800/50 text-slate-100"
                    value={formData.email}
                    onChange={(e) => updateField("email", e.target.value)}
                    placeholder="john@example.com"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-slate-300">Phone Number</Label>
                  {fieldErrors.phone && <p className="text-red-400 text-xs italic">{fieldErrors.phone[0]}</p>}
                  <Input
                    id="phone"
                    className="border-slate-700 bg-slate-800/50 text-slate-100"
                    value={formData.phone}
                    onChange={(e) => updateField("phone", e.target.value.replace(/\D/g, ""))}
                    placeholder="10-digit mobile"
                    maxLength={10}
                    required
                  />
                </div>
              </div>

              {/* Roll No Field */}
              <div className="space-y-2">
                <Label htmlFor="rollno" className="text-slate-300">Roll Number</Label>
                {fieldErrors.rollno && <p className="text-red-400 text-xs italic">{fieldErrors.rollno[0]}</p>}
                <Input
                  id="rollno"
                  className="border-slate-700 bg-slate-800/50 text-slate-100"
                  value={formData.rollno}
                  onChange={(e) => updateField("rollno", e.target.value)}
                  placeholder="Enter Roll No"
                  required
                />
              </div>

              {/* Select Fields Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label className="text-slate-300">Dept</Label>
                  <Select value={formData.department} onValueChange={(v) => updateField("department", v as string)}>
                    <SelectTrigger className="border-slate-700 bg-slate-800/50 w-full">
                      <SelectValue placeholder="AI&DS" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-900 border-slate-700 text-slate-100">
                      {departments.map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-slate-300">Year</Label>
                  <Select value={formData.year} onValueChange={(v) => updateField("year", v as string)}>
                    <SelectTrigger className="border-slate-700 bg-slate-800/50 w-full">
                      <SelectValue placeholder="Year" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-900 border-slate-700 text-slate-100">
                      <SelectItem value="1st">1st Year</SelectItem>
                      <SelectItem value="2nd">2nd Year</SelectItem>
                      <SelectItem value="3rd">3rd Year</SelectItem>
                      <SelectItem value="4th">4th Year</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-slate-300">Section</Label>
                  <Select value={formData.section} onValueChange={(v) => updateField("section", v as string)}>
                    <SelectTrigger className="border-slate-700 bg-slate-800/50 w-full">
                      <SelectValue placeholder="Sec" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-900 border-slate-700 text-slate-100">
                      {sections.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {success && (
                <div className="rounded-md border border-emerald-500/50 bg-emerald-500/10 p-3 text-sm text-emerald-400 animate-in fade-in">
                  {success}
                </div>
              )}

              <Button
                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-6 text-lg transition-all active:scale-95 shadow-lg shadow-indigo-500/20"
                disabled={loading}
                type="submit"
              >
                {loading ? "Processing..." : "Confirm Registration"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}