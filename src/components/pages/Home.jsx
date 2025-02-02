import React, { useEffect, useState } from 'react'
import { Container, PostCard } from '../index'
import appwriteService from '../../appwrite/config'
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
function Home() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        setPosts([])

        appwriteService.getListOfPost([]).then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }

        }).finally((_) => {
            setLoading(false)
        })

    }, [])

    return (
        <div className="w-full py-8">
            <Container>
                {loading ? (
                    // Shimmer Effect
                    <div className="flex flex-wrap">
                        {[...Array(6)].map((_, index) => (
                            <div key={index} className="p-2 w-1/4">
                                <Skeleton height={index % 2 === 0 ? 290 : 200} />
                                <Skeleton height={20} width="80%" className="mt-2" />
                                <Skeleton height={15} width="60%" className="mt-1" />
                            </div>
                        ))}
                    </div>
                ) : posts.length === 0 ? (
                    <div className="w-full py-8 mt-4 text-center">
                        <h1 className="text-2xl font-bold">
                            Please login to read posts
                        </h1>
                    </div>
                ) : (
                    <div className="flex flex-wrap">
                        {posts.map((post) => (
                            <div key={post.$id} className="p-2 w-1/4">
                                <PostCard {...post} />
                            </div>
                        ))}
                    </div>
                )}
            </Container>
        </div>
    );
}

export default Home