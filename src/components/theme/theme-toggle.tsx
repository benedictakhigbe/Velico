"use client";

import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

const storageKey = "velico-theme";

export function ThemeToggle() {
  function toggleTheme() {
    const nextTheme = document.documentElement.classList.contains("dark") ? "light" : "dark";
    document.documentElement.classList.toggle("dark", nextTheme === "dark");
    window.localStorage.setItem(storageKey, nextTheme);
  }

  return (
    <Button
      variant="secondary"
      className="size-10 p-0"
      onClick={toggleTheme}
      aria-label="Toggle color theme"
      title="Toggle color theme"
    >
      <Moon className="theme-light-icon size-4" />
      <Sun className="theme-dark-icon hidden size-4" />
    </Button>
  );
}
