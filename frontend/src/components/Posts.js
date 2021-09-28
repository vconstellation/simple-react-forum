import { useState, useEffect } from "react";
import { Link, useParams } from 'react-router-dom';
import axiosInstance from './AxiosAPI';
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@material-ui/core';
import UpdatePost from "./UpdatePost";

const Posts = () => {

    const [posts, setPosts] = useState(null);

    const [currentPage, setCurrentPage] = useState(1);

    const { id } = useParams();

    // pagination code block
    const goToNextPage = () => {
        setCurrentPage((page) => page + 1);
    }

    const goToPreviousPage = () => {
        setCurrentPage((page) => page - 1);
    }

    const changePage = (event) => {
        const pageNumber = Number(event.target.value);
        setCurrentPage(pageNumber);
    }


    useEffect(() => {
        axiosInstance.get(`/api/forum/threads/${id}/?page=${currentPage}`).then((res) => {
            const data = res.data;
            setPosts(data);
        })
    }, [currentPage])

    // this need to get removed and made into helper class
    const [username, setUsername] = useState(null);

    useEffect(() => {
        axiosInstance.get('api/forum/user/').then((res) => {
            const data = res.data;
            const username = data.username;
            setUsername(username);
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
                        <br />
                        { username == item.username ? <UpdatePost value={item.id} />  : 'not hello' }
                        <br />
                        
                    </Typography>
                    
                ))}
                <br />
                <Link to={`/posts/${id}/create_new/`}>Create new post</Link>

                <hr />
                <div>
                    Current page: 
                    { currentPage }
                    <br />
                    Next page:
                    <button onClick={goToNextPage}>Click me </button>
                    <br />
                    Previous page:
                    <button onClick={goToPreviousPage}> Click me </button>
                </div>
                
            </Container>
            
        </div>
    )

}

export default Posts;