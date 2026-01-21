"use client";

export default function HomeLoading() {
  // Use the same dark gradient as banner for seamless transition
  // This prevents white flash when switching languages
  return (
    <div className="animated-gradient-background min-h-screen flex items-center justify-center">
      {/* Minimal loading indicator that blends with banner */}
      <div className="flex flex-col items-center gap-4 opacity-80">
        <div className="relative w-12 h-12">
          {/* Spinning ring */}
          <div className="absolute inset-0 rounded-full border-2 border-white/20 border-t-gold animate-spin" />
          {/* Inner glow */}
          <div className="absolute inset-2 rounded-full bg-gold/20 animate-pulse" />
        </div>
      </div>
    </div>
  );
}
