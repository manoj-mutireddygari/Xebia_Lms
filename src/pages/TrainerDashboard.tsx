import React from "react";
import { RolePortal } from "../components/RolePortal";

export function TrainerDashboard({ navigate }: { navigate: (path: string) => void }) {
  return <RolePortal role="trainer" onLogout={() => navigate("/")} />;
}
