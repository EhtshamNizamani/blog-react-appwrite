import React from 'react'
import { Link } from 'react-router-dom'
import Service from '../appwrite/config'
function PostCard({ $id, title, featuredImage }) {
    return (
        <Link to={`/post/${$id}`}>
            <div className='w-full bg-slate-50  rounded-xl p-4  hover:bg-slate-200'>
                <div className='w-full justify-center p-4'>
                    <img className='hover:bg-slate-200 rounded-lg' src={Service.getFilePreview(featuredImage)} alt="" />

                </div>
                <h2 className=' text-black'>{title}</h2>
            </div>
        </Link>
    )
}

export default PostCard