"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

/** Subtle footer link: "Dashboard" when signed in, otherwise "Staff Login". */
export function AdminLink() {
  const router = useRouter();
  const [checking, setChecking] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    createClient()
      .auth.getUser()
      .then(({ data: { user } }) => {
        setIsLoggedIn(!!user);
        setChecking(false);
      })
      .catch(() => setChecking(false));
  }, []);

  if (checking) return null;

  return (
    <button
      onClick={() => router.push(isLoggedIn ? "/admin" : "/admin/login")}
      className="text-white/40 transition-colors hover:text-white/70"
    >
      {isLoggedIn ? "Dashboard" : "Staff Login"}
    </button>
  );
}
