# Xebia LMS 2.0 Design Foundation

Xebia LMS 2.0 is an educational operating system for enterprise capability growth. It must not look or behave like a traditional course catalog. The primary experience is a learning command center that helps leaders and learners understand readiness, focus, momentum, risk, and the next best action.

## Principles

- Premium restraint before decoration.
- Consistency overrides novelty.
- Whitespace creates comprehension.
- Motion communicates state and attention.
- Accessibility is a core material, not a pass at the end.
- Every component must be reusable and future-ready for Spring Boot integration.

## Tokens

- Ink: `#111827`
- Graphite: `#2f3542`
- Porcelain: `#f7f8fa`
- Mist: `#e5e7eb`
- Teal intelligence: `#14b8a6`
- Amber urgency: `#f59e0b`
- Lime progress: `#84cc16`
- Rose risk: `#e11d48`

## Layout

Use a responsive enterprise cockpit with a persistent rail, compact top command bar, telemetry panels, timeline surfaces, and work-focused detail panes. Cards use an 8px radius or less. Avoid nested cards, oversized marketing heroes, visible instructional copy, and course-grid-first structures.

## Motion

Use short entrance transitions, hover affordances, progress interpolation, and route-level focus shifts. Respect reduced-motion preferences.

## Landing Experience

The public experience is a world-class enterprise SaaS landing page, not a traditional college website. The section order is glass navbar, hero, trusted-by marquee, platform overview, student journey, trainer journey, admin journey, feature showcase, AI assistant, live dashboard preview, analytics, testimonials, pricing, FAQ, CTA, and footer.

The hero uses a premium two-column composition with bold value messaging and an interactive dashboard mockup. Background effects use soft gradient mesh, grid texture, glass layering, and parallax motion. Motion is implemented with Lenis, GSAP ScrollTrigger reveals, Framer Motion hero entry, hover lift, marquee, and reduced-motion safeguards.

Landing components must remain reusable: role cards, timeline steps, feature cards, metric cards, pricing cards, FAQ items, and dashboard modules all share the same token family.

## Authentication And Student Portal

The authentication experience should feel closer to Apple ID than a traditional login screen. Student, Trainer, and Administrator use separate authentication entry points. Each flow includes splash, onboarding, login, sign up, forgot password, OTP, new password, success, and transition into only that role's dedicated workspace. Forms are UI-only with floating labels, validation indicators, password strength meters, OTP fields, and glass card composition.

The student portal is an educational operating system for students. It uses a floating desktop sidebar, glass top navigation, mobile bottom navigation, search command surface, AI assistant entry point, and reusable widget grid. The home surface includes welcome/profile summary, attendance, timetable, assignments, exams, announcements, quick actions, learning progress, analytics, notifications, library/fees shortcuts, and AI study guidance.

Portal modules are represented as reusable mock UI surfaces for profile, academics, fees, library, examination, communication, and settings. These surfaces intentionally avoid backend, authentication logic, payment processing, file upload, or database behavior.

## Trainer And Admin Portals

The role architecture supports Student, Trainer, and Administrator as isolated applications. Users must never switch roles after login. No role selector, segmented control, toggle, or switch appears in the sidebar, top navigation, profile menu, or settings. Shared tokens, glass surfaces, metrics, panels, charts, module templates, and responsive behavior remain mandatory, but dashboards, navigation menus, routes, and page structures stay role-specific.

The trainer workspace should feel like professional teaching productivity software: dashboard-first, analytics-driven, minimal, and efficient. It includes course management, content management, attendance, assignment review, student analytics, live sessions, communication, trainer profile, and settings.

The administrator workspace should feel like an enterprise institution management dashboard. It includes institution overview, user management, role permissions, academic management, faculty and student management, exams, library, finance, reports, analytics, system settings, and audit logs.

## Component And Motion System

The prototype includes a visible component-system showcase for reusable buttons, inputs, data grid, tabs, badges, progress ring, command palette, empty state, loading skeleton, and toast preview. Components must expose default, hover, focus, active, success, warning, error, and loading patterns where meaningful.

Motion is purpose-driven: GSAP and ScrollTrigger reveal sections, Lenis smooths scroll, Framer Motion handles page/auth transitions, CSS transitions support hover/focus states, and reduced-motion preferences are respected. Loading states use shimmer skeletons instead of blank white screens.

Final QA priorities are spacing consistency, token consistency, glass hierarchy, accessible focus states, readable typography, large touch targets, responsive component grids, realistic mock data, and no backend/business logic.

## Screen Generation Engine

Screens are tracked sequentially across landing, authentication, student, trainer, and administrator flows. Each generated screen should preserve shared navigation, breadcrumbs, global search, quick actions, floating AI entry points, responsive layout, glass hierarchy, mock data, loading/skeleton states, empty states, success states, and error states.

The landing page includes a visible screen-generation registry so future backend route planning can verify coverage without reverse-engineering the prototype.

## Shared Component Architecture

Component architecture follows Foundation > Primitive > Composite > Layout > Feature > Page. Components use PascalCase naming concepts, inherit global design tokens, and should be reused before new variants are created.

The visible component-system section now documents foundation, layout, data-card, table/chart, form, feedback, and AI component families. Behaviors include hover lift, focus rings, gradient shift, click compression, validation feedback, responsive collapse, reduced-motion support, and token inheritance.

Foundation previews include select/dropdown, checkbox, radio, switch, slider, stepper, rating, pagination, alert/banner, and floating AI assistant patterns so the system covers the Part 8 primitive inventory without duplicating page layouts.

## Motion, Responsive, And Final QA

The final layer documents page transitions, scroll system, micro-interactions, loading system, glass levels, chart motion, and reduced-motion support. Desktop pointer devices receive a subtle cursor glow; mobile and coarse-pointer devices do not.

Responsive validation covers mobile 390, tablet 768, laptop 1024, desktop 1440, and ultra-wide 1920 behaviors. The visible QA matrix tracks visual consistency, navigation flow, keyboard focus, reduced motion, overflow, touch targets, realistic mock data, glass hierarchy, component reuse, and performance readiness.
