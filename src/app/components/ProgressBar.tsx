interface Props {
  progress: number;
  label?: string;
}

export default function ProgressBar({ progress, label }: Props) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center text-xs font-medium">
        <span className="text-slate-500">{label ?? "Progress"}</span>
        <span className="text-indigo-600 font-bold tabular-nums">{progress}%</span>
      </div>
      <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-indigo-600 to-violet-500 transition-all duration-700 ease-out relative"
          style={{ width: `${Math.min(progress, 100)}%` }}
        >
          <div className="absolute inset-0 bg-white/20 animate-shimmer rounded-full" />
        </div>
      </div>
    </div>
  );
}
