import type { Metadata } from "next";
import { ExperienceMotion } from "@/components/motion/experience-motion";
import { RouteLoadingIndicator } from "@/components/navigation/route-loading-indicator";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Velico | Run smarter. Grow with clarity.",
    template: "%s | Velico",
  },
  description:
    "AI-powered business operations for Nigerian SMEs: sales, inventory, invoices, analytics, and practical business insight.",
  icons: {
    icon: "/favicon.svg",
    apple: "/app-icon.svg",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className="h-full scroll-smooth antialiased"
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{var t=localStorage.getItem('velico-theme');var d=window.matchMedia('(prefers-color-scheme: dark)').matches;if(t==='dark'||(!t&&d))document.documentElement.classList.add('dark')}catch(e){}",
          }}
        />
      </head>
      <body className="min-h-full bg-background text-foreground">
        <RouteLoadingIndicator />
        <ExperienceMotion />
        {children}
      </body>
    </html>
  );
}
