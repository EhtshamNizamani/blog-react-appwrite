import React, { useEffect, useState } from 'react'
import { Container, PostCard } from '../index'
import appwriteService from '../../appwrite/config'
import { useLocation } from 'react-router-dom';
function Home() {
    const [posts, setPosts] = useState([]);
    const lcoation = useLocation();
    console.log("helowww " + posts)
    useEffect(() => {
        setPosts([])

        appwriteService.getListOfPost([]).then((posts) => {
            console.log("these are post " + JSON.stringify(posts, null, 2))
            if (posts) {
                setPosts(posts.documents)
            }

        })

    }, [lcoation])

    if (posts.length === 0) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold">
                                Please login to read post
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-1/4 '>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default Home