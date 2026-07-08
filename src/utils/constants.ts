import React from "react";
import {
  Award,
  BarChart3,
  Bell,
  BookOpenCheck,
  BrainCircuit,
  CalendarDays,
  ClipboardCheck,
  CreditCard,
  FileCheck2,
  GraduationCap,
  Layers3,
  Library,
  LineChart,
  LockKeyhole,
  MessageSquareText,
  ShieldCheck,
  Sparkles,
  UsersRound,
} from "lucide-react";

export type Feature = {
  title: string;
  text: string;
  icon: React.ElementType;
};

export type Role = "student" | "trainer" | "admin";
export type AuthStep = "splash" | "login" | "signup" | "forgot" | "otp" | "reset" | "success";

export const logos = ["Xebia", "AWS", "Google Cloud", "Microsoft", "Coursera", "edX", "Stanford Online", "MIT xPRO"];

export const stats = [
  { value: "48K+", label: "students" },
  { value: "1.8K", label: "courses" },
  { value: "320", label: "institutions" },
  { value: "92%", label: "placements" },
  { value: "6.4K", label: "faculty" },
];

export const roleCards = [
  {
    title: "Student experience",
    text: "Adaptive learning paths, smart reminders, attendance clarity, and one calm command center for progress.",
    icon: GraduationCap,
  },
  {
    title: "Trainer experience",
    text: "Create material, evaluate assignments, run cohorts, and understand class momentum without operational drag.",
    icon: BookOpenCheck,
  },
  {
    title: "Admin experience",
    text: "Govern users, courses, finance, reports, certificates, and institutional analytics from one surface.",
    icon: ShieldCheck,
  },
];

export const features: Feature[] = [
  { title: "Attendance", text: "Live patterns, exceptions, and learner nudges.", icon: ClipboardCheck },
  { title: "Assignments", text: "Briefs, submissions, rubric review, and reminders.", icon: FileCheck2 },
  { title: "Results", text: "Outcome clarity across exams, projects, and cohorts.", icon: Award },
  { title: "Timetable", text: "Calendar intelligence for students and faculty.", icon: CalendarDays },
  { title: "Library", text: "Study material, collections, and resource signals.", icon: Library },
  { title: "Fees", text: "Transparent finance views and payment readiness.", icon: CreditCard },
  { title: "Analytics", text: "Institution-level insight with actionable drilldowns.", icon: BarChart3 },
  { title: "AI assistant", text: "Recommendations, coaching, and performance insight.", icon: BrainCircuit },
  { title: "Notifications", text: "Priority-aware alerts across every role.", icon: Bell },
  { title: "Communication", text: "Clean channels for faculty, students, and parents.", icon: MessageSquareText },
  { title: "Certificates", text: "Credential readiness, status, and audit trail.", icon: Award },
  { title: "Role management", text: "Permissioned experiences without clutter.", icon: LockKeyhole },
];

export const studentJourney = ["Register", "Login", "Enroll", "Learn", "Assignments", "Attendance", "Exams", "Results", "Certificates", "Career"];
export const trainerJourney = ["Create course", "Upload material", "Attendance", "Assignments", "Evaluate", "Publish results", "Analytics"];
export const adminJourney = ["Setup", "Users", "Courses", "Finance", "Library", "Exams", "Reports", "Analytics", "Settings"];

export const chartData = [
  { month: "Jan", learners: 42, success: 61 },
  { month: "Feb", learners: 51, success: 67 },
  { month: "Mar", learners: 63, success: 73 },
  { month: "Apr", learners: 76, success: 79 },
  { month: "May", learners: 88, success: 86 },
  { month: "Jun", learners: 96, success: 91 },
];

export const barData = [
  { name: "Attend", value: 94, color: "#6C1D5F" },
  { name: "Assign", value: 88, color: "#84117C" },
  { name: "Exams", value: 82, color: "#4A1E47" },
  { name: "Career", value: 78, color: "#01AC9F" },
];

export const testimonials = [
  { name: "Anika Rao", role: "Student", quote: "The interface makes deadlines, feedback, and progress feel instantly understandable." },
  { name: "David Kim", role: "Trainer", quote: "I can see where a cohort needs help before the week becomes a recovery exercise." },
  { name: "Priya Menon", role: "Institution director", quote: "It feels less like software administration and more like operating a learning institution." },
];



export const faqs = [
  ["Can this support admissions?", "Yes. The prototype includes space for admissions, enrollment, course assignment, and role-based journeys."],
  ["Are payments real?", "No. This is UI/UX only with realistic mock data and no backend, payments, database, or authentication logic."],
  ["Can trainers publish results?", "The trainer journey and feature surfaces are designed for that workflow in a future implementation."],
  ["Does it support certificates?", "Yes. Certificates are represented as a core platform capability with audit-friendly status surfaces."],
  ["Is this responsive?", "Yes. The layout is designed for desktop, laptop, tablet, and mobile breakpoints."],
];

