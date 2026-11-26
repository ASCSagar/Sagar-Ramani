"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, ArrowLeft, RefreshCw } from "lucide-react";

import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    // Log sanitized error info for developer diagnostics without leaking to visitor UI
    console.error("Route error boundary caught an exception:", error.message);
  }, [error]);

  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center justify-center px-4 py-24 text-center sm:px-6">
      <div className="relative mb-6 flex size-16 items-center justify-center rounded-2xl border border-destructive/30 bg-destructive/10 text-destructive shadow-sm">
        <AlertTriangle className="size-8" aria-hidden="true" />
      </div>

      <p className="font-mono text-xs tracking-wider text-destructive uppercase">
        Application Error
      </p>
      <h1 className="mt-2 font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
        Something Went Wrong
      </h1>
      <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
        An unexpected error occurred while loading this page. You can try refreshing the section or navigate back to the home page.
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Button
          type="button"
          onClick={() => reset()}
          className="cursor-pointer"
        >
          <RefreshCw className="size-4" aria-hidden="true" />
          <span>Try Again</span>
        </Button>
        <Link
          href="/"
          className={cn(buttonVariants({ variant: "outline" }))}
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          <span>Return Home</span>
        </Link>
      </div>
    </div>
  );
}
