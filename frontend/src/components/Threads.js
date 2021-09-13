import { useEffect, useState } from "react";
import { Link, useParams } from 'react-router-dom';
import axiosInstance from './AxiosAPI';
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';


const Threads = () => {

    const [threads, setThreads] = useState(null);

    let { id } = useParams();
    
    

    useEffect(() => {
        axiosInstance.get(`/api/forum/category/${id}/`).then((res) => {
            const data = res.data;
            setThreads(data);
        })
    }, [])


    return (
        <div>
            <Container maxWidth='lg' style={{ backgroundColor: '#cfe8fc'}}>      
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Threads</TableCell>
                                <TableCell># of posts</TableCell>
                                <TableCell>Last updated</TableCell>
                                <TableCell>By</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {threads && threads.threads.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell component='th' scope='row'>
                                    <Link to={`/posts/${item.id}`} key={item.id}>{ item.name } </Link>
                                </TableCell>
                                <TableCell component='th' scope='row'>Test</TableCell>
                                <TableCell component='th' scope='row'>{ item.last_updated }</TableCell>
                                <TableCell component='th' scope='row'>Last Post Author</TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Link to={`/threads/${id}/create_new/`}>Create new</Link>      
            </Container>
        </div>
    )

}

export default Threads;