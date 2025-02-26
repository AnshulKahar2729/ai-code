import { AuthViewType } from "@/lib/auth";
import { SupabaseClient } from "@supabase/supabase-js";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import React, { FC } from "react";
import AuthForm from "./auth-form";

interface AuthDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  supabase: SupabaseClient;
  view: AuthViewType;
}
const AuthDialog: FC<AuthDialogProps> = ({ open, setOpen, supabase, view }) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogTitle>Sign in to AI-Code</DialogTitle>
        <AuthForm supabase={supabase} view={view} />
      </DialogContent>
    </Dialog>
  );
};

export default AuthDialog;
