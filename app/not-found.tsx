"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

// Root not-found redirects to default locale
export default function RootNotFound() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/id");
  }, [router]);

  return null;
}
