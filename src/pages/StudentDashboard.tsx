import React from "react";
import { RolePortal } from "../components/RolePortal";

export function StudentDashboard({ navigate }: { navigate: (path: string) => void }) {
  return <RolePortal role="student" onLogout={() => navigate("/")} />;
}
