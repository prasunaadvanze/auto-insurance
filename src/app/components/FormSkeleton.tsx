export default function FormSkeleton() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="h-6 animate-shimmer rounded-lg w-2/5" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="space-y-2">
            <div className="h-3 animate-shimmer rounded w-1/4" />
            <div className="h-12 animate-shimmer rounded-xl" />
          </div>
        ))}
      </div>

      <div className="h-12 animate-shimmer rounded-xl w-full mt-4" />
    </div>
  );
}