export const studentWidgets = [
  { title: "Attendance", value: "94%", text: "3 classes above safe threshold", icon: ClipboardCheck },
  { title: "Assignments due", value: "04", text: "Next: Cloud security brief", icon: FileCheck2 },
  { title: "Upcoming exams", value: "02", text: "AI Systems on Friday", icon: Award },
  { title: "Learning progress", value: "78%", text: "Data Engineering pathway", icon: LineChart },
];

export const trainerWidgets = [
  { title: "Courses active", value: "06", text: "2 cohorts need content review", icon: BookOpenCheck },
  { title: "Pending reviews", value: "128", text: "Cloud briefs and API rubrics", icon: FileCheck2 },
  { title: "Attendance risk", value: "11", text: "Students require intervention", icon: ClipboardCheck },
  { title: "Performance lift", value: "+18%", text: "Across AI Systems cohort", icon: LineChart },
];

export const adminWidgets = [
  { title: "Total students", value: "48K", text: "Across 12 institutions", icon: UsersRound },
  { title: "Faculty", value: "6.4K", text: "92% workload balanced", icon: GraduationCap },
  { title: "Revenue", value: "₹8.7Cr", text: "Collections this quarter", icon: CreditCard },
  { title: "System health", value: "99.9%", text: "All core services nominal", icon: ShieldCheck },
];

export const timetable = [
  { time: "09:00", subject: "AI Systems", faculty: "Dr. Kavya Iyer", room: "Lab 4" },
  { time: "11:15", subject: "Cloud Architecture", faculty: "Prof. Daniel Shah", room: "Studio B" },
  { time: "14:00", subject: "Secure APIs", faculty: "Meera Nair", room: "Room 302" },
];

export const notifications = [
  { group: "Today", items: ["AI Systems assignment reviewed by Dr. Kavya", "Library return reminder for Clean Architecture", "Fees scholarship adjustment approved"] },
  { group: "Yesterday", items: ["Hall ticket preview generated", "New study material added to Cloud Architecture"] },
  { group: "Earlier", items: ["Certificate pathway unlocked for Secure APIs"] },
];

export const trainerNotifications = [
  { group: "Today", items: ["42 submissions ready for rubric review", "AI Systems session begins at 11:15", "Three learners moved into risk watch"] },
  { group: "Yesterday", items: ["Cloud Architecture content version updated", "Attendance export prepared for cohort B"] },
  { group: "Earlier", items: ["Faculty announcement received from department head"] },
];

export const adminNotifications = [
  { group: "Today", items: ["Finance report ready for July review", "Library fines crossed policy threshold", "New faculty role request awaiting approval"] },
  { group: "Yesterday", items: ["Exam hall tickets generated for 3,240 students", "System backup completed successfully"] },
  { group: "Earlier", items: ["Audit log export generated by Administrator"] },
];

export const subjects = [
  { name: "AI Systems", faculty: "Dr. Kavya Iyer", progress: 82 },
  { name: "Cloud Architecture", faculty: "Prof. Daniel Shah", progress: 74 },
  { name: "Secure APIs", faculty: "Meera Nair", progress: 88 },
  { name: "Product Analytics", faculty: "Arjun Menon", progress: 69 },
];

export const portalChartData = [
  { week: "W1", attendance: 88, marks: 72 },
  { week: "W2", attendance: 91, marks: 76 },
  { week: "W3", attendance: 89, marks: 81 },
  { week: "W4", attendance: 94, marks: 84 },
  { week: "W5", attendance: 96, marks: 89 },
  { week: "W6", attendance: 94, marks: 91 },
];

export const trainerClasses = [
  { time: "10:00", subject: "AI Systems Cohort A", faculty: "42 learners", room: "Studio 2" },
  { time: "13:30", subject: "Secure APIs Review", faculty: "28 submissions", room: "Lab 5" },
  { time: "16:00", subject: "Cloud Architecture Mentoring", faculty: "18 learners", room: "Mentor room" },
];

export const adminTimeline = [
  { time: "09:10", subject: "Institution health review", faculty: "Xebia Global Campus", room: "Executive" },
  { time: "12:00", subject: "Finance reconciliation", faculty: "₹42L pending fees", room: "Finance" },
  { time: "15:45", subject: "Exam governance sync", faculty: "8 departments", room: "Board room" },
];

export const dataGridRows = [
  { name: "Meera Srinivas", role: "Student", status: "Active", score: "94%", owner: "Dr. Kavya" },
  { name: "Cloud Security Brief", role: "Assignment", status: "Review", score: "128", owner: "Prof. Daniel" },
  { name: "Finance Reconciliation", role: "Admin task", status: "Pending", score: "₹42L", owner: "Ananya Rao" },
  { name: "Clean Architecture", role: "Library", status: "Due soon", score: "18 Jul", owner: "Library desk" },
];

