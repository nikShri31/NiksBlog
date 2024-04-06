import React, { useState, useEffect } from 'react'
import { Container, PostCard } from '../components/index'
import appwriteService from "../appwrite/config";

function AllPost() {
    const [posts, setPosts] = useState([])
    useEffect(() => { }, [])

    // **** GETPOSTS SE POST LENGE FIR POSTS KO SETPOSTS M DAAL DENGE 
    appwriteService.getPosts([]).then((posts) => {
        if (posts) {
            setPosts(posts.documents)
        }
    })
// ** FIR SAARI POSTS KO EK SATH KRNE K LIYE MAP BHI LGA DENGE ND POSTCARD H EACH POST KO SPREAD KR DENGE ****
    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map((post) => (
                        <div key={post.$id} className='w-/4 p-2'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
};

export default AllPost;