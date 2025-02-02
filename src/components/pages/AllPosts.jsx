import React, { useState, useEffect } from "react";
import appwriteService from "../../appwrite/config"
import { PostCard, Container } from "../index"
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function AllPosts() {
    const [loading, setLoading] = useState(true)

    const [posts, setPosts] = useState([])
    useEffect(() => { }, [])
    appwriteService.getListOfPost([]).then((posts) => {
        if (posts) {
            setPosts(posts.documents)
        }
    }).finally((_) => (setLoading(false)))
    return (
        <div className='w-full py-8'>
            {
                loading ? (
                    // Shimmer Effect
                    <div className="flex flex-wrap">
                        {[...Array(6)].map((_, index) => (
                            <div key={index} className="p-2 w-1/4">
                                <Skeleton height={index % 2 === 0 ? 290 : 200}
                                    borderRadius={8}
                                    highlightColor="#eee"
                                    duration={1.5}
                                />
                                <Skeleton height={20} width="80%" className="mt-2" />
                                <Skeleton height={15} width="60%" className="mt-1" />
                            </div>
                        ))}
                    </div>
                )
                    : <Container>
                        <div className='flex flex-wrap'>
                            {posts.map((post) => (
                                <div key={post.$id} className='p-2 w-1/4'>
                                    <PostCard {...post} />
                                </div>
                            ))}
                        </div>
                    </Container>}
        </div>
    )
}

export default AllPosts