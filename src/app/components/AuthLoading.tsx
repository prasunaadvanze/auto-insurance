import { Loader2 } from "lucide-react";

type Props = {
  message?: string;
};

export default function AuthLoading({
  message = "Loading…",
}: Props) {
  return (
    <div className="gradient-mesh min-h-screen flex flex-col items-center justify-center gap-4 text-slate-700">
      <Loader2 className="w-10 h-10 text-indigo-600 animate-spin" />
      <p className="text-sm font-medium">{message}</p>
    </div>
  );
}
