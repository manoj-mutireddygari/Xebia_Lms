import React from "react";
import { AuthExperience } from "../components/AuthExperience";

export function TrainerLogin({ navigate }: { navigate: (path: string) => void }) {
  return (
    <AuthExperience
      role="trainer"
      onBack={() => navigate("/")}
      onComplete={() => navigate("/trainer/dashboard")}
    />
  );
}
