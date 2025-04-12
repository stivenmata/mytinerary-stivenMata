const SkeletonLoader = () => {
    return (
      <div className="w-full h-64 bg-gray-800 rounded-lg shadow-lg overflow-hidden animate-pulse flex flex-col justify-between">
        
        <div className="h-2/3 bg-gray-600" />
  
     
        <div className="p-4 space-y-2">
          <div className="h-4 bg-gray-500 rounded w-1/2"></div>
          <div className="h-3 bg-gray-500 rounded w-1/3"></div>
          <div className="h-8 bg-gray-600 rounded mt-2 w-full"></div>
        </div>
      </div>
    );
  };
  
  export default SkeletonLoader;
  