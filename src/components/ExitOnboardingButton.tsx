import React from "react";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const ExitOnboardingButton: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    navigate("/login", { replace: true });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button
          aria-label="Log out"
          className="flex items-center gap-1 text-sm font-medium text-destructive p-1"
        >
          <LogOut size={18} />
          Logout
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-[320px] rounded-2xl">
        <AlertDialogHeader>
          <AlertDialogTitle>Log out?</AlertDialogTitle>
          <AlertDialogDescription>
            Your setup progress will not be saved.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex-row gap-2">
          <AlertDialogCancel className="flex-1 mt-0">Stay</AlertDialogCancel>
          <AlertDialogAction onClick={handleLogout} className="flex-1">
            Log out
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ExitOnboardingButton;
