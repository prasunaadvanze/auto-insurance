export default function FormSkeleton() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="h-6 animate-shimmer rounded-lg w-2/5" />

      {[1, 2, 3].map((i) => (
        <div key={i} className="space-y-2">
          <div className="h-3 animate-shimmer rounded w-1/4" />
          <div className="h-12 animate-shimmer rounded-xl" />
        </div>
      ))}

      <div className="h-12 animate-shimmer rounded-xl w-full mt-4" />
    </div>
  );
}
