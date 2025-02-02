import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Container } from "./index";

const PostSkeleton = () => {
    return (
        <Container>
            {/* Image Skeleton */}
            <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                <Skeleton height={384} width={384} className="rounded-xl" />

                {/* Edit/Delete Buttons Skeleton */}
                <div className="absolute right-6 top-6 flex space-x-3">
                    <Skeleton width={80} height={36} className="rounded-md" />
                    <Skeleton width={80} height={36} className="rounded-md" />
                </div>
            </div>

            {/* Title Skeleton */}
            <div className="w-full mb-6">
                <Skeleton height={30} width="60%" />
            </div>

            {/* Content Skeleton */}
            <div className="browser-css">
                <Skeleton count={5} height={20} className="mb-2" />
            </div>
        </Container>
    );
};

export default PostSkeleton;
