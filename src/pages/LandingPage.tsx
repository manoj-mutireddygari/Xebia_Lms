import React, { useEffect, useMemo, useRef, useState, Dispatch, SetStateAction } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  BrainCircuit,
  Building2,
  CalendarDays,
  Check,
  ChevronDown,
  Command,
  FileCheck2,
  GraduationCap,
  Menu,
  Mail,
  MessageSquareText,
  Phone,
  Play,
  Presentation,
  Search,
  Sparkles,
  UsersRound,
  X,
  Linkedin,
  Github,
} from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  Cell,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { SectionHeading } from "../components/SharedComponents";
import {
  adminJourney,
  barData,
  chartData,
  componentInventory,
  dataGridRows,
  faqs,
  features,
  logos,
  motionAudit,

  qaMatrix,
  responsiveAudit,
  screenSequences,
  stats,
  studentJourney,
  testimonials,
  trainerJourney,
} from "../utils/constants";

const xebiaLogo = "/logo-purple.png";

type WatermarkSpec = {
  key: string;
  top: string;
  left: string;
  sizePx: number;
  rotationDeg: number;
  opacity: number;
  blurPx: number;
};

const fixedWatermarkSpecs: WatermarkSpec[] = [
  { key: "fixed-1", top: "10%", left: "9%", sizePx: 160, rotationDeg: 0, opacity: 0.085, blurPx: 0 },
  { key: "fixed-2", top: "16%", left: "92%", sizePx: 250, rotationDeg: 0, opacity: 0.1, blurPx: 0 },
  { key: "fixed-3", top: "50%", left: "10%", sizePx: 300, rotationDeg: 0, opacity: 0.115, blurPx: 0 },
  { key: "fixed-4", top: "62%", left: "84%", sizePx: 190, rotationDeg: 0, opacity: 0.082, blurPx: 0 },
  { key: "fixed-5", top: "92%", left: "36%", sizePx: 230, rotationDeg: 0, opacity: 0.09, blurPx: 0 },
];

function FixedWatermarkLayer(): React.ReactElement {
  return (
    <div className="fixed-watermark-layer" aria-hidden="true">
      {fixedWatermarkSpecs.map((spec) => (
        <span
          key={spec.key}
          className="fixed-watermark-logo"
          style={
            {
              top: spec.top,
              left: spec.left,
              width: `${spec.sizePx}px`,
              opacity: spec.opacity,
              transform: `translate(-50%, -50%) rotate(${spec.rotationDeg}deg)`,
              filter: `blur(${spec.blurPx}px)`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}

gsap.registerPlugin(ScrollTrigger);

export function LandingPage({ navigate }: { navigate: (path: string) => void }) {
  const reduceMotion = useReducedMotion();
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number>(0);
  const [activeStage, setActiveStage] = useState(0);
  const stRef = useRef<ScrollTrigger | undefined | null>(null);

  useEffect(() => {
    if (reduceMotion) return;

    const lenis = new Lenis({ lerp: 0.08, wheelMultiplier: 0.92 });

    lenis.on("scroll", ScrollTrigger.update);

    const updateLenis = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(updateLenis);

    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
    };
  }, [reduceMotion]);

  useEffect(() => {
    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      // Reveal animations
      gsap.utils.toArray<HTMLElement>(".reveal").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 34 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 84%" },
          }
        );
      });

      // Platform Overview animation
      const platformSection = document.querySelector<HTMLElement>(".platform-overview");
      if (!platformSection) return;

      const tl = gsap.timeline({
        defaults: { ease: "power2.out", force3D: true },
        scrollTrigger: {
          trigger: platformSection,
          start: "top top",
          end: "+=300%",
          pin: true,
          scrub: 0.5,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          pinSpacing: true,
          fastScrollEnd: true,
          preventOverlaps: true,
          refreshPriority: 1,
          onUpdate: (self) => {
            const progress = self.progress;
            const stage = Math.floor(progress * totalStages);
            setActiveStage(Math.min(totalStages - 1, stage));
          },
        },
      });

      const previewImages = gsap.utils.toArray<HTMLElement>(".platform-preview-image");
      const stagePanels = gsap.utils.toArray<HTMLElement>(".stage-panel");

      const totalStages = stagePanels.length;
      const stageDur = 1 / totalStages;

      // Student -> Trainer
      tl.to(previewImages[0], { opacity: 0.65, scale: 0.98, y: -30, duration: 0.28, pointerEvents: "none", zIndex: 0 }, stageDur)
        .to(stagePanels[0], { opacity: 0.4, y: -20, duration: 0.28 }, "<")
        .from(previewImages[1], { opacity: 0, y: 40, scale: 0.97, duration: 0.32 }, stageDur)
        .from(stagePanels[1], { opacity: 0, y: 30, duration: 0.32 }, "<");

      // Trainer -> Admin
      tl.to(previewImages[1], { opacity: 0.65, scale: 0.98, y: -30, duration: 0.28, pointerEvents: "none", zIndex: 0 }, stageDur * 2)
        .to(stagePanels[1], { opacity: 0.4, y: -20, duration: 0.28 }, "<")
        .from(previewImages[2], { opacity: 0, y: 40, scale: 0.97, duration: 0.32 }, stageDur * 2)
        .from(stagePanels[2], { opacity: 0, y: 30, duration: 0.32 }, "<");

      stRef.current = tl.scrollTrigger;
    });

    return () => {
      ctx.revert();
    };
  }, [reduceMotion]);

  return (
    <div className="landing">
      <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} navigate={navigate} />
      <FixedWatermarkLayer />
      <Hero onStart={() => navigate("/student/login")} />

      <RoleOverview
        onStudentLogin={() => navigate("/student/login")}
        onTrainerLogin={() => navigate("/trainer/login")}
        onAdminLogin={() => navigate("/admin/login")}
        activeStage={activeStage}
        setActiveStage={setActiveStage}
        reduceMotion={reduceMotion || false}
      />
      <Journey id="student-journey" title="Student journey" steps={studentJourney} reduceMotion={reduceMotion || false} />
      <Journey id="trainer-journey" title="Trainer journey" steps={trainerJourney} compact reduceMotion={reduceMotion || false} />
      <Journey id="admin-journey" title="Admin journey" steps={adminJourney} compact reduceMotion={reduceMotion || false} />
      <FeatureShowcase />
      <AIAssistant />
      <Testimonials />

      <FAQ openFaq={openFaq} setOpenFaq={setOpenFaq} />
      <ContactSection />
      <CTA onStart={() => navigate("/student/login")} />
      <Footer />
    </div>
  );
}

