import { useEffect, useState } from 'react'
import { getAuthorPosts, getUser } from '../services';
import { Layout, PostCard } from '../components';
import Link from 'next/link'
const Profile = ({posts})=>{
    const [author, setAuthor] = useState();
    const [post, setPost] = useState([]);

    const fetchPost=async()=>{
        const user = window.localStorage.getItem("user")
        getUser(user).then((data)=> setAuthor(data.author));
        const posts = await getAuthorPosts(user) || [];
        setPost(posts);
        console.log(posts);
    }
    useEffect(() => {
        fetchPost();
    }, [])

    return(
        <Layout>
        <div className="flex justify-between container mx-auto px-10">
           
            {author ? (
                <div className="flex flex-col items-center flex-initial h-fit">
                <img src={author.photo.url} alt={author.name}  className="w-32 h-32 rounded-full object-cover " />
            <p className='font-bold mt-2 text-white'>{author.name}</p>
            <Link href="/content">
            <div className='flex bg-white text-black mt-2 p-4 rounded-md cursor-pointer'>
            
            <p>Create Post</p>
            <span><svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"></path><path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"></path></svg></span>
        </div>
            </Link>
    
                </div>
            ):""}
          
            <div className="mx-5 px-5 flex-1">
                <p className='font-bold  text-2xl mb-4 text-white '>My Blogs</p>
                {post  && post.length > 0 ? post.map((post, index) => (
            <PostCard post={post.node} key={post.title} />
          )) : <p className='font-medium text-white'>You do not have any content.</p> }
            </div>
            <div className="bg-white p-5 border rounded max-w-md h-fit">
                <span className='font-bold text-gray-600'>BIOGRAPHY</span>
                <p>{author && author.bio  ? author.bio : 'You do not have a bio'}</p>
            </div>
        </div>
        </Layout>
    )
}

export default Profile;

