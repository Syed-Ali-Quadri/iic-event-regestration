"use client";

import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import Image from "next/image";

// ─── Constants ────────────────────────────────────────────────────────────────
const departments = ["AI&DS", "CSE", "ECE", "MECH", "CIVIL", "IT", "MBA"];
const sections    = ["A", "B", "C", "D"];

// ─── Types ────────────────────────────────────────────────────────────────────
type TeamMember = { name: string; rollno: string; year: string; section: string };

type FormDataType = {
  leaderName: string; email: string; phone: string; rollno: string;
  department: string; year: string; section: string;
  college: string;                                          // ← added
  teamName: string; projectTitle: string;
  members: TeamMember[];
};

type FieldErrors  = Record<string, string>;
type MemberErrors = Record<number, Record<string, string>>;

const emptyMember = (): TeamMember => ({ name: "", rollno: "", year: "", section: "" });

const initialForm: FormDataType = {
  leaderName: "", email: "", phone: "", rollno: "",
  department: "", year: "", section: "",
  college: "",                                              // ← added
  teamName: "", projectTitle: "",
  members: [emptyMember()],
};

// ─── Validation ───────────────────────────────────────────────────────────────
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ROLL_RE  = /^[A-Za-z0-9]{6,15}$/;

function validateForm(data: FormDataType): {
  fieldErrors: FieldErrors; memberErrors: MemberErrors; valid: boolean;
} {
  const fieldErrors: FieldErrors   = {};
  const memberErrors: MemberErrors = {};

  // Leader
  if (!data.leaderName.trim())                fieldErrors.leaderName  = "Full name is required.";
  else if (data.leaderName.trim().length < 3) fieldErrors.leaderName  = "Name must be at least 3 characters.";

  if (!data.email.trim())                     fieldErrors.email       = "Email address is required.";
  else if (!EMAIL_RE.test(data.email))        fieldErrors.email       = "Enter a valid email address.";

  if (!data.phone.trim())                     fieldErrors.phone       = "Phone number is required.";
  else if (data.phone.length !== 10)          fieldErrors.phone       = "Phone must be exactly 10 digits.";

  if (!data.rollno.trim())                    fieldErrors.rollno      = "Roll number is required.";
  else if (!ROLL_RE.test(data.rollno))        fieldErrors.rollno      = "Invalid roll number format (6–15 alphanumeric).";

  if (!data.department)                       fieldErrors.department  = "Select a department.";
  if (!data.year)                             fieldErrors.year        = "Select your year.";
  if (!data.section)                          fieldErrors.section     = "Select your section.";

  // College                                                           // ← added
  if (!data.college.trim())                   fieldErrors.college     = "College name is required.";
  else if (data.college.trim().length < 2)    fieldErrors.college     = "College name must be at least 2 characters.";

  // Team
  if (!data.teamName.trim())                  fieldErrors.teamName    = "Team name is required.";
  else if (data.teamName.trim().length < 3)   fieldErrors.teamName    = "Team name must be at least 3 characters.";

  if (!data.projectTitle.trim())              fieldErrors.projectTitle = "Project title is required.";

  // Members — validate only if the row is partially filled
  data.members.forEach((m, i) => {
    const anyFilled = m.name || m.rollno || m.year || m.section;
    if (!anyFilled) return;

    const errs: Record<string, string> = {};
    if (!m.name.trim())               errs.name    = "Name is required.";
    if (!m.rollno.trim())             errs.rollno  = "Roll number is required.";
    else if (!ROLL_RE.test(m.rollno)) errs.rollno  = "Invalid roll number format.";
    if (!m.year)                      errs.year    = "Select year.";
    if (!m.section)                   errs.section = "Select section.";
    if (Object.keys(errs).length)     memberErrors[i] = errs;
  });

  return {
    fieldErrors,
    memberErrors,
    valid: !Object.keys(fieldErrors).length && !Object.keys(memberErrors).length,
  };
}

// ─── Sub-components ───────────────────────────────────────────────────────────
const FieldError = ({ msg }: { msg?: string }) =>
  msg ? <p className="text-xs text-red-400 mt-1 flex items-center gap-1">⚠ {msg}</p> : null;

