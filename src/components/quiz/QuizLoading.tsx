export function QuizLoading() {
  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      {/* Top Bar Skeleton */}
      <div className="space-y-4">
        <div className="flex justify-between">
          <div className="space-y-2">
            <div className="h-7 w-48 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
          </div>
          <div className="space-y-2">
            <div className="h-4 w-32 bg-gray-200 rounded animate-pulse ml-auto"></div>
            <div className="h-5 w-16 bg-gray-200 rounded animate-pulse ml-auto"></div>
          </div>
        </div>
        <div className="h-2 bg-gray-200 rounded-full animate-pulse"></div>
      </div>
      
      {/* Question Card Skeleton */}
      <div className="bg-white rounded-xl shadow-md p-6 space-y-6">
        <div className="h-7 w-3/4 bg-gray-200 rounded animate-pulse"></div>
        
        <div className="space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-16 w-full bg-gray-100 rounded-2xl animate-pulse"></div>
          ))}
        </div>
      </div>
      
      {/* Next Button Skeleton */}
      <div className="flex justify-end">
        <div className="h-10 w-48 bg-gray-200 rounded-lg animate-pulse"></div>
      </div>
    </div>
  );
}
