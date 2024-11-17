"use client";

export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center">
      <div className="relative h-12 w-12">
        <div className="absolute inset-0 rounded-full border-4 border-white/10" />
        <div className="border-t-primary absolute inset-0 animate-spin rounded-full border-4 border-transparent" />
      </div>
    </div>
  );
}

export function LoadingScreen() {
  return (
    <div className="flex min-h-[50vh] w-full items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <LoadingSpinner />
        <p className="text-foreground/60 text-sm">Loading...</p>
      </div>
    </div>
  );
}
