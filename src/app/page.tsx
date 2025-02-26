"use client";

import AuthDialog from "@/components/auth-dialog";
import { NavBar } from "@/components/navbar";
import { AuthViewType, useAuth } from "@/lib/auth";
import { supabase } from "@/lib/supabase";
import { useState } from "react";

export default function Home() {
  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false);
  const [authView, setAuthView] = useState<AuthViewType>("sign_in");
  const {session}  = useAuth(setIsAuthDialogOpen, setAuthView);

  function logout() {
    supabase
      ? supabase.auth.signOut()
      : console.warn("Supabase is not initialized");
  }
  return (
    <div className="flex min-h-screen max-h-screen">
      {supabase && (
        <AuthDialog
          open={isAuthDialogOpen}
          setOpen={setIsAuthDialogOpen}
          supabase={supabase}
          view={authView}
        />
      )}
      <div className="grid w-full md:grid-cols-2">
        <div>
          <NavBar
          session={session}
          showLogin={() => {
            setIsAuthDialogOpen(true);
          }}
          signOut={logout}
        
          />
        </div>
      </div>
    </div>
  );
}
