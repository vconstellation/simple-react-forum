import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import axiosInstance from './AxiosAPI';
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@material-ui/core';

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
            <Container maxWidth='lg' component={Paper} style={{ backgroundColor: '#cfe8fc'}}>      
                <h2>Posts</h2>
                <hr />
                {posts && posts.posts.map((item) => (
                    <Typography component={Paper} style={{ margin: '30px', padding: '30px' }}>
                        Author: { item.username }
                        <br />
                        {item.msg}
                    </Typography>
                    
                ))}
                <br />
            </Container>
        </div>
    )

}

export default Posts;