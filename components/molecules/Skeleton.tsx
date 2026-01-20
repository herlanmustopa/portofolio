"use client";
import { cn } from "@/utils/classMerge";

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse bg-gray-200 dark:bg-dark-border rounded",
        className
      )}
    />
  );
}

export function ArticleCardSkeleton() {
  return (
    <div className="bg-white dark:bg-dark-card rounded-lg overflow-hidden shadow-lg">
      {/* Image skeleton */}
      <Skeleton className="h-48 w-full rounded-none" />

      {/* Content skeleton */}
      <div className="p-6 space-y-3">
        {/* Title */}
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-6 w-1/2" />

        {/* Description */}
        <div className="space-y-2 pt-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      </div>
    </div>
  );
}

export function ArticleGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array.from({ length: count }).map((_, index) => (
        <ArticleCardSkeleton key={index} />
      ))}
    </div>
  );
}

export function TestimonialSkeleton() {
  return (
    <div className="text-center px-8 md:px-16 space-y-8">
      {/* Avatar */}
      <div className="flex justify-center">
        <Skeleton className="w-24 h-24 rounded-full" />
      </div>

      {/* Content */}
      <div className="space-y-3 max-w-2xl mx-auto">
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-3/4 mx-auto" />
      </div>

      {/* Author info */}
      <div className="space-y-2">
        <Skeleton className="h-6 w-48 mx-auto" />
        <Skeleton className="h-4 w-32 mx-auto" />
        <Skeleton className="h-4 w-40 mx-auto" />
      </div>
    </div>
  );
}

export function ProjectCardSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
      {/* Image */}
      <Skeleton className="h-64 lg:h-80 w-full rounded-lg" />

      {/* Content */}
      <div className="space-y-4">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-10 w-3/4" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>
        {/* Tags */}
        <div className="flex gap-2 flex-wrap">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-8 w-20 rounded-full" />
          ))}
        </div>
        {/* Button */}
        <Skeleton className="h-12 w-40 rounded-full" />
      </div>
    </div>
  );
}

export function TimelineSkeleton() {
  return (
    <div className="space-y-12">
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index} className="flex justify-center">
          <div className="w-1/2 pr-8 text-right">
            {index % 2 === 0 && (
              <div className="space-y-2">
                <Skeleton className="h-6 w-48 ml-auto" />
                <Skeleton className="h-4 w-32 ml-auto" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4 ml-auto" />
              </div>
            )}
          </div>
          <div className="flex-shrink-0 w-24 flex flex-col items-center">
            <Skeleton className="w-8 h-8 rounded-full" />
            <Skeleton className="h-3 w-20 mt-2" />
          </div>
          <div className="w-1/2 pl-8 text-left">
            {index % 2 !== 0 && (
              <div className="space-y-2">
                <Skeleton className="h-6 w-48" />
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
