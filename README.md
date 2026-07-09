# 🌟 Xebia LMS 2.0 — Enterprise Capability Platform

<p align="center">
  <a href="https://xebia-lms-seven.vercel.app/">
    <img src="https://img.shields.io/badge/🚀_Live_Demo-Xebia_LMS_2.0-6C1D5F?style=for-the-badge" alt="Live Demo"/>
  </a>
  <a href="https://xebia-lms-seven.vercel.app/">
    <img src="https://img.shields.io/badge/Status-Production_Ready-10B981?style=for-the-badge" alt="Production Ready"/>
  </a>
  <a href="https://xebia-lms-seven.vercel.app/">
    <img src="https://img.shields.io/badge/Platform-Enterprise_LMS-7C3AED?style=for-the-badge" alt="Enterprise LMS"/>
  </a>
</p>

<h2 align="center">🌐 Live Experience</h2>

<p align="center">
  Experience the complete <b>Xebia LMS 2.0</b> platform online.
</p>

<p align="center">
  <a href="https://xebia-lms-seven.vercel.app/">
    <strong>🔗 https://xebia-lms-seven.vercel.app/</strong>
  </a>
</p>

---

> **Xebia LMS 2.0** is a next-generation educational operating system designed for enterprise capability growth. Moving away from traditional, flat course catalogs, this platform acts as a unified learning command center. It empowers learners, trainers, and leaders to analyze readiness, maintain learning momentum, manage capabilities, and identify the next best action.

---