function Navbar({
  menuOpen,
  setMenuOpen,
  navigate,
}: {
  menuOpen: boolean;
  setMenuOpen: (value: boolean) => void;
  navigate: (path: string) => void;
}) {
  const links = ["Home", "Solutions", "Features", "Contact"];
  const reduceMotion = useReducedMotion();
  const [portalOpen, setPortalOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("Home");
  const [scrolled, setScrolled] = useState(false);
  const [bubbleStyle, setBubbleStyle] = useState({ width: 0, left: 0, opacity: 0 });
  const navRef = useRef<HTMLElement | null>(null);
  const portalWrapRef = useRef<HTMLDivElement | null>(null);
  const portalMenuRef = useRef<HTMLDivElement | null>(null);
  const portalButtonRef = useRef<HTMLButtonElement | null>(null);
  const portalRowRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const clickedLinkRef = useRef<string | null>(null);
  const clickTimeoutRef = useRef<number | null>(null);

  const handleLinkClick = (link: string) => {
    setActiveLink(link);
    clickedLinkRef.current = link;
    if (clickTimeoutRef.current) {
      window.clearTimeout(clickTimeoutRef.current);
    }
    clickTimeoutRef.current = window.setTimeout(() => {
      clickedLinkRef.current = null;
    }, 1000);
  };

  const portalItems = [
    {
      title: "Student Portal",
      subtitle: "Access your courses, assignments and academic progress.",
      path: "/student/login",
      icon: <GraduationCap size={18} />,
    },
    {
      title: "Trainer Portal",
      subtitle: "Manage teaching, courses and student evaluations.",
      path: "/trainer/login",
      icon: <Presentation size={18} />,
    },
    {
      title: "Administrator Portal",
      subtitle: "Manage institution operations, users and reports.",
      path: "/admin/login",
      icon: <Building2 size={18} />,
    },
  ];

  const selectPortal = (path: string) => {
    setPortalOpen(false);
    setMenuOpen(false);
    navigate(path);
  };

  const moveNavBubble = (target: HTMLElement | null, visible = true) => {
    const nav = navRef.current;
    if (!nav || !target) return;
    const navRect = nav.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();
    setBubbleStyle({
      width: targetRect.width + 20,
      left: targetRect.left - navRect.left - 10,
      opacity: visible ? 1 : 0.78,
    });
  };

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    const active = nav.querySelector<HTMLElement>(`[data-nav-link="${activeLink}"]`);
    moveNavBubble(active);
    const onResize = () => moveNavBubble(active);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [activeLink]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sectionIds = ["top", "solutions", "features", "contact"];
    const linkMap: Record<string, string> = {
      top: "Home",
      solutions: "Solutions",
      features: "Features",
      contact: "Contact",
    };

    const handleScrollSpy = () => {
      if (clickedLinkRef.current !== null) return;

      const scrollPos = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      if (scrollPos + windowHeight >= documentHeight - 50) {
        setActiveLink("Contact");
        return;
      }

      const threshold = windowHeight * 0.3;
      let currentSection = "top";

      for (const id of sectionIds) {
        const element = document.getElementById(id);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= threshold) {
            currentSection = id;
          }
        }
      }

      setActiveLink(linkMap[currentSection]);
    };

    window.addEventListener("scroll", handleScrollSpy, { passive: true });
    handleScrollSpy();

    return () => {
      window.removeEventListener("scroll", handleScrollSpy);
      if (clickTimeoutRef.current) {
        window.clearTimeout(clickTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const panel = portalMenuRef.current;
    if (!panel) return;

    if (portalOpen) {
      gsap.set(panel, { display: "block", pointerEvents: "auto" });
      if (reduceMotion) {
        gsap.set(panel, { opacity: 1, y: 0 });
      } else {
        gsap.fromTo(
          panel,
          { opacity: 0, y: -6 },
          { opacity: 1, y: 0, duration: 0.2, ease: "power2.out" },
        );
      }
      return;
    }

    if (reduceMotion) {
      gsap.set(panel, { opacity: 0, y: -6, display: "none", pointerEvents: "none" });
      return;
    }

    gsap.to(panel, {
      opacity: 0,
      y: -6,
      duration: 0.18,
      ease: "power2.out",
      pointerEvents: "none",
      onComplete: () => gsap.set(panel, { display: "none" }),
    });
  }, [portalOpen, reduceMotion]);

  useEffect(() => {
    if (!portalOpen) return;

    const onPointerDown = (event: PointerEvent) => {
      if (!portalWrapRef.current?.contains(event.target as Node)) {
        setPortalOpen(false);
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setPortalOpen(false);
        portalButtonRef.current?.focus();
        return;
      }

      if (event.key === "Tab") {
        const focusables = [portalButtonRef.current, ...portalRowRefs.current].filter(Boolean) as HTMLElement[];
        const currentIndex = focusables.indexOf(document.activeElement as HTMLElement);
        if (event.shiftKey && currentIndex <= 0) {
          event.preventDefault();
          focusables[focusables.length - 1]?.focus();
        } else if (!event.shiftKey && currentIndex === focusables.length - 1) {
          event.preventDefault();
          focusables[0]?.focus();
        }
      }

      if (event.key === "ArrowDown" || event.key === "ArrowUp") {
        event.preventDefault();
        const currentIndex = portalRowRefs.current.indexOf(document.activeElement as HTMLButtonElement);
        const nextIndex = event.key === "ArrowDown"
          ? Math.min(portalItems.length - 1, currentIndex + 1)
          : Math.max(0, currentIndex === -1 ? 0 : currentIndex - 1);
        portalRowRefs.current[nextIndex]?.focus();
      }
    };

    document.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [portalOpen, portalItems.length]);

  const animatePortalRow = (row: HTMLButtonElement | null, active: boolean) => {
    if (!row || reduceMotion) return;
    gsap.to(row, { y: active ? -2 : 0, duration: active ? 0.2 : 0.18, ease: "power2.out" });
    gsap.to(row.querySelector(".portal-row-arrow"), { x: active ? 7 : 0, duration: 0.2, ease: "power2.out" });
    gsap.to(row.querySelector(".portal-row-icon"), { scale: active ? 1.04 : 1, duration: 0.2, ease: "power2.out" });
  };

  return (
    <header className={`navbar glass-nav ${scrolled ? "scrolled" : ""}`}>
      <a className="brand" href="#top" aria-label="Xebia LMS home">
        <img className="brand-logo" src={xebiaLogo} alt="" />
        <span>Xebia LMS</span>
      </a>

      <nav className="desktop-nav" aria-label="Main navigation" ref={navRef}>
        <span
          className="nav-glass-bubble"
          style={{
            width: `${bubbleStyle.width}px`,
            transform: `translateX(${bubbleStyle.left}px)`,
            opacity: bubbleStyle.opacity,
          }}
          aria-hidden="true"
        />
        {links.map((link) => (
          <a
            className="nav-link"
            data-nav-link={link}
            href={link === "Home" ? "#top" : `#${link.replace(/\s+\d+$/, "").toLowerCase()}`}
            key={link}
            onClick={() => handleLinkClick(link)}
            onMouseEnter={(event) => moveNavBubble(event.currentTarget)}
            onFocus={(event) => moveNavBubble(event.currentTarget)}
            onMouseLeave={() => {
              const active = navRef.current?.querySelector<HTMLElement>(`[data-nav-link="${activeLink}"]`) ?? null;
              moveNavBubble(active);
            }}
          >
            {link}
          </a>
        ))}
      </nav>

      <div
        className="portal-nav-wrap"
        ref={portalWrapRef}
        onMouseEnter={() => setPortalOpen(true)}
        onMouseLeave={() => setPortalOpen(false)}
      >
        <button
          ref={portalButtonRef}
          className={`portal-nav-btn ${portalOpen ? "open" : ""}`}
          onClick={() => setPortalOpen((open) => !open)}
          type="button"
          aria-haspopup="dialog"
          aria-expanded={portalOpen}
          aria-controls="signin-portal-menu"
        >
          Sign In <ChevronDown className="portal-nav-chevron" size={16} />
        </button>
        {portalOpen && (
          <div
            style={{
              position: "absolute",
              top: "100%",
              left: "-50px",
              right: "-50px",
              height: "18px",
              zIndex: 10,
            }}
          />
        )}
        <div
          ref={portalMenuRef}
          id="signin-portal-menu"
          className="portal-mega"
          role="dialog"
          aria-modal="false"
          aria-labelledby="signin-portal-title"
        >
          <div className="portal-mega-inner">
            <div className="portal-mega-head">
              <h2 id="signin-portal-title" className="portal-mega-title">Sign in to Xebia LMS</h2>
              <p className="portal-mega-kicker">Access your dedicated portal.</p>
            </div>
            <div className="portal-rows" role="menu" aria-label="Portal sign in options">
              {portalItems.map((item, index) => (
                <button
                  ref={(node) => {
                    portalRowRefs.current[index] = node;
                  }}
                  className="portal-row"
                  key={item.title}
                  type="button"
                  role="menuitem"
                  onClick={() => selectPortal(item.path)}
                  onMouseEnter={(event) => animatePortalRow(event.currentTarget, true)}
                  onMouseLeave={(event) => animatePortalRow(event.currentTarget, false)}
                  onFocus={(event) => animatePortalRow(event.currentTarget, true)}
                  onBlur={(event) => animatePortalRow(event.currentTarget, false)}
                >
                  <span className="portal-row-icon" aria-hidden="true">{item.icon}</span>
                  <span className="portal-row-text">
                    <span className="portal-row-title">{item.title}</span>
                    <span className="portal-row-subtitle">{item.subtitle}</span>
                  </span>
                  <ArrowRight className="portal-row-arrow" size={17} aria-hidden="true" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="nav-actions">
        <button
          className="menu-btn"
          aria-label="Toggle menu"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {menuOpen ? (
        <nav className="mobile-menu glass-nav" aria-label="Mobile navigation">
          {links.map((link) => (
            <a
              href={link === "Home" ? "#top" : `#${link.replace(/\s+\d+$/, "").toLowerCase()}`}
              key={link}
              onClick={() => setMenuOpen(false)}
            >
              {link}
            </a>
          ))}
          <div className="mobile-signin-section" aria-label="Sign in portals">
            <p>Sign in to Xebia LMS</p>
            {portalItems.map((item) => (
              <button
                className="portal-mobile-item"
                key={item.title}
                onClick={() => selectPortal(item.path)}
                type="button"
              >
                <span className="portal-row-icon" aria-hidden="true">{item.icon}</span>
                <span>
                  <strong>{item.title}</strong>
                  <small>{item.subtitle}</small>
                </span>
                <ArrowRight size={16} aria-hidden="true" />
              </button>
            ))}
          </div>
        </nav>
      ) : null}
    </header>
  );
}


type WorkspaceRole = "student" | "trainer" | "admin";

type WorkspaceCardDef = {
  role: WorkspaceRole;
  title: string;
  description: string;
  icon: React.ReactNode;
};

const workspaceCards: WorkspaceCardDef[] = [
  {
    role: "student",
    title: "Student Workspace",
    description: "Access courses, assignments, attendance and academic progress.",
    icon: "🎓",
  },
  {
    role: "trainer",
    title: "Trainer Workspace",
    description: "Manage courses, teaching, evaluations and analytics.",
    icon: "👨‍🏫",
  },
  {
    role: "admin",
    title: "Administrator Workspace",
    description: "Manage institution, faculty, reports and finance.",
    icon: "🏢",
  },
];

function WorkspaceLaunchOverlay({
  open,
  onClose,
  onSelect,
}: {
  open: boolean;
  onClose: () => void;
  onSelect: (role: WorkspaceRole) => void;
}) {
  const reduceMotion = useReducedMotion();
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const logoRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const lastFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;
    lastFocusRef.current = document.activeElement as HTMLElement | null;
    setActiveIndex(0);

    const previouslyOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.body.classList.add("workspace-lock");


    const overlayEl = overlayRef.current;
    if (!overlayEl) return;

    const focusablesSelector = "button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])";
    const focusables = Array.from(overlayEl.querySelectorAll<HTMLElement>(focusablesSelector)).filter((el: HTMLElement) => !el.hasAttribute("disabled"));

    const focusFirst = () => {
      const btn = cardRefs.current[0];
      (btn ?? focusables[0] ?? overlayEl).focus?.();
    };

    window.setTimeout(focusFirst, 0);

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }

      const max = workspaceCards.length - 1;
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        const next = Math.min(max, activeIndex + 1);
        setActiveIndex(next);
        cardRefs.current[next]?.focus();
        return;
      }
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        const prev = Math.max(0, activeIndex - 1);
        setActiveIndex(prev);
        cardRefs.current[prev]?.focus();
        return;
      }
      if (e.key === "Enter") {
        e.preventDefault();
        const role = workspaceCards[activeIndex]?.role;
        if (role) onSelect(role);
        return;
      }

      if (e.key === "Tab") {
        const current = document.activeElement as HTMLElement | null;
        if (!current) return;
        const idx = focusables.indexOf(current);
        if (e.shiftKey) {
          if (idx <= 0) {
            e.preventDefault();
            (focusables[focusables.length - 1] ?? current).focus();
          }
        } else {
          if (idx === focusables.length - 1) {
            e.preventDefault();
            (focusables[0] ?? current).focus();
          }
        }
      }
    };

    window.addEventListener("keydown", onKeyDown);

    const ctx = gsap.context(() => {
      const overlay = overlayRef.current;
      const landing = document.querySelector<HTMLElement>(".landing");
      if (!overlay || !landing) return;

      gsap.set(overlay, { opacity: 0, pointerEvents: "none" });
      gsap.set(logoRef.current, { scale: 0.86, opacity: 0, filter: "blur(14px)" });
      gsap.set(".workspace-card", { opacity: 0, y: 26, transformPerspective: 800, rotateX: 6 });

      const circles = gsap.utils.toArray<HTMLElement>(".workspace-glow-circle");
      circles.forEach((c, i) => {
        gsap.set(c, { x: (i % 2 ? 1 : -1) * 30, y: i % 2 ? 18 : -12 });
      });

      if (reduceMotion) {
        gsap.set(overlay, { opacity: 1, pointerEvents: "auto" });
        gsap.set(logoRef.current, { scale: 1, opacity: 1, filter: "blur(0px)" });
        gsap.set(".workspace-card", { opacity: 1, y: 0, rotateX: 0 });
        return;
      }

      // 1) Freeze landing
      gsap.set(landing, { filter: "brightness(0.96)", transform: "translateZ(0)" });


      // 2) backdrop blur transition
      gsap.set(overlay, { pointerEvents: "auto" });
      gsap.to(overlay.querySelector<HTMLElement>(".workspace-overlay__backdrop"), {
        backdropFilter: "blur(28px) saturate(1.14)",
        duration: 0.4,
        ease: "power4.out",
      });

      // 4) glass layer fade in
      gsap.set(overlay.querySelector<HTMLElement>(".workspace-overlay__glass"), { opacity: 0 });
      gsap.to(overlay.querySelector<HTMLElement>(".workspace-overlay__glass"), {
        opacity: 1,
        duration: 0.32,
        ease: "power4.out",
      });

      // 5) logo reveal into center
      gsap.to(logoRef.current, {
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
        duration: 0.55,
        ease: "power4.out",
        delay: 0.06,
      });

      // 6 & 7) cards stagger + gentle springy float
      gsap.to(
        ".workspace-card",
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          stagger: 0.08,
          duration: 0.65,
          ease: "power4.out",
          delay: 0.28,
        },
      );

      // float circles very subtle
      circles.forEach((c, i) => {
        gsap.to(c, {
          y: i % 2 === 0 ? -16 : 16,
          x: i % 2 === 0 ? 18 : -18,
          duration: 4.8 + i * 0.6,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
      });

      // open duration total ~400ms feels synced
      gsap.to(overlay, { opacity: 1, duration: 0.4, ease: "power4.out" });

    });

    return () => {
      ctx.revert();
      document.body.style.overflow = previouslyOverflow;
      document.body.classList.remove("workspace-lock");
      window.removeEventListener("keydown", onKeyDown);
      const last = lastFocusRef.current;
      if (last && typeof last.focus === "function") last.focus();
    };
  }, [open, onClose, onSelect, reduceMotion]);



  useEffect(() => {
    if (!open) return;
    if (reduceMotion) return;
    // Magnetic-ish: set CSS vars based on pointer position
    const el = overlayRef.current;
    if (!el) return;
    const onMove = (e: PointerEvent) => {
      el.style.setProperty("--mx", `${e.clientX}px`);
      el.style.setProperty("--my", `${e.clientY}px`);
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [open, reduceMotion]);

  useEffect(() => {
    if (open) return;
    const overlay = overlayRef.current;
    const landing = document.querySelector<HTMLElement>(".landing");
    if (!overlay || !landing) return;

    if (reduceMotion) {
      gsap.set(overlay, { opacity: 0, pointerEvents: "none" });
      gsap.set(landing, { filter: "none" });
      return;
    }

    gsap.to(overlay.querySelector<HTMLElement>(".workspace-overlay__glass"), {
      opacity: 0,
      duration: 0.25,
      ease: "power4.out",
    });
    gsap.to(overlay, { opacity: 0, duration: 0.3, ease: "power4.out", pointerEvents: "none" });
    gsap.to(logoRef.current, { scale: 0.92, duration: 0.3, ease: "power4.out", opacity: 0 });
    gsap.to(
      ".workspace-card",
      {
        opacity: 0,
        y: 10,
        duration: 0.22,
        ease: "power4.out",
        stagger: 0.05,
      },
    );
    gsap.to(landing, { filter: "brightness(1)", duration: 0.3, ease: "power4.out" });
  }, [open, reduceMotion]);

  if (!open) return null;

  return (
    <div
      ref={overlayRef}
      className="workspace-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Choose your workspace"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="workspace-overlay__backdrop" aria-hidden="true" />
      <div className="workspace-overlay__glass" aria-hidden="true">
        <div className="workspace-mesh" />
        <div className="workspace-noise" />
        <div className="workspace-glow">
          <div className="workspace-glow-circle c1" />
          <div className="workspace-glow-circle c2" />
          <div className="workspace-glow-circle c3" />
        </div>
      </div>

      <div className="workspace-content">
        <div ref={logoRef} className="workspace-logo" aria-hidden="true">
          <img className="brand-logo xl" src={xebiaLogo} alt="" />
          <div className="workspace-logo-title">Xebia LMS</div>
        </div>

        <div className="workspace-kicker">Choose your Workspace</div>
        <div className="workspace-subtitle">Select the workspace assigned to your organization.</div>

        <div className="workspace-cards" role="list">
          {workspaceCards.map((card, idx) => (
            <button
              key={card.role}
              ref={(el) => {
                cardRefs.current[idx] = el;
              }}
              className={`workspace-card ${idx === activeIndex ? "active" : ""}`}
              type="button"
              onClick={() => onSelect(card.role)}
              onFocus={() => setActiveIndex(idx)}
              role="listitem"
            >
              <span className="workspace-card-icon" aria-hidden="true">
                {card.icon}
              </span>
              <span className="workspace-card-body">
                <span className="workspace-card-title">{card.title}</span>
                <span className="workspace-card-desc">{card.description}</span>
              </span>
              <span className="workspace-card-arrow" aria-hidden="true">
                <ArrowRight size={18} />
              </span>
              <span className="workspace-card-focus" />
            </button>
          ))}
        </div>

        <div className="workspace-hint" aria-hidden="true">
          Use <strong>←</strong> <strong>→</strong> to navigate, <strong>Enter</strong> to launch.
        </div>
      </div>
    </div>
  );
}

function Hero({ onStart }: { onStart: () => void }) {
  return (
    <section className="hero" id="top">
      <div className="hero-grid">
        <motion.div className="hero-copy" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <p className="eyebrow">Xebia Enterprise LMS</p>
          <h1>Learn. Grow. Lead.</h1>
          <p className="lead">
            <strong>Enterprise Learning Management System.</strong> Empower your workforce with AI-powered learning, intelligent analytics, and a unified platform for training, upskilling, certifications, and employee development.
          </p>
          <div className="hero-actions">
            <button className="gradient-btn large" onClick={onStart}>Get started <ArrowRight size={18} /></button>
            <button className="outline-btn large"><Play size={18} /> Watch demo</button>
          </div>
          <div className="stats-row" aria-label="Platform statistics">
            {stats.map((stat) => (
              <article key={stat.label}>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </article>
            ))}
          </div>
        </motion.div>
        <motion.div className="hero-visual" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.75, delay: 0.1 }}>
          <LiveDashboard mini />
        </motion.div>
      </div>
      <div className="scroll-indicator" aria-hidden="true"><span /></div>
    </section>
  );
}

