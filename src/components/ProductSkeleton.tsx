// ProductSkeleton Component - Loading placeholder for products
// Shows animated skeleton while products are loading

const ProductSkeleton = () => {
  return (
    <div className="bg-card rounded-lg overflow-hidden animate-pulse">
      {/* Image placeholder */}
      <div className="aspect-square bg-secondary" />
      
      {/* Content placeholder */}
      <div className="p-4 space-y-3">
        {/* Category */}
        <div className="h-5 w-20 bg-secondary rounded-full" />
        
        {/* Title */}
        <div className="space-y-2">
          <div className="h-4 bg-secondary rounded w-full" />
          <div className="h-4 bg-secondary rounded w-3/4" />
        </div>
        
        {/* Rating */}
        <div className="h-4 w-24 bg-secondary rounded" />
        
        {/* Price */}
        <div className="flex items-center justify-between pt-2">
          <div className="h-6 w-16 bg-secondary rounded" />
          <div className="h-8 w-8 bg-secondary rounded" />
        </div>
      </div>
    </div>
  );
};

export default ProductSkeleton;
