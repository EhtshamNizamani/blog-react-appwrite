import React, { useCallback, useState } from 'react'
import { useSelector } from 'react-redux'
import { Input, RTE, Button, Select } from '../index';
import { useNavigate } from 'react-router-dom';
import appwriteService from '../../appwrite/config'
import { useForm } from "react-hook-form";

function PostForm({ post }) {
    const [isLoading, setIsLoading] = useState(false);

    const { register, handleSubmit, watch, control, setValue, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    })

    const navigate = useNavigate()
    const userData = useSelector((state) => state.auth.userData)

    const submit = async (data) => {
        setIsLoading(true);
        if (post) {
            const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null
            if (file) {
                await appwriteService.deleteFile(post.featuredImage);
            }

            const dbPost = await appwriteService.updatePost(post.$id, {

                ...data,
                featuredImage: file ? file.$id : undefined,
                userId: userData.$id

            })
            if (dbPost) {
                navigate(`/post/${dbPost.$id}`)
            }
        } else {

            const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;
            if (file) {

                data.featuredImage = file.$id;
                const dbPost = await appwriteService.createPost({
                    ...data,
                    userId: userData.$id
                })
                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }

            }


        }
        setIsLoading(false);


    }
    const slugTransform = useCallback((value,) => {
        if (value && typeof value === 'string') {
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");
        }
        return "";

    }, [])
    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, setValue, slugTransform])
    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button
                    isLoading={isLoading}
                    type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    );
}

export default PostForm