## 📖 Table of Contents
1. [Core Philosophy & Principles](#-core-philosophy--principles)
2. [Key Portals & Role Architecture](#-key-portals--role-architecture)
3. [Visual Style & Design Tokens](#-visual-style--design-tokens)
4. [Motion & Animation System](#-motion--animation-system)
5. [Tech Stack Details](#-tech-stack-details)
6. [Getting Started & Local Run](#-getting-started--local-run)
7. [Project Directory Layout](#-project-directory-layout)
8. [Quality Assurance & Standards](#-quality-assurance--standards)

---

## 🎯 Core Philosophy & Principles

The Xebia LMS 2.0 system is guided by key design and engineering pillars:
* **Premium Restraint**: Visual clarity over decoration. Whitespace is a first-class citizen designed to create user comprehension.
* **Telemetry First**: Dashboards are built as learning cockpits focused on active metrics, capability readiness, momentum, and risk.
* **Component Modularity**: Scalable and future-ready component hierarchy built to transition smoothly to a backend/Spring Boot environment.
* **Accessibility**: Robust support for keyboard navigation, high contrast focus indicators, and reduced-motion preferences.

---

## 👥 Key Portals & Role Architecture

The system features three strictly isolated workspaces. Once logged in, users remain within their designated role context, ensuring a clean, purpose-driven experience.

### 1. 🎓 Student Workspace
Designed as an interactive study environment.
* **Command center dashboard**: Track core metrics like attendance, exam schedule, timetable, and study momentum.
* **Academics & Content**: Structured views of enrolled courses, syllabus details, and grading.
* **Copilot Integration**: Floating AI Study Assistant to get immediate guidance on course materials and schedule actions.

### 2. 🧑‍🏫 Trainer Workspace
Built for high-efficiency instruction and teaching productivity.
* **Productivity-first dashboard**: Summary of active courses, batch attendance, assignment submissions, and trainer performance.
* **Course and Content Management**: Seamless interfaces to organize modules, upload syllabus references, and manage assignments.
* **Student Telemetry**: Real-time batch analytics to track learning velocity and student progress.

### 3. 🛡️ Administrator Workspace
An institution management cockpit for comprehensive operational control.
* **Institutional Overview**: Real-time stats showing active student/faculty enrollments, financial collection status, and system logs.
* **User & Permissions Directory**: Manage roles, student data, and academic metadata.
* **Systems Audit Dashboard**: High-fidelity logs tracking visual QA parameters, system responsiveness metrics, and motion statistics.

---

## 🎨 Visual Style & Design Tokens

The application employs a signature Xebia branding style, utilizing customized light-theme glassmorphism and modern geometric accents.

| Token | Color Value | Purpose |
| :--- | :--- | :--- |
| **Ink** | `#111827` | Primary body typography, deep labels |
| **Graphite** | `#2f3542` | Subtitles, supporting text, descriptive text |
| **Porcelain** | `#f7f8fa` | Core background surface, soft boxes |
| **Mist** | `#e5e7eb` | Subtle borders, separation lines |
| **Xebia Purple** | `#6C1D5F` | Primary brand identifier, core interactive states |
| **Bright Magenta** | `#84117C` | Dynamic accents, highlights, call-to-actions |
| **Teal Intelligence**| `#14b8a6` | Success alerts, completed milestones, AI highlights |
| **Amber Urgency** | `#f59e0b` | Warnings, pending actions, status flags |

---

## 🎬 Motion & Animation System

Animations are purpose-driven and carefully calibrated to communicate user focus and app state:
* **Smooth Page Flow**: Handled via `lenis` to deliver premium inertia-based scrolling on all devices.
* **GSAP ScrollTrigger**: Powering entrance animation triggers, platform role previews, and progress bars as users scroll the page.
* **Framer Motion**: Smooth component-level animations, layout shifts, multi-step authentication cards, and micro-interactions.
* **Reduced Motion**: Fallbacks are integrated directly into Framer Motion and GSAP configurations to ensure users with sensitive visual profiles receive a clean, motion-free experience.

---

## 🛠️ Tech Stack Details

* **Core Framework**: React 19 (Functional Components, Hooks)
* **Build System**: Vite (Fast HMR, optimized assets bundling)
* **Language**: TypeScript (Strongly typed routing, props, and states)
* **Data Visualization**: Recharts (Custom AreaCharts, BarCharts, responsive telemetry displays)
* **Icons Library**: Lucide React
* **Styling**: Vanilla CSS (Using CSS variables, modular class design, and custom keyframes)

---

## ⚙️ Getting Started & Local Run

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed (LTS version recommended).

### 1. Clone the repository
```bash
git clone <repository-url>
cd Lms
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run in Development Mode
Starts the Vite dev server with host resolution:
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:5173`.

### 4. Build for Production
Pre-compiles TypeScript and generates lightweight optimized build bundles:
```bash
npm run build
```
To preview the production build locally:
```bash
npm run preview
```

---

## 📂 Project Directory Layout

```yaml
Lms/
├── public/                 # Static assets (brand logos, images)
├── src/
│   ├── components/         # Shared UI Components
│   │   ├── AuthExperience.tsx     # Multi-step premium login structures
│   │   ├── RolePortal.tsx         # Unified workspaces navigation shell
│   │   └── SharedComponents.tsx   # Reusable headings, alerts, buttons
│   ├── pages/              # Application View Pages
│   │   ├── LandingPage.tsx        # High-fidelity marketing landing experience
│   │   ├── StudentLogin.tsx       # Onboarding & Auth screens for Students
│   │   ├── StudentDashboard.tsx   # Student academic operating workspace
│   │   ├── TrainerLogin.tsx       # Onboarding & Auth screens for Trainers
│   │   ├── TrainerDashboard.tsx   # Trainer management workspace
│   │   ├── AdminLogin.tsx         # Onboarding & Auth screens for Admins
│   │   └── AdminDashboard.tsx     # Admin controls & QA telemetry dashboard
│   ├── utils/
│   │   └── constants.ts           # Mock dataset, journeys, menu configs
│   ├── App.tsx             # Route router and entry renderer
│   ├── main.tsx            # DOM initialization entry
│   └── styles.css          # Core design system and app stylesheets
├── package.json            # Script targets and dependencies manifest
├── tsconfig.json           # TypeScript compilation configuration
└── vite.config.ts          # Vite build and server settings
```

---

## 🔍 Quality Assurance & Standards

The prototype has been designed to meet strict standards before deployment:
* **Responsive Breakpoints**: Validated across mobile (`390px`), tablet (`768px`), laptop (`1024px`), and desktop (`1440px+`).
* **Visual Audit**: Ensuring correct design tokens application, custom glassmorphism layers, and consistent margins.
* **Interactive Fidelity**: Working mock states for modals, sliders, tooltips, and tab controls.
* **Clean Code Guidelines**: Strict separation of concern, proper documentation, and type-safety across all `.ts`/`.tsx` modules.
