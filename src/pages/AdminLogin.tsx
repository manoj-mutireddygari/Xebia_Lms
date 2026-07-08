import React from "react";
import { AuthExperience } from "../components/AuthExperience";

export function AdminLogin({ navigate }: { navigate: (path: string) => void }) {
  return (
    <AuthExperience
      role="admin"
      onBack={() => navigate("/")}
      onComplete={() => navigate("/admin/dashboard")}
    />
  );
}
