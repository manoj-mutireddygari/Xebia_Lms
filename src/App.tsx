import React, { useEffect, useState } from "react";

import { AdminDashboard } from "./pages/AdminDashboard";
import { AdminLogin } from "./pages/AdminLogin";
import { LandingPage } from "./pages/LandingPage";
import { StudentDashboard } from "./pages/StudentDashboard";
import { StudentLogin } from "./pages/StudentLogin";
import { TrainerDashboard } from "./pages/TrainerDashboard";
import { TrainerLogin } from "./pages/TrainerLogin";

type Route =
  | { name: "landing" }
  | { name: "studentLogin" }
  | { name: "trainerLogin" }
  | { name: "adminLogin" }
  | { name: "studentDashboard" }
  | { name: "trainerDashboard" }
  | { name: "adminDashboard" };

function parseRoute(pathname: string): Route {
  const path = pathname.replace(/\/+$/, "") || "/";
  switch (path) {
    case "/":
      return { name: "landing" };
    case "/student/login":
      return { name: "studentLogin" };
    case "/trainer/login":
      return { name: "trainerLogin" };
    case "/admin/login":
      return { name: "adminLogin" };
    case "/student/dashboard":
      return { name: "studentDashboard" };
    case "/trainer/dashboard":
      return { name: "trainerDashboard" };
    case "/admin/dashboard":
      return { name: "adminDashboard" };
    default:
      return { name: "landing" };
  }
}

function navigate(path: string) {
  window.history.pushState({}, "", path);
  window.dispatchEvent(new PopStateEvent("popstate"));
}

export function App() {
  const [route, setRoute] = useState<Route>(() => parseRoute(window.location.pathname));

  useEffect(() => {
    const onPop = () => setRoute(parseRoute(window.location.pathname));
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  if (route.name === "studentLogin") return <StudentLogin navigate={navigate} />;
  if (route.name === "trainerLogin") return <TrainerLogin navigate={navigate} />;
  if (route.name === "adminLogin") return <AdminLogin navigate={navigate} />;
  if (route.name === "studentDashboard") return <StudentDashboard navigate={navigate} />;
  if (route.name === "trainerDashboard") return <TrainerDashboard navigate={navigate} />;
  if (route.name === "adminDashboard") return <AdminDashboard navigate={navigate} />;
  return <LandingPage navigate={navigate} />;
}
