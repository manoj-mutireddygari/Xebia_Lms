import React from "react";
import { RolePortal } from "../components/RolePortal";

export function AdminDashboard({ navigate }: { navigate: (path: string) => void }) {
  return <RolePortal role="admin" onLogout={() => navigate("/")} />;
}
