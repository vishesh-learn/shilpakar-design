import React from "react";
import { cn } from "@/lib/utils";

/** Base shimmering block. */
export const Skeleton: React.FC<{ className?: string }> = ({ className }) => (
  <div aria-hidden className={cn("animate-pulse rounded-lg bg-muted", className)} />
);

/** Placeholder matching a job/list card: heading lines, chip and meta rows. */
export const SkeletonCard: React.FC<{ className?: string }> = ({ className }) => (
  <div aria-hidden className={cn("bg-card rounded-2xl border border-border shadow-sm p-4 space-y-3", className)}>
    <div className="flex items-start justify-between gap-3">
      <div className="flex-1 space-y-2">
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-3 w-1/3" />
      </div>
      <Skeleton className="h-6 w-20 rounded-full" />
    </div>
    <Skeleton className="h-3 w-3/4" />
    <Skeleton className="h-3 w-1/2" />
  </div>
);

/** A stack of card placeholders for list screens. */
export const SkeletonList: React.FC<{ count?: number; className?: string }> = ({ count = 3, className }) => (
  <div aria-hidden className={cn("space-y-3", className)}>
    {Array.from({ length: count }).map((_, i) => (
      <SkeletonCard key={i} />
    ))}
  </div>
);

/** Placeholder for profile screens: avatar circle + name/detail lines. */
export const SkeletonProfile: React.FC<{ className?: string }> = ({ className }) => (
  <div aria-hidden className={cn("space-y-6", className)}>
    <div className="flex flex-col items-center space-y-3">
      <Skeleton className="w-24 h-24 rounded-full" />
      <Skeleton className="h-4 w-32" />
      <Skeleton className="h-3 w-48" />
    </div>
    <div className="space-y-3">
      {Array.from({ length: 3 }).map((_, i) => (
        <Skeleton key={i} className="h-14 w-full rounded-xl" />
      ))}
    </div>
  </div>
);
