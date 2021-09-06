import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import axiosInstance from './AxiosAPI';

const Posts = () => {

    const [posts, setPosts] = useState(null);

    const { id } = useParams();

    useEffect(() => {
        axiosInstance.get(`/api/forum/threads/${id}`).then((res) => {
            const data = res.data;
            setPosts(data);
        })
    }, [])

    return (
        <div>
            <h2>Posts</h2>
            {posts && posts.posts.map((item) => (
                <h4 key={item.id}>{ item.msg }</h4>
            ))}
        </div>
    )

}

export default Posts;