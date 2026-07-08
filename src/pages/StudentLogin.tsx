import React from "react";
import { AuthExperience } from "../components/AuthExperience";

export function StudentLogin({ navigate }: { navigate: (path: string) => void }) {
  return (
    <AuthExperience
      role="student"
      onBack={() => navigate("/")}
      onComplete={() => navigate("/student/dashboard")}
    />
  );
}
