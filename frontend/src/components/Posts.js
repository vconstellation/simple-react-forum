import { useState, useEffect } from "react";
import { Link, useParams } from 'react-router-dom';
import axiosInstance from './AxiosAPI';
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Grid, Item, Button } from '@material-ui/core';
import UpdatePost from './UpdatePost';
import CreatePost from './CreatePost';

const Posts = () => {

    // styles block

    const pageStyles = {
        backgroundColor: 'white',
        marginTop: '50px',
        paddingTop: '15px',
        paddingBottom: '15px',
    }

    const postStyles = {
        backgroundColor: '#DBE0E6',
        margin: '30px',
        padding: '30px',
    }

    // end of block

    const [posts, setPosts] = useState(null);
    const [addPost, setAddPost] = useState(false);
    const [editPost, setEditPost] = useState(false);

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

    // on click display addPost page;

    const addPostHandler = () => {
        setAddPost(!addPost);
    }

    // on click display editPost page;

    const editPostHandler = () => {
        setEditPost(!editPost);
    }


    return (
        <div>
            <Container maxWidth='lg' component={Paper} style={pageStyles}>      
                <h2>Posts</h2>
                <hr />
                {posts && posts.posts.map((item) => (
                    <Typography component={Paper} style={postStyles}>
                        <Grid container spacing={3}>
                            <Grid item xs={4}>
                                <p>Author: {item.username }</p>
                                <hr style={{border: 'dashed 1px'}} />
                            </Grid>
                            <Grid item xs={6} />
                            <Grid item xs={2}>
                                <p>
                                    { username == item.username ? 
                                    <Button variant='text' onClick={editPostHandler}>Edit</Button> :
                                    ''
                                }
                                </p>
                                <p>
                                    { username == item.username && editPost ? <UpdatePost /> : '' }
                                </p>
                            </Grid>
                        </Grid>
                        <p> {item.msg }</p>
                        <hr style={{border: 'dotted 1px'}} />
                        <a style={{fontSize: 'small'}}>
                            <p>Posted on: { item.created_at }</p>
                        </a>
                        
                    </Typography>
                    
                ))}
                <br />
                <Button variant='outlined' onClick={addPostHandler}> Add Post </Button>
                { addPost ? <CreatePost /> : ' ' }
                {/* <Link to={`/posts/${id}/create_new/`}>Create new post</Link> */}

                <hr />
                <div>
                    <Grid container spacing={3}>
                        <Grid item xs={4}>Current page: { currentPage }</Grid>
                        <Grid item xs={6} />
                        <Grid item xs={2}>
                            <button onClick={goToPreviousPage}>Previous page</button>   
                            <button onClick={goToNextPage}>Next page</button>
                        </Grid>
                    </Grid>
                    <br />
                    
                </div>
                
            </Container>
            
        </div>
    )

}

export default Posts;