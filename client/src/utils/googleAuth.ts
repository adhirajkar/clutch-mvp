import { toast } from "sonner";

export const handleGoogleError = () => {
  toast.error('Google login failed');
  console.error('Google login error');
};