import React, { useState, useEffect } from 'react';
import appwriteService from '../appwrite/config';
import { PostForm, Container } from '../components/index';
import { useParams, useNavigate } from 'react-router-dom';
function EditPost() {

    const [post, setPost] = useState(null);
    const navigate = useNavigate();
    const { slug } = useParams()  // slug ko hum current url m se lenge
    // ***Returns an object of key/value pairs of the {dynamic params from the current URL} that were matched by the route path.****

    // post edit krni h toh useState use krna pdega [SLUG, NAVIGATE]

    useEffect(() => {
        // AGAR SLUG H TOH USSE POST MILEGI FIR POST H TOH SETPOST SE EDIT KREDENGE VRNA NAVIGATE KR DENGE HOME PAGE PR
        if (slug) {
            appwriteService.getPosts(slug).then((post) => {
                if (post) {
                    setPost(post);
                }
            })
        } else {
            navigate('/');
        }

    }, [slug, navigate])

    // AGAR POST H TOH KUCH.... OR NHI H TOH KUCH, SO CONDITIONAL RENDERING [post ? ( ) : null]
    return post ?
        (
            <div className='py-8'>
                <Container>
                    <PostForm post={post} />
                </Container>
            </div>
        ) : null
};

export default EditPost;