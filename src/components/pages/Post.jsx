import parse from "html-react-parser";
import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../../appwrite/config";
import { Button, Container, PostSkeleton } from "../index";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
export default function Post() {
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        console.log("tsetsss" + slug);
        if (slug) {

            appwriteService.getPost({ slug }).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            }).finally((_) => {
                setLoading(false)
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        const id = post.$id;
        appwriteService.deletePost(id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };
    if (loading) return <PostSkeleton />;
    return post ? (
        <div className="p-8">
            {loading ? <div className="flex flex-wrap">
                {[...Array(6)].map((_, index) => (
                    <div key={index} className="p-2 w-1/4">
                        <Skeleton height={index % 2 === 0 ? 290 : 200} />
                        <Skeleton height={20} width="80%" className="mt-2" />
                        <Skeleton height={15} width="60%" className="mt-1" />
                    </div>
                ))}
            </div> :
                <Container>
                    <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                        />

                        {isAuthor && (
                            <div className="absolute right-6 top-6">
                                <Link to={`/edit-post/${post.$id}`}>
                                    <Button
                                        bgColor="bg-green-500"
                                        className="mr-3"
                                    >
                                        Edit
                                    </Button>
                                </Link>
                                <Button
                                    bgColor="bg-red-500"
                                    onClick={deletePost}
                                >
                                    Delete
                                </Button>
                            </div>
                        )}
                    </div>
                    <div className="w-full mb-6">
                        <h1 className="text-2xl font-bold">{post.title}</h1>
                    </div>
                    <div className="browser-css">{parse(post.content)}</div>
                </Container>}
        </div>
    ) : null;
}