const StyledInput = ({
  hasError, ...props
}: React.ComponentProps<typeof Input> & { hasError?: boolean }) => (
  <Input
    {...props}
    className={[
      "bg-slate-800/60 text-slate-100 placeholder:text-slate-500 transition-colors",
      hasError
        ? "border-red-500/70 focus-visible:ring-red-500 focus-visible:border-red-500"
        : "border-slate-700 focus-visible:ring-indigo-500 focus-visible:border-indigo-500",
      props.className ?? "",
    ].join(" ")}
  />
);

const StyledLabel = ({ children }: { children: React.ReactNode }) => (
  <Label className="text-slate-300 text-xs font-semibold tracking-wide uppercase">
    {children}
  </Label>
);

const triggerCls = (hasError?: boolean) =>
  [
    "bg-slate-800/60 text-slate-100 transition-colors",
    hasError
      ? "border-red-500/70 focus:ring-red-500"
      : "border-slate-700 focus:ring-indigo-500",
  ].join(" ");

const SectionHeading = ({ icon, title, subtitle }: {
  icon: string; title: string; subtitle?: string;
}) => (
  <div className="flex items-center gap-3 pt-2">
    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-500/20 border border-indigo-500/30 text-base">
      {icon}
    </div>
    <div>
      <p className="text-sm font-bold text-white">{title}</p>
      {subtitle && <p className="text-xs text-slate-500">{subtitle}</p>}
    </div>
    <div className="flex-1 h-px bg-slate-700/60 ml-2" />
  </div>
);

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function Home() {
  const [formData,     setFormData]     = useState<FormDataType>(initialForm);
  const [memberKeys,   setMemberKeys]   = useState<number[]>([Date.now()]);
  const [fieldErrors,  setFieldErrors]  = useState<FieldErrors>({});
  const [memberErrors, setMemberErrors] = useState<MemberErrors>({});
  const [formError,    setFormError]    = useState<string | null>(null);
  const [success,      setSuccess]      = useState<string | null>(null);
  const [loading,      setLoading]      = useState(false);

  const formRef  = useRef<HTMLFormElement>(null);
  const errorRef = useRef<HTMLDivElement>(null);

  // ── field helpers ──────────────────────────────────────────────────────────
  function updateField(key: keyof FormDataType, value: string) {
    setFormData((prev) => ({ ...prev, [key]: value }));
    setFieldErrors((prev) => { const n = { ...prev }; delete n[key]; return n; });
    setFormError(null);
    setSuccess(null);
  }

  function updateMember(index: number, key: keyof TeamMember, value: string) {
    const updated = [...formData.members];
    updated[index] = { ...updated[index], [key]: value };
    setFormData({ ...formData, members: updated });

    setMemberErrors((prev) => {
      if (!prev[index]) return prev;
      const errs = { ...prev[index] };
      delete errs[key];
      if (!Object.keys(errs).length) {
        const next = { ...prev };
        delete next[index];
        return next;
      }
      return { ...prev, [index]: errs };
    });
  }

  function addMember() {
    if (formData.members.length >= 4) return;
    setFormData((prev) => ({ ...prev, members: [...prev.members, emptyMember()] }));
    setMemberKeys((prev) => [...prev, Date.now()]);
  }

  function removeMember(index: number) {
    setFormData((prev) => ({
      ...prev,
      members: prev.members.filter((_, i) => i !== index),
    }));
    setMemberKeys((prev) => prev.filter((_, i) => i !== index));
    setMemberErrors((prev) => {
      const next: MemberErrors = {};
      Object.entries(prev).forEach(([k, v]) => {
        const n = Number(k);
        if (n !== index) next[n > index ? n - 1 : n] = v;
      });
      return next;
    });
  }

  // ── submit ─────────────────────────────────────────────────────────────────
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormError(null);
    setSuccess(null);

    const { fieldErrors: fe, memberErrors: me, valid } = validateForm(formData);
    setFieldErrors(fe);
    setMemberErrors(me);
    if (!valid) {
      setTimeout(() => errorRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }), 50);
      return;
    }

    try {
      setLoading(true);
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const apiResponse = await response.json().catch(() => null);

      if (!response.ok) {
        const backendError = apiResponse?.error;

        if (backendError?.fieldErrors) {
          const beField: FieldErrors   = {};
          const beMember: MemberErrors = {};

          Object.entries(backendError.fieldErrors as Record<string, string[]>).forEach(([key, msgs]) => {
            const match = key.match(/^members\[(\d+)\]\.(.+)$/);
            if (match) {
              const idx = Number(match[1]);
              beMember[idx] = { ...(beMember[idx] ?? {}), [match[2]]: msgs[0] };
            } else {
              beField[key] = msgs[0];
            }
          });

          setFieldErrors(beField);
          setMemberErrors(beMember);
          setTimeout(() => errorRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }), 50);

        } else if (response.status === 409) {
          setFormError("A team with this email or roll number is already registered.");
        } else if (response.status === 429) {
          setFormError("Too many attempts. Please wait a moment and try again.");
        } else if (typeof backendError === "string") {
          setFormError(backendError);
        } else {
          setFormError("Registration failed. Please try again.");
        }
        return;
      }

      setSuccess(apiResponse?.message ?? "🎉 Team registered! QR ticket sent to the leader's email.");
      setFormData(initialForm);
      setMemberKeys([Date.now()]);
      setFieldErrors({});
      setMemberErrors({});
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

    } catch (err) {
      if (err instanceof TypeError && err.message.toLowerCase().includes("fetch")) {
        setFormError("Network error — check your connection and try again.");
      } else {
        setFormError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  }

  // ── derived ────────────────────────────────────────────────────────────────
  const totalMembers = 1 + formData.members.length;
  const errorCount   =
    Object.keys(fieldErrors).length +
    Object.values(memberErrors).reduce((a, e) => a + Object.keys(e).length, 0);

  return (
    <div className="min-h-screen bg-slate-950 p-4 sm:p-6 text-slate-100 flex items-center justify-center">
      <div className="w-full max-w-2xl">
        <Card className="border-slate-800 bg-slate-900/50 backdrop-blur-sm text-slate-100 shadow-2xl overflow-hidden">

          {/* ── HEADER ── */}
          <CardHeader className="p-0">
            <div className="relative p-6 sm:p-8 bg-gradient-to-br from-indigo-600 via-violet-700 to-fuchsia-600">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" />
              <div className="absolute right-4 top-4 rounded-full bg-white p-1 border-2 border-white/40 shadow-xl">
                <Image src="/iic org.png" alt="ISLEC IIC Council" className="h-12 w-12 md:h-16 md:w-16 rounded-full object-cover" width={100} height={100}/>
              </div>
              <div className="relative space-y-1">
                <p className="text-xs font-semibold tracking-[0.2em] uppercase text-indigo-200/80 mb-2">
                  ISL Engineering College · IIC
                </p>
                <h1 className="text-3xl md:text-4xl font-black tracking-tight text-white drop-shadow-md">
                  Innogrid 2.0 🚀
                </h1>
                <p className="text-indigo-100 font-medium text-sm sm:text-base opacity-90">
                  Build • Showcase • Technology
                </p>
              </div>
              <div className="relative mt-4 inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/20 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                Team size: {totalMembers} / 5
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-6 space-y-6">
            <form ref={formRef} onSubmit={handleSubmit} noValidate className="space-y-6">

              {/* ── GLOBAL ERROR SUMMARY ── */}
              {(errorCount > 0 || formError) && (
                <div ref={errorRef} className="rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3">
                  <p className="text-sm font-semibold text-red-400 flex items-center gap-2">
                    <span>⛔</span>
                    {formError
                      ? formError
                      : `${errorCount} field${errorCount !== 1 ? "s" : ""} need${errorCount === 1 ? "s" : ""} attention before submitting.`}
                  </p>
                </div>
              )}

              {success && (
                <div className="rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-400">
                  {success}
                </div>
              )}

              {/* ── LEADER ── */}
              <SectionHeading icon="👑" title="Team Leader" subtitle="QR ticket will be sent to this email" />

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <StyledLabel>Full Name</StyledLabel>
                  <StyledInput hasError={!!fieldErrors.leaderName} placeholder="e.g. Mohammed Fahad"
                    value={formData.leaderName} onChange={(e) => updateField("leaderName", e.target.value)} />
                  <FieldError msg={fieldErrors.leaderName} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <StyledLabel>Email Address</StyledLabel>
                    <StyledInput hasError={!!fieldErrors.email} type="email" placeholder="leader@example.com"
                      value={formData.email} onChange={(e) => updateField("email", e.target.value)} />
                    <FieldError msg={fieldErrors.email} />
                  </div>
                  <div className="space-y-1.5">
                    <StyledLabel>Phone Number</StyledLabel>
                    <StyledInput hasError={!!fieldErrors.phone} placeholder="10-digit mobile" maxLength={10}
                      value={formData.phone}
                      onChange={(e) => updateField("phone", e.target.value.replace(/\D/g, ""))} />
                    <FieldError msg={fieldErrors.phone} />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <StyledLabel>Roll Number</StyledLabel>
                    <StyledInput hasError={!!fieldErrors.rollno} placeholder="e.g. 22A91A6601"
                      value={formData.rollno}
                      onChange={(e) => updateField("rollno", e.target.value.toUpperCase())} />
                    <FieldError msg={fieldErrors.rollno} />
                  </div>
                  {/* ── COLLEGE ── */}                          {/* ← added */}
                  <div className="space-y-1.5">
                    <StyledLabel>College</StyledLabel>
                    <StyledInput hasError={!!fieldErrors.college} placeholder="e.g. ISL Engineering College"
                      value={formData.college} onChange={(e) => updateField("college", e.target.value)} />
                    <FieldError msg={fieldErrors.college} />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="space-y-1.5">
                    <StyledLabel>Dept</StyledLabel>
                    <Select value={formData.department} onValueChange={(v) => updateField("department", v as string)}>
                      <SelectTrigger className={triggerCls(!!fieldErrors.department)}>
                        <SelectValue placeholder="Dept" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-900 border-slate-700 text-slate-100">
                        {departments.map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                      </SelectContent>
                    </Select>
                    <FieldError msg={fieldErrors.department} />
                  </div>
                  <div className="space-y-1.5">
                    <StyledLabel>Year</StyledLabel>
                    <Select value={formData.year} onValueChange={(v) => updateField("year", v as string)}>
                      <SelectTrigger className={triggerCls(!!fieldErrors.year)}>
                        <SelectValue placeholder="Year" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-900 border-slate-700 text-slate-100">
                        <SelectItem value="1st">1st Year</SelectItem>
                        <SelectItem value="2nd">2nd Year</SelectItem>
                        <SelectItem value="3rd">3rd Year</SelectItem>
                        <SelectItem value="4th">4th Year</SelectItem>
                      </SelectContent>
                    </Select>
                    <FieldError msg={fieldErrors.year} />
                  </div>
                  <div className="space-y-1.5">
                    <StyledLabel>Section</StyledLabel>
                    <Select value={formData.section} onValueChange={(v) => updateField("section", v as string)}>
                      <SelectTrigger className={triggerCls(!!fieldErrors.section)}>
                        <SelectValue placeholder="Sec" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-900 border-slate-700 text-slate-100">
                        {sections.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                      </SelectContent>
                    </Select>
                    <FieldError msg={fieldErrors.section} />
                  </div>
                </div>
              </div>

              {/* ── TEAM DETAILS ── */}
              <SectionHeading icon="🏷️" title="Team Details" />

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <StyledLabel>Team Name</StyledLabel>
                  <StyledInput hasError={!!fieldErrors.teamName} placeholder="e.g. Neural Ninjas"
                    value={formData.teamName} onChange={(e) => updateField("teamName", e.target.value)} />
                  <FieldError msg={fieldErrors.teamName} />
                </div>
                <div className="space-y-1.5">
                  <StyledLabel>Project Title / Domain</StyledLabel>
                  <StyledInput hasError={!!fieldErrors.projectTitle} placeholder="e.g. AI-Powered Smart Campus"
                    value={formData.projectTitle} onChange={(e) => updateField("projectTitle", e.target.value)} />
                  <FieldError msg={fieldErrors.projectTitle} />
                </div>
              </div>

              {/* ── MEMBERS ── */}
              <SectionHeading
                icon="👥"
                title="Team Members"
                subtitle="Partially filled rows will be validated — leave a row blank to skip it."
              />

              <div className="space-y-3">
                {formData.members.map((m, i) => {
                  const me     = memberErrors[i] ?? {};
                  const hasErr = !!Object.keys(me).length;
                  return (
                    <div
                      key={memberKeys[i]}
                      className={[
                        "rounded-xl border p-4 space-y-3",
                        hasErr
                          ? "border-red-500/40 bg-red-500/5"
                          : "border-slate-700/70 bg-slate-800/30",
                      ].join(" ")}
                    >
                      <div className="flex items-center justify-between">
                        <span className={`text-xs font-bold tracking-widest uppercase ${hasErr ? "text-red-400" : "text-indigo-400"}`}>
                          Member {i + 2}{hasErr ? " — incomplete" : ""}
                        </span>
                        {i > 0 && (
                          <button type="button" onClick={() => removeMember(i)}
                            className="text-xs text-red-400 hover:text-red-300 transition-colors font-medium">
                            ✕ Remove
                          </button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="space-y-1.5">
                          <StyledLabel>Full Name</StyledLabel>
                          <StyledInput hasError={!!me.name} placeholder="Member name"
                            value={m.name} onChange={(e) => updateMember(i, "name", e.target.value)} />
                          <FieldError msg={me.name} />
                        </div>
                        <div className="space-y-1.5">
                          <StyledLabel>Roll Number</StyledLabel>
                          <StyledInput hasError={!!me.rollno} placeholder="Roll No"
                            value={m.rollno}
                            onChange={(e) => updateMember(i, "rollno", e.target.value.toUpperCase())} />
                          <FieldError msg={me.rollno} />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1.5">
                          <StyledLabel>Year</StyledLabel>
                          <Select value={m.year} onValueChange={(v) => updateMember(i, "year", v as string)}>
                            <SelectTrigger className={triggerCls(!!me.year)}>
                              <SelectValue placeholder="Year" />
                            </SelectTrigger>
                            <SelectContent className="bg-slate-900 border-slate-700 text-slate-100">
                              <SelectItem value="1st">1st Year</SelectItem>
                              <SelectItem value="2nd">2nd Year</SelectItem>
                              <SelectItem value="3rd">3rd Year</SelectItem>
                              <SelectItem value="4th">4th Year</SelectItem>
                            </SelectContent>
                          </Select>
                          <FieldError msg={me.year} />
                        </div>
                        <div className="space-y-1.5">
                          <StyledLabel>Section</StyledLabel>
                          <Select value={m.section} onValueChange={(v) => updateMember(i, "section", v as string)}>
                            <SelectTrigger className={triggerCls(!!me.section)}>
                              <SelectValue placeholder="Section" />
                            </SelectTrigger>
                            <SelectContent className="bg-slate-900 border-slate-700 text-slate-100">
                              {sections.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                            </SelectContent>
                          </Select>
                          <FieldError msg={me.section} />
                        </div>
                      </div>
                    </div>
                  );
                })}

                {formData.members.length < 4 && (
                  <button type="button" onClick={addMember}
                    className="w-full rounded-xl border border-dashed border-indigo-500/40 bg-indigo-500/5 hover:bg-indigo-500/10 hover:border-indigo-500/60 transition-all py-3 text-sm font-semibold text-indigo-400 hover:text-indigo-300">
                    + Add Member ({formData.members.length}/4)
                  </button>
                )}
              </div>

              {/* ── SUBMIT ── */}
              <Button type="submit" disabled={loading}
                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-6 text-lg transition-all active:scale-95 shadow-lg shadow-indigo-500/25 disabled:opacity-60">
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                    Processing...
                  </span>
                ) : "Register Team →"}
              </Button>

              <p className="text-center text-xs text-slate-600">
                QR ticket will be mailed to the team leader's email address.
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}