function TrustedBy() {
  return (
    <section className="trusted reveal">
      <p className="section-kicker">Trusted learning ecosystem</p>
      <div className="marquee" aria-label="Trusted by organizations">
        <div className="marquee-track">
          {[...logos, ...logos].map((logo, index) => <span key={`${logo}-${index}`}>{logo}</span>)}
        </div>
      </div>
    </section>
  );
}

function RoleOverview({
  onStudentLogin,
  onTrainerLogin,
  onAdminLogin,
  activeStage,
  setActiveStage,
  reduceMotion,
}: {
  onStudentLogin: () => void;
  onTrainerLogin: () => void;
  onAdminLogin: () => void;
  activeStage: number;
  setActiveStage: Dispatch<SetStateAction<number>>;
  reduceMotion: boolean;
}) {

  const sectionRef = useRef<HTMLElement | null>(null);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);
  const imageRefs = useRef<(HTMLImageElement | null)[]>([]);
  const indicatorRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Hold onto instances for cleanup/recreate
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const stRef = useRef<ScrollTrigger | null>(null);
  const ctxRef = useRef<gsap.Context | null>(null);

  const platformStages = useMemo(
    () => [
      {
        key: "student",
        label: "Student experience",
        title: "Student Experience",
        description: "Adaptive learning paths, attendance, assignments, AI recommendations and academic progress.",
        cta: "Open Student Portal",
        image: "/student.jpg",
        onClick: onStudentLogin,
      },
      {
        key: "trainer",
        label: "Trainer experience",
        title: "Trainer Experience",
        description: "Create courses, upload material, evaluate assignments, monitor learner progress and publish results.",
        cta: "Open Trainer Portal",
        image: "/Trainer.png",
        onClick: onTrainerLogin,
      },
      {
        key: "admin",
        label: "Administrator experience",
        title: "Administrator Experience",
        description: "Manage institution users, finance, reports, examinations, library and analytics from one unified workspace.",
        cta: "Open Administrator Portal",
        image: "/admin.png",
        onClick: onAdminLogin,
      },
    ],
    [onAdminLogin, onStudentLogin, onTrainerLogin],
  );

  const renderStacked = () => (
    <section className="section watermark-cover" id="solutions">
      <div className="platform-overview-intro">
        <p className="platform-overview-kicker">Platform overview</p>
        <h2>Three dedicated applications, one shared design system.</h2>
        <p>
          Student, Trainer, and Administrator experiences authenticate separately while sharing one unified design language.
        </p>
      </div>
      <div className="platform-overview-stack">
        {platformStages.map((stage) => (
          <article className="platform-overview-stack-item glass-card" key={stage.key}>
            <div className="platform-overview-stack-copy">
              <span className="platform-stage-label">{stage.label}</span>
              <h3>{stage.title}</h3>
              <p>{stage.description}</p>
              <button className="outline-btn" type="button" onClick={stage.onClick}>
                {stage.cta}
              </button>
            </div>
            <img className="platform-preview-image platform-preview-image-stack" src={stage.image} alt={`${stage.title} preview`} loading="lazy" decoding="async" />
          </article>
        ))}
      </div>
    </section>
  );

  const cleanupAll = () => {
    // Required cleanup contract (DO NOT kill global ScrollTriggers)
    tlRef.current?.kill();
    tlRef.current = null;

    stRef.current?.kill();
    stRef.current = null;

    ctxRef.current?.revert();
    ctxRef.current = null;
  };

  useEffect(() => {
    if (reduceMotion) return;
    if (!sectionRef.current) return;

    const mql = window.matchMedia("(max-width: 1023px)");
    if (mql.matches) return;

    let cancelled = false;

    const preloadImages = async () => {
      const srcs = platformStages.map((s) => s.image);
      await Promise.all(
        srcs.map(
          (src) =>
            new Promise<void>((resolve) => {
              const img = new Image();
              img.onload = () => resolve();
              img.onerror = () => resolve();
              img.src = src;
            }),
        ),
      );
    };

    const build = async () => {
      await preloadImages();
      if (cancelled) return;

      const section = sectionRef.current;
      if (!section) return;

      const contentPanels = contentRefs.current.filter(Boolean) as HTMLDivElement[];
      const previewImages = imageRefs.current.filter(Boolean) as HTMLImageElement[];
      const indicators = indicatorRefs.current.filter(Boolean) as HTMLButtonElement[];

      if (!contentPanels.length || !previewImages.length || !indicators.length) return;

      cleanupAll();

      // Initial stage visible before any ScrollTrigger pinning.
      setActiveStage(0);

      ctxRef.current = gsap.context(() => {
        // Initial non-empty state (no animate-from-empty)
        // IMPORTANT: CSS uses visibility/display via .platform-stage-panel + .platform-preview-image.
        // To avoid cards/images staying invisible, we must drive visibility explicitly via GSAP.
        gsap.set(contentPanels, {
          autoAlpha: 0,
          y: 24,
          pointerEvents: "none",
          force3D: true,
          zIndex: 0,
        });

        gsap.set(previewImages, {
          autoAlpha: 0,
          scale: 1.04,
          filter: "blur(0px)",
          yPercent: 100,
          pointerEvents: "none",
          force3D: true,
          transformOrigin: "center center",
          zIndex: 0,
        });

        gsap.set(indicators, { color: "var(--muted)", scale: 1 });

        // Stage 0 (Student) visible before ScrollTrigger starts
        gsap.set(contentPanels[0], { autoAlpha: 1, y: 0, pointerEvents: "auto", zIndex: 2 });
        gsap.set(previewImages[0], { autoAlpha: 1, yPercent: 0, scale: 1, pointerEvents: "auto", zIndex: 2 });
        gsap.set(indicators[0], { color: "#6C1D5F", scale: 1.05 });

        const tl = gsap.timeline({
          defaults: { ease: "none", force3D: true },
        });

        // 1. Define proportional durations
        const initialPause = 0.1; // Almost immediate start
        const readTime = 0.2; // Time spent holding on a card while scrolling
        const transitionTime = 0.3; // Time spent animating between cards

        // 2. Student -> Trainer (Starts immediately)
        tl.to(
          previewImages[0],
          { autoAlpha: 0, scale: 0.98, y: -30, duration: transitionTime, pointerEvents: "none", zIndex: 0 },
          initialPause
        )
          .to(
            contentPanels[0],
            { autoAlpha: 0, y: -24, duration: transitionTime, pointerEvents: "none", zIndex: 0 },
            "<"
          )
          .to(indicators[0], { color: "var(--muted)", scale: 1, duration: 0.2 }, "<")

          // Bring in Trainer
          .to(
            previewImages[1],
            { autoAlpha: 1, yPercent: 0, scale: 1, duration: transitionTime, pointerEvents: "auto", zIndex: 2 },
            "<0.1"
          )
          .to(contentPanels[1], { autoAlpha: 1, y: 0, duration: transitionTime, pointerEvents: "auto", zIndex: 2 }, "<")
          .to(indicators[1], { color: "#6C1D5F", scale: 1.05, duration: 0.2 }, "<");

        // 3. Trainer -> Admin (Starts after Trainer has had its 'readTime')
        tl.to(
          previewImages[1],
          { autoAlpha: 0, scale: 0.98, y: -30, duration: transitionTime, pointerEvents: "none", zIndex: 0 },
          `+=${readTime}` // Adds the reading pause before animating out
        )
          .to(
            contentPanels[1],
            { autoAlpha: 0, y: -24, duration: transitionTime, pointerEvents: "none", zIndex: 0 },
            "<"
          )
          .to(indicators[1], { color: "var(--muted)", scale: 1, duration: 0.2 }, "<")

          // Bring in Admin
          .to(
            previewImages[2],
            { autoAlpha: 1, yPercent: 0, scale: 1, duration: transitionTime, pointerEvents: "auto", zIndex: 2 },
            "<0.1"
          )
          .to(contentPanels[2], { autoAlpha: 1, y: 0, duration: transitionTime, pointerEvents: "auto", zIndex: 2 }, "<")
          .to(indicators[2], { color: "#6C1D5F", scale: 1.05, duration: 0.2 }, "<");

        // 4. CRITICAL: Add empty space at the end of the timeline
        // This forces the Admin card to stay pinned on screen for the final third of the scroll.
        tl.to({}, { duration: readTime });

        tlRef.current = tl;

        stRef.current = ScrollTrigger.create({
          trigger: section,
          start: "top top",
          end: "+=400%", // exactly 4 viewport heights
          pin: true,
          scrub: true, // fix lenis conflict
          anticipatePin: 1,
          invalidateOnRefresh: true,
          pinSpacing: true,
          animation: tl,
          fastScrollEnd: true,
          preventOverlaps: true,
          refreshPriority: 1,
          onUpdate: (self) => {
            const progress = self.progress;
            let stage = 0;
            if (progress >= 0.67) {
              stage = 2;
            } else if (progress >= 0.19) {
              stage = 1;
            }
            setActiveStage(stage);
          },
        });

        // Required: only after images loaded
        ScrollTrigger.refresh();
      });
    };

    build();

    const onResize = () => {
      cancelled = true;
      cleanupAll();
      cancelled = false;
      build();
    };

    window.addEventListener("resize", onResize);
    return () => {
      cancelled = true;
      window.removeEventListener("resize", onResize);
      cleanupAll();
    };
  }, [reduceMotion]);

  useEffect(() => {
    if (reduceMotion) return;
    if (!stRef.current) return;

    const indicators = indicatorRefs.current.filter(Boolean) as HTMLButtonElement[];
    if (!indicators.length) return;

    gsap.to(indicators, {
      color: "var(--muted)",
      scale: 1,
      duration: 0.16,
      ease: "power2.out",
      overwrite: "auto",
    });

    gsap.to(indicators[activeStage], {
      color: "#6C1D5F",
      scale: 1.05,
      duration: 0.16,
      ease: "power2.out",
      overwrite: "auto",
    });
  }, [activeStage, reduceMotion]);

  if (reduceMotion) return renderStacked();

  // Mobile: Requirement says <1024 disable pinning completely and render stacked cards with no GSAP.
  if (typeof window !== "undefined") {
    const mql = window.matchMedia("(max-width: 1023px)");
    if (mql.matches) return renderStacked();
  }

  return (
    <section ref={sectionRef} className="platform-overview-section watermark-cover" id="solutions">
      <div className="platform-overview-frame">
        <div className="platform-overview-copy">
          <p className="platform-overview-kicker">Platform overview</p>
          <div className="platform-stage-stack">
            {platformStages.map((stage, index) => (
              <div
                key={stage.key}
                ref={(el) => {
                  contentRefs.current[index] = el;
                }}
                className="platform-stage-panel"
                onMouseEnter={() => setActiveStage(index)}
              >
                <span className="platform-stage-label">{stage.label}</span>
                <h2>{stage.title}</h2>
                <p>{stage.description}</p>
                <button className="outline-btn" type="button" onClick={stage.onClick}>
                  {stage.cta}
                </button>
              </div>
            ))}
          </div>

          <div className="platform-indicator" aria-label="Platform experiences">
            {platformStages.map((stage, index) => (
              <button
                key={stage.key}
                ref={(el) => {
                  indicatorRefs.current[index] = el;
                }}
                type="button"
                className={`platform-indicator-item ${index === activeStage ? "is-active" : ""}`}
                aria-current={index === activeStage ? "step" : undefined}
              >
                <span className="platform-indicator-dot" aria-hidden="true" />
                <span>{stage.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="platform-overview-visual">
          <div className="platform-visual-shell">
            {platformStages.map((stage, index) => (
              <img
                key={stage.key}
                ref={(el) => {
                  imageRefs.current[index] = el;
                }}
                className="platform-preview-image"
                src={stage.image}
                alt={`${stage.title} preview`}
                loading="eager"
                decoding="async"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Journey({
  id,
  title,
  steps,
  compact = false,
  reduceMotion,
}: {
  id: string;
  title: string;
  steps: string[];
  compact?: boolean;
  reduceMotion: boolean;
}) {
  return (
    <section id={id} className={`journey reveal ${compact ? "compact" : ""}`}>
      <div className="journey-head">
        <p className="section-kicker">{title}</p>
        <h2>{compact ? "Designed for repeatable operational flow." : "From first access to career momentum."}</h2>
      </div>
      <div className="timeline-strip">
        {steps.map((step, index) => (
          <article key={step}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <strong>{step}</strong>
          </article>
        ))}
      </div>
    </section>
  );
}

function FeatureShowcase() {
  return (
    <section className="section reveal watermark-cover" id="features">
      <SectionHeading kicker="Feature system" title="Everything expected from an LMS, redesigned for Xebia LMS." text="No cluttered portals. No disconnected modules. Every capability is visible, reusable, and ready for real integration later." />
      <div className="feature-grid">
        {features.map((feature) => (
          <article className="feature-card" key={feature.title}>
            <feature.icon size={22} />
            <h3>{feature.title}</h3>
            <p>{feature.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function AIAssistant() {
  return (
    <section className="ai-section reveal watermark-cover">
      <div className="ai-orb"><BrainCircuit size={48} /></div>
      <div>
        <p className="eyebrow">AI assistant</p>
        <h2>Recommendations, reminders, performance insight, and future voice assistance.</h2>
        <p className="lead">The assistant reads learning signals and turns them into helpful next actions for students, trainers, and administrators.</p>
      </div>
      <div className="chat-preview glass-card">
        <p><strong>AI Coach</strong> Your assignment risk is low, but attendance momentum dropped 8% this week.</p>
        <p><strong>Student</strong> What should I do first?</p>
        <p><strong>AI Coach</strong> Start the 18-minute revision plan and confirm Friday lab attendance.</p>
      </div>
    </section>
  );
}

function DashboardPreview() {
  return (
    <section className="section dashboard-section reveal">
      <SectionHeading kicker="Interactive dashboard preview" title="A live mock dashboard, not a static screenshot." text="Hoverable cards, charts, quick actions, alerts, and profile context show how the operating system behaves." />
      <LiveDashboard />
    </section>
  );
}

function LiveDashboard({ mini = false }: { mini?: boolean }) {
  return (
    <div className={`live-dashboard ${mini ? "mini" : ""}`}>
      <div className="dashboard-top">
        <div>
          <p className="section-kicker">Command center</p>
          <h3>Institution pulse</h3>
        </div>
        <button className="command-pill"><Command size={16} /> Actions</button>
      </div>
      <div className="dashboard-metrics">
        <Metric icon={UsersRound} value="48K" label="students" />
        <Metric icon={CalendarDays} value="94%" label="attendance" />
        <Metric icon={FileCheck2} value="12K" label="assignments" />
      </div>
      <div className="dashboard-charts">
        <div className="chart-panel">
          <ResponsiveContainer width="100%" height={mini ? 145 : 220}>
            <AreaChart data={chartData} margin={{ left: -22, right: 10, top: 8, bottom: 0 }}>
              <defs>
                <linearGradient id="learners" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6C1D5F" stopOpacity={0.34} />
                  <stop offset="95%" stopColor="#6C1D5F" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="#DADCEA" vertical={false} />
              <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fill: "#5A5A5A", fontSize: 11 }} />
              <YAxis tickLine={false} axisLine={false} tick={{ fill: "#5A5A5A", fontSize: 11 }} />
              <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #DADCEA" }} />
              <Area type="monotone" dataKey="learners" stroke="#6C1D5F" strokeWidth={3} fill="url(#learners)" />
              <Area type="monotone" dataKey="success" stroke="#84117C" strokeWidth={3} fill="transparent" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        {!mini ? (
          <div className="chart-panel">
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={barData} margin={{ left: -18, right: 12, top: 8, bottom: 0 }}>
                <CartesianGrid stroke="#DADCEA" vertical={false} />
                <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fill: "#5A5A5A", fontSize: 11 }} />
                <YAxis hide domain={[0, 100]} />
                <Tooltip cursor={{ fill: "#D3CCEC" }} contentStyle={{ borderRadius: 12, border: "1px solid #DADCEA" }} />
                <Bar dataKey="value" radius={[10, 10, 0, 0]}>
                  {barData.map((entry) => <Cell key={entry.name} fill={entry.color} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        ) : null}
      </div>
      <div className="quick-actions">
        {["Review attendance", "Publish result", "Send reminder"].map((item) => <button key={item}>{item}</button>)}
      </div>
    </div>
  );
}

function Metric({ icon: Icon, value, label }: { icon: React.ElementType; value: string; label: string }) {
  return (
    <article>
      <Icon size={18} />
      <strong>{value}</strong>
      <span>{label}</span>
    </article>
  );
}

function Analytics() {
  const analytics = [
    ["48K+", "Students"],
    ["6.4K", "Faculty"],
    ["1.8K", "Courses"],
    ["22K", "Certificates"],
    ["92%", "Success rate"],
    ["94%", "Attendance"],
  ];
  return (
    <section className="analytics reveal">
      <SectionHeading kicker="Analytics" title="Numbers that feel useful before they feel impressive." text="Executive metrics, operational charts, and role-level indicators stay readable across every screen size." />
      <div className="analytics-grid">
        {analytics.map(([value, label]) => (
          <article key={label}>
            <strong>{value}</strong>
            <span>{label}</span>
          </article>
        ))}
      </div>
    </section>
  );
}

function ComponentSystemShowcase() {
  return (
    <section className="section component-system reveal">
      <SectionHeading
        kicker="Component system"
        title="Reusable states for a production-ready learning operating system."
        text="Buttons, inputs, data grids, tabs, progress, badges, empty states, loading states, command surfaces, and notifications use the same token family across landing, auth, student, trainer, and admin experiences."
      />
      <div className="component-grid">
        <article className="component-card glass-card">
          <h3>Button states</h3>
          <div className="button-stack">
            <button className="gradient-btn">Primary</button>
            <button className="outline-btn">Outline</button>
            <button className="ghost-btn">Ghost</button>
            <button className="danger-btn">Danger</button>
            <button className="success-btn"><Check size={16} /> Success</button>
          </div>
        </article>
        <article className="component-card glass-card">
          <h3>Input feedback</h3>
          <FloatingInput label="Search command" value="attendance risk students" />
          <div className="field-helper success">Validated with accessible success feedback.</div>
          <div className="field-helper error">Error state preserves text, icon, and contrast.</div>
        </article>
        <article className="component-card glass-card">
          <h3>Tabs and progress</h3>
          <div className="tab-row" role="tablist" aria-label="Component tabs">
            <button className="active" role="tab" aria-selected="true">Overview</button>
            <button role="tab">Data</button>
            <button role="tab">Motion</button>
          </div>
          <div className="progress-ring" aria-label="Reusable progress ring at 82 percent"><span>82%</span></div>
          <div className="badge-row">
            <span className="badge success">Success</span>
            <span className="badge warning">Warning</span>
            <span className="badge error">Error</span>
          </div>
        </article>
        <article className="component-card glass-card command-preview">
          <h3>Command palette</h3>
          <label className="portal-search">
            <Command size={18} />
            <input placeholder="Run action..." />
          </label>
          <button>Open student profile</button>
          <button>Export attendance report</button>
          <button>Generate AI learning brief</button>
        </article>
        <article className="component-card glass-card foundation-preview">
          <h3>Foundation controls</h3>
          <label className="select-field">
            <span>Department selector</span>
            <select defaultValue="ai">
              <option value="ai">AI Systems</option>
              <option value="cloud">Cloud Architecture</option>
              <option value="security">Cybersecurity</option>
            </select>
          </label>
          <div className="control-row">
            <label><input type="checkbox" defaultChecked /> Email alerts</label>
            <label><input type="radio" name="density" defaultChecked /> Comfortable</label>
          </div>
          <div className="switch-row">
            <span>Theme preview</span>
            <button className="switch-control active" aria-label="Theme preview enabled"><span /></button>
          </div>
          <label className="slider-field">
            <span>Learning intensity</span>
            <input type="range" min="0" max="100" defaultValue="72" />
          </label>
          <div className="stepper" aria-label="Stepper">
            <button>-</button><span>24</span><button>+</button>
          </div>
        </article>
        <article className="component-card glass-card ai-component-preview">
          <h3>AI and feedback</h3>
          <button className="floating-ai-preview"><BrainCircuit size={20} /> AI</button>
          <div className="alert-card warning"><strong>Warning dialog</strong><span>Attendance risk threshold approaching.</span></div>
          <div className="alert-card info"><strong>Information dialog</strong><span>New study material version available.</span></div>
          <div className="rating-row" aria-label="Rating 4 out of 5">
            {["1", "2", "3", "4", "5"].map((star, index) => <span className={index < 4 ? "active" : ""} key={star}>★</span>)}
          </div>
          <div className="pagination-row" aria-label="Pagination">
            <button>Prev</button><button className="active">1</button><button>2</button><button>Next</button>
          </div>
        </article>
      </div>
      <div className="inventory-grid">
        {componentInventory.map((group) => (
          <article className="inventory-card glass-card" key={group.title}>
            <div className="inventory-head">
              <h3>{group.title}</h3>
              <span className="badge success">Reusable</span>
            </div>
            <div className="inventory-tags">
              {group.items.map((item) => <span key={item}>{item}</span>)}
            </div>
          </article>
        ))}
      </div>
      <div className="behavior-strip glass-card">
        {["Hover lift", "Focus ring", "Gradient shift", "Click compression", "Validation", "Responsive collapse", "Reduced motion", "Token inheritance"].map((item) => (
          <span key={item}><Check size={15} /> {item}</span>
        ))}
      </div>
      <div className="data-grid glass-card" role="table" aria-label="Reusable xebia data grid">
        <div className="data-grid-toolbar">
          <strong>Xebia data grid</strong>
          <div>
            <button className="outline-btn">Filter</button>
            <button className="gradient-btn">Export</button>
          </div>
        </div>
        <div className="data-grid-header" role="row">
          <span role="columnheader">Name</span>
          <span role="columnheader">Type</span>
          <span role="columnheader">Status</span>
          <span role="columnheader">Signal</span>
          <span role="columnheader">Owner</span>
        </div>
        {dataGridRows.map((row) => (
          <div className="data-grid-row" role="row" key={row.name}>
            <span role="cell">{row.name}</span>
            <span role="cell">{row.role}</span>
            <span role="cell"><span className="badge">{row.status}</span></span>
            <span role="cell">{row.score}</span>
            <span role="cell">{row.owner}</span>
          </div>
        ))}
      </div>
      <div className="state-grid">
        <article className="empty-state glass-card">
          <Sparkles size={28} />
          <h3>Empty state</h3>
          <p>No late submissions in this cohort.</p>
          <button className="outline-btn">Create assignment</button>
        </article>
        <article className="loading-state glass-card">
          <div className="skeleton-line wide" />
          <div className="skeleton-line" />
          <div className="skeleton-card" />
        </article>
        <article className="toast-preview glass-card">
          <Check size={20} />
          <div>
            <strong>Toast success</strong>
            <p>Marks published to 42 learners.</p>
          </div>
        </article>
      </div>
    </section>
  );
}

function FloatingInput({
  label,
  value,
  type = "text",
  placeholder,
  onChange,
  onBlur,
  required = false,
  error = false,
}: {
  label: string;
  value: string;
  type?: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: () => void;
  required?: boolean;
  error?: boolean;
}) {
  return (
    <label className={`floating-input ${error ? "error" : ""}`}>
      <span>{label}</span>
      <input
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        readOnly={!onChange}
        required={required}
      />
      {value && !error && <Check size={16} />}
    </label>
  );
}

function ScreenGenerationEngine() {
  return (
    <section className="section screen-engine reveal">
      <SectionHeading
        kicker="Screen generation engine"
        title="Sequential screen coverage with reusable components and common states."
        text="The prototype records the generated order across landing, authentication, student, trainer, and admin flows so future implementation can map each UI screen to Spring Boot routes without changing the visual system."
      />
      <div className="screen-engine-grid">
        {screenSequences.map((group) => (
          <article className="screen-group glass-card" key={group.title}>
            <div className="screen-group-head">
              <h3>{group.title}</h3>
              <span className="badge success">{group.screens.length} screens</span>
            </div>
            <ol>
              {group.screens.map((screen) => <li key={screen}>{screen}</li>)}
            </ol>
          </article>
        ))}
      </div>
      <div className="common-state-row">
        {["Loading", "Skeleton", "Empty", "No results", "Offline", "Network error", "Success", "Error"].map((state) => (
          <span className="badge" key={state}>{state}</span>
        ))}
      </div>
    </section>
  );
}

function MotionResponsiveQA() {
  return (
    <section className="section motion-qa reveal">
      <SectionHeading
        kicker="Motion, responsive, QA"
        title="Purposeful motion, adaptive layouts, and final validation in one system."
        text="The final execution layer documents animation purpose, breakpoint behavior, and QA gates so the prototype can be reviewed as a production-ready xebia UI system."
      />
      <div className="motion-grid">
        {motionAudit.map((item) => (
          <article className="motion-card glass-card" key={item.title}>
            <span className="motion-pulse" />
            <div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
              <span className="badge success">{item.status}</span>
            </div>
          </article>
        ))}
      </div>
      <div className="responsive-ladder glass-card">
        <div className="responsive-line" aria-hidden="true" />
        {responsiveAudit.map((item) => (
          <article key={item.label}>
            <strong>{item.size}</strong>
            <h3>{item.label}</h3>
            <p>{item.text}</p>
          </article>
        ))}
      </div>
      <div className="qa-matrix glass-card">
        <div>
          <p className="eyebrow">Design audit</p>
          <h3>Final approval gates</h3>
        </div>
        <div className="qa-checks">
          {qaMatrix.map((item) => (
            <span key={item}><Check size={15} /> {item}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="section reveal" id="resources">
      <SectionHeading kicker="Testimonials" title="Calm for learners. Control for institutions." text="Professional placeholder reviews from the roles this platform is designed to support." />
      <div className="testimonial-grid">
        {testimonials.map((item) => (
          <article className="glass-card testimonial" key={item.name}>
            <div className="avatar">{item.name.charAt(0)}</div>
            <p>{item.quote}</p>
            <strong>{item.name}</strong>
            <span>{item.role}</span>
          </article>
        ))}
      </div>
    </section>
  );
}

function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    code: "+91",
    phone: "",
    role: "",
    message: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateField = (name: string, value: string) => {
    let error = "";
    if (name === "name") {
      if (!value.trim()) {
        error = "Name is required.";
      } else if (value.trim().length < 2) {
        error = "Name must be at least 2 characters.";
      } else if (!/^[A-Za-z\s]+$/.test(value)) {
        error = "Name can only contain letters and spaces.";
      }
    } else if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.com$/;
      if (!value) {
        error = "Email is required.";
      } else if (!emailRegex.test(value)) {
        error = "Email must contain @ and end with .com";
      }
    } else if (name === "phone") {
      if (!value) {
        error = "Phone number is required.";
      } else if (!/^[0-9]+$/.test(value)) {
        error = "Phone number must contain only numbers (no letters/special characters).";
      } else if (value.length !== 10) {
        error = "Phone number must be exactly 10 digits.";
      }
    } else if (name === "role") {
      if (!value) {
        error = "Please select your role.";
      }
    } else if (name === "message") {
      const words = value.trim().split(/\s+/).filter(w => w.length > 0);
      if (!value.trim()) {
        error = "Message is required.";
      } else if (words.length < 3) {
        error = "Message must be at least 3 words.";
      }
    }
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => {
      const updated = { ...prev, [field]: value };
      if (errors[field as keyof typeof errors]) {
        validateField(field, value);
      }
      return updated;
    });
  };

  const handleBlur = (field: string) => {
    validateField(field, formData[field as keyof typeof formData]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = {
      name: "",
      email: "",
      phone: "",
      role: "",
      message: ""
    };
    let isValid = true;

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required.";
      isValid = false;
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters.";
      isValid = false;
    } else if (!/^[A-Za-z\s]+$/.test(formData.name)) {
      newErrors.name = "Name can only contain letters and spaces.";
      isValid = false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.com$/;
    if (!formData.email) {
      newErrors.email = "Email is required.";
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Email must contain @ and end with .com";
      isValid = false;
    }

    // Phone validation
    if (!formData.phone) {
      newErrors.phone = "Phone number is required.";
      isValid = false;
    } else if (!/^[0-9]+$/.test(formData.phone)) {
      newErrors.phone = "Phone number must contain only numbers (no letters/special characters).";
      isValid = false;
    } else if (formData.phone.length !== 10) {
      newErrors.phone = "Phone number must be exactly 10 digits.";
      isValid = false;
    }

    // Role validation
    if (!formData.role) {
      newErrors.role = "Please select your role.";
      isValid = false;
    }

    // Message validation (Three words checking)
    const words = formData.message.trim().split(/\s+/).filter(w => w.length > 0);
    if (!formData.message.trim()) {
      newErrors.message = "Message is required.";
      isValid = false;
    } else if (words.length < 3) {
      newErrors.message = "Message must be at least 3 words.";
      isValid = false;
    }

    setErrors(newErrors);

    if (isValid) {
      setIsSubmitted(true);
    }
  };

  return (
    <section className="section contact-section reveal watermark-cover" id="contact">
      <SectionHeading kicker="Contact" title="A premium contact surface for xebia learning teams." text="This is a prototype contact screen. Fill in the fields below to submit your inquiry." />
      <div className="contact-grid">
        {isSubmitted ? (
          <div className="contact-form glass-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', gap: '20px', minHeight: '380px' }}>
            <div className="icon-shell" style={{ background: 'rgba(1, 172, 159, 0.1)', color: 'var(--emerald)', width: '64px', height: '64px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Check size={32} />
            </div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Message Sent!</h3>
            <p style={{ color: 'var(--muted)', maxWidth: '320px' }}>
              Thank you, <strong>{formData.name}</strong>. Your inquiry has been received. Our team will contact you at <strong>{formData.email}</strong> or <strong>{formData.code} {formData.phone}</strong> soon.
            </p>
            <button
              className="outline-btn"
              type="button"
              onClick={() => {
                setIsSubmitted(false);
                setFormData({
                  name: "",
                  email: "",
                  code: "+91",
                  phone: "",
                  role: "",
                  message: "",
                });
              }}
              style={{ marginTop: '12px' }}
            >
              Send another message
            </button>
          </div>
        ) : (
          <form className="contact-form glass-card" onSubmit={handleSubmit} noValidate>
            <div className="two-col">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <FloatingInput
                  label="NAME"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  onBlur={() => handleBlur("name")}
                  placeholder="Your name"
                  error={!!errors.name}
                />
                {errors.name && <div className="form-error-message">{errors.name}</div>}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <FloatingInput
                  label="EMAIL"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  onBlur={() => handleBlur("email")}
                  placeholder="yourname@email.com"
                  error={!!errors.email}
                />
                {errors.email && <div className="form-error-message">{errors.email}</div>}
              </div>
            </div>
            <div className="three-col">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label className={`floating-input ${errors.phone ? "error" : ""}`}>
                  <span>CODE</span>
                  <div className="select-wrapper" style={{ gridColumn: '1 / -1' }}>
                    <select
                      value={formData.code}
                      onChange={(e) => handleInputChange("code", e.target.value)}
                      required
                    >
                      <option value="+91">🇮🇳 +91</option>
                      <option value="+1">🇺🇸 +1</option>
                      <option value="+44">🇬🇧 +44</option>
                      <option value="+61">🇦🇺 +61</option>
                      <option value="+81">🇯🇵 +81</option>
                      <option value="+49">🇩🇪 +49</option>
                      <option value="+33">🇫🇷 +33</option>
                      <option value="+65">🇸🇬 +65</option>
                    </select>
                    <ChevronDown className="select-arrow" size={16} />
                  </div>
                </label>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <FloatingInput
                  label="PHONE"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  onBlur={() => handleBlur("phone")}
                  placeholder="10-digit phone number"
                  error={!!errors.phone}
                />
                {errors.phone && <div className="form-error-message">{errors.phone}</div>}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label className={`floating-input ${errors.role ? "error" : ""}`}>
                  <span>I AM A</span>
                  <div className="select-wrapper" style={{ gridColumn: '1 / -1' }}>
                    <select
                      value={formData.role}
                      onChange={(e) => handleInputChange("role", e.target.value)}
                      onBlur={() => handleBlur("role")}
                      required
                    >
                      <option value="" disabled>Select</option>
                      <option value="Student">Student</option>
                      <option value="Trainer">Trainer</option>
                      <option value="Administrator">Administrator</option>
                      <option value="Other">Other</option>
                    </select>
                    <ChevronDown className="select-arrow" size={16} />
                  </div>
                </label>
                {errors.role && <div className="form-error-message">{errors.role}</div>}
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <label className={`textarea-field ${errors.message ? "error" : ""}`}>
                <span>MESSAGE</span>
                <textarea
                  value={formData.message}
                  onChange={(e) => handleInputChange("message", e.target.value)}
                  onBlur={() => handleBlur("message")}
                  placeholder="Tell me about the role, project, or idea you'd like to discuss..."
                  required
                />
              </label>
              {errors.message && <div className="form-error-message">{errors.message}</div>}
            </div>
            <div className="contact-form-footer">
              <button className="gradient-btn submit-btn" type="submit">Submit</button>
            </div>
          </form>
        )}
        <aside className="contact-panel glass-card">
          <div className="icon-shell"><MessageSquareText size={24} /></div>
          <h3>Xebia response path</h3>
          <p>Product consultation, implementation planning, accessibility review, and future integration readiness in one guided conversation.</p>
          <div className="contact-list">
            <span>hello@xebialms.example</span>
            <span>+1 000 000 0000</span>
            <span>Global xebia support</span>
          </div>
        </aside>
      </div>
    </section>
  );
}



function FAQ({ openFaq, setOpenFaq }: { openFaq: number; setOpenFaq: (value: number) => void }) {
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => faqs.filter(([q]) => q.toLowerCase().includes(query.toLowerCase())), [query]);
  return (
    <section className="section faq reveal watermark-cover" id="about">
      <SectionHeading kicker="FAQ" title="Clear answers for common LMS decisions." text="Search and expand questions without leaving the page." />
      <label className="faq-search">
        <Search size={18} />
        <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search admissions, payments, certificates..." />
      </label>
      <div className="faq-list">
        {filtered.map(([question, answer], index) => (
          <article className="faq-item" key={question}>
            <button onClick={() => setOpenFaq(index)} aria-expanded={openFaq === index}>
              <span>{question}</span>
              <ChevronDown size={18} />
            </button>
            {openFaq === index ? <p>{answer}</p> : null}
          </article>
        ))}
      </div>
    </section>
  );
}

function CTA({ onStart }: { onStart: () => void }) {
  return (
    <section className="cta reveal watermark-cover" id="contact">
      <div>
        <p className="eyebrow">Ready to transform your learning experience?</p>
        <h2>Join thousands of organizations empowering their workforce with Xebia Enterprise LMS.</h2>
      </div>
      <div className="hero-actions">
        <button className="gradient-btn large" onClick={onStart}>Get Started Now <ArrowRight size={18} /></button>
      </div>
    </section>
  );
}

function Footer() {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const footerLinks = {
    Product: ["Features", "Pricing", "Integrations", "API"],
    Solutions: ["For Teams", "For Enterprise", "For Startups"],
    Resources: ["Blog", "Case Studies", "Help Center"],
    Company: ["About Us", "Careers", "Contact Us"],
  };

  const toggleSection = (section: string) => {
    setActiveSection((prev) => (prev === section ? null : section));
  };

  return (
    <footer className="footer">
      {/* Decorative watermark circles */}
      <div className="footer-watermark circle-1" aria-hidden="true" />
      <div className="footer-watermark circle-2" aria-hidden="true" />

      <div className="footer-container">
        <div className="footer-grid">
          {/* Brand Column */}
          <div className="footer-brand-col">
            <div className="brand">
              <img className="brand-logo" src={xebiaLogo} alt="Xebia LMS" />
              <span>Xebia LMS</span>
            </div>
            <p className="brand-description">
              Enterprise learning platform designed for modern institutions and enterprise education.
            </p>
          </div>

          {/* Navigation/Link Columns */}
          {Object.entries(footerLinks).map(([title, links]) => {
            const isOpen = activeSection === title;
            return (
              <div key={title} className={`footer-nav-col ${isOpen ? "is-open" : ""}`}>
                <h3 onClick={() => toggleSection(title)}>
                  <span>{title}</span>
                  <ChevronDown className="accordion-chevron" size={16} />
                </h3>
                <ul className="footer-links-list">
                  {links.map((link) => (
                    <li key={link}>
                      <a href="#">{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}

          {/* Contact Column */}
          {(() => {
            const isOpen = activeSection === "Contact";
            return (
              <div className={`footer-nav-col ${isOpen ? "is-open" : ""}`}>
                <h3 onClick={() => toggleSection("Contact")}>
                  <span>Contact</span>
                  <ChevronDown className="accordion-chevron" size={16} />
                </h3>
                <div className="footer-links-list contact-wrapper">
                  <ul className="contact-list">
                    <li>
                      <a href="mailto:contact@xebia.com">
                        <Mail size={16} />
                        <span>Email</span>
                      </a>
                    </li>
                    <li>
                      <a href="tel:+1234567890">
                        <Phone size={16} />
                        <span>Phone</span>
                      </a>
                    </li>
                  </ul>
                  <div className="social-icons">
                    <a href="#" aria-label="LinkedIn">
                      <Linkedin size={20} />
                    </a>
                    <a href="#" aria-label="GitHub">
                      <Github size={20} />
                    </a>
                    <a href="#" aria-label="X">
                      <X size={20} />
                    </a>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>

        <div className="footer-divider" />

        <div className="footer-bottom">
          <div className="footer-bottom-left">
            © 2026 Xebia LMS
          </div>
          <div className="footer-bottom-center">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Security</a>
            <a href="#">Accessibility</a>
          </div>
          <div className="footer-bottom-right">
            Built for Enterprise Learning
          </div>
        </div>
      </div>
    </footer>
  );
}