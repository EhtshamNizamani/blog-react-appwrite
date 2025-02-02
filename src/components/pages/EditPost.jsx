import React, { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import appwriteService from "../../appwrite/config"
import { Container, PostForm } from "../index"


function EditPost() {
    const [post, setPosts] = useState(null)
    const { slug } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        console.log("I am here to the edit post " + slug);
        if (slug) {
            appwriteService.getPost({ slug }).then((post) => {
                if (post) {
                    setPosts(post)
                }
            })
        } else {
            navigate('/')
        }
    }, [slug, navigate])
    return post ? (
        <div className='p-8'>
            <Container>
                <PostForm post={post} />
            </Container>
        </div>
    ) : null
}

export default EditPost