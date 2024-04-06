import React, { useEffect, useState } from 'react'
import appwriteService from "../appwrite/config";
import { Container, PostCard } from '../components/index'

// *** STARTING M VHI SAME CHEEZ KRNI H KUCH JO ALL POST M KI THI bs thoda add or bhi krna hoga extra 

function Home() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        appwriteService.getPosts().then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
        })
    }, [])

    // AGAR POST NHI H KUCH BHI TOH 'LOGIN TO READ POSTS'

    if (posts.length === 0) {
        return (
            <div className="w-full py-8 mt-4 text-center">

                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                Login to read post
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>

        )
    }
    // *****Agar POST H TOH MAP KRENGE SARI POSTS KO EK JGH SPREAD KRDENGE ******** 

    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-1/4'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
};

export default Home;