import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Award,
  BarChart3,
  Bell,
  BookOpenCheck,
  BrainCircuit,
  CalendarDays,
  Check,
  ChevronDown,
  ClipboardCheck,
  Command,
  CreditCard,
  FileCheck2,
  GraduationCap,
  Layers3,
  Library,
  LineChart,
  LockKeyhole,
  Menu,
  MessageSquareText,
  Play,
  Search,
  ShieldCheck,
  Sparkles,
  UsersRound,
  X,
  Zap,
} from "lucide-react";

const xebiaLogo = "/logo-purple.png";

type Role = "student" | "trainer" | "admin";
type AuthStep = "splash" | "login" | "signup" | "forgot" | "otp" | "reset" | "success";

export function AuthExperience({ role, onBack, onComplete }: { role: Role; onBack: () => void; onComplete: () => void }) {
  const [step, setStep] = useState<AuthStep>("splash");

  useEffect(() => {
    if (step !== "splash") return;
    const timer = window.setTimeout(() => setStep("login"), 1200);
    return () => window.clearTimeout(timer);
  }, [step]);

  const roleTitle = role === "student" ? "Student" : role === "trainer" ? "Trainer" : "Administrator";
  const roleWorkspace = role === "student"
    ? "Classes, assignments, progress, and support in one focused workspace."
    : role === "trainer"
      ? "Courses, submissions, attendance, and learner performance in one teaching workspace."
      : "Users, finance, exams, reports, and governance in one executive workspace.";

  if (step === "splash") {
    return (
      <main className="auth-shell splash-screen">
        <div className="auth-mesh" />
        <motion.div className="splash-logo" initial={{ opacity: 0, scale: 0.88, filter: "blur(12px)" }} animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }} transition={{ duration: 0.8 }}>
          <img className="brand-logo xl" src={xebiaLogo} alt="" />
          <h1>{roleTitle} Login</h1>
          <p>Secure access to your Xebia LMS workspace.</p>
          <div className="loading-bar"><span /></div>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="auth-shell auth-split">
      <button className="auth-back" onClick={onBack}>Back to site</button>
      <section className="auth-story">
        <img className="brand-logo" src={xebiaLogo} alt="Xebia Logo" style={{ width: "180px", maxHeight: "80px", marginBottom: "32px", display: "block" }} />
        <p className="eyebrow">Xebia LMS</p>
        <h1>{roleTitle} access stays focused and secure.</h1>
        <p>This entry point opens only the {roleTitle.toLowerCase()} workspace and keeps the experience clean and role-specific.</p>
        <div className="auth-trust-list" aria-label={`${roleTitle} login assurances`}>
          <span><Layers3 size={16} /> Secure role-based access</span>
          <span><GraduationCap size={16} /> Guided {roleTitle.toLowerCase()} workspace</span>
          <span><ShieldCheck size={16} /> {roleWorkspace}</span>
        </div>
      </section>
      <section className="auth-card glass-card">
        {step === "login" ? <LoginCard role={role} setStep={setStep} onComplete={onComplete} /> : null}
        {step === "signup" ? <SignupCard role={role} setStep={setStep} /> : null}
        {step === "forgot" ? <ForgotCard setStep={setStep} /> : null}
        {step === "otp" ? <OtpCard setStep={setStep} /> : null}
        {step === "reset" ? <ResetCard setStep={setStep} /> : null}
        {step === "success" ? <SuccessCard setStep={setStep} /> : null}
      </section>
    </main>
  );
}

function LoginCard({ role, setStep, onComplete }: { role: Role; setStep: (step: AuthStep) => void; onComplete: () => void }) {
  const roleLabel = role === "student" ? "Meera" : role === "trainer" ? "Dr. Kavya" : "Ananya";
  const roleTitle = role === "student" ? "Student" : role === "trainer" ? "Trainer" : "Administrator";
  return (
    <motion.div className="auth-form" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}>
      <p className="eyebrow">{roleTitle} login</p>
      <h2>Secure sign in for your {roleTitle.toLowerCase()} workspace.</h2>
      <FloatingInput label="Email" value={role === "student" ? "meera.student@xebia.edu" : role === "trainer" ? "kavya.trainer@xebia.edu" : "ananya.admin@xebia.edu"} />
      <FloatingInput label="Password" value="password123" type="password" />
      <div className="form-row">
        <label className="check-row"><input type="checkbox" defaultChecked /> Remember me</label>
        <button className="text-link" onClick={() => setStep("forgot")}>Forgot password?</button>
      </div>
      <button className="gradient-btn full" onClick={onComplete}>Login to {roleTitle} Dashboard</button>
      <p className="form-note">New here? <button onClick={() => setStep("signup")}>Create account</button></p>
    </motion.div>
  );
}