export const componentInventory = [
  {
    title: "Foundation",
    items: ["Button", "IconButton", "Input", "Textarea", "Select", "Checkbox", "Switch", "OTPInput", "Avatar", "Badge", "Tooltip", "Progress", "Skeleton", "Toast", "Tabs"],
  },
  {
    title: "Layout",
    items: ["GlassContainer", "PageContainer", "GridSystem", "Sidebar", "Topbar", "BottomNavigation", "DashboardLayout", "AuthLayout", "LandingLayout"],
  },
  {
    title: "Data cards",
    items: ["AnalyticsCard", "AttendanceCard", "AssignmentCard", "CourseCard", "LibraryCard", "FeeCard", "ExamCard", "ProfileCard", "AIWidget"],
  },
  {
    title: "Tables and charts",
    items: ["AdvancedDataGrid", "SortableTable", "FilterableTable", "Pagination", "AreaChart", "BarChart", "RadialChart", "ProgressRing"],
  },
  {
    title: "Forms",
    items: ["LoginForm", "SignupForm", "ForgotPasswordForm", "OTPForm", "ProfileForm", "PaymentForm", "ContactForm", "DynamicForms"],
  },
  {
    title: "Feedback and AI",
    items: ["SuccessDialog", "WarningDialog", "EmptyState", "ErrorState", "OfflineState", "FloatingAIAssistant", "ChatPanel", "SmartSearch"],
  },
];

export const screenSequences = [
  {
    title: "Landing website",
    screens: ["Navigation", "Hero", "Trusted by", "Platform overview", "Student journey", "Trainer journey", "Admin journey", "Feature showcase", "AI assistant", "Dashboard preview", "Analytics", "Testimonials", "Pricing", "FAQ", "Contact", "CTA", "Footer"],
  },
  {
    title: "Authentication",
    screens: ["Splash", "Onboarding 01", "Onboarding 02", "Onboarding 03", "Login", "Sign up", "Forgot password", "OTP verification", "Create password", "Success"],
  },
  {
    title: "Student module",
    screens: ["Dashboard", "Profile", "Edit profile", "Notifications", "Attendance", "Timetable", "Subjects", "Assignments", "Assignment details", "Upload assignment", "Study material", "Results", "Marksheet", "Academic calendar", "Fees", "Payment", "Library", "Books", "Exams", "Hall ticket", "Announcements", "Help desk", "Settings", "Logout"],
  },
  {
    title: "Trainer module",
    screens: ["Dashboard", "Course management", "Course details", "Create course", "Edit course", "Study material", "Assignment management", "Assignment review", "Attendance", "Student performance", "Analytics", "Live sessions", "Calendar", "Announcements", "Messages", "Notifications", "Profile", "Settings", "Logout"],
  },
  {
    title: "Admin module",
    screens: ["Dashboard", "Institution overview", "User management", "Students", "Faculty", "Roles", "Departments", "Courses", "Calendar", "Attendance", "Fees", "Payments", "Library", "Book inventory", "Exams", "Hall tickets", "Results", "Announcements", "Events", "Reports", "Analytics", "Audit logs", "System settings", "Security", "Logout"],
  },
];

export const motionAudit = [
  { title: "Page transitions", text: "Fade, scale, blur, slide, and glass reveal patterns stay between 200ms and 500ms.", status: "Applied" },
  { title: "Scroll system", text: "Lenis smooth scroll, ScrollTrigger section reveals, parallax mesh, and progressive content entry.", status: "Applied" },
  { title: "Micro interactions", text: "Hover lift, glow, compression, input focus, toggle slide, toast reveal, skeleton shimmer, and chart tooltips.", status: "Applied" },
  { title: "Reduced motion", text: "Motion preferences disable long transitions and animations for accessibility.", status: "Protected" },
];

export const responsiveAudit = [
  { size: "390", label: "Mobile", text: "Single column, bottom navigation, stacked cards, large tap targets." },
  { size: "768", label: "Tablet", text: "Adaptive two-column grids and flexible navigation." },
  { size: "1024", label: "Laptop", text: "Sidebar navigation, dashboard widgets, and responsive charts." },
  { size: "1440", label: "Desktop", text: "Floating sidebar, multi-column analytics, and hover interactions." },
  { size: "1920", label: "Ultra-wide", text: "Centered layouts, max-width control, and balanced whitespace." },
];

export const qaMatrix = [
  "Visual consistency",
  "Navigation flow",
  "Keyboard focus",
  "Reduced motion",
  "No overflow",
  "Touch targets",
  "Mock data quality",
  "Glass hierarchy",
  "Component reuse",
  "Performance readiness",
];