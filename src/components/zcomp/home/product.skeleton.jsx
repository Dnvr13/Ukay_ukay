import React from "react";

const ProductSkeleton = ({ count }) => {
    return (
        <>
            {Array.from({ length: count }, (_, index) => (
                <li key={index} className="col-span-full sm:col-span-2 lg:col-span-1 group shadow-sm rounded border border-gray-50 relative animate-pulse">
                    <a className="p-2 flex flex-col">
                        {/* ::Picture Skeleton */}
                        <div className="aspect-w-1 aspect-h-1 w-full h-full overflow-hidden bg-gray-200 rounded">
                            {/* Placeholder for image */}
                            <div className="w-full h-full bg-gray-300">
                                <div className="w-80 h-80"></div>
                            </div>
                        </div>

                        {/* ::Product Details Skeleton */}
                        <div className="mt-5 pt-4 pb-2 border-t-2 border-gray-100 flex flex-col items-center">
                            {/* :::title Skeleton */}
                            <div className="h-4 w-3/4 bg-gray-200 rounded mb-2"></div>
                            {/* :::price Skeleton */}
                            <div className="h-6 w-1/2 bg-gray-200 rounded"></div>
                        </div>
                    </a>

                    {/* ::Action Icons Skeleton */}
                    <div className="absolute top-2 right-2 flex space-x-2">
                        <button
                            aria-label="Loading"
                            className="p-2 bg-gray-200 rounded-full shadow-md"
                            disabled
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-gray-400">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5A5.5 5.5 0 017.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3A5.5 5.5 0 0121 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                            </svg>
                        </button>
                        <button
                            aria-label="Loading"
                            className="p-2 bg-gray-200 rounded-full shadow-md"
                            disabled
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-gray-400">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h18l-1.5 9H5.25L4.5 6H3zM16.5 21a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm-9 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                            </svg>
                        </button>
                    </div>
                </li>
            ))}
        </>
    );
};

export default ProductSkeleton;