function SignupCard({ role, setStep }: { role: Role; setStep: (step: AuthStep) => void }) {
  const roleTitle = role === "student" ? "Student" : role === "trainer" ? "Trainer" : "Administrator";
  return (
    <motion.div className="auth-form" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}>
      <p className="eyebrow">Create account</p>
      <h2>Start with a secure {roleTitle.toLowerCase()} profile.</h2>
      <div className="two-col">
        <FloatingInput label="Full name" value="Meera Srinivas" />
        <FloatingInput label="Mobile" value="+91 98765 43210" />
      </div>
      <FloatingInput label="Email" value={role === "student" ? "meera.student@xebia.edu" : role === "trainer" ? "kavya.trainer@xebia.edu" : "ananya.admin@xebia.edu"} />
      <FloatingInput label="Access type" value={roleTitle} />
      <div className="two-col">
        <FloatingInput label="Password" value="password123" type="password" />
        <FloatingInput label="Confirm" value="password123" type="password" />
      </div>
      <div className="strength progress-76"><span /></div>
      <label className="check-row"><input type="checkbox" defaultChecked /> I agree to secure learning terms</label>
      <button className="gradient-btn full" onClick={() => setStep("login")}>Create account</button>
      <p className="form-note">Already registered? <button onClick={() => setStep("login")}>Login</button></p>
    </motion.div>
  );
}

function ForgotCard({ setStep }: { setStep: (step: AuthStep) => void }) {
  return (
    <motion.div className="auth-form" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}>
      <p className="eyebrow">Reset access</p>
      <h2>Recover your account without friction.</h2>
      <FloatingInput label="Email" value="meera.student@xebia.edu" />
      <button className="gradient-btn full" onClick={() => setStep("otp")}>Continue</button>
      <button className="text-link centered" onClick={() => setStep("login")}>Back to login</button>
    </motion.div>
  );
}

function OtpCard({ setStep }: { setStep: (step: AuthStep) => void }) {
  return (
    <motion.div className="auth-form" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}>
      <p className="eyebrow">OTP verification</p>
      <h2>Enter the secure code.</h2>
      <div className="otp-row">{[ "4", "8", "1", "9", "2", "6" ].map((digit, index) => <input aria-label={`OTP digit ${index + 1}`} value={digit} readOnly key={index} />)}</div>
      <p className="form-note">Resend available in 28s</p>
      <button className="gradient-btn full" onClick={() => setStep("reset")}>Verify</button>
    </motion.div>
  );
}

function ResetCard({ setStep }: { setStep: (step: AuthStep) => void }) {
  return (
    <motion.div className="auth-form" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}>
      <p className="eyebrow">New password</p>
      <h2>Create a stronger credential.</h2>
      <FloatingInput label="New password" value="password123" type="password" />
      <FloatingInput label="Confirm password" value="password123" type="password" />
      <div className="strength progress-88"><span /></div>
      <button className="gradient-btn full" onClick={() => setStep("success")}>Update password</button>
    </motion.div>
  );
}

function SuccessCard({ setStep }: { setStep: (step: AuthStep) => void }) {
  return (
    <motion.div className="auth-form success-state" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}>
      <div className="success-check"><Check size={38} /></div>
      <h2>Password updated.</h2>
      <p>Return to the secure login screen and continue into your dedicated workspace.</p>
      <button className="gradient-btn full" onClick={() => setStep("login")}>Back to login</button>
    </motion.div>
  );
}

function FloatingInput({ label, value, type = "text" }: { label: string; value: string; type?: string }) {
  const [val, setVal] = useState(value);
  useEffect(() => {
    setVal(value);
  }, [value]);
  return (
    <label className="floating-input">
      <span>{label}</span>
      <input type={type} value={val} onChange={(e) => setVal(e.target.value)} />
      {val && <Check size={16} />}
    </label>
  );